from pathlib import Path
import sys
from types import SimpleNamespace
from unittest.mock import Mock

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'src'))
import deep_reading as reports
import literature_evidence as literature


def body(citation=''):
    return '\n\n'.join(f'## {i}. 第{i}节\n论文事实与推断需区分。{citation}' for i in range(1, 13)) + '\n\n（完）'


@pytest.fixture
def material(tmp_path, monkeypatch):
    monkeypatch.setattr(reports, 'ROOT', tmp_path)
    monkeypatch.setattr(literature, 'CACHE_ROOT', tmp_path / 'evidence-cache')
    path = tmp_path / 'paper.md'
    path.write_text('---\ntitle: Example Paper\nid: 2601.12345v2\nauthors: [Alice Smith]\nreading_section: deep\n---\n\n## 我的笔记\n不要删除', encoding='utf-8')
    path.with_suffix('.txt').write_text('Introduction and methods. Proof and References. ' * 90, encoding='utf-8')
    evidence = {'key': 'e', 'status': 'complete', 'papers': [{'id': 'E1', 'title': 'Earlier Paper',
                'year': 2020, 'url': 'https://example.org/paper', 'doi': '', 'crossref_verified': False,
                'evidence_level': 'abstract'}], 'warnings': [], 'retrieved_at': 'now'}
    collect = Mock(return_value=evidence)
    monkeypatch.setattr(reports, 'collect_evidence', collect)
    client = SimpleNamespace(model='model', base_url='https://example.org/v1', kwargs={},
                             chat=Mock(return_value={'content': body('[E1]'), 'finish_reason': 'stop'}))
    return path, client, collect


def test_published_report_reuse_survives_cache_eviction_and_keeps_notes(material):
    path, client, collect = material
    original = path.read_text(encoding='utf-8')
    first = reports.generate_report(path, path.with_suffix('.txt'), client)
    path.write_text(reports.insert_report(original, first), encoding='utf-8')
    assert '不要删除' in path.read_text(encoding='utf-8')
    assert 'https://example.org/paper' in first
    # No model or literature call just because a completed report is opened again.
    assert reports.generate_report(path, path.with_suffix('.txt'), client) == first
    client.chat.assert_called_once()
    collect.assert_called_once()
    assert '不要删除' not in reports.report_paths(path)[0].read_text(encoding='utf-8')
    assert 'https://example.org/v1' not in reports.report_paths(path)[1].read_text(encoding='utf-8')


@pytest.mark.parametrize('invalid', [body('[E9]'), body('[E1]').replace('## 8.', '## 7.'),
                                    body('[E1]').replace('（完）', ''), body('[E1]') + '\nhttps://invented.invalid'])
def test_invalid_report_never_overwrites_previous_report(material, invalid):
    path, client, _ = material
    reports.generate_report(path, path.with_suffix('.txt'), client)
    previous = reports.report_paths(path)[0].read_text(encoding='utf-8')
    client.model = 'changed-model'
    client.chat.return_value = {'content': invalid}
    with pytest.raises(RuntimeError):
        reports.generate_report(path, path.with_suffix('.txt'), client)
    assert reports.report_paths(path)[0].read_text(encoding='utf-8') == previous
    assert client.chat.call_count == 3  # original success + at most two invalid outputs


def test_missing_fulltext_never_calls_model(material):
    path, client, _ = material
    path.with_suffix('.txt').write_text('<html>access denied</html>' * 200, encoding='utf-8')
    with pytest.raises(ValueError, match='全文'):
        reports.generate_report(path, path.with_suffix('.txt'), client)
    client.chat.assert_not_called()


def test_report_version_and_fulltext_change_invalidate_cache(material):
    path, client, _ = material
    reports.generate_report(path, path.with_suffix('.txt'), client)
    path.with_suffix('.txt').write_text('Changed methods and references ' * 90, encoding='utf-8')
    reports.generate_report(path, path.with_suffix('.txt'), client)
    assert client.chat.call_count == 2


def test_bounded_block_update_preserves_following_notes():
    old = '# Title\n\n## 我的笔记\n之前的笔记'
    first = reports.insert_report(old, '报告一') + '\n## Notes\n后加的笔记'
    second = reports.insert_report(first, '报告二')
    assert second.count(reports.BEGIN) == 1
    assert '报告一' not in second and '报告二' in second
    assert '之前的笔记' in second and '后加的笔记' in second


def test_evidence_matches_source_before_following_citations(tmp_path, monkeypatch):
    monkeypatch.setattr(literature, 'CACHE_ROOT', tmp_path / 'cache')
    calls = []
    def get(url, **kwargs):
        calls.append((url, kwargs))
        if '/search' in url:
            return {'data': [{'paperId': 'wrong', 'title': 'Same Title', 'authors': [{'name': 'Other Person'}], 'externalIds': {}}]}
        raise AssertionError(url)
    monkeypatch.setattr(literature, '_get', get)
    result = literature.collect_evidence({'title': 'Same Title', 'authors': ['Alice Smith']}, tmp_path / 'e.json')
    assert len(calls) == 1
    assert not any('/citations' in url or '/references' in url for url, _ in calls)
    assert result['warnings']


