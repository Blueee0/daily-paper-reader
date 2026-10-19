import importlib.util
import json
from pathlib import Path
import sys
from unittest.mock import Mock

import pytest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'src'))


@pytest.fixture
def pipeline(monkeypatch):
    import os
    for name in ('DPR_RUN_DATE', 'DPR_FILTER_PROFILE_TAG', 'DPR_INCLUDE_CONFERENCE_ONLY_PROFILES'):
        monkeypatch.setenv(name, os.getenv(name, ''))
    spec = importlib.util.spec_from_file_location('staged_main', ROOT / 'src/main.py')
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def test_stage_uses_saved_date_options_and_only_runs_selected_step(tmp_path, monkeypatch, pipeline):
    context = tmp_path / 'run.json'
    monkeypatch.setattr(pipeline, 'resolve_run_date_token', lambda _: '20261018')
    monkeypatch.setattr(pipeline, 'resolve_sidebar_date_label', lambda _: None)
    monkeypatch.setattr(pipeline, 'should_skip_fetch', lambda: True)
    monkeypatch.setattr(sys, 'argv', ['main.py', '--stage', 'initialize', '--context-file', str(context), '--fetch-days', '1', '--profile-tag', 'test'])
    pipeline.main()
    assert json.loads(context.read_text(encoding='utf-8'))['arguments']['profile_tag'] == 'test'
    monkeypatch.setattr(pipeline, 'resolve_run_date_token', Mock(side_effect=AssertionError('must not recompute date')))
    subprocess = Mock()
    monkeypatch.setattr(pipeline.subprocess, 'run', subprocess)
    monkeypatch.setattr(sys, 'argv', ['main.py', '--stage', 'refine', '--context-file', str(context)])
    pipeline.main()
    subprocess.assert_called_once()
    assert subprocess.call_args.args[0][1].endswith('4.llm_refine_papers.py')
    import os
    assert os.environ['DPR_RUN_DATE'] == '20261018'


def test_stage_failure_propagates(pipeline, monkeypatch):
    import subprocess
    pipeline.SELECTED_STAGE = 'rerank'
    monkeypatch.setattr(pipeline.subprocess, 'run', Mock(side_effect=subprocess.CalledProcessError(1, 'step')))
    with pytest.raises(subprocess.CalledProcessError):
        pipeline.run_step('Step 3 - Rerank', ['python', 'rank.py'])


def test_workflow_uses_fixed_context_for_each_native_stage():
    import yaml
    workflow = yaml.safe_load((ROOT / '.github/workflows/daily-paper-reader.yml').read_text(encoding='utf-8'))
    steps = workflow['jobs']['run']['steps']
    stages = [s for s in steps if '--stage ' in s.get('run', '') and '--stage\', \'initialize' not in s['run']]
    assert len(stages) == 10
    assert all('--context-file .local-runs/pipeline-context.json' in s['run'] for s in stages)
    assert 'pages: write' in (ROOT / '.github/workflows/deep-reading-report.yml').read_text(encoding='utf-8')
