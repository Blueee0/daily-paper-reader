"""Bounded, attributable literature evidence for a single paper; no LLM calls."""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path
import re
import threading
import time
from urllib.parse import quote

import requests

_RATE_LOCK = threading.Lock()
_LAST_REQUEST = 0.0
FIELDS = 'paperId,title,year,authors,abstract,url,externalIds,publicationDate'
CACHE_ROOT = Path(__file__).resolve().parents[1] / '.local-runs/deep-reading-cache/evidence'


def fingerprint(value):
    return hashlib.sha256(json.dumps(value, ensure_ascii=False, sort_keys=True).encode('utf-8')).hexdigest()


def write_json(path, value):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + '.' + str(threading.get_ident()) + '.tmp')
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding='utf-8')
    os.replace(temporary, path)


def read_json(path):
    try:
        return json.loads(Path(path).read_text(encoding='utf-8'))
    except (OSError, ValueError):
        return None


def _get(url, *, params=None, semantic=False, session=None):
    global _LAST_REQUEST
    headers = {'User-Agent': 'DailyPaperReader/1.0 (literature evidence)'}
    if semantic and os.getenv('SEMANTIC_SCHOLAR_API_KEY'):
        headers['x-api-key'] = os.environ['SEMANTIC_SCHOLAR_API_KEY']
    client = session or requests
    for attempt in range(3):
        # Across report worker threads, stay below the introductory 1 request/sec quota.
        with _RATE_LOCK:
            time.sleep(max(0, 1.1 - (time.monotonic() - _LAST_REQUEST)))
            _LAST_REQUEST = time.monotonic()
        response = client.get(url, params=params, headers=headers, timeout=20)
        if response.status_code in (429, 500, 502, 503, 504) and attempt < 2:
            time.sleep(min(2 ** (attempt + 1), 8))
            continue
        response.raise_for_status()
        return response.json()
    raise RuntimeError('文献服务重试已达上限')


def _title_key(title):
    return re.sub(r'[^\w]', '', str(title).lower())


def _authors_overlap(left, right):
    def surnames(items):
        return {str(x.get('name', '') if isinstance(x, dict) else x).lower().split()[-1]
                for x in items if str(x.get('name', '') if isinstance(x, dict) else x).strip()}
    return bool(surnames(left) & surnames(right))


def collect_evidence(paper, cache_path, *, session=None, refresh=False):
    """At most 3 search queries, 12 deduplicated records, and 12 DOI verifications.

    References/citations are fetched only for a confidently identified source paper.
    Saved partial snapshots are reusable and retain their partial status.
    """
    identity = {key: paper.get(key) for key in ('id', 'title', 'doi', 'authors')}
    key = fingerprint({'version': 1, 'paper': identity, 'queries': 3, 'limit': 12})
    checkpoint = CACHE_ROOT / (key + '.json')
    cached = read_json(cache_path) or read_json(checkpoint)
    if not refresh and cached and cached.get('key') == key:
        write_json(cache_path, cached)
        return cached
    result = {'version': 1, 'key': key, 'status': 'complete', 'papers': [], 'warnings': [],
              'retrieved_at': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())}
    base = 'https://api.semanticscholar.org/graph/v1'
    candidates = []
    errors = []

    def request(path, params=None, semantic=True):
        try:
            return _get(base + path if semantic else path, params=params,
                        semantic=semantic, session=session)
        except (requests.RequestException, ValueError, RuntimeError) as exc:
            # Never persist request headers, credentials or provider response bodies.
            errors.append(type(exc).__name__)
            return None

    source = None
    doi = str(paper.get('doi') or '').removeprefix('https://doi.org/')
    pid = str(paper.get('id') or '').removeprefix('arxiv:')
    source_id = 'DOI:' + doi if doi else ('ARXIV:' + pid if re.fullmatch(r'\d{4}\.\d{4,5}(?:v\d+)?', pid) else '')
    if source_id:
        source = request('/paper/' + quote(source_id, safe=':'), {'fields': FIELDS})
    title = str(paper.get('title') or '').strip()
    queries = [title]
    # Fixed, bounded title-derived queries; no extra paid query-planning model.
    words = re.findall(r'[A-Za-z][A-Za-z0-9-]{2,}', title)
    if len(words) > 6:
        queries.extend([' '.join(words[:6]), ' '.join(words[-6:])])
    for query in list(dict.fromkeys(queries))[:3]:
        if not query:
            continue
        data = request('/paper/search', {'query': query, 'limit': 6, 'fields': FIELDS})
        for item in (data or {}).get('data', []):
            exact_title = _title_key(item.get('title')) == _title_key(title)
            if not source and exact_title and _authors_overlap(paper.get('authors') or [], item.get('authors') or []):
                source = item
            candidates.append((item, 'related_search'))
    lanes = {'related_search': candidates, 'reference': [], 'citation': []}
    if source and source.get('paperId'):
        for endpoint, field, relation in [('references', 'citedPaper', 'reference'), ('citations', 'citingPaper', 'citation')]:
            data = request('/paper/' + quote(source['paperId'], safe='') + '/' + endpoint,
                           {'limit': 12, 'fields': FIELDS})
            rows = (data or {}).get('data', [])
            lanes[relation] = [(row[field], relation) for row in rows if row.get(field)]
    # Interleave evidence types so a popular paper's citations cannot crowd out its references.
    candidates = []
    for index in range(max((len(lane) for lane in lanes.values()), default=0)):
        for relation in ('reference', 'citation', 'related_search'):
            if index < len(lanes[relation]):
                candidates.append(lanes[relation][index])
    seen = set()
    for item, relation in candidates:
        if len(result['papers']) >= 12:
            break
        title_key = _title_key(item.get('title'))
        identifier = (item.get('externalIds') or {}).get('DOI') or item.get('paperId') or title_key
        if not title_key or identifier in seen or title_key == _title_key(title):
            continue
        seen.add(identifier)
        external = item.get('externalIds') or {}
        row = {'id': 'E' + str(len(result['papers']) + 1), 'title': item['title'],
               'year': item.get('year'), 'authors': [x.get('name', '') for x in item.get('authors') or []],
               'abstract': item.get('abstract') or '', 'relation': relation,
               'url': item.get('url') or '', 'doi': external.get('DOI') or '',
               'evidence_level': 'abstract' if item.get('abstract') else 'metadata',
               'source': 'Semantic Scholar', 'crossref_verified': False}
        if row['doi']:
            crossref = request('https://api.crossref.org/works/' + quote(row['doi'], safe=''), semantic=False)
            meta = (crossref or {}).get('message') or {}
            row['crossref_verified'] = any(_title_key(t) == title_key for t in meta.get('title') or [])
            if not row['crossref_verified']:
                row['verification_note'] = 'Crossref 未能确认该 DOI 与标题对应'
        result['papers'].append(row)
    if not source:
        result['warnings'].append('未能可靠匹配原论文，未推断其引用关系。')
    if errors:
        result['status'] = 'partial' if result['papers'] else 'unavailable'
        result['warnings'].append('部分文献请求失败或被限流；不是完整文献调研。')
    if not result['papers']:
        result['status'] = 'unavailable'
        result['warnings'].append('未取得可引用的外部文献；不据此推断不存在相关工作。')
    # Even partial evidence is a saved snapshot for a completed report, not a claim of completeness.
    write_json(cache_path, result)
    write_json(checkpoint, result)
    return result
