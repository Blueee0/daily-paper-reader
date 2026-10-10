// 工作流触发面板：用于从前端触发 GitHub Actions workflow，并展示运行进度
// 依赖：GitHub Token（Classic PAT），需要 repo + workflow 权限

window.DPRWorkflowRunner = (function () {
  const WORKFLOWS = [
    { key: 'topic-research', id: 'topic-research.yml', name: '专题研究', desc: '固定评审预算与最终结果名额，可继续生成内容。' },
    {
      key: 'starter-pack',
      id: 'starter-pack.yml',
      name: '生成/续跑研究方向入门包',
      desc: '近365天 arXiv + 近24个月会议，按预算生成并复用进度。',
    },
    {
      key: 'daily-now',
      id: 'daily-paper-reader.yml',
      name: '立即爬取并处理论文',
      desc: '触发 daily-paper-reader 工作流（抓取→召回→重排→生成 docs）。',
      dispatchInputs: {
        run_enrich: 'false',
      },
    },
    {
      key: 'sync',
      id: 'sync.yml',
      name: '同步上游代码',
      desc: '触发 Upstream Sync 工作流（合并上游 main 到当前仓库）。',
    },
    {
      key: 'reset-content',
      id: 'reset-content.yml',
      name: '重置 content（docs + archive）',
      desc: '将 docs 恢复为 docs_init 基线，并清空 archive。该操作为危险操作。',
    },
    {
      key: 'conference-retrieval',
      id: 'conference-paper-retrieval.yml',
      name: '会议论文检索',
      desc: '按会议和年份触发 Supabase BM25/Embedding 候选召回与 RRF 融合。',
      dispatchInputs: {
        top_k: '50',
        rrf_top_n: '200',
        run_rerank: 'true',
        reranker_profile: 'public-zwwen-rerank',
        run_llm_refine: 'true',
      },
    },
  ];

  const QUICK_FETCH_PRESETS = {
    '10': {
      key: 'daily-now',
      dispatchInputs: {
        run_enrich: 'false',
        fetch_days: '10',
      },
    },
    '30': {
      key: 'daily-now',
      dispatchInputs: {
        run_enrich: 'false',
        fetch_days: '30',
        fetch_mode: 'skims',
      },
    },
    '30-skims': {
      key: 'daily-now',
      dispatchInputs: {
        run_enrich: 'false',
        fetch_days: '30',
        fetch_mode: 'skims',
      },
    },
    '30-standard': {
      key: 'daily-now',
      dispatchInputs: {
        run_enrich: 'false',
        fetch_days: '30',
        fetch_mode: 'standard',
      },
    },
  };

  let overlay = null;
  let panel = null;
  let statusEl = null;
  let runsEl = null;
  let recentEl = null;
  let refreshTimer = null;
  let activeRun = null;
  let selectedRun = null;
  const lastRunStateById = {};
  let repoContextCache = null;

  const escapeHtml = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  const loadGithubToken = () => {
    try {
      const secret = window.decoded_secret_private || {};
      if (secret.github && secret.github.token) {
        return String(secret.github.token || '').trim();
      }
    } catch {
      // ignore
    }
    try {
      const raw = window.localStorage
        ? window.localStorage.getItem('github_token_data')
        : '';
      if (!raw) return '';
      const obj = JSON.parse(raw);
      return String((obj && obj.token) || '').trim();
    } catch {
      return '';
    }
  };
  const loadRerankerProfile = () => {
    try {
      const secret = window.decoded_secret_private || {};
      const reranker = secret.rerankerLLM || {};
      const profile = String(reranker.profile || '').trim();
      if (profile === 'local-qwen3-0.6b' || reranker.provider === 'local') return 'public-zwwen-rerank';
      if (profile) return profile;
      if (isLocalDebugPage()) return 'public-zwwen-rerank';
      return '';
    } catch {
      return isLocalDebugPage() ? 'public-zwwen-rerank' : '';
    }
  };

  const resolveRepoFromUrl = async (token) => {
    const currentUrl = window.location.href || '';
    const githubPagesMatch = currentUrl.match(
      /https?:\/\/([^.]+)\.github\.io\/([^\/]+)/,
    );
    if (githubPagesMatch) {
      return { owner: githubPagesMatch[1], repo: githubPagesMatch[2] };
    }

    // 非 GitHub Pages URL：回退到「Token 对应的用户 + daily-paper-reader」作为默认目标仓库
    try {
      const userRes = await ghFetch(token, 'https://api.github.com/user');
      if (userRes.ok) {
        const user = await userRes.json();
        const login = (user && user.login) ? String(user.login) : '';
        if (login) {
          return { owner: login, repo: 'daily-paper-reader' };
        }
      }
    } catch {
      // ignore
    }

    return { owner: '', repo: '' };
  };

  const resolveRepoContext = async (token, options = {}) => {
    const { forceRefresh = false } = options || {};
    const { owner, repo } = await resolveRepoFromUrl(token);
    if (!owner || !repo) {
      return { owner: '', repo: '', isFork: null, defaultBranch: 'main' };
    }

    const cacheKey = `${owner}/${repo}`;
    if (!forceRefresh && repoContextCache && repoContextCache.key === cacheKey && repoContextCache.value) {
      return repoContextCache.value;
    }
    if (!forceRefresh && repoContextCache && repoContextCache.key === cacheKey && repoContextCache.promise) {
      return repoContextCache.promise;
    }

    const fetchPromise = (async () => {
      try {
        const repoUrl = `https://api.github.com/repos/${owner}/${repo}`;
        const res = await ghFetch(token, repoUrl);
        if (!res.ok) {
          return { owner, repo, isFork: null, defaultBranch: 'main' };
        }
        const data = await res.json().catch(() => null);
        return {
          owner,
          repo,
          isFork: !!(data && data.fork),
          defaultBranch: String((data && data.default_branch) || 'main'),
        };
      } catch {
        return { owner, repo, isFork: null, defaultBranch: 'main' };
      }
    })();

    repoContextCache = { key: cacheKey, promise: fetchPromise, value: null };
    const value = await fetchPromise;
    repoContextCache = { key: cacheKey, promise: null, value };
    return value;
  };

  const ghFetch = async (token, url, init) => {
    // public repo 的只读端点允许匿名访问（限流 60 次/小时/IP）；
    // 有 token 时走认证通道（5000 次/小时）。
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      ...(init && init.headers ? init.headers : {}),
    };
    if (token) {
      headers.Authorization = `token ${token}`;
    }
    const res = await fetch(url, {
      ...(init || {}),
      headers,
    });
    return res;
  };

  // 流水线内部阶段：解析 main.py 的 "[INFO] Step X.Y - 标签:" 与
  // 5.select_papers.py 的 "[SUBSTEP] X.Y - 名称 START/END" 日志标记。
  const PIPELINE_STAGE_LABELS = {
    'Step 0': '关键词扩充',
    'Step 1': '抓取 arXiv 新论文',
    'Step 2.1': 'BM25 关键词召回',
    'Step 2.2': '向量语义召回',
    'Step 2.3': 'RRF 候选融合',
    'Step 3': 'Reranker 重排',
    'Step 4': 'LLM 精炼打分',
    'Step 5': '选择论文',
    'Step 6': '生成文档',
  };

  const describePipelineStage = (stage) => {
    if (!stage || !stage.key) return '';
    const zh = PIPELINE_STAGE_LABELS[stage.key] || '';
    return zh ? `${zh}（${stage.raw}）` : stage.raw;
  };

  const parsePipelineStageFromLog = (logText) => {
    if (!logText) return null;
    const lines = String(logText).split(/\r?\n/);
    let stage = null;
    let substep = null;
    for (const line of lines) {
      const stepMatch = line.match(/^\[INFO\] (Step [\d.]+) - (.+?):/);
      if (stepMatch) {
        stage = { key: stepMatch[1], raw: `${stepMatch[1]} ${stepMatch[2].trim()}` };
      }
      const substepMatch = line.match(/^\[SUBSTEP\] ([\d.]+) - (.+?) (START|END)(?:\s|$)/);
      if (substepMatch) {
        substep = substepMatch[3] === 'END'
          ? null
          : { key: `Step ${substepMatch[1]}`, raw: substepMatch[2].trim() };
      }
    }
    return substep || stage;
  };

  // 轮询频率自适应：有 token 15 秒；匿名受 60 次/小时 限流约束用 120 秒。
  const POLL_INTERVAL_MS = () => (loadGithubToken() ? 15000 : 120000);
  const PIPELINE_LOG_MIN_INTERVAL_MS = 60000;
  let lastPipelineLogFetchAt = 0;
  let lastPipelineStage = null;
  let lastPipelineStageForRun = '';

  // ===== 运行计划（cron）可视化配置 =====
  const SCHEDULE_WORKFLOW_PATH = '.github/workflows/daily-paper-reader.yml';
  // 锚点注释保证只替换受控行，workflow 其余部分原样保留。
  const CRON_ANCHOR_RE =
    /(#[^\n]*DPR-SCHEDULE-CRON-ANCHOR[^\n]*\n\s*- cron: )"[^"]*"/;
  const JITTER_ANCHOR_RE = /DELAY=\$\(shuf -i (\d+)-(\d+) -n 1\)/;
  const SCHEDULE_COMMIT_CO_AUTHOR = 'Co-Authored-By: xixi <3495302215@qq.com>';

  const normalizeWeekdays = (weekdays) => {
    const seen = new Set();
    (Array.isArray(weekdays) ? weekdays : []).forEach((d) => {
      const n = Number(d);
      if (Number.isInteger(n) && n >= 0 && n <= 6) seen.add(n);
    });
    return [...seen].sort((a, b) => a - b);
  };

  // 本地时间 HH:MM + 执行日 → UTC cron。星期字段会随跨日偏移一起平移：
  // 例如北京时间（UTC+8）周内某天 02:30 对应 UTC 前一天，cron 星期需要 -1。
  const buildCronFromSchedule = ({ timeLocal, dayMode, weekdays, utcOffsetMinutes }) => {
    const m = /^(\d{1,2}):(\d{2})$/.exec(String(timeLocal || '').trim());
    if (!m) throw new Error('执行时间格式应为 HH:MM。');
    const localHour = Number(m[1]);
    const localMinute = Number(m[2]);
    if (localHour > 23 || localMinute > 59) throw new Error('执行时间不合法。');
    const offset = Number(utcOffsetMinutes) || 0;
    const rawUtcMinutes = localHour * 60 + localMinute - offset;
    const utcMinutes = ((rawUtcMinutes % 1440) + 1440) % 1440;
    const dayDelta = Math.floor(rawUtcMinutes / 1440);
    const utcHour = Math.floor(utcMinutes / 60);
    const utcMin = utcMinutes % 60;
    let dayField = '*';
    if (dayMode === 'workdays') {
      dayField = [1, 2, 3, 4, 5]
        .map((d) => ((d + dayDelta) % 7 + 7) % 7)
        .sort((a, b) => a - b)
        .join(',');
    } else if (dayMode === 'custom') {
      const days = normalizeWeekdays(weekdays);
      if (!days.length) throw new Error('自定义模式至少选择一个执行日。');
      dayField = days
        .map((d) => ((d + dayDelta) % 7 + 7) % 7)
        .sort((a, b) => a - b)
        .join(',');
    }
    return `${utcMin} ${utcHour} * * ${dayField}`;
  };

  // UTC cron → 本地时间与执行日（buildCronFromSchedule 的逆变换）。
  const parseCronToSchedule = (cron, utcOffsetMinutes) => {
    const parts = String(cron || '').trim().split(/\s+/);
    if (parts.length !== 5) return null;
    const [minStr, hourStr, , , dayStr] = parts;
    if (!/^\d{1,2}$/.test(minStr) || !/^\d{1,2}$/.test(hourStr)) return null;
    const offset = Number(utcOffsetMinutes) || 0;
    const rawLocalMinutes = Number(hourStr) * 60 + Number(minStr) + offset;
    const localMinutes = ((rawLocalMinutes % 1440) + 1440) % 1440;
    const dayDelta = Math.floor(rawLocalMinutes / 1440);
    const timeLocal = `${String(Math.floor(localMinutes / 60)).padStart(2, '0')}:${String(
      localMinutes % 60,
    ).padStart(2, '0')}`;
    if (dayStr === '*') {
      return { timeLocal, dayMode: 'daily', weekdays: normalizeWeekdays([0, 1, 2, 3, 4, 5, 6]) };
    }
    let utcDays = null;
    if (/^\d+-\d+$/.test(dayStr)) {
      const [a, b] = dayStr.split('-').map(Number);
      if (a <= b && a >= 0 && b <= 7) {
        utcDays = [];
        for (let d = a; d <= b; d += 1) utcDays.push(d % 7);
      }
    } else if (/^\d+(,\d+)*$/.test(dayStr)) {
      utcDays = dayStr.split(',').map((x) => Number(x) % 7);
    }
    if (!utcDays) {
      return { timeLocal, dayMode: 'custom', weekdays: [], unparsedDayField: dayStr };
    }
    // local = utc + dayDelta（build 的逆变换；dayDelta 为本地相对 UTC 的跨日偏移）
    const localDays = normalizeWeekdays(utcDays.map((d) => ((d + dayDelta) % 7 + 7) % 7));
    const key = localDays.join(',');
    let dayMode = 'custom';
    if (key === '1,2,3,4,5') dayMode = 'workdays';
    else if (key === '0,1,2,3,4,5,6') dayMode = 'daily';
    return { timeLocal, dayMode, weekdays: localDays };
  };

  // 替换锚点行并用 js-yaml 校验整体仍可解析、cron 已生效；失败即抛错，调用方放弃保存。
  const applyScheduleToWorkflowYaml = (yamlText, { cron, jitterMinutes }) => {
    let text = String(yamlText || '');
    if (!CRON_ANCHOR_RE.test(text)) {
      throw new Error(
        '未找到 cron 锚点注释，无法安全修改执行计划（workflow 文件可能被手动改动过，请先同步或恢复锚点）。',
      );
    }
    text = text.replace(CRON_ANCHOR_RE, `$1"${cron}"`);
    if (Number.isFinite(Number(jitterMinutes))) {
      if (!JITTER_ANCHOR_RE.test(text)) {
        throw new Error('未找到随机延迟锚点，无法安全修改。');
      }
      const maxSeconds = Math.max(0, Math.round(Number(jitterMinutes))) * 60;
      text = text.replace(JITTER_ANCHOR_RE, `DELAY=$(shuf -i 0-${maxSeconds} -n 1)`);
    }
    const jsyaml = window.jsyaml;
    if (jsyaml && typeof jsyaml.load === 'function') {
      let parsed = null;
      try {
        parsed = jsyaml.load(text);
      } catch (e) {
        throw new Error(`修改后的 YAML 无法解析，已取消保存：${e.message || e}`);
      }
      const schedule = parsed && parsed.on && parsed.on.schedule;
      if (
        !Array.isArray(schedule) ||
        !schedule[0] ||
        String(schedule[0].cron || '').trim() !== String(cron).trim()
      ) {
        throw new Error('修改后的 YAML 校验失败（cron 未生效），已取消保存。');
      }
    }
    return text;
  };

  const isLocalDebugPage = () => {
    if (window.DPR_LOCAL_API_BASE) return true;
    const host = String((window.location && window.location.hostname) || '').toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0') return true;
    if (/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host)) return true;
    if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(host)) return true;
    if (/^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(host)) return true;
    return false;
  };

  const getLocalApiUrl = (path) => {
    const base = String(window.DPR_LOCAL_API_BASE || '').trim().replace(/\/$/, '');
    if (!base && isLocalDebugPage()) {
      const protocol = String((window.location && window.location.protocol) || 'http:');
      const hostname = String((window.location && window.location.hostname) || '127.0.0.1');
      return `${protocol}//${hostname}:8567${path}`;
    }
    if (!base) return path;
    return `${base}${path}`;
  };

  const localApiFetch = async (path, init) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const res = await fetch(getLocalApiUrl(path), {
        ...(init || {}),
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(init && init.headers ? init.headers : {}),
        },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error((data && data.error) || `本地调试后端请求失败：HTTP ${res.status}`);
      }
      return data;
    } catch (e) {
      if (e && e.name === 'AbortError') {
        throw new Error('本地调试后端请求超时，请确认 8567 端口服务正在运行。');
      }
      throw e;
    } finally {
      clearTimeout(timeout);
    }
  };

  const isWorkflowLogNearBottom = (logEl) => {
    if (!logEl) return true;
    const distance =
      Number(logEl.scrollHeight || 0) -
      Number(logEl.scrollTop || 0) -
      Number(logEl.clientHeight || 0);
    return distance <= 24;
  };

  const scrollWorkflowLogToBottom = (shouldScroll) => {
    if (!runsEl || !shouldScroll) return;
    requestAnimationFrame(() => {
      const logEl = runsEl.querySelector('[data-dpr-workflow-log]');
      if (logEl) {
        logEl.scrollTop = logEl.scrollHeight;
      }
    });
  };

  const renderLocalRun = (run, logText) => {
    if (!runsEl || !run) return;
    const previousLogEl = runsEl.querySelector('[data-dpr-workflow-log]');
    const shouldFollowLog = isWorkflowLogNearBottom(previousLogEl);
    const status = run.status || '';
    const conclusion = run.conclusion || '';
    const badgeColor =
      conclusion === 'success'
        ? '#2e7d32'
        : conclusion === 'failure'
          ? '#c00'
          : status === 'in_progress'
            ? '#1565c0'
            : '#666';
    const command = Array.isArray(run.command) ? run.command.join(' ') : '';
    const localStage =
      status === 'in_progress' || conclusion === 'failure'
        ? parsePipelineStageFromLog(logText || '')
        : null;
    const stageDescription = describePipelineStage(localStage);
    const stageHtml = stageDescription
      ? `<div class="dpr-wf-pipeline-stage" style="display:flex; align-items:center; gap:6px; margin-bottom:8px; padding:6px 10px; border-radius:6px; background:rgba(21,101,192,0.08); color:#1565c0; font-size:12px;">
          <span>📍</span><span>流水线当前阶段：<strong>${escapeHtml(stageDescription)}</strong></span>
        </div>`
      : '';
    const logHtml = logText
      ? `<pre data-dpr-workflow-log="1" style="white-space:pre-wrap; max-height:360px; overflow:auto; background:#111; color:#ddd; padding:10px; border-radius:6px; font-size:12px;">${escapeHtml(logText)}</pre>`
      : '<div style="color:#999;">暂无日志。</div>';
    runsEl.innerHTML = `
      <div style="margin-bottom:8px;">
        <div style="font-weight:600;">本地运行 #${escapeHtml(run.run_number || run.id)}</div>
        <div style="color:#666; margin-top:2px;">
          <span style="display:inline-block; padding:1px 6px; border-radius:999px; background:rgba(0,0,0,0.06); color:${badgeColor};">
            ${escapeHtml(formatRunBadgeText(status, conclusion))}
          </span>
          <span style="margin-left:8px;">${escapeHtml(formatRunTime(run.created_at))}</span>
        </div>
      </div>
      <div style="font-size:12px; color:#666; margin-bottom:8px;">${escapeHtml(command)}</div>
      ${stageHtml}
      ${logHtml}
    `;
    scrollWorkflowLogToBottom(shouldFollowLog);
  };

  const refreshLocalRun = async (runId) => {
    try {
      const data = await localApiFetch(`/api/local/runs/${encodeURIComponent(runId)}/log`);
      const run = data.run || {};
      renderLocalRun(run, data.log || '');
      if (run.status === 'completed') {
        stopPolling();
        setStatus(
          `本地运行已结束：${run.conclusion || 'completed'}`,
          run.conclusion === 'success' ? '#080' : '#c00',
        );
      } else {
        setStatus('本地运行中：每 5 秒自动刷新...', '#1565c0', { waiting: true });
      }
    } catch (e) {
      console.error(e);
      setStatus(`刷新本地运行失败：${e.message || e}`, '#c00');
    }
  };

  const dispatchLocalAndMonitor = async (wf, workflowFile, dispatchInputs) => {
    stopPolling();
    activeRun = null;
    setStatus(`正在触发本地调试任务：${wf.name || workflowFile} ...`, '#666', { waiting: true });
    runsEl.innerHTML = '<div style="color:#999;">正在请求本地后端，请稍候...</div>';
    const localConfigOverride = window.SubscriptionsGithubToken &&
      typeof window.SubscriptionsGithubToken.loadLocalConfigOverride === 'function'
      ? window.SubscriptionsGithubToken.loadLocalConfigOverride()
      : null;
    const localSecret = window.decoded_secret_private && typeof window.decoded_secret_private === 'object'
      ? window.decoded_secret_private
      : null;
    const data = await localApiFetch('/api/local/workflows/dispatch', {
      method: 'POST',
      body: JSON.stringify({
        workflowKey: wf.key || '',
        workflowFile,
        inputs: dispatchInputs || {},
        config: localConfigOverride && localConfigOverride.config ? localConfigOverride.config : null,
        secret: localSecret,
      }),
    });
    const run = data.run || {};
    if (!run.id) throw new Error('本地后端未返回运行记录，无法确认任务已创建。');
    activeRun = { local: true, runId: run.id };
    selectedRun = activeRun;
    setStatus(`本地运行已创建：run_id=${run.id}`, '#080', { waiting: true });
    const firstRefresh = refreshLocalRun(run.id).catch((error) => {
      setStatus(`任务已提交，但读取进度失败：${error.message || error}`, '#c00');
    });
    if (wf.key !== 'reset-content') await firstRefresh;
    refreshTimer = setInterval(() => {
      const r = selectedRun || activeRun;
      if (!r || !r.local) return;
      refreshLocalRun(r.runId);
    }, 5000);
    return true;
  };

  const resolveWorkflowRunInputs = async (owner, repo, token, runId) => {
    if (!owner || !repo || !runId || !token) return null;
    const runUrl = `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}`;
    try {
      const res = await ghFetch(token, runUrl);
      if (!res.ok) return null;
      const data = await res.json().catch(() => null);
      if (!data || typeof data !== 'object') return null;
      if (data.inputs && typeof data.inputs === 'object') {
        return data.inputs;
      }
      return null;
    } catch {
      return null;
    }
  };

  const resolveRecentRunTag = async (owner, repo, token, run) => {
    if (!run) return 'daily-now';
    // 统一归类到 daily-now，触发面板不再单独展示一个月/一个月标准入口
    if (run.inputs && typeof run.inputs === 'object') return 'daily-now';
    await resolveWorkflowRunInputs(owner, repo, token, run.id);
    return 'daily-now';
  };

  const setStatus = (text, color, options = {}) => {
    if (!statusEl) return;
    statusEl.textContent = text || '';
    statusEl.style.color = color || '#666';
    statusEl.classList.toggle('is-waiting', !!(options && options.waiting));
  };

  const ensureOverlay = () => {
    if (overlay && panel) return;
    overlay = document.getElementById('dpr-workflow-overlay');
    if (overlay) {
      panel = document.getElementById('dpr-workflow-panel');
      statusEl = document.getElementById('dpr-workflow-status');
      runsEl = document.getElementById('dpr-workflow-runs');
      recentEl = document.getElementById('dpr-workflow-recent');
      return;
    }

    overlay = document.createElement('div');
    overlay.id = 'dpr-workflow-overlay';
    overlay.innerHTML = `
      <div id="dpr-workflow-panel">
        <div id="dpr-workflow-header">
          <div style="font-weight:600;">工作流触发</div>
          <div style="display:flex; gap:8px; align-items:center;">
            <button id="dpr-workflow-refresh-btn" class="arxiv-tool-btn" style="padding:2px 10px;">刷新</button>
            <button id="dpr-workflow-close-btn" class="arxiv-tool-btn" style="padding:2px 6px;">关闭</button>
          </div>
        </div>
        <div id="dpr-workflow-body">
          <div id="dpr-workflow-status" style="font-size:12px; color:#666; margin-bottom:10px;">准备就绪。</div>
          <div style="font-weight:600; font-size:13px; margin-bottom:6px;">运行计划（每日定时）</div>
          <div id="dpr-workflow-schedule" style="font-size:12px; color:#333; border:1px solid #eee; border-radius:8px; background:#fff; padding:10px; margin-bottom:12px;">
            <div id="dpr-wf-schedule-loading" style="color:#999;">正在读取当前执行计划...</div>
            <div id="dpr-wf-schedule-form" style="display:none;">
              <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-bottom:8px;">
                <label>每天
                  <input id="dpr-wf-schedule-time" type="time" style="padding:2px 4px; font-size:12px;">
                </label>
                <span style="color:#999;">（本地时间）执行</span>
                <button id="dpr-wf-schedule-save" class="arxiv-tool-btn" style="padding:3px 10px;">保存执行计划</button>
              </div>
              <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-bottom:8px;">
                <label>执行日
                  <select id="dpr-wf-schedule-mode" style="font-size:12px; padding:2px 4px;">
                    <option value="daily">每天</option>
                    <option value="workdays">仅工作日（周一至周五）</option>
                    <option value="custom">自定义</option>
                  </select>
                </label>
                <span id="dpr-wf-schedule-days" style="display:none; gap:6px;"></span>
              </div>
              <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-bottom:6px;">
                <label>随机延迟
                  <input id="dpr-wf-schedule-jitter" type="number" min="0" max="55" step="1" style="width:52px; padding:2px 4px; font-size:12px;">
                </label>
                <span style="color:#999;">分钟（GitHub 定时触发本身可能再延迟数分钟）</span>
              </div>
              <div id="dpr-wf-schedule-preview" style="color:#666; margin-bottom:6px;"></div>
              <div id="dpr-wf-schedule-status" style="min-height:16px; color:#666;"></div>
            </div>
          </div>
          <div style="font-weight:600; font-size:13px; margin-bottom:6px;">最近运行（各取 3 条）</div>
          <div id="dpr-workflow-recent" style="font-size:12px; color:#333; border:1px solid #eee; border-radius:8px; background:#fff; padding:10px; margin-bottom:12px;">
            <div style="color:#999;">加载中...</div>
          </div>
          <div style="font-weight:600; font-size:13px; margin-bottom:6px;">执行过程</div>
          <div id="dpr-workflow-runs" style="font-size:12px; color:#333; border:1px solid #eee; border-radius:8px; background:#fff; padding:10px; min-height:120px;">
            <div style="color:#999;">尚未触发工作流。</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    panel = document.getElementById('dpr-workflow-panel');
    statusEl = document.getElementById('dpr-workflow-status');
    runsEl = document.getElementById('dpr-workflow-runs');
    recentEl = document.getElementById('dpr-workflow-recent');

    const closeBtn = document.getElementById('dpr-workflow-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', close);
    }
    overlay.addEventListener('mousedown', (e) => {
      if (e.target === overlay) close();
    });

    const refreshBtn = document.getElementById('dpr-workflow-refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        const r = selectedRun || activeRun;
        if (r && r.local && r.runId) {
          refreshLocalRun(r.runId);
        } else if (r && r.owner && r.repo && r.runId) {
          refreshRun(r.owner, r.repo, r.runId);
        } else {
          setStatus('暂无可刷新的运行记录。', '#666');
        }
      });
    }

  };

  const open = () => {
    ensureOverlay();
    if (!overlay) return;
    overlay.style.display = 'flex';
    requestAnimationFrame(() => overlay.classList.add('show'));
    // 打开面板时尝试加载最近运行（不依赖触发）
    loadRecentRuns();
    initScheduleCard();
    return true;
  };

  // ===== 运行计划卡片：读取/保存 workflow cron =====
  let scheduleFileCache = null; // { sha, content, owner, repo }

  const utf8ToBase64 = (str) => {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    bytes.forEach((b) => {
      binary += String.fromCharCode(b);
    });
    return btoa(binary);
  };

  const base64ToUtf8 = (b64) => {
    const binary = atob(String(b64 || '').replace(/\s+/g, ''));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder('utf-8').decode(bytes);
  };

  const currentUtcOffsetMinutes = () => -new Date().getTimezoneOffset();

  const fetchWorkflowFileContent = async (token, owner, repo) => {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${SCHEDULE_WORKFLOW_PATH}`;
    const res = await ghFetch(token, url);
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      throw new Error(`读取 ${SCHEDULE_WORKFLOW_PATH} 失败：HTTP ${res.status} - ${txt.slice(0, 160)}`);
    }
    const data = await res.json();
    return {
      sha: data.sha,
      content: base64ToUtf8(data.content),
      encoding: data.encoding,
    };
  };

  const putWorkflowFileContent = async (token, owner, repo, sha, content, message) => {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${SCHEDULE_WORKFLOW_PATH}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `token ${token}` } : {}),
      },
      body: JSON.stringify({
        message,
        content: utf8ToBase64(content),
        sha,
      }),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      throw new Error(`保存 ${SCHEDULE_WORKFLOW_PATH} 失败：HTTP ${res.status} - ${txt.slice(0, 200)}`);
    }
    const data = await res.json().catch(() => ({}));
    return data;
  };

  const describeScheduleLocal = (schedule, jitterMinutes) => {
    const weekdayLabels = ['日', '一', '二', '三', '四', '五', '六'];
    let dayText = '每天';
    if (schedule.dayMode === 'workdays') dayText = '工作日（周一至周五）';
    else if (schedule.dayMode === 'custom') {
      dayText = `自定义（周${(schedule.weekdays || []).map((d) => weekdayLabels[d]).join('、周')}）`;
    }
    const jitter = Number.isFinite(Number(jitterMinutes)) ? Number(jitterMinutes) : null;
    return `每天 ${schedule.timeLocal}（本地时间）· ${dayText}` + (jitter !== null ? ` · 随机延迟 0-${jitter} 分钟` : '');
  };

  const updateSchedulePreview = () => {
    const previewEl = document.getElementById('dpr-wf-schedule-preview');
    if (!previewEl) return;
    try {
      const cron = buildCronFromSchedule({
        timeLocal: document.getElementById('dpr-wf-schedule-time').value,
        dayMode: document.getElementById('dpr-wf-schedule-mode').value,
        weekdays: Array.from(
          document.querySelectorAll('#dpr-wf-schedule-days input[type="checkbox"]:checked'),
        ).map((el) => Number(el.value)),
        utcOffsetMinutes: currentUtcOffsetMinutes(),
      });
      previewEl.textContent = `将写入 cron：${cron}（UTC）`;
      previewEl.style.color = '#666';
    } catch (e) {
      previewEl.textContent = e.message || String(e);
      previewEl.style.color = '#c00';
    }
  };

  const initScheduleCard = async () => {
    if (isLocalDebugPage()) {
      const loading = document.getElementById('dpr-wf-schedule-loading');
      if (loading) loading.textContent = '本地调试模式不使用 GitHub 定时调度。';
      return;
    }
    const loading = document.getElementById('dpr-wf-schedule-loading');
    try {
      const token = loadGithubToken();
      const { owner, repo } = await resolveRepoFromUrl(token);
      if (!owner || !repo) {
        if (loading) loading.textContent = '无法推断目标仓库，无法读取执行计划。';
        return;
      }
      const file = await fetchWorkflowFileContent(token, owner, repo);
      scheduleFileCache = { sha: file.sha, content: file.content, owner, repo };
      const cronMatch = file.content.match(/^\s*- cron:\s*"([^"]+)"/m);
      const jitterMatch = file.content.match(JITTER_ANCHOR_RE);
      if (!cronMatch) {
        if (loading) loading.textContent = '未在 workflow 中找到 schedule cron，无法可视化配置。';
        return;
      }
      const schedule = parseCronToSchedule(cronMatch[1], currentUtcOffsetMinutes());
      const jitterMinutes = jitterMatch
        ? Math.round(Number(jitterMatch[2]) / 60)
        : null;
      if (loading) loading.style.display = 'none';
      const form = document.getElementById('dpr-wf-schedule-form');
      if (form) form.style.display = 'block';
      const timeInput = document.getElementById('dpr-wf-schedule-time');
      const modeSelect = document.getElementById('dpr-wf-schedule-mode');
      const daysWrap = document.getElementById('dpr-wf-schedule-days');
      const jitterInput = document.getElementById('dpr-wf-schedule-jitter');
      if (!timeInput || !modeSelect || !daysWrap || !jitterInput) return;
      if (schedule) {
        timeInput.value = schedule.timeLocal;
        modeSelect.value = schedule.dayMode || 'daily';
        if (schedule.weekdays && schedule.weekdays.length) {
          schedule.weekdays.forEach((d) => {
            const cb = daysWrap.querySelector(`input[value="${d}"]`);
            if (cb) cb.checked = true;
          });
        }
      }
      if (jitterMinutes !== null && Number.isFinite(jitterMinutes)) {
        jitterInput.value = String(Math.min(55, Math.max(0, jitterMinutes)));
      } else {
        jitterInput.value = '5';
      }
      if (!daysWrap.childElementCount) {
        const labels = ['一', '二', '三', '四', '五', '六', '日'];
        daysWrap.innerHTML = labels
          .map((label, idx) => {
            const value = idx === 6 ? 0 : idx + 1;
            return `<label style="display:inline-flex; align-items:center; gap:2px;"><input type="checkbox" value="${value}">${label}</label>`;
          })
          .join('');
      }
      const syncDaysVisibility = () => {
        daysWrap.style.display = modeSelect.value === 'custom' ? 'inline-flex' : 'none';
      };
      if (!modeSelect.dataset.bound) {
        modeSelect.dataset.bound = '1';
        modeSelect.addEventListener('change', () => {
          syncDaysVisibility();
          updateSchedulePreview();
        });
        daysWrap.addEventListener('change', updateSchedulePreview);
        timeInput.addEventListener('input', updateSchedulePreview);
        jitterInput.addEventListener('input', updateSchedulePreview);
        const saveBtn = document.getElementById('dpr-wf-schedule-save');
        if (saveBtn) saveBtn.addEventListener('click', saveScheduleCard);
      }
      syncDaysVisibility();
      updateSchedulePreview();
      const statusEl = document.getElementById('dpr-wf-schedule-status');
      if (statusEl) {
        statusEl.textContent = schedule
          ? `当前计划：${describeScheduleLocal(schedule, jitterMinutes)}`
          : `当前 cron：${cronMatch[1]}（UTC），无法解析为本地时间预览`;
        statusEl.style.color = '#666';
      }
    } catch (e) {
      console.error(e);
      if (loading) loading.textContent = `读取执行计划失败：${e.message || e}`;
    }
  };

  const saveScheduleCard = async () => {
    const statusEl = document.getElementById('dpr-wf-schedule-status');
    const setStatus = (text, color) => {
      if (statusEl) {
        statusEl.textContent = text;
        statusEl.style.color = color || '#666';
      }
    };
    const token = loadGithubToken();
    if (!token) {
      setStatus('保存需要 GitHub Token（repo + workflow 权限），请先完成密钥解锁。', '#c00');
      return;
    }
    if (!scheduleFileCache || !scheduleFileCache.sha) {
      setStatus('尚未读取到当前 workflow 文件，请关闭面板后重试。', '#c00');
      return;
    }
    const saveBtn = document.getElementById('dpr-wf-schedule-save');
    try {
      if (saveBtn) saveBtn.disabled = true;
      setStatus('正在生成并校验新的 cron...', '#666');
      const cron = buildCronFromSchedule({
        timeLocal: document.getElementById('dpr-wf-schedule-time').value,
        dayMode: document.getElementById('dpr-wf-schedule-mode').value,
        weekdays: Array.from(
          document.querySelectorAll('#dpr-wf-schedule-days input[type="checkbox"]:checked'),
        ).map((el) => Number(el.value)),
        utcOffsetMinutes: currentUtcOffsetMinutes(),
      });
      const jitterMinutes = Number(document.getElementById('dpr-wf-schedule-jitter').value);
      const nextContent = applyScheduleToWorkflowYaml(scheduleFileCache.content, {
        cron,
        jitterMinutes,
      });
      setStatus('正在保存到仓库...', '#666');
      const message = `chore: 更新每日流水线执行计划 (cron: ${cron})\n\n${SCHEDULE_COMMIT_CO_AUTHOR}`;
      const result = await putWorkflowFileContent(
        token, scheduleFileCache.owner, scheduleFileCache.repo, scheduleFileCache.sha, nextContent, message,
      );
      // 读回验证：确认提交内容里包含新 cron
      const verify = await fetchWorkflowFileContent(
        token, scheduleFileCache.owner, scheduleFileCache.repo,
      );
      const verifyCron = String(verify.content || '').match(/^\s*- cron:\s*"([^"]+)"/m);
      if (!verifyCron || verifyCron[1] !== cron) {
        throw new Error('保存后读回校验失败：新 cron 未出现在仓库文件中，请前往 Actions 页面确认。');
      }
      scheduleFileCache = { sha: (result && result.content && result.content.sha) || verify.sha, content: verify.content, owner: scheduleFileCache.owner, repo: scheduleFileCache.repo };
      const schedule = parseCronToSchedule(cron, currentUtcOffsetMinutes());
      setStatus(
        schedule
          ? `✅ 已保存：${describeScheduleLocal(schedule, jitterMinutes)}。GitHub 定时触发可能有数分钟延迟。`
          : `✅ 已保存 cron：${cron}（UTC）。GitHub 定时触发可能有数分钟延迟。`,
        '#28a745',
      );
      updateSchedulePreview();
    } catch (e) {
      console.error(e);
      setStatus(`❌ ${e.message || e}`, '#c00');
    } finally {
      if (saveBtn) saveBtn.disabled = false;
    }
  };

  const close = () => {
    if (!overlay) return;
    overlay.classList.remove('show');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 160);
    stopPolling();
  };

  const stopPolling = () => {
    if (refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = null;
    }
  };

  const badgeColorFor = (status, conclusion) => {
    if (conclusion === 'success') return '#2e7d32';
    if (conclusion === 'failure') return '#c00';
    if (conclusion === 'cancelled') return '#666';
    if (status === 'in_progress') return '#1565c0';
    return '#666';
  };

  const formatRunBadgeText = (status, conclusion) => {
    const s = String(status || '');
    const c = String(conclusion || '');
    // 用户希望 completed / success 这种冗余展示去掉：优先展示 conclusion，其次 status
    return c || s || '';
  };

  const formatRunTime = (isoTime) => {
    if (!isoTime) return '';
    try {
      const d = new Date(isoTime);
      if (Number.isNaN(d.getTime())) {
        return String(isoTime).replace('T', ' ').replace('Z', '');
      }
      return d.toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch {
      return String(isoTime || '');
    }
  };

  const renderRecentRuns = (owner, repo, byWorkflow, errText, repoContext = null) => {
    if (!recentEl) return;
    recentEl.classList.remove('is-loading');
    if (errText) {
      recentEl.innerHTML = `<div style="color:#c00;">${escapeHtml(errText)}</div>`;
      return;
    }
    const blocks = WORKFLOWS.map((wf) => {
      if (wf.key === 'sync' && repoContext && repoContext.isFork === false) {
        return `
          <div class="dpr-wf-recent-block">
            <div class="dpr-wf-recent-block-title">${escapeHtml(wf.name)}</div>
            <div style="color:#c90;">当前仓库不是 GitHub Fork，已禁用上游同步。</div>
          </div>
        `;
      }
      const list = (byWorkflow && byWorkflow[String(wf.key || wf.id || '')]) || [];
      const items = Array.isArray(list) ? list : [];
      const lines = items
        .map((r) => {
          const status = r.status || '';
          const conclusion = r.conclusion || '';
          const color = badgeColorFor(status, conclusion);
          const isActive =
            selectedRun &&
            String(selectedRun.runId || '') === String(r.id || '');
          const createdAt = formatRunTime(r.created_at);
          const badge = formatRunBadgeText(status, conclusion);
          const title = `#${r.run_number || r.id}${badge ? ` ${badge}` : ''}`;
          return `
            <button class="dpr-wf-recent-item ${isActive ? 'is-active' : ''}" data-run-id="${escapeHtml(
              String(r.id || ''),
            )}" style="text-align:left;">
              <div class="dpr-wf-recent-title">
                <span class="dpr-wf-recent-badge" style="color:${color};">${escapeHtml(
                  title,
                )}</span>
                <span class="dpr-wf-recent-time">${escapeHtml(createdAt)}</span>
              </div>
              <div class="dpr-wf-recent-sub">${escapeHtml(wf.name)}</div>
            </button>
          `;
        })
        .join('');
      return `
        <div class="dpr-wf-recent-block">
          <div class="dpr-wf-recent-block-title">${escapeHtml(wf.name)}</div>
          ${lines || '<div style="color:#999;">暂无运行记录</div>'}
        </div>
      `;
    }).join('');

    recentEl.innerHTML = blocks;

    recentEl.querySelectorAll('.dpr-wf-recent-item').forEach((btn) => {
      if (btn._bound) return;
      btn._bound = true;
      btn.addEventListener('click', async () => {
        const runId = btn.getAttribute('data-run-id') || '';
        if (!runId) return;
        stopPolling();
        recentEl
          .querySelectorAll('.dpr-wf-recent-item.is-active')
          .forEach((n) => n.classList.remove('is-active'));
        btn.classList.add('is-active');
        selectedRun = { owner, repo, runId, token: loadGithubToken() };
        setStatus(`正在加载运行详情：run_id=${runId}`, '#666', { waiting: true });
        await refreshRun(owner, repo, runId);
        refreshTimer = setInterval(() => {
          if (!selectedRun) return;
          refreshRun(selectedRun.owner, selectedRun.repo, selectedRun.runId);
        }, POLL_INTERVAL_MS());
      });
    });
  };

  const loadRecentRuns = async () => {
    ensureOverlay();
    if (!recentEl) return;
    const token = loadGithubToken();
    if (!token && !/\.github\.io\//.test(window.location.href || '')) {
      recentEl.classList.remove('is-loading');
      recentEl.innerHTML =
        '<div style="color:#c00;">未检测到 GitHub Token，且当前不在 GitHub Pages 域名下，无法推断目标仓库。请先完成密钥配置。</div>';
      return;
    }

    try {
      const repoContext = await resolveRepoContext(token);
      const { owner, repo } = repoContext;
      if (!owner || !repo) {
        renderRecentRuns(owner, repo, null, '无法推断目标仓库，无法加载最近运行记录。');
        return;
      }

      const hasRendered = !!recentEl.querySelector('.dpr-wf-recent-block');
      if (!hasRendered) {
        recentEl.innerHTML = '<div style="color:#999;">正在加载最近运行记录...</div>';
      } else {
        // 刷新时不要清空现有内容，避免“闪一下再出现”的观感
        recentEl.classList.add('is-loading');
      }
      const byWorkflow = {};
      const runsByWorkflowId = {};
      const uniqueWorkflowIds = Array.from(
        new Set(WORKFLOWS.map((wf) => String(wf.id || ''))),
      );

      for (const wfId of uniqueWorkflowIds) {
        const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${encodeURIComponent(
          wfId,
        )}/runs?per_page=12`;
        const res = await ghFetch(token, url);
        if (!res.ok) {
          const txt = await res.text().catch(() => '');
          throw new Error(
            `读取最近运行失败(${wfId})：HTTP ${res.status} ${res.statusText} - ${txt}`,
          );
        }
        const data = await res.json();
        runsByWorkflowId[wfId] = Array.isArray(data.workflow_runs)
          ? data.workflow_runs
          : [];
      }

      const dailyFileRuns = runsByWorkflowId['daily-paper-reader.yml'] || [];
      const dailyNowRuns = [];
      if (dailyFileRuns.length > 0) {
        const tagged = await Promise.all(
          dailyFileRuns.map((run) =>
            resolveRecentRunTag(owner, repo, token, run).then((runTag) => ({ run, runTag })),
          ),
        );
        tagged.forEach(({ run }) => {
          dailyNowRuns.push(run);
        });
      }

      WORKFLOWS.forEach((wf) => {
        const wfId = String(wf.id || '');
        if (wf.id === 'daily-paper-reader.yml' && wf.key === 'daily-now') {
          byWorkflow[String(wf.key)] = dailyNowRuns.slice(0, 3);
          return;
        }
        byWorkflow[String(wf.key || wfId)] = (runsByWorkflowId[wfId] || []).slice(0, 3);
      });

      renderRecentRuns(owner, repo, byWorkflow, '', repoContext);
    } catch (e) {
      console.error(e);
      if (recentEl) recentEl.classList.remove('is-loading');
      renderRecentRuns('', '', null, e.message || String(e), null);
    }
  };

  const getWorkflowByKey = (workflowKey) =>
    WORKFLOWS.find((wf) => String(wf.key || '') === String(workflowKey || ''));

  const combineInputs = (baseInputs, extraInputs) => {
    const merged = {};
    const mergeOne = (source) => {
      if (!source || typeof source !== 'object') return;
      Object.keys(source).forEach((k) => {
        const v = source[k];
        if (typeof v === 'undefined' || v === null) return;
        const txt = String(v).trim();
        if (!txt) return;
        merged[String(k)] = txt;
      });
    };
    mergeOne(baseInputs);
    mergeOne(extraInputs);
    return merged;
  };

  const dispatchAndMonitor = async (workflow, extraInputs) => {
    const wf = workflow || {};
    const workflowFile = String(wf.id || '');
    if (!workflowFile) {
      setStatus('工作流配置缺失，无法触发。', '#c00');
      return false;
    }
    const dynamicInputs = { ...(wf.dispatchInputs || {}) };
    const rerankerProfile = loadRerankerProfile();
    if (
      rerankerProfile &&
      (workflowFile === 'daily-paper-reader.yml' ||
        workflowFile === 'conference-paper-retrieval.yml')
    ) {
      dynamicInputs.reranker_profile = rerankerProfile;
    }
    const dispatchInputs = combineInputs(dynamicInputs, extraInputs);
    if (isLocalDebugPage()) {
      try {
        return await dispatchLocalAndMonitor(wf, workflowFile, dispatchInputs);
      } catch (e) {
        console.error(e);
        const msg = e.message || String(e);
        setStatus(`本地触发失败：${msg}`, '#c00');
        runsEl.innerHTML = `<div style="color:#c00;">${escapeHtml(msg)}<br/>请确认本地后端已启动：<code>scripts/local_debug.sh</code> 或 <code>python src/local_debug_server.py --port 8567</code></div>`;
        return false;
      }
    }
    const token = loadGithubToken();
    if (!token) {
      setStatus('未检测到 GitHub Token：请在“密钥配置”或“GitHub Token”处完成配置。', '#c00');
      return false;
    }
    const repoContext = await resolveRepoContext(token);
    const { owner, repo } = repoContext;
    if (!owner || !repo) {
      setStatus('无法推断目标仓库：请确认 GitHub Token 有效，或使用 xxx.github.io/仓库名/ 访问。', '#c00');
      return false;
    }
    if (wf.key === 'sync' && repoContext.isFork === false) {
      setStatus('当前仓库不是 GitHub Fork，无法使用上游同步。', '#c00');
      runsEl.innerHTML =
        '<div style="color:#c00;">当前仓库不是 Fork 仓库，Upstream Sync 不会运行。</div>' +
        `<div style="margin-top:8px;"><a class="arxiv-tool-btn" style="padding:6px 10px; text-decoration:none;" target="_blank" href="https://github.com/${owner}/${repo}/fork">前往 Fork 当前仓库</a></div>`;
      return false;
    }

    setStatus(`正在检查工作流状态：${wf.name || workflowFile} ...`, '#666', { waiting: true });
    runsEl.innerHTML = '<div style="color:#999;">正在检查是否有运行中的工作流...</div>';
    stopPolling();
    activeRun = null;

    try {
      // 检查是否有正在运行中的同名工作流（防止误触重复触发）
      const activeStatuses = new Set(['queued', 'in_progress', 'waiting']);
      const statusZhMap = { queued: '排队中', in_progress: '运行中', waiting: '等待中' };
      const checkUrl = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${encodeURIComponent(
        workflowFile,
      )}/runs?per_page=5`;
      const checkRes = await ghFetch(token, checkUrl);
      if (checkRes.ok) {
        const checkData = await checkRes.json();
        const runs = Array.isArray(checkData.workflow_runs) ? checkData.workflow_runs : [];
        const activeRuns = runs.filter((r) => activeStatuses.has(r.status));
        if (activeRuns.length > 0) {
          const r = activeRuns[0];
          const runUrl = `https://github.com/${owner}/${repo}/actions/runs/${r.id}`;
          const statusText = statusZhMap[r.status] || r.status;
          setStatus(
            `已有正在运行的工作流（#${r.run_number || r.id}，状态：${statusText}），请等待完成后再触发。`,
            '#c00',
          );
          runsEl.innerHTML =
            `<div style="color:#c00;">同一时间只允许运行一个该工作流实例，请等待当前运行结束。</div>` +
            `<div style="margin-top:8px;"><a class="arxiv-tool-btn" style="padding:6px 10px; text-decoration:none;" target="_blank" href="${runUrl}">查看当前运行</a></div>`;
          return false;
        }
      }

      setStatus(`正在触发工作流：${wf.name || workflowFile} ...`, '#666', { waiting: true });
      runsEl.innerHTML = '<div style="color:#999;">正在触发，请稍候...</div>';

      const createdAt = new Date();

      // 触发 dispatch
      const dispatchUrl = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${encodeURIComponent(
        workflowFile,
      )}/dispatches`;
      const dispatchBody = {
        ref: String(repoContext.defaultBranch || 'main'),
      };
      if (Object.keys(dispatchInputs).length > 0) {
        dispatchBody.inputs = dispatchInputs;
      }

      const res = await ghFetch(token, dispatchUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dispatchBody),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        if (res.status === 422 && txt.includes('disabled workflow')) {
          const err = new Error('触发失败：该 Workflow 当前处于禁用状态，请先前往 Actions 页面启用该工作流。');
          err.workflowEnableUrl = `https://github.com/${owner}/${repo}/actions/workflows/${encodeURIComponent(workflowFile)}`;
          throw err;
        }
        throw new Error(`触发失败：HTTP ${res.status} ${res.statusText} - ${txt}`);
      }

      setStatus('已触发，正在等待运行记录创建...', '#666', { waiting: true });

      // 派发确认与进度轮询分离，关闭页面不会把已提交的任务误报为提交失败。
      const monitor = async () => {
        // 轮询找到本次 dispatch 对应的 run
        const lookup = async () => {
          const runsUrl = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${encodeURIComponent(
            workflowFile,
          )}/runs?event=workflow_dispatch&per_page=10`;
          const runsRes = await ghFetch(token, runsUrl);
          if (!runsRes.ok) {
            const txt = await runsRes.text().catch(() => '');
            throw new Error(`读取 workflow runs 失败：HTTP ${runsRes.status} ${runsRes.statusText} - ${txt}`);
          }
          const data = await runsRes.json();
          const list = Array.isArray(data.workflow_runs) ? data.workflow_runs : [];
          const found = list.find((r) => {
            try {
              const t = new Date(r.created_at);
              return t.getTime() >= createdAt.getTime() - 5000;
            } catch {
              return false;
            }
          });
          return found || null;
        };

        let run = null;
        for (let i = 0; i < 18; i += 1) {
          // 最多等 ~90 秒
          // eslint-disable-next-line no-await-in-loop
          run = await lookup();
          if (run) break;
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => setTimeout(r, 5000));
        }

        if (!run || !run.id) {
          setStatus('已触发，但未能在短时间内找到对应的运行记录。建议打开 Actions 页面查看。', '#c00');
          runsEl.innerHTML = `<div style="color:#666;">请在 GitHub Actions 查看：<a target="_blank" href="https://github.com/${owner}/${repo}/actions">打开 Actions</a></div>`;
          return;
        }

        activeRun = { owner, repo, runId: run.id, token };
        selectedRun = activeRun;
        setStatus(`运行已创建：run_id=${run.id}，开始拉取进度...`, '#080', { waiting: true });
        await refreshRun(owner, repo, run.id);

        refreshTimer = setInterval(() => {
          const r = selectedRun || activeRun;
          if (!r) return;
          refreshRun(r.owner, r.repo, r.runId);
        }, POLL_INTERVAL_MS());

        // 触发后刷新最近运行列表
        loadRecentRuns();
      };
      const monitoring = monitor().catch((error) => {
        setStatus(`任务已提交，但读取进度失败：${error.message || error}`, '#c00');
        runsEl.innerHTML = `<div style="color:#666;">任务无需重复提交，请在 <a target="_blank" href="https://github.com/${owner}/${repo}/actions">GitHub Actions</a> 查看进度。</div>`;
      });
      // 其它入口保留原有等待运行记录的时序；重置按钮只等待派发确认。
      if (wf.key !== 'reset-content') await monitoring;
      return true;
    } catch (e) {
      console.error(e);
      const msg = e.message || String(e);
      setStatus(`触发失败：${msg}`, '#c00');
      if (e.workflowEnableUrl) {
        runsEl.innerHTML =
          `<div style="color:#c00;">${escapeHtml(msg)}<br/>` +
          `👉 <a href="${e.workflowEnableUrl}" target="_blank" style="color:#1a73e8;">前往 Actions 页面启用工作流</a></div>`;
      } else {
        runsEl.innerHTML = `<div style="color:#c00;">${escapeHtml(msg)}</div>`;
      }
      return false;
    }
  };

  const fetchPipelineStage = async (owner, repo, token, jobs, runStatus, runConclusion, runId) => {
    if (!token) return lastPipelineStageForRun === String(runId) ? lastPipelineStage : null;
    const runKey = String(runId || '');
    if (runStatus === 'completed' && runConclusion !== 'failure') return null;
    const now = Date.now();
    const shouldFetch =
      (runStatus === 'in_progress' && now - lastPipelineLogFetchAt >= PIPELINE_LOG_MIN_INTERVAL_MS) ||
      (runStatus === 'completed' && runConclusion === 'failure' && lastPipelineStageForRun !== runKey);
    if (!shouldFetch) {
      return lastPipelineStageForRun === runKey ? lastPipelineStage : null;
    }
    lastPipelineLogFetchAt = now;
    lastPipelineStageForRun = runKey;
    const activeJob = (Array.isArray(jobs) ? jobs : []).find(
      (j) => j && (j.status === 'in_progress' || (runStatus === 'completed' && j.conclusion === 'failure')),
    ) || (Array.isArray(jobs) ? jobs : [])[0];
    if (!activeJob || !activeJob.id) return null;
    try {
      const logsRes = await ghFetch(
        token,
        `https://api.github.com/repos/${owner}/${repo}/actions/jobs/${activeJob.id}/logs`,
      );
      if (!logsRes.ok) return null;
      const logText = await logsRes.text();
      lastPipelineStage = parsePipelineStageFromLog(logText);
      return lastPipelineStage;
    } catch {
      return null;
    }
  };

  const renderRun = (owner, repo, run, jobs, pipelineStage) => {
    const runUrl = `https://github.com/${owner}/${repo}/actions/runs/${run.id}`;
    const status = run.status || '';
    const conclusion = run.conclusion || '';

    const badgeColor =
      conclusion === 'success'
        ? '#2e7d32'
        : conclusion === 'failure'
          ? '#c00'
          : status === 'in_progress'
            ? '#1565c0'
            : '#666';
    const badgeText = formatRunBadgeText(status, conclusion);
    const stageDescription = describePipelineStage(pipelineStage);
    const stageHtml = stageDescription
      ? `<div class="dpr-wf-pipeline-stage" style="display:flex; align-items:center; gap:6px; margin-bottom:8px; padding:6px 10px; border-radius:6px; background:rgba(21,101,192,0.08); color:#1565c0; font-size:12px;">
          <span>📍</span><span>流水线当前阶段：<strong>${escapeHtml(stageDescription)}</strong></span>
        </div>`
      : '';

    const jobList = Array.isArray(jobs) ? jobs : [];
    const jobHtml = jobList
      .map((j) => {
        const steps = Array.isArray(j.steps) ? j.steps : [];
        const stepLines = steps
          .map((s) => {
            const c = s.conclusion || s.status || '';
            const icon =
              c === 'success'
                ? '✅'
                : c === 'failure'
                  ? '❌'
                  : c === 'skipped'
                    ? '⏭'
                    : c === 'in_progress'
                      ? '⏳'
                      : '•';
            return `<div class="dpr-wf-step">${icon} ${escapeHtml(
              s.name || '',
            )}</div>`;
          })
          .join('');
        const jobId = j.id ? String(j.id) : '';
        return `
          <div class="dpr-wf-job">
            <div class="dpr-wf-job-title">${escapeHtml(j.name || '')}</div>
            <div class="dpr-wf-job-meta">
              <span class="dpr-wf-job-meta-text">${escapeHtml(j.status || '')}${j.conclusion ? ` / ${escapeHtml(j.conclusion)}` : ''}</span>
            </div>
            <div class="dpr-wf-steps">${stepLines || '<div style="color:#999;">暂无步骤信息</div>'}</div>
          </div>
        `;
      })
      .join('');

    runsEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; gap:10px; align-items:center; margin-bottom:8px;">
        <div style="min-width:0;">
          <div style="font-weight:600;">Run #${run.run_number || run.id}</div>
          <div style="color:#666; margin-top:2px;">
            <span style="display:inline-block; padding:1px 6px; border-radius:999px; background:rgba(0,0,0,0.06); color:${badgeColor};">
              ${escapeHtml(badgeText)}
            </span>
            <span style="margin-left:8px;">${escapeHtml(
              formatRunTime(run.created_at),
            )}</span>
          </div>
        </div>
        <div style="flex-shrink:0; display:flex; gap:8px;">
          <a class="arxiv-tool-btn" style="padding:6px 10px; text-decoration:none;" target="_blank" href="${runUrl}">打开 Actions</a>
        </div>
      </div>
      ${stageHtml}
      ${jobHtml || '<div style="color:#999;">暂无 Job 信息</div>'}
    `;
  };

  const refreshRun = async (owner, repo, runId) => {
    const token = activeRun && activeRun.token ? activeRun.token : loadGithubToken();

    try {
      const runUrl = `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}`;
      const res = await ghFetch(token, runUrl);
      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`读取 run 失败：HTTP ${res.status} ${res.statusText} - ${txt}`);
      }
      const run = await res.json();
      const stateKey = `${run.status || ''}/${run.conclusion || ''}`;
      const prevStateKey = lastRunStateById[String(runId)];
      lastRunStateById[String(runId)] = stateKey;

      const jobsUrl = `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}/jobs?per_page=100`;
      const jobsRes = await ghFetch(token, jobsUrl);
      let jobs = [];
      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        jobs = Array.isArray(jobsData.jobs) ? jobsData.jobs : [];
      }

      const pipelineStage = await fetchPipelineStage(
        owner, repo, token, jobs, run.status, run.conclusion, runId,
      );

      renderRun(owner, repo, run, jobs, pipelineStage);

      if (run.status === 'completed') {
        stopPolling();
        setStatus(
          `运行已结束：${run.conclusion || 'completed'}`,
          run.conclusion === 'success' ? '#080' : '#c00',
        );
        // run 状态结束后，刷新“最近运行”列表，确保 completed/success 等状态能及时反映
        if (prevStateKey !== stateKey) {
          loadRecentRuns();
        }
      } else {
        const intervalSec = Math.round(POLL_INTERVAL_MS() / 1000);
        setStatus(`运行中：每 ${intervalSec} 秒自动刷新...`, '#1565c0', { waiting: true });
      }
    } catch (e) {
      console.error(e);
      setStatus(`刷新失败：${e.message || e}`, '#c00');
    }
  };

  const runWorkflowByKey = async (workflowKey, extraInputs) => {
    const wf = getWorkflowByKey(workflowKey);
    if (!wf) {
      setStatus('未找到对应的工作流配置。', '#c00');
      return false;
    }
    open();
    if ((workflowKey === 'starter-pack' || workflowKey === 'topic-research') && isLocalDebugPage()) {
      setStatus('入门包仅通过 GitHub Actions 执行，请在你的 GitHub Pages 站点操作；不会在本地执行。', '#c00');
      return false;
    }
    return dispatchAndMonitor(wf, extraInputs);
  };

  const STARTER_PACK_CONFERENCES = ['neurips', 'icml', 'iclr', 'aaai', 'cvpr', 'eccv', 'ijcai', 'acl', 'emnlp', 'osdi', 'sosp', 'ndss', 'ieee_sp'];
  const sanitizeResearchProfile = (value = {}) => {
    const text = value => {
      const result = String(value == null ? '' : value).trim();
      if (result.length > 6000) throw new Error('单个查询字段超过6000字符，请缩短后再试；不会截断查询。');
      return result;
    };
    const entries = (items, fields, limit) => {
      if (items !== undefined && !Array.isArray(items)) throw new Error('检索条件必须为列表。');
      if ((items || []).length > limit) throw new Error(`${fields[0] === 'keyword' ? '关键词' : '语义查询'}最多${limit}项，请减少条件；不会静默截断。`);
      return (items || []).map(item => {
        const retrievalText = value => {
          const result = text(value);
          if (result.length > 1200) throw new Error('检索词或语义查询超过1200字符，请缩短后再试；不会截断查询。');
          return result;
        };
        if (typeof item === 'string') return { [fields[0]]: retrievalText(item), enabled: true };
        const result = { enabled: item && item.enabled !== false };
        fields.forEach(field => { if (item && item[field]) result[field] = field === 'keyword' || field === 'query' ? retrievalText(item[field]) : text(item[field]); });
        return result;
      });
    };
    const groups = value.constraint_groups === undefined ? [] : value.constraint_groups;
    if (!Array.isArray(groups) || groups.length > 3) throw new Error('限定条件最多3组。');
    const constraintGroups = groups.map(group => {
      if (!Array.isArray(group) || !group.length || group.length > 8 || group.some(term => typeof term !== 'string' || term.length > 300 || !/[A-Za-z]/.test(term) || /[\u3400-\u9fff]/.test(term))) throw new Error('每组限定条件需1–8个英文检索词，每个不超过300字符。');
      return [...new Set(group.map(term => term.trim()))];
    });
    if (constraintGroups.reduce((product, group) => product * group.length, 1) > 32) throw new Error('限定条件组合超过32种，请减少查询词；不会静默截断条件。');
    return {
      tag: text(value.tag), description: text(value.description), refinement: text(value.refinement),
      keywords: entries(value.keywords, ['keyword', 'query', 'keyword_cn'], 24),
      intent_queries: entries(value.intent_queries, ['query', 'query_cn'], 12),
      ...(constraintGroups.length ? { constraint_groups: constraintGroups } : {}),
    };
  };
  const buildTopicResearchRequest = (options = {}) => {
    if (options.action === 'continue-content') {
      if (!/^\d{8}-[a-f0-9]{12}$/.test(String(options.run_id || ''))) throw new Error('无效的专题任务标识。');
      return { key: 'topic-research', inputs: { action: 'continue-content', run_id: options.run_id, content_batch: '10' } };
    }
    if (!['90', '365', 'starter'].includes(String(options.mode))) throw new Error('请选择支持的专题模式。');
    const profile = sanitizeResearchProfile(options.profile);
    const validated = buildStarterPackRequest({ profile_tag: profile.tag, as_of: options.as_of, conferences: options.conferences });
    if (!profile.keywords.some(item => item.enabled && (item.keyword || item.query)) && !profile.intent_queries.some(item => item.enabled && item.query)) throw new Error('所选词条尚无检索词，请先保存有效词条。');
    return { key: 'topic-research', inputs: {
      profile_tag: profile.tag, mode: String(options.mode), as_of: validated.inputs.as_of,
      conferences: validated.inputs.conferences, profile_snapshot: JSON.stringify(profile),
      action: 'run', run_id: '', content_batch: '10',
    } };
  };
  const continueTopicResearch = async runId => {
    const request = buildTopicResearchRequest({ action: 'continue-content', run_id: runId });
    return runWorkflowByKey(request.key, request.inputs);
  };
  const buildStarterPackRequest = (options = {}) => {
    const tag = String(options.profile_tag || '').trim();
    if (!tag || tag.includes(',')) throw new Error('入门包需要恰好选择一个词条。');
    const asOf = String(options.as_of || '').trim();
    const stamp = Date.parse(asOf + 'T00:00:00Z');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf) || !Number.isFinite(stamp) || new Date(stamp).toISOString().slice(0, 10) !== asOf) {
      throw new Error('请输入有效的 UTC 截止日期（不含当天）。');
    }
    const integer = (value, fallback, min, max, label) => {
      const num = value === undefined ? fallback : Number(value);
      if (value === null || typeof value === 'boolean' || (typeof value === 'string' && !value.trim()) || !Number.isInteger(num) || num < min || num > max) throw new Error(`${label}必须是 ${min}–${max} 的整数。`);
      return String(num);
    };
    const raw = Array.isArray(options.conferences) ? options.conferences : String(options.conferences || '').split(',');
    let conferences = [...new Set(raw.map(value => String(value).trim().toLowerCase()).filter(Boolean))];
    if (!conferences.length) conferences = STARTER_PACK_CONFERENCES.slice();
    if (conferences.some(value => !STARTER_PACK_CONFERENCES.includes(value))) throw new Error('会议范围包含不支持的会议。');
    return { key: 'starter-pack', inputs: {
      profile_tag: tag, as_of: asOf, conferences: conferences.join(','),
      max_new_reviews: integer(options.max_new_reviews, 1000, 0, 5000, '新增评审上限'),
      content_limit: integer(options.content_limit, 12, 1, 20, '内容生成上限'),
    } };
  };

  const buildQuickFetchRequest = (days, extra) => {
    const parsed = Number(days);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > 365) {
      throw new Error('回溯天数必须在 1–365 天之间。');
    }
    const normalized = String(parsed);
    const options = extra && typeof extra === 'object' ? extra : {};
    const fetchMode = (typeof options.fetchMode === 'string' ? options.fetchMode : '').trim().toLowerCase();
    const presetKey = fetchMode ? `${normalized}-${fetchMode}` : normalized;
    const preset = QUICK_FETCH_PRESETS[presetKey] || QUICK_FETCH_PRESETS[normalized] || {
      key: 'daily-now',
      dispatchInputs: {
        run_enrich: 'false',
        fetch_days: normalized,
      },
    };
    const mergedInputs = combineInputs(preset.dispatchInputs, options.dispatchInputs);
    // 不允许额外参数绕开天数校验；31天以上由后端进入独立回溯模式。
    mergedInputs.fetch_days = normalized;
    if (parsed > 30) mergedInputs.fetch_mode = 'skims';
    return { key: preset.key, inputs: mergedInputs };
  };
  const runQuickFetchByDays = async (days, extra) => {
    let request;
    try { request = buildQuickFetchRequest(days, extra); }
    catch (error) { setStatus(error.message, '#c00'); return false; }
    return runWorkflowByKey(request.key, request.inputs);
  };

  const normalizeConferenceName = (value) => {
    const text = String(value || '').trim();
    const lower = text.toLowerCase();
    const MAP = {
      nips: 'NeurIPS', neurips: 'NeurIPS',
      icml: 'ICML', iclr: 'ICLR', aaai: 'AAAI',
      cvpr: 'CVPR', eccv: 'ECCV', ijcai: 'IJCAI',
      acl: 'ACL', emnlp: 'EMNLP',
      unified: 'unified',
      osdi: 'OSDI', sosp: 'SOSP', ndss: 'NDSS',
      sp: 'IEEE S&P', 's&p': 'IEEE S&P', ieeesp: 'IEEE S&P',
      'ieee-sp': 'IEEE S&P', ieee_sp: 'IEEE S&P', 'ieee s&p': 'IEEE S&P',
    };
    return MAP[lower] || '';
  };

  const normalizeConferenceYears = (values) => {
    const raw = Array.isArray(values) ? values : [values];
    const out = [];
    const seen = new Set();
    raw.forEach((item) => {
      const year = parseInt(item, 10);
      if (!Number.isFinite(year) || year <= 0 || seen.has(year)) return;
      seen.add(year);
      out.push(String(year));
    });
    return out;
  };

  const normalizeConferencePairKey = (value) => {
    const text = String(value || '').trim();
    if (!text) return '';
    const compact = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
    if (['ieee_s_p', 'ieee_sp', 's_p', 'sp'].includes(compact)) return 'ieee_sp';
    if (compact === 'nips') return 'neurips';
    return compact;
  };

  const normalizeConferencePairs = (values) => {
    const raw = Array.isArray(values) ? values : String(values || '').split(',');
    const out = [];
    const seen = new Set();
    raw.forEach((item) => {
      const text = String(item || '').trim();
      if (!text || !text.includes(':')) return;
      const [confRaw, yearRaw] = text.split(':');
      const conf = normalizeConferencePairKey(confRaw);
      const year = parseInt(yearRaw, 10);
      if (!conf || !Number.isFinite(year) || year <= 0) return;
      const pair = `${conf}:${year}`;
      if (seen.has(pair)) return;
      seen.add(pair);
      out.push(pair);
    });
    return out;
  };

  const runConferenceRetrieval = async (conference, years, options = {}) => {
    const extraInputs =
      options && typeof options === 'object' && options.dispatchInputs
        ? options.dispatchInputs
        : {};
    const normalizedPairs = normalizeConferencePairs(extraInputs.conference_pairs);
    const normalizedConference = normalizedPairs.length ? 'unified' : normalizeConferenceName(conference);
    const normalizedYears = normalizeConferenceYears(years);
    const pairYears = normalizedPairs.map((item) => item.split(':')[1]);
    const workflowYears = normalizedYears.length ? normalizedYears : normalizeConferenceYears(pairYears);
    if (!normalizedConference || !workflowYears.length) {
      open();
      setStatus('请先选择支持的会议和年份。', '#c00');
      return false;
    }
    const inputs = {
      conference: normalizedConference,
      years: workflowYears.join(','),
      ...extraInputs,
    };
    if (normalizedPairs.length) inputs.conference_pairs = normalizedPairs.join(',');
    return runWorkflowByKey('conference-retrieval', inputs);
  };

  const runConferenceMaintain = async (conference, years) =>
    runConferenceRetrieval(conference, years);

  let dailyRunSummaryCache = null;
  // 首页状态条用的“最近一次日常流水线”摘要；匿名可读，缓存 60 秒。
  const getLatestDailyRunSummary = async (forceRefresh = false) => {
    if (
      !forceRefresh &&
      dailyRunSummaryCache &&
      Date.now() - dailyRunSummaryCache.fetchedAt < 60000
    ) {
      return dailyRunSummaryCache.value;
    }
    try {
      const token = loadGithubToken();
      const { owner, repo } = await resolveRepoFromUrl(token);
      if (!owner || !repo) return null;
      const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/daily-paper-reader.yml/runs?per_page=1`;
      const res = await ghFetch(token, url);
      if (!res.ok) return null;
      const data = await res.json().catch(() => null);
      const run = data && Array.isArray(data.workflow_runs) ? data.workflow_runs[0] : null;
      if (!run) return null;
      const value = {
        runNumber: run.run_number || run.id,
        status: run.status || '',
        conclusion: run.conclusion || '',
        createdAt: run.created_at || '',
        url: `https://github.com/${owner}/${repo}/actions/runs/${run.id}`,
      };
      dailyRunSummaryCache = { fetchedAt: Date.now(), value };
      return value;
    } catch {
      return null;
    }
  };

  const STATUS_TEXT_MAP = {
    queued: '排队中',
    in_progress: '运行中',
    waiting: '等待中',
    success: '成功',
    failure: '失败',
    cancelled: '已取消',
  };

  const describeDailyRunStatus = (summary) => {
    if (!summary) return '';
    if (summary.status === 'completed') {
      return STATUS_TEXT_MAP[summary.conclusion] || summary.conclusion || '已完成';
    }
    return STATUS_TEXT_MAP[summary.status] || summary.status || '';
  };

  const statusColorFor = (summary) => {
    if (!summary) return '#666';
    if (summary.status === 'completed') {
      return summary.conclusion === 'success' ? '#2e7d32' : '#c00';
    }
    return '#1565c0';
  };

  // 首页流水线状态条：挂载到公告卡片内 #dpr-home-status-chip 占位节点。
  const mountHomeStatusChip = async () => {
    const mount = document.getElementById('dpr-home-status-chip');
    if (!mount || mount.dataset.loaded === '1') return;
    mount.dataset.loaded = '1';
    mount.innerHTML = '<span style="color:#999;">正在读取流水线状态...</span>';
    const summary = await getLatestDailyRunSummary(true);
    if (!mount.isConnected) return;
    if (!summary) {
      const hasToken = !!loadGithubToken();
      mount.innerHTML =
        `<span style="color:#999;">流水线状态暂时读取不到（匿名接口限流 60 次/小时）。` +
        `<button type="button" id="dpr-home-status-retry" class="arxiv-tool-btn" style="padding:1px 8px; font-size:12px; margin:0 4px;">重试</button>` +
        `${hasToken ? '' : '解锁密钥后可实时读取。'}60 秒后也会自动重试。</span>`;
      mount.dataset.loaded = '0';
      const retryBtn = document.getElementById('dpr-home-status-retry');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          mountHomeStatusChip();
        });
      }
      clearTimeout(mountHomeStatusChip._retryTimer);
      mountHomeStatusChip._retryTimer = setTimeout(() => {
        if (mount.isConnected) mountHomeStatusChip();
      }, 60000);
      return;
    }
    const color = statusColorFor(summary);
    const statusText = describeDailyRunStatus(summary);
    mount.innerHTML =
      `<a href="${escapeHtml(summary.url)}" target="_blank" rel="noopener" style="display:inline-flex; align-items:center; gap:6px; text-decoration:none; font-size:12px; color:inherit;">` +
      `<span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${color};${summary.status !== 'completed' ? ' animation:dpr-home-chip-pulse 1.6s ease-in-out infinite;' : ''}"></span>` +
      `<span>每日流水线 #${escapeHtml(String(summary.runNumber))} · <strong style="color:${color};">${escapeHtml(statusText)}</strong></span>` +
      `<span style="color:#999;">${escapeHtml(formatRunTime(summary.createdAt))}</span>` +
      `</a>`;
    if (summary.status === 'in_progress' || summary.status === 'queued') {
      // 运行中时 60 秒后自动刷新一次状态条
      setTimeout(() => {
        if (mount.isConnected) {
          mount.dataset.loaded = '0';
          mountHomeStatusChip();
        }
      }, 60000);
    }
  };

  return {
    __test: {
      buildQuickFetchRequest,
      buildStarterPackRequest,
      buildTopicResearchRequest,
      sanitizeResearchProfile,
      parsePipelineStageFromLog,
      describePipelineStage,
      buildCronFromSchedule,
      parseCronToSchedule,
      applyScheduleToWorkflowYaml,
    },
    buildTopicResearchRequest,
    sanitizeResearchProfile,
    continueTopicResearch,
    buildStarterPackRequest,
    isStarterPackSupported: () => !isLocalDebugPage(),
    open,
    runWorkflowByKey,
    runQuickFetchByDays,
    runConferenceRetrieval,
    runConferenceMaintain,
    getLatestDailyRunSummary,
    mountHomeStatusChip,
  };
})();
