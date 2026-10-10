// 阅读清单：基于侧栏阅读状态（✓=good / ✗=bad / 其他=已读）生成三个 paper list，
// 支持导出 Markdown 与导入 CSV/Markdown 历史列表；导入结果合并进阅读状态，
// 并写入仓库 archive/user_read.json 供每日流水线检索去重。
window.DPRUserPaperLists = (function () {
  const USER_READ_PATH = 'archive/user_read.json';
  const STORAGE_KEY = 'dpr_read_papers_v1';
  const CO_AUTHOR = 'Co-Authored-By: xixi <3495302215@qq.com>';

  const escapeHtml = (str) =>
    String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  // ---------- 论文键提取（与 src/user_read.py 的 extract_paper_key 对齐） ----------
  const ARXIV_NEW_RE = /^\d{4}\.\d{4,5}$/;
  const ARXIV_OLD_RE = /^[a-z-]+(?:\.[A-Z]{2})?\/\d{7}$/i;
  const DOI_RE = /^10\.\d{4,9}\/\S+$/i;

  const extractPaperKey = (raw) => {
    let text = String(raw || '').trim();
    if (!text) return '';
    let s = text;
    const prefix = s.match(/^arxiv:(.+)$/i);
    if (prefix) s = prefix[1];
    const url = s.match(/^https?:\/\/(?:[\w.]*\.)?arxiv\.org\/(?:abs|pdf)\/(.+)$/i);
    if (url) s = url[1];
    s = s.split('?')[0].split('#')[0].trim();
    s = s.replace(/["'“”‘’.,;]+$/g, '');
    if (/\.pdf$/i.test(s)) s = s.slice(0, -4);
    const version = s.match(/^(.+?)v(\d+)$/);
    const base = version ? version[1] : s;
    if (ARXIV_NEW_RE.test(base) || ARXIV_OLD_RE.test(base)) return base;
    if (DOI_RE.test(s)) return s.toLowerCase();
    return '';
  };

  const extractPaperKeysFromText = (text) => {
    const out = new Set();
    const raw = String(text || '');
    const newStyle = raw.match(/\b\d{4}\.\d{4,5}(?:v\d+)?\b/g) || [];
    newStyle.forEach((m) => {
      const key = extractPaperKey(m);
      if (key) out.add(key);
    });
    const oldStyle = raw.match(/\b[a-z-]+(?:\.[A-Z]{2})?\/\d{7}(?:v\d+)?\b/gi) || [];
    oldStyle.forEach((m) => {
      const key = extractPaperKey(m);
      if (key) out.add(key);
    });
    const dois = raw.match(/\b10\.\d{4,9}\/[^\s"'<>),;，；]+/g) || [];
    dois.forEach((m) => {
      const key = extractPaperKey(m);
      if (key) out.add(key);
    });
    return [...out];
  };

  // ---------- 数据源 ----------
  const getReadState = () => {
    try {
      const sidebar = window.DPRSidebar;
      if (sidebar && typeof sidebar.getReadState === 'function') {
        return sidebar.getReadState() || {};
      }
    } catch {
      // ignore
    }
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}') || {};
    } catch {
      return {};
    }
  };

  const getPapers = () => {
    try {
      const sidebar = window.DPRSidebar;
      if (sidebar && typeof sidebar.getPapers === 'function') {
        return sidebar.getPapers() || [];
      }
    } catch {
      // ignore
    }
    return [];
  };

  // 三个清单：重要（good）/ 不重要（bad）/ 已读（全部非空状态）
  const buildLists = () => {
    const state = getReadState();
    const papers = getPapers();
    const metaById = new Map();
    papers.forEach((p) => {
      if (p && p.id) metaById.set(String(p.id), p);
      if (p && p.href) metaById.set(String(p.href).replace(/^#\//, ''), p);
    });
    const lists = {
      good: [],
      bad: [],
      read: [],
    };
    Object.keys(state).forEach((paperId) => {
      const status = String(state[paperId] || '');
      if (!status) return;
      const meta = metaById.get(String(paperId)) || null;
      const entry = {
        id: String(paperId),
        status,
        title: (meta && meta.title) || String(paperId),
        link: (meta && meta.link) || '',
        siteHref: (meta && meta.href) || '',
      };
      lists.read.push(entry);
      if (status === 'good') lists.good.push(entry);
      if (status === 'bad') lists.bad.push(entry);
    });
    Object.values(lists).forEach((list) =>
      list.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN')),
    );
    return lists;
  };

  const externalLinkFor = (entry) => {
    if (entry.link) return entry.link;
    if (/^\d{4}\.\d{4,5}$/.test(entry.id)) return `https://arxiv.org/abs/${entry.id}`;
    return '';
  };

  const buildListMarkdown = (name, entries) => {
    const lines = [`# ${name}`, '', `共 ${entries.length} 篇。导出时间：${new Date().toLocaleString('zh-CN', { hour12: false })}`, ''];
    entries.forEach((entry) => {
      const link = externalLinkFor(entry);
      const titlePart = link ? `[${entry.title}](${link})` : entry.title;
      const sitePart = entry.siteHref ? ` · 站内：${entry.siteHref}` : '';
      lines.push(`- ${titlePart} \`(${entry.id})\`${sitePart}`);
    });
    return `${lines.join('\n')}\n`;
  };

  const downloadTextFile = (filename, text, mime) => {
    const blob = new Blob([text], { type: `${mime || 'text/plain'};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  // ---------- 仓库写入（archive/user_read.json） ----------
  const getToken = () => {
    const secret = window.decoded_secret_private || {};
    if (secret.github && secret.github.token) return String(secret.github.token).trim();
    try {
      const raw = window.localStorage.getItem('github_token_data');
      if (raw) {
        const obj = JSON.parse(raw);
        return String((obj && obj.token) || '').trim();
      }
    } catch {
      // ignore
    }
    return '';
  };

  const resolveRepo = async (token) => {
    const pagesMatch = (window.location.href || '').match(/https?:\/\/([^.]+)\.github\.io\/([^/]+)/);
    if (pagesMatch) return { owner: pagesMatch[1], repo: pagesMatch[2] };
    if (!token) return { owner: '', repo: '' };
    const res = await fetch('https://api.github.com/user', {
      headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' },
    });
    if (!res.ok) return { owner: '', repo: '' };
    const user = await res.json();
    return { owner: user.login || '', repo: 'daily-paper-reader' };
  };

  const fetchUserReadFile = async (token, owner, repo) => {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${USER_READ_PATH}`,
      { headers: { Accept: 'application/vnd.github.v3+json', ...(token ? { Authorization: `token ${token}` } : {}) } },
    );
    if (res.status === 404) return { sha: null, payload: { version: 1, items: [] } };
    if (!res.ok) throw new Error(`读取 ${USER_READ_PATH} 失败：HTTP ${res.status}`);
    const data = await res.json();
    const binary = atob(String(data.content || '').replace(/\s+/g, ''));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    let payload = {};
    try {
      payload = JSON.parse(new TextDecoder('utf-8').decode(bytes));
    } catch {
      payload = { version: 1, items: [] };
    }
    return { sha: data.sha, payload };
  };

  const putUserReadFile = async (token, owner, repo, sha, payload, message) => {
    const content = JSON.stringify(payload, null, 2);
    const binary = new TextEncoder().encode(content);
    let raw = '';
    binary.forEach((b) => {
      raw += String.fromCharCode(b);
    });
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${USER_READ_PATH}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `token ${token}` } : {}),
        },
        body: JSON.stringify({ message, content: btoa(raw), ...(sha ? { sha } : {}) }),
      },
    );
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`写入 ${USER_READ_PATH} 失败：HTTP ${res.status} - ${text.slice(0, 200)}`);
    }
    return res.json();
  };

  // 把导入的 keys 合并进阅读状态（localStorage + Supabase 同步走侧栏既有链路）
  const mergeIntoReadState = (keys, status) => {
    const sidebar = window.DPRSidebar;
    let applied = 0;
    keys.forEach((key) => {
      if (sidebar && typeof sidebar.markRead === 'function') {
        const st = sidebar.markRead(key, status, { notify: false });
        if (st) applied += 1;
      } else {
        try {
          const state = getReadState();
          state[key] = status;
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
          applied += 1;
        } catch {
          // ignore
        }
      }
    });
    if (sidebar && typeof sidebar.notifyReadStateChanged === 'function') {
      sidebar.notifyReadStateChanged();
    }
    return applied;
  };

  // ---------- 面板渲染 ----------
  const container = { el: null };

  const statusLabel = (status) =>
    ({ good: '✓ 重要', bad: '✗ 不重要', read: '已读' }[status] || status);

  const render = () => {
    const lists = buildLists();
    const block = (key, title, note) => `
      <div class="dpr-upl-block" data-list="${key}">
        <div class="dpr-upl-block-head">
          <strong>${escapeHtml(title)}</strong>
          <span class="dpr-upl-count">${lists[key].length} 篇</span>
          <button type="button" class="arxiv-tool-btn dpr-upl-export-btn" data-export="${key}" ${lists[key].length ? '' : 'disabled'}>导出 .md</button>
        </div>
        <div class="dpr-upl-note">${escapeHtml(note)}</div>
        <div class="dpr-upl-items">
          ${lists[key]
            .slice(0, 30)
            .map(
              (entry) =>
                `<div class="dpr-upl-item" title="${escapeHtml(entry.id)}">${escapeHtml(entry.title)}</div>`,
            )
            .join('')}
          ${lists[key].length > 30 ? `<div class="dpr-upl-item dpr-upl-more">…等共 ${lists[key].length} 篇</div>` : ''}
          ${lists[key].length ? '' : '<div class="dpr-upl-item" style="color:#999;">暂无论文</div>'}
        </div>
      </div>
    `;
    return `
      <div class="dpr-upl-wrap">
        <div class="dpr-task-hint">
          已读标记来自论文阅读页的 ✓/✗ 按钮与侧栏 1/2/3/4 标记；导入的历史清单会合并进阅读状态，
          并写入仓库 <code>archive/user_read.json</code>——每日流水线会跳过这些论文，不再重复推荐。
        </div>
        ${block('good', '✓ 已读且重要', '阅读页打 ✓ 或侧栏标记 1 的论文。')}
        ${block('bad', '✗ 已读但不重要', '阅读页打 ✗ 或侧栏标记 4 的论文。')}
        ${block('read', '全部已读', '包含以上两类，以及打开过（read）、蓝色（2）、橙色（3）标记的论文。')}
        <div class="dpr-upl-import">
          <div class="chat-quick-run-title">导入历史已读清单</div>
          <div class="dpr-task-hint">支持 .csv / .md / .txt 文件或直接粘贴；自动识别 arXiv ID（含链接与版本号）与 DOI。</div>
          <input id="dpr-upl-import-file" type="file" accept=".csv,.md,.txt,.markdown,text/csv,text/markdown,text/plain" style="font-size:12px;">
          <textarea id="dpr-upl-import-text" rows="4" placeholder="或粘贴列表内容（每行一个 arXiv ID / 链接 / DOI）" style="width:100%; box-sizing:border-box; font-size:12px; margin-top:6px;"></textarea>
          <div style="display:flex; gap:8px; align-items:center; margin-top:6px; flex-wrap:wrap;">
            <label style="font-size:12px;">导入状态
              <select id="dpr-upl-import-status" style="font-size:12px;">
                <option value="read">已读（不计重要度）</option>
                <option value="good">已读且重要（✓）</option>
                <option value="bad">已读但不重要（✗）</option>
              </select>
            </label>
            <button id="dpr-upl-import-parse-btn" class="arxiv-tool-btn" type="button">解析预览</button>
            <button id="dpr-upl-import-apply-btn" class="arxiv-tool-btn" type="button" style="background:#2e7d32; color:#fff;" disabled>确认导入</button>
          </div>
          <div id="dpr-upl-import-preview" class="dpr-task-hint" style="margin-top:6px;"></div>
          <div id="dpr-upl-import-status-msg" class="dpr-task-hint" style="margin-top:4px;"></div>
        </div>
      </div>
    `;
  };

  let pendingImportKeys = [];

  const bindImportControls = (el) => {
    const parseBtn = el.querySelector('#dpr-upl-import-parse-btn');
    const applyBtn = el.querySelector('#dpr-upl-import-apply-btn');
    const previewEl = el.querySelector('#dpr-upl-import-preview');
    const msgEl = el.querySelector('#dpr-upl-import-status-msg');
    const fileInput = el.querySelector('#dpr-upl-import-file');
    const textInput = el.querySelector('#dpr-upl-import-text');
    if (!parseBtn || parseBtn.dataset.bound === '1') return;
    parseBtn.dataset.bound = '1';

    const parseCurrent = async () => {
      let text = String(textInput.value || '');
      const file = fileInput.files && fileInput.files[0];
      if (file) {
        text = await file.text();
      }
      pendingImportKeys = extractPaperKeysFromText(text);
      if (pendingImportKeys.length) {
        previewEl.innerHTML =
          `识别到 <strong>${pendingImportKeys.length}</strong> 个论文标识：` +
          escapeHtml(pendingImportKeys.slice(0, 12).join(', ')) +
          (pendingImportKeys.length > 12 ? ' …' : '');
        applyBtn.disabled = false;
      } else {
        previewEl.textContent = '未能识别到 arXiv ID / DOI，请检查内容格式。';
        applyBtn.disabled = true;
      }
    };

    parseBtn.addEventListener('click', () => parseCurrent().catch((err) => {
      previewEl.textContent = `解析失败：${err.message || err}`;
    }));

    applyBtn.addEventListener('click', async () => {
      if (!pendingImportKeys.length) return;
      const status = el.querySelector('#dpr-upl-import-status').value || 'read';
      applyBtn.disabled = true;
      msgEl.textContent = '正在合并进阅读状态...';
      msgEl.style.color = '#666';
      try {
        const applied = mergeIntoReadState(pendingImportKeys, status);
        // 写入仓库，供流水线检索去重（未解锁 Token 时跳过并提示）
        const token = getToken();
        let repoNote = '';
        if (token) {
          const { owner, repo } = await resolveRepo(token);
          if (owner && repo) {
            const { sha, payload } = await fetchUserReadFile(token, owner, repo);
            const existing = new Set(
              (payload.items || []).map((item) => extractPaperKey(item.id || item)).filter(Boolean),
            );
            pendingImportKeys.forEach((key) => {
              if (!existing.has(key)) {
                payload.items.push({ id: key, status, marked_at: new Date().toISOString() });
              }
            });
            payload.version = 1;
            payload.updated_at = new Date().toISOString();
            await putUserReadFile(
              token, owner, repo, sha, payload,
              `chore: 更新已读论文清单（导入 ${pendingImportKeys.length} 篇）\n\n${CO_AUTHOR}`,
            );
            repoNote = '，已写入 archive/user_read.json（流水线将跳过这些论文）';
          }
        } else {
          repoNote = '；未检测到 GitHub Token，仅合并进了本浏览器阅读状态（解锁后重新导入可同步到仓库）';
        }
        msgEl.innerHTML = `✅ 已导入 ${applied} 篇${repoNote}。`;
        msgEl.style.color = '#28a745';
        pendingImportKeys = [];
        previewEl.textContent = '';
        // 刷新清单预览（render 重新生成三个块；控件绑定走 bindImportControls 幂等重挂）
        if (container.el) {
          const scrollTop = container.el.scrollTop;
          container.el.innerHTML = render();
          container.el.scrollTop = scrollTop;
          bindImportControls(container.el);
        }
      } catch (err) {
        msgEl.textContent = `❌ 导入失败：${err.message || err}`;
        msgEl.style.color = '#c00';
        applyBtn.disabled = false;
      }
    });
  };

  const bind = (el) => {
    container.el = el;
    if (el.dataset.uplBound !== '1') {
      el.dataset.uplBound = '1';
      el.addEventListener('click', async (e) => {
        const exportBtn = e.target.closest('[data-export]');
        if (!exportBtn) return;
        const key = exportBtn.getAttribute('data-export');
        const lists = buildLists();
        const names = {
          good: '已读且重要论文清单',
          bad: '已读但不重要论文清单',
          read: '已读论文清单',
        };
        const markdown = buildListMarkdown(names[key] || key, lists[key] || []);
        downloadTextFile(`paper-list-${key}-${Date.now()}.md`, markdown, 'text/markdown');
      });
    }
    bindImportControls(el);
  };

  return {
    render,
    bind,
    __test: {
      extractPaperKey,
      extractPaperKeysFromText,
      buildListMarkdown,
      buildLists,
    },
  };
})();
