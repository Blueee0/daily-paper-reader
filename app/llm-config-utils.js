(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.DPRLLMConfigUtils = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const DEFAULT_DEEPSEEK_BASE_URL = 'https://api.deepseek.com';
  const DEFAULT_DEEPSEEK_CHAT_MODELS = [
    'deepseek-v4-flash',
    'deepseek-v4-pro',
  ];
  const DEEPSEEK_V4_MAX_OUTPUT_TOKENS = 393216;
  // 多平台 preset：任意 OpenAI Chat Completions 兼容平台；custom 允许自由填写。
  const PROVIDER_PRESETS = Object.freeze({
    deepseek: Object.freeze({
      key: 'deepseek',
      label: 'DeepSeek 官方',
      baseUrl: 'https://api.deepseek.com',
      models: Object.freeze(['deepseek-v4-flash', 'deepseek-v4-pro']),
    }),
    siliconflow: Object.freeze({
      key: 'siliconflow',
      label: 'SiliconFlow 硅基流动',
      baseUrl: 'https://api.siliconflow.cn/v1',
      models: Object.freeze(['deepseek-ai/DeepSeek-V3', 'Qwen/Qwen3-32B']),
    }),
    openai: Object.freeze({
      key: 'openai',
      label: 'OpenAI 官方',
      baseUrl: 'https://api.openai.com/v1',
      models: Object.freeze(['gpt-4.1-mini', 'gpt-4o-mini']),
    }),
    openrouter: Object.freeze({
      key: 'openrouter',
      label: 'OpenRouter',
      baseUrl: 'https://openrouter.ai/api/v1',
      models: Object.freeze(['openai/gpt-4o-mini', 'anthropic/claude-3.5-haiku']),
    }),
    custom: Object.freeze({
      key: 'custom',
      label: '自定义平台',
      baseUrl: '',
      models: Object.freeze([]),
    }),
  });
  // 兼容旧导出名。
  const DEEPSEEK_PRESETS = PROVIDER_PRESETS;

  const normalizeText = (value) => String(value || '').trim();

  const normalizeBaseUrlForStorage = (value) => {
    let text = normalizeText(value).replace(/\/+$/g, '');
    if (!text) return '';
    text = text.replace(/\/chat\/completions$/i, '');
    return text.replace(/\/+$/g, '');
  };

  const buildChatCompletionsEndpoint = (value) => {
    const raw = normalizeText(value).replace(/\/+$/g, '');
    if (!raw) return '';
    if (/\/chat\/completions$/i.test(raw)) return raw;
    const normalized = normalizeBaseUrlForStorage(raw);
    if (!normalized) return '';
    if (/\/v\d+$/i.test(normalized)) {
      return `${normalized}/chat/completions`;
    }
    return `${normalized}/v1/chat/completions`;
  };

  const sanitizeModelList = (values, maxCount = 3) => {
    const rawList = Array.isArray(values) ? values : [values];
    const out = [];
    const seen = new Set();
    for (const value of rawList) {
      const parts = String(value || '')
        .split(/[\n,]+/)
        .map((item) => normalizeText(item))
        .filter(Boolean);
      for (const name of parts) {
        const key = name.toLowerCase();
        if (!key || seen.has(key)) continue;
        seen.add(key);
        out.push(name);
        if (out.length >= Math.max(Number(maxCount) || 0, 1)) {
          return out;
        }
      }
    }
    return out;
  };

  const resolveChatModels = (secret) => {
    const safeSecret = secret && typeof secret === 'object' ? secret : {};
    const chatList = Array.isArray(safeSecret.chatLLMs) ? safeSecret.chatLLMs : [];
    const models = [];
    const seen = new Set();
    chatList.forEach((item) => {
      if (!item || typeof item !== 'object') return;
      const baseUrl = normalizeBaseUrlForStorage(item.baseUrl || '');
      const apiKey = normalizeText(item.apiKey || '');
      const modelNames = sanitizeModelList(item.models || [], 99);
      if (!baseUrl || !apiKey || !modelNames.length) return;
      modelNames.forEach((name) => {
        const dedupeKey = `${name.toLowerCase()}\u0000${baseUrl}\u0000${apiKey}`;
        if (seen.has(dedupeKey)) return;
        seen.add(dedupeKey);
        models.push({
          name,
          apiKey,
          baseUrl,
        });
      });
    });
    return models;
  };

  const resolveSummaryLLM = (secret) => {
    const safeSecret = secret && typeof secret === 'object' ? secret : {};
    const summarized = safeSecret.summarizedLLM || {};
    const baseUrl = normalizeBaseUrlForStorage(summarized.baseUrl || '');
    const apiKey = normalizeText(summarized.apiKey || '');
    const model = normalizeText(summarized.model || '');
    if (baseUrl && apiKey && model) {
      return { baseUrl, apiKey, model };
    }

    const chatModels = resolveChatModels(safeSecret);
    if (!chatModels.length) return null;
    return {
      baseUrl: normalizeBaseUrlForStorage(chatModels[0].baseUrl || ''),
      apiKey: normalizeText(chatModels[0].apiKey || ''),
      model: normalizeText(chatModels[0].name || ''),
    };
  };

  const inferProviderFromEndpoint = (baseUrl, model) => {
    const normalizedBaseUrl = normalizeBaseUrlForStorage(baseUrl || '').toLowerCase();
    const normalizedModel = normalizeText(model || '').toLowerCase();
    if (
      /(^|\/\/)(api\.)?deepseek\.com(?::\d+)?(?:$|\/)/i.test(normalizedBaseUrl)
      || normalizedModel.startsWith('deepseek-')
    ) {
      return 'deepseek';
    }
    if (/siliconflow\.cn/i.test(normalizedBaseUrl)) {
      return 'siliconflow';
    }
    if (/(^|\/\/)(api\.)?openai\.com(?::\d+)?(?:$|\/)/i.test(normalizedBaseUrl)) {
      return 'openai';
    }
    if (/(^|\/\/)openrouter\.ai(?::\d+)?(?:$|\/)/i.test(normalizedBaseUrl)) {
      return 'openrouter';
    }
    if (!normalizedBaseUrl && !normalizedModel) {
      // 未配置任何端点时维持旧的默认值，避免影响存量判定。
      return 'deepseek';
    }
    return 'custom';
  };

  const inferProviderType = (secret) => {
    const safeSecret = secret && typeof secret === 'object' ? secret : {};
    const llmProvider = safeSecret.llmProvider || {};
    const explicit = normalizeText(llmProvider.type || llmProvider.provider || '').toLowerCase();
    if (explicit) {
      return explicit;
    }
    const summarized = safeSecret.summarizedLLM || {};
    const chatList = Array.isArray(safeSecret.chatLLMs) ? safeSecret.chatLLMs : [];
    const firstChat = chatList[0] && typeof chatList[0] === 'object' ? chatList[0] : {};
    const baseUrl = summarized.baseUrl || firstChat.baseUrl || '';
    const model = normalizeText(summarized.model || '');
    return inferProviderFromEndpoint(baseUrl, model);
  };

  const getProviderPreset = (key) => {
    const presetKey = normalizeText(key).toLowerCase();
    const preset = PROVIDER_PRESETS[presetKey];
    if (!preset) return null;
    return {
      key: preset.key,
      label: preset.label,
      baseUrl: preset.baseUrl,
      models: [...preset.models],
    };
  };

  const getDeepSeekPreset = getProviderPreset;

  const inferChatApiProfile = (baseUrl, model) => {
    return inferProviderFromEndpoint(baseUrl, model);
  };

  const resolveJsonResponseMode = ({ baseUrl, model, preferSchema = true }) => {
    return 'json_object';
  };

  const isDeepSeekV4Model = (model) => {
    const normalizedModel = normalizeText(model || '').toLowerCase();
    return normalizedModel === 'deepseek-v4-flash' || normalizedModel === 'deepseek-v4-pro';
  };

  const resolveMaxOutputTokens = ({ baseUrl, model } = {}) => {
    const profile = inferChatApiProfile(baseUrl, model);
    if (profile === 'deepseek' && isDeepSeekV4Model(model)) {
      return DEEPSEEK_V4_MAX_OUTPUT_TOKENS;
    }
    return null;
  };

  const shouldUseXApiKeyHeader = ({ baseUrl, model }) => {
    return true;
  };

  const buildStreamingChatPayload = ({ baseUrl, model, messages }) => {
    const payload = {
      model: normalizeText(model),
      messages: Array.isArray(messages) ? messages : [],
      stream: true,
    };
    const maxTokens = resolveMaxOutputTokens({ baseUrl, model });
    if (maxTokens) {
      payload.max_tokens = maxTokens;
    }
    return payload;
  };

  const buildConnectivityTestPayload = ({ baseUrl, model }) => {
    const normalizedModel = normalizeText(model);
    return {
      model: normalizedModel,
      messages: [
        {
          role: 'system',
          content: 'Reply with exactly: hello world',
        },
        {
          role: 'user',
          content: 'hello world',
        },
      ],
      temperature: 0,
      max_tokens: 256,
    };
  };

  return {
    DEFAULT_DEEPSEEK_BASE_URL,
    DEFAULT_DEEPSEEK_CHAT_MODELS,
    PROVIDER_PRESETS,
    DEEPSEEK_PRESETS,
    normalizeText,
    normalizeBaseUrlForStorage,
    buildChatCompletionsEndpoint,
    sanitizeModelList,
    resolveChatModels,
    resolveSummaryLLM,
    inferProviderType,
    inferProviderFromEndpoint,
    getProviderPreset,
    getDeepSeekPreset,
    inferChatApiProfile,
    resolveJsonResponseMode,
    isDeepSeekV4Model,
    resolveMaxOutputTokens,
    shouldUseXApiKeyHeader,
    buildStreamingChatPayload,
    buildConnectivityTestPayload,
  };
});
