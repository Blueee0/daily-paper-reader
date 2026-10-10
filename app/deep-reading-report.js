// 论文页「精读报告」：前端按需生成（复用用户配置的 OpenAI 兼容 LLM），
// 报告保存在浏览器 IndexedDB，可重新生成与下载 .md。仅精读（deep）论文显示。
window.DPRDeepReading = (function () {
  const DB_NAME = 'dpr_deep_reading_db_v1';
  const STORE_NAME = 'reports';
  const BLOCK_ID = 'dpr-deep-reading-block';
  const PROMPT_ASSET_PATH = 'app/deep-reading-prompt.md';
  const PROMPT_OVERRIDE_KEY = 'dpr_deep_reading_prompt_custom';

  let promptTemplateCache = null;
  let activeController = null;
  let currentPaperId = '';
  let currentRouteFile = '';

  const escapeHtml = (str) =>
    String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  // ---------- IndexedDB ----------
  const openDB = () =>
    new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error('当前浏览器不支持 IndexedDB，报告无法本地保存。'));
        return;
      }
      const req = window.indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'paperId' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error('打开本地数据库失败。'));
    });

  const loadReport = async (paperId) => {
    if (!paperId) return null;
    try {
      const db = await openDB();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const req = tx.objectStore(STORE_NAME).get(paperId);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    } catch {
      return null;
    }
  };

  const saveReport = async (report) => {
    const db = await openDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(report);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  };

  // ---------- Prompt / 素材 ----------
  const getPromptTemplate = async () => {
    try {
      const custom = window.localStorage.getItem(PROMPT_OVERRIDE_KEY);
      if (custom && custom.trim()) return custom;
    } catch {
      // ignore
    }
    if (promptTemplateCache) return promptTemplateCache;
    const res = await fetch(PROMPT_ASSET_PATH, { cache: 'force-cache' });
    if (!res.ok) throw new Error(`读取精读 prompt 模板失败：HTTP ${res.status}`);
    promptTemplateCache = await res.text();
    return promptTemplateCache;
  };

  const fetchFulltext = async (routeFile) => {
    if (!routeFile) return { text: '', ok: false };
    const txtPath = String(routeFile).replace(/\.md$/i, '.txt');
    try {
      const res = await fetch(`docs/${txtPath}`, { cache: 'force-cache' });
      if (!res.ok) return { text: '', ok: false };
      const text = await res.text();
      if (!text || text.length < 200) return { text: '', ok: false };
      return { text, ok: true };
    } catch {
      return { text: '', ok: false };
    }
  };

  const resolveLLMEntry = () => {
    const secret = window.decoded_secret_private || {};
    const utils = window.DPRLLMConfigUtils || {};
    if (typeof utils.resolveSummaryLLM === 'function') {
      return utils.resolveSummaryLLM(secret);
    }
    return null;
  };

  const buildEndpoint = (baseUrl) => {
    const utils = window.DPRLLMConfigUtils || {};
    if (typeof utils.buildChatCompletionsEndpoint === 'function') {
      return utils.buildChatCompletionsEndpoint(baseUrl);
    }
    const raw = String(baseUrl || '').trim().replace(/\/+$/g, '');
    if (/\/chat\/completions$/i.test(raw)) return raw;
    if (/\/v\d+$/i.test(raw)) return `${raw}/chat/completions`;
    return `${raw}/v1/chat/completions`;
  };

  // ---------- 渲染 ----------
  const renderMarkdown = (text) => {
    if (window.marked && typeof window.marked.parse === 'function') {
      try {
        return window.marked.parse(String(text || ''));
      } catch {
        // fallthrough
      }
    }
    return `<pre style="white-space:pre-wrap;">${escapeHtml(text)}</pre>`;
  };

  const ensureBlock = (paperId) => {
    const section = document.querySelector('.markdown-section');
    if (!section) return null;
    const root =
      section.querySelector(':scope > .dpr-page-content') || section;
    let block = document.getElementById(BLOCK_ID);
    if (block && block.isConnected && root.contains(block)) {
      if (block.dataset.paperId !== paperId) resetBlock(block, paperId);
      return block;
    }
    if (block) block.remove();
    block = document.createElement('details');
    block.id = BLOCK_ID;
    block.className = 'dpr-deep-reading-block';
    block.dataset.paperId = paperId || '';
    block.innerHTML = `
      <summary class="dpr-deep-reading-summary">
        <span class="dpr-deep-reading-title">📖 精读报告（自定义 Prompt）</span>
        <span class="dpr-deep-reading-status" data-role="status"></span>
      </summary>
      <div class="dpr-deep-reading-toolbar">
        <button type="button" class="dpr-paper-action-btn" data-role="generate">生成精读报告</button>
        <button type="button" class="dpr-paper-action-btn" data-role="download" disabled>下载报告 .md</button>
        <button type="button" class="dpr-paper-action-btn" data-role="cancel" style="display:none;">取消生成</button>
      </div>
      <div class="dpr-deep-reading-body" data-role="body">
        <p style="color:#999; font-size:13px;">尚未生成。点击「生成精读报告」，将使用你在密钥配置中设置的 LLM 平台，按自定义 12 节 Prompt 生成深度阅读报告；报告仅保存在当前浏览器（IndexedDB），可随时下载为 Markdown。</p>
      </div>
    `;
    const actionBar = root.querySelector('.dpr-paper-action-bar');
    if (actionBar && actionBar.parentNode === root) {
      actionBar.insertAdjacentElement('afterend', block);
    } else {
      root.insertBefore(block, root.firstChild);
    }
    bindBlockEvents(block, paperId);
    return block;
  };

  const resetBlock = (block, paperId) => {
    block.dataset.paperId = paperId || '';
    const body = block.querySelector('[data-role="body"]');
    const status = block.querySelector('[data-role="status"]');
    const downloadBtn = block.querySelector('[data-role="download"]');
    if (body) body.innerHTML = '';
    if (status) status.textContent = '';
    if (downloadBtn) downloadBtn.disabled = true;
  };

  const setBlockStatus = (block, text, color) => {
    const status = block.querySelector('[data-role="status"]');
    if (status) {
      status.textContent = text || '';
      status.style.color = color || '#888';
    }
  };

  const renderReportInto = (block, report) => {
    const body = block.querySelector('[data-role="body"]');
    const downloadBtn = block.querySelector('[data-role="download"]');
    if (!body) return;
    const metaLines = [];
    if (report.generatedAt) metaLines.push(`生成时间：${report.generatedAt}`);
    if (report.model) metaLines.push(`模型：${report.model}`);
    if (report.abstractOnly) metaLines.push('⚠️ 未找到全文 .txt，本报告仅基于摘要与元数据生成');
    body.innerHTML =
      (metaLines.length
        ? `<p class="dpr-deep-reading-meta">${escapeHtml(metaLines.join(' · '))}</p>`
        : '') + renderMarkdown(report.markdown || '');
    if (downloadBtn) downloadBtn.disabled = !report.markdown;
  };

  const bindBlockEvents = (block, paperId) => {
    if (block.dataset.bound === '1') return;
    block.dataset.bound = '1';
    block.querySelector('[data-role="generate"]').addEventListener('click', () => {
      generateForPage(paperId);
    });
    block.querySelector('[data-role="cancel"]').addEventListener('click', () => {
      if (activeController) activeController.abort();
    });
    block.querySelector('[data-role="download"]').addEventListener('click', () => {
      const body = block.querySelector('[data-role="body"]');
      if (!body) return;
      const markdown = currentReportMarkdown || (body.innerText || '');
      const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(paperId || 'deep-reading-report').split('/').pop()}-精读报告.md`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    });
  };

  // ---------- 生成 ----------
  let currentReportMarkdown = '';

  const generateForPage = async (paperId) => {
    const block = document.getElementById(BLOCK_ID);
    if (!block || activeController) return;
    const entry = resolveLLMEntry();
    if (!entry || !entry.apiKey || !entry.baseUrl || !entry.model) {
      setBlockStatus('未配置 LLM：请先在「设置 → 密钥配置」中解锁并填写平台 API Key。', '#c00');
      block.open = true;
      return;
    }
    if (!currentRouteFile) {
      setBlockStatus('无法确定当前论文路由，无法生成。', '#c00');
      return;
    }
    const ctx = { paperId, routeFile: currentRouteFile };

    const generateBtn = block.querySelector('[data-role="generate"]');
    const cancelBtn = block.querySelector('[data-role="cancel"]');
    const body = block.querySelector('[data-role="body"]');
    generateBtn.disabled = true;
    cancelBtn.style.display = '';
    block.open = true;
    setBlockStatus('正在准备素材...', '#1565c0');
    currentReportMarkdown = '';

    activeController = new AbortController();
    try {
      const [template, fulltext] = await Promise.all([
        getPromptTemplate(),
        fetchFulltext(ctx.routeFile),
      ]);
      const material = [
        `### 论文标题\n${document.title || paperId}`,
        `### 论文页面\n${location.origin}${location.pathname}#/${ctx.routeFile.replace(/\.md$/i, '')}`,
        fulltext.ok
          ? `### 论文全文（PDF 提取）\n${fulltext.text}`
          : '### 论文全文\n（全文 .txt 缺失，以下仅提供摘要与元数据；请在报告中明确说明分析基于摘要。）',
      ].join('\n\n');
      const meta = window.__dprLatestPaperMeta || {};
      if (meta && (meta.tldr || meta.motivation || meta.method)) {
        material.push(
          `\n### 站点速览（供参考）\nTLDR：${meta.tldr || ''}\n动机：${meta.motivation || ''}\n方法：${meta.method || ''}`,
        );
      }

      setBlockStatus('正在生成（流式输出）...', '#1565c0');
      body.innerHTML = '<p style="color:#999; font-size:13px;">正在生成...</p>';

      const endpoint = buildEndpoint(entry.baseUrl);
      const messages = [
        {
          role: 'system',
          content: '你是严谨的论文阅读助手。按用户提供的 Prompt 结构输出中文 Markdown 报告。',
        },
        { role: 'user', content: `${template}\n\n---\n\n## 论文材料\n\n${material}` },
      ];
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${entry.apiKey}`,
        },
        signal: activeController.signal,
        body: JSON.stringify({ model: entry.model, messages, stream: true, temperature: 0.4 }),
      });
      if (!resp.ok || !resp.body) {
        const txt = await resp.text().catch(() => '');
        throw new Error(`HTTP ${resp.status} ${resp.statusText} ${txt.slice(0, 200)}`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let sseBuffer = '';
      let answer = '';
      let rafPending = false;
      const flushView = () => {
        if (rafPending) return;
        rafPending = true;
        requestAnimationFrame(() => {
          rafPending = false;
          body.innerHTML = renderMarkdown(answer);
          currentReportMarkdown = answer;
        });
      };

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        sseBuffer += decoder.decode(value, { stream: true });
        const lines = sseBuffer.split(/\r?\n/);
        sseBuffer = lines.pop() || '';
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const payload = trimmed.slice(5).trim();
          if (!payload || payload === '[DONE]') continue;
          try {
            const json = JSON.parse(payload);
            const delta =
              json && json.choices && json.choices[0] && json.choices[0].delta
                ? json.choices[0].delta.content || ''
                : '';
            if (delta) {
              answer += delta;
              flushView();
            }
          } catch {
            // 非 JSON 行忽略
          }
        }
      }
      if (!answer.trim()) throw new Error('模型未返回任何内容。');

      const report = {
        paperId,
        markdown: answer,
        generatedAt: new Date().toISOString(),
        model: entry.model,
        abstractOnly: !fulltext.ok,
      };
      await saveReport(report);
      currentReportMarkdown = answer;
      renderReportInto(block, report);
      setBlockStatus('✅ 已生成并保存到本地浏览器', '#28a745');
    } catch (e) {
      const aborted = e && (e.name === 'AbortError' || /aborted/i.test(String(e.message || '')));
      setBlockStatus(aborted ? '已取消生成。' : `❌ 生成失败：${e.message || e}`, aborted ? '#888' : '#c00');
    } finally {
      activeController = null;
      generateBtn.disabled = false;
      cancelBtn.style.display = 'none';
    }
  };

  // ---------- 页面挂载 ----------
  const mountForPage = async ({ paperId, routeFile, meta, onRendered } = {}) => {
    if (!paperId) return;
    currentPaperId = paperId;
    if (routeFile) currentRouteFile = routeFile;
    if (meta && typeof meta === 'object') {
      window.__dprLatestPaperMeta = meta;
    }
    const block = ensureBlock(paperId);
    if (!block) return;
    const saved = await loadReport(paperId);
    if (saved && saved.markdown && block.dataset.paperId === paperId) {
      renderReportInto(block, saved);
      setBlockStatus('已载入本地保存的报告', '#888');
    }
    if (typeof onRendered === 'function') onRendered(block);
  };

  const isDeepPaper = () => {
    const meta = window.__dprLatestPaperMeta;
    return !!(meta && String(meta.reading_section || '') === 'deep');
  };

  return {
    mountForPage,
    generateForPage,
    isDeepPaper,
    getBlockId: () => BLOCK_ID,
  };
})();
