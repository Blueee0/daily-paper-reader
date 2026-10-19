"""Explicit content-only backfill of selected, already-published deep papers."""
from __future__ import annotations

import argparse
import importlib.util
import os
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'src'))


def resolve_routes(value, docs):
    routes = list(dict.fromkeys(x.strip().removeprefix('docs/').removesuffix('.md')
                               for x in re.split(r'[\n,]+', value) if x.strip()))
    if not 1 <= len(routes) <= 20:
        raise ValueError('请选择 1–20 篇论文，不会扫描或补齐其他论文')
    paths = []
    for route in routes:
        if not re.fullmatch(r'[A-Za-z0-9_-]+(?:/[A-Za-z0-9_.-]+)+', route):
            raise ValueError('非法论文 route：' + route)
        path = (docs / (route + '.md')).resolve()
        if not path.is_relative_to(docs.resolve()) or not path.is_file():
            raise ValueError('论文页面不存在：' + route)
        from deep_reading import metadata
        text = path.read_text(encoding='utf-8')
        meta = metadata(text)
        if meta.get('reading_section') != 'deep' and '论文详细总结（自动生成）' not in text:
            raise ValueError('仅支持已有精读论文：' + route)
        paths.append(path)
    return paths


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--routes', default=os.getenv('REPORT_ROUTES', ''))
    parser.add_argument('--docs-dir', type=Path, default=ROOT / 'docs')
    args = parser.parse_args()
    paths = resolve_routes(args.routes, args.docs_dir)
    spec = importlib.util.spec_from_file_location('reading_backfill_generator', ROOT / 'src/6.generate_docs.py')
    generator = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(generator)
    from deep_reading import paper_identity, metadata
    client = generator.create_llm_client()
    if client is None:
        raise RuntimeError('缺少工作流 LLM 配置')
    for index, path in enumerate(paths, 1):
        print(f'精读报告 {index}/{len(paths)}：{path.relative_to(args.docs_dir)}', flush=True)
        text = path.read_text(encoding='utf-8')
        meta = metadata(text)
        txt = path.with_suffix('.txt')
        if not txt.exists() or not generator.is_usable_paper_text(txt.read_text(encoding='utf-8')):
            generator.ensure_text_content(meta.get('pdf_url') or meta.get('pdf') or paper_identity(path, text)['link'], str(txt))
        report = generator.generate_deep_summary(str(path), str(txt), client=client)
        generator.upsert_auto_block(str(path), '论文详细总结（自动生成）', report)


if __name__ == '__main__':
    main()