def test_evidence_limit_and_crossref_mismatch(tmp_path, monkeypatch):
    monkeypatch.setattr(literature, 'CACHE_ROOT', tmp_path / 'cache')
    def get(url, **kwargs):
        if 'crossref.org' in url:
            return {'message': {'title': ['Different paper']}}
        return {'data': [{'title': f'Paper {i}', 'paperId': str(i), 'externalIds': {'DOI': '10.1/' + str(i)},
                          'url': 'https://example.org/' + str(i)} for i in range(30)]}
    monkeypatch.setattr(literature, '_get', get)
    result = literature.collect_evidence({'title': 'A very long research paper title about interesting methods'}, tmp_path / 'e.json')
    assert len(result['papers']) == 12
    assert all(not x['crossref_verified'] and x['evidence_level'] == 'metadata' for x in result['papers'])


def test_evidence_service_failure_is_explicit(tmp_path, monkeypatch):
    import requests
    monkeypatch.setattr(literature, 'CACHE_ROOT', tmp_path / 'cache')
    monkeypatch.setattr(literature, '_get', Mock(side_effect=requests.Timeout))
    result = literature.collect_evidence({'title': 'Some title'}, tmp_path / 'e.json')
    assert result['status'] == 'unavailable'
    assert not result['papers'] and result['warnings']


def test_backfill_validates_all_selected_routes_before_work(tmp_path):
    import importlib.util
    spec = importlib.util.spec_from_file_location('backfill', Path(__file__).resolve().parents[1] / 'scripts/backfill_deep_reports.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    (tmp_path / '202610/19').mkdir(parents=True)
    paper = tmp_path / '202610/19/paper.md'
    paper.write_text('---\nreading_section: deep\n---\nNotes', encoding='utf-8')
    assert module.resolve_routes('202610/19/paper', tmp_path) == [paper]
    with pytest.raises(ValueError): module.resolve_routes('../secret', tmp_path)
    with pytest.raises(ValueError): module.resolve_routes('202610/19/paper,202610/19/missing', tmp_path)


def test_paper_identity_handles_legacy_arxiv_pdf_and_yaml_date():
    paper = reports.paper_identity('attention-paper.md', '---\ntitle: Attention\ndate: 2017-06-12\npdf: https://arxiv.org/pdf/1706.03762v1\n---\n')
    assert paper['id'] == '1706.03762v1'
    assert paper['year'] == '2017-06-12'
    literature.fingerprint(paper)


def test_empty_sections_are_not_complete_reports():
    with pytest.raises(ValueError, match='空白'):
        reports.validate_report('\n'.join(f'## {i}. Title' for i in range(1, 13)) + '\n（完）', {'papers': []})


def test_model_heading_variants_are_normalized():
    body_text = '\n\n'.join(
        f'### {i}、第{i}节\n正文内容。' for i in range(1, 13)
    ) + '\n\n（完）'
    normalized = reports.normalize_report_headings(body_text)
    assert normalized.startswith('## 1. 第1节')
    assert reports.validate_report(normalized, {'papers': []}) is None


def test_chinese_number_headings_are_normalized():
    labels = ['一','二','三','四','五','六','七','八','九','十','十一','十二']
    body_text = '\n'.join(f'**{label}、第{idx}节**\n正文。' for idx, label in enumerate(labels, 1)) + '\n（完）'
    assert reports.validate_report(reports.normalize_report_headings(body_text), {'papers': []}) is None


def test_request_failure_preserves_published_report_without_leaking_details(material):
    import requests
    path, client, _ = material
    first = reports.generate_report(path, path.with_suffix('.txt'), client)
    client.model = 'new-model'
    client.chat.side_effect = requests.Timeout('sensitive-provider-error')
    with pytest.raises(RuntimeError):
        reports.generate_report(path, path.with_suffix('.txt'), client)
    assert reports.report_paths(path)[0].read_text(encoding='utf-8') == first
    progress = path.with_suffix('.report-progress.json').read_text(encoding='utf-8')
    assert 'failed' in progress and 'sensitive-provider-error' not in progress


def test_large_citation_set_cannot_displace_references(tmp_path, monkeypatch):
    monkeypatch.setattr(literature, 'CACHE_ROOT', tmp_path / 'cache')
    def item(number):
        return {'paperId': str(number), 'title': f'Related {number}', 'externalIds': {}}
    def get(url, **kwargs):
        if url.endswith('/references'):
            return {'data': [{'citedPaper': item(i)} for i in range(1, 13)]}
        if url.endswith('/citations'):
            return {'data': [{'citingPaper': item(i)} for i in range(21, 33)]}
        if url.endswith('/search'):
            return {'data': [item(i) for i in range(41, 47)]}
        return {'paperId': 'source', 'title': 'Original'}
    monkeypatch.setattr(literature, '_get', get)
    evidence = literature.collect_evidence({'id':'2601.12345v1','title':'Original'}, tmp_path / 'e.json')
    assert len(evidence['papers']) == 12
    assert {row['relation'] for row in evidence['papers']} == {'reference','citation','related_search'}
