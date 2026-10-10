"""用户已读论文清单：合并前端标记（Supabase user_read_state）与手动导入
（archive/user_read.json），供 Step 5 检索去重，避免已读论文重复推荐。

archive/user_read.json 由前端「阅读清单」导入时经 Contents API 提交，格式：
{
  "version": 1,
  "updated_at": "...",
  "items": [{"id": "2401.12345", "status": "good|bad|read", "title": "...", "marked_at": "..."}]
}
"""

from __future__ import annotations

import json
import os
import re
from typing import Any, Dict

USER_READ_FILENAME = "user_read.json"
USER_READ_STATE_TABLE = "user_read_state"

_ARXIV_NEW_ID_RE = re.compile(r"^\d{4}\.\d{4,5}$")
_ARXIV_OLD_ID_RE = re.compile(r"^[a-z-]+(?:\.[A-Z]{2})?/\d{7}$", flags=re.IGNORECASE)
_DOI_RE = re.compile(r"^10\.\d{4,9}/\S+$", flags=re.IGNORECASE)


def extract_paper_key(raw: Any) -> str:
    """从任意输入提取可去重的论文键：arXiv ID/URL、DOI；否则返回空串。

    - arXiv ID 剥离版本号，与 5.select_papers.canonical_paper_id 对齐。
    - DOI 统一小写（DOI 大小写不敏感）。
    - 非 arXiv/DOI 的输入（例如纯标题）不可靠，直接丢弃，避免误杀。
    """
    text = str(raw or "").strip()
    if not text:
        return ""
    s = text
    arxiv_prefix = re.match(r"^arxiv:(.+)$", s, flags=re.IGNORECASE)
    if arxiv_prefix:
        s = arxiv_prefix.group(1)
    arxiv_url = re.match(
        r"^https?://(?:[\w.]*\.)?arxiv\.org/(?:abs|pdf)/(.+)$", s, flags=re.IGNORECASE
    )
    if arxiv_url:
        s = arxiv_url.group(1)
    s = s.split("?", 1)[0].split("#", 1)[0]
    s = s.strip().strip("\"'“”‘’.,;")
    if s.lower().endswith(".pdf"):
        s = s[:-4]
    version_match = re.match(r"^(.+?)v(\d+)$", s)
    base = version_match.group(1) if version_match else s
    if _ARXIV_NEW_ID_RE.match(base) or _ARXIV_OLD_ID_RE.match(base):
        return base
    if _DOI_RE.match(s):
        return s.lower()
    return ""


def load_user_read_file(archive_root: str) -> Dict[str, Dict[str, Any]]:
    """读取 archive/user_read.json，返回 {canonical_key: record}。"""
    path = os.path.join(archive_root, USER_READ_FILENAME)
    if not os.path.exists(path):
        return {}
    try:
        with open(path, "r", encoding="utf-8") as f:
            payload = json.load(f)
    except Exception:
        return {}
    items = payload.get("items") if isinstance(payload, dict) else None
    if not isinstance(items, list):
        return {}
    out: Dict[str, Dict[str, Any]] = {}
    for item in items:
        if isinstance(item, str):
            key = extract_paper_key(item)
            if key:
                out.setdefault(key, {"status": "read", "source": "import", "title": ""})
            continue
        if not isinstance(item, dict):
            continue
        key = extract_paper_key(item.get("id") or item.get("paper_id") or item.get("key"))
        if not key:
            continue
        record = {
            "status": str(item.get("status") or "read").strip().lower(),
            "source": str(item.get("source") or "import").strip().lower(),
            "title": str(item.get("title") or ""),
        }
        existing = out.get(key)
        if existing is None or (record.get("status") == "good" and existing.get("status") != "good"):
            out[key] = record
    return out


def query_supabase_user_read_state(backend: Dict[str, Any] | None) -> Dict[str, Dict[str, Any]]:
    """读取 Supabase user_read_state（前端 ✓/✗ 标记的同步表）。

    任一环节失败（未配置 / 网络 / RLS 拒绝匿名读取）都返回空 dict 并由调用方记日志，
    不阻塞流水线。
    """
    if not isinstance(backend, dict):
        return {}
    url = str(backend.get("url") or "").strip().rstrip("/")
    api_key = str(backend.get("anon_key") or backend.get("api_key") or "").strip()
    if not url or not api_key:
        return {}
    try:
        import requests

        resp = requests.get(
            f"{url}/rest/v1/{USER_READ_STATE_TABLE}",
            headers={
                "apikey": api_key,
                "Authorization": f"Bearer {api_key}",
                "Accept": "application/json",
            },
            params={"select": "paper_id,status"},
            timeout=20,
        )
        if not resp.ok:
            return {}
        rows = resp.json()
    except Exception:
        return {}
    out: Dict[str, Dict[str, Any]] = {}
    if not isinstance(rows, list):
        return out
    for row in rows:
        if not isinstance(row, dict):
            continue
        status = str(row.get("status") or "").strip().lower()
        if not status:
            continue
        key = extract_paper_key(row.get("paper_id"))
        if not key:
            continue
        out[key] = {"status": status, "source": "supabase", "title": ""}
    return out


def load_supabase_backend_from_config(config_path: str) -> Dict[str, Any] | None:
    """从 config.yaml 的 supabase 块读 {url, anon_key}，失败返回 None。"""
    if not config_path or not os.path.exists(config_path):
        return None
    try:
        import yaml  # type: ignore

        with open(config_path, "r", encoding="utf-8") as f:
            data = yaml.safe_load(f) or {}
    except Exception:
        return None
    block = data.get("supabase") if isinstance(data, dict) else None
    if not isinstance(block, dict):
        return None
    url = str(block.get("url") or "").strip()
    anon_key = str(
        block.get("anon_key") or block.get("publishable_key") or block.get("service_key") or ""
    ).strip()
    if not url or not anon_key:
        return None
    return {"url": url, "anon_key": anon_key}


def collect_user_read_keys(
    archive_root: str,
    backend: Dict[str, Any] | None = None,
    log=None,
) -> set:
    """合并两个已读来源，返回 canonical key 集合（供 Step 5 seen_ids 并集）。"""
    records = load_user_read_file(archive_root)
    file_count = len(records)
    supabase_records = query_supabase_user_read_state(backend)
    for key, record in supabase_records.items():
        existing = records.get(key)
        if existing is None or (record.get("status") == "good" and existing.get("status") != "good"):
            records[key] = record
    if log is not None:
        log(
            f"[INFO] 用户已读清单：file={file_count} 条，supabase={len(supabase_records)} 条，"
            f"合并后 {len(records)} 条（将不再重复推荐）。"
        )
    return set(records.keys())
