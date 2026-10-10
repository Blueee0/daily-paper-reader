---
title: "AgencyBench: Benchmarking the Frontiers of Autonomous Agents in 1M-Token Real-World Contexts"
title_zh: AgencyBench：在百万标记真实场景中评测自主智能体前沿能力
authors: "Keyu Li, Junhao Shi, Yang Xiao, Mohan Jiang, Jie Sun, Yunze Wu, Dayuan Fu, Shijie Xia, Xiaojie Cai, Tianze Xu, Weiye Si, Wenjie Li, Dequan Wang, Pengfei Liu"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.acl-long.337.pdf"
tags: ["query:fin-mm-agent"]
score: 5.0
evidence: 面向真实场景多工具调用自主智能体的评测基准
tldr: 基于大模型的自主智能体对经济生产有重要贡献，但现有基准多聚焦单一能力，难以覆盖长程真实场景，且依赖人工反馈造成规模化瓶颈。本文提出AgencyBench，源于日常AI使用，覆盖32个真实场景、138项含查询与交付物的任务，平均需约90次工具调用与百万级上下文。该基准实现了自动化轨迹采集与评估，为工具型智能体的综合能力评测提供了参考，但未涉及金融多模态理解。
source: ACL-2026-Long
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long337/fig-001.webp\", \"caption\": \"\", \"page\": 3, \"index\": 1, \"width\": 455, \"height\": 419}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long337/fig-002.webp\", \"caption\": \"\", \"page\": 4, \"index\": 2, \"width\": 640, \"height\": 512}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long337/fig-003.webp\", \"caption\": \"\", \"page\": 4, \"index\": 3, \"width\": 640, \"height\": 621}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long337/fig-004.webp\", \"caption\": \"\", \"page\": 4, \"index\": 4, \"width\": 640, \"height\": 512}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long337/fig-005.webp\", \"caption\": \"\", \"page\": 4, \"index\": 5, \"width\": 640, \"height\": 529}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long337/fig-006.webp\", \"caption\": \"\", \"page\": 4, \"index\": 6, \"width\": 640, \"height\": 621}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long337/fig-007.webp\", \"caption\": \"\", \"page\": 4, \"index\": 7, \"width\": 546, \"height\": 1618}]"
motivation: 现有基准多聚焦单一智能体能力，缺乏长程真实场景覆盖，且依赖人工反馈形成规模化瓶颈。
method: 提出AgencyBench基准，源自日常AI使用，涵盖32个真实场景、138项任务，涉及平均约90次工具调用与百万级上下文。
result: 该基准支持自动化轨迹采集与评测，系统考察智能体多项核心能力。
conclusion: 该工作为自主工具型智能体的综合能力评测提供了可扩展基准。
---

## Abstract
Large Language Models (LLMs) based autonomous agents demonstrate multifaceted capabilities to contribute substantially to economic production. However, existing benchmarks remain focused on single agentic capability, failing to capture long-horizon real-world scenarios. Moreover, the reliance on human-in-the-loop feedback for realistic tasks creates a scalability bottleneck, hindering automated rollout collection and evaluation. To bridge this gap, we introduce AgencyBench, a comprehensive benchmark derived from daily AI usage, evaluating 6 core agentic capabilities across 32 real-world scenarios, comprising 138 tasks with specific queries, deliverables, and rubrics. These scenarios require an average of 90 tool calls, 1 million tokens, and hours of execution time to resolve. To enable automated evaluation, we employ a user simulation agent to provide iterative feedback, and a Docker sandbox to conduct visual and functional rubric-based assessment. Experiments reveal that closed-source models significantly outperform open-source models (48.4% vs 32.1%). Further analysis reveals significant disparities across models in resource efficiency, feedback-driven self-correction, and specific tool-use preferences.

---

## 论文详细总结（自动生成）

### 1. 核心问题与整体含义（研究动机与背景）

- **研究动机**：基于 LLM 的自主智能体被认为可对经济生产产生重要贡献，但现有智能体评测基准存在两大问题：
  - 多聚焦**单一能力**，如工具调用、软件工程或研究，难以覆盖真实世界中**长程、多轮、多能力耦合**的任务。
  - 真实任务常依赖 **human-in-the-loop** 人工反馈，导致 rollout 采集与评估难以规模化。
- **整体含义**：论文提出 **AgencyBench**，一个面向日常 AI 使用场景的综合基准，用于评测自主智能体在 **百万 token 级真实上下文**中的长程能力。
- 基准覆盖 **6 类核心智能体能力、32 个真实场景、138 个任务**，平均需要约 **90 次工具调用、1M tokens、数小时执行时间**。
- 论文希望借此衡量前沿智能体的实际经济价值，并推动从简单工具使用走向真正自主的长程任务解决。

---

### 2. 方法论：核心思想、关键技术细节与评估流程

- **核心思想**：以“能力—场景—任务”的分层结构构建真实、长程、可自动评估的智能体基准。
  - 6 类能力：游戏开发、前端开发、后端开发、代码生成、研究、MCP 工具使用。
  - 每个场景包含 1–5 个递进任务，前一任务结果影响后续任务。
  - 每个任务由三部分定义：
    - **Query**：具体需求描述；
    - **Deliverables**：期望输出文件或终端状态；
    - **Rubrics**：客观评分标准。

- **数据构建**：
  - 20 名人类专家参与构建，包括 AI 研究者、实践者、软件工程师。
  - 另设 4 名专家审查描述准确性、难度校准和环境配置。
  - 采用**全票共识**策略：只有所有专家一致同意，任务才最终保留。

- **Rollout 生成与自动评估流程**：
  - 每个任务在隔离 **workspace** 中运行，配备智能体 scaffold，包括文件操作、命令行执行、网页搜索、上下文管理等工具。
  - 智能体通过多轮交互生成 deliverables。
  - 引入 **用户模拟智能体**，根据 rubric 完成情况提供迭代反馈，模拟人类反馈，突破 human-in-the-loop 瓶颈。
  - deliverables 同步到 **Docker-based remote sandbox**，模拟鼠标点击、UI 渲染等人类操作，生成截图或录屏等视觉评估产物。
  - 产物进入独立 **eval-space**，通过可执行脚本进行 rubric-based 自动评分。

- **评估方式**：
  - **Rule-based Evaluation**：适用于可客观验证任务，如工具执行、数学优化、文件生成，将 rubric 转为断言逻辑。
  - **LLM-as-Judge**：适用于主观或复杂视觉任务。
    - Text-based Judge：使用 Claude-4-Sonnet，temperature 0.0，评估代码质量与逻辑。
    - Vision-based Judge：使用 Gemini-2.5-pro，temperature 0.0，评估动态行为和视觉正确性。
  - 对需要视觉交付物的任务，最终分数为文本 judge 与视觉 judge 的平均；否则仅由文本 judge 评分。

- **关键指标与公式**：
  - **Average Score, S_Avg**：rubric 满足比例映射到 0–100%，例如 10 条满足 6 条得 60%。
  - **Average Attempts, Att**：平均尝试轮数。若任务得分低于 60% 则失败，用户模拟智能体最多反馈 K 轮。  
    \[
    Att = \frac{M_{Att}}{M}
    \]
  - **Pass@k**：在 k 轮反馈内达到 60% 阈值的任务比例。  
    \[
    Pass@k = \frac{N_{pass}}{N}
    \]
  - **效率指标**：  
    \[
    E_{att} = \frac{S_{avg}}{Att}, \quad E_{tok} = \frac{S_{avg}}{Tok}
    \]
    其中 Tok 为每个场景平均 token 消耗，用于衡量资源效率。

---

### 3. 实验设计：数据集 / 场景、Benchmark 与对比方法

- **Benchmark 组成**：
  - 共 **32 个场景、138 个任务**。
  - 分布如下：
    - Game：10 场景，50 任务，约占 36.2%；
    - Front-end：3 场景，15 任务；
    - Back-end：3 场景，15 任务；
    - Code：9 场景，29 任务；
    - Research：5 场景，19 任务；
    - MCP：2 场景，10 任务。
  - 任务平均需约 **90 次工具调用、1M tokens、数小时执行时间**。

- **对比模型**：
  - 闭源模型：
    - GPT-5.2
    - Claude-4.5-Opus
    - Claude-4.5-Sonnet
    - Gemini-3-Pro
    - Grok-4.1-Fast
  - 开源模型：
    - GLM-4.6
    - DeepSeek-V3.2
    - Qwen-3-235B-A22B-Thinking
    - Kimi-K2-Thinking
  - 所有模型通过 **OpenRouter API** 访问，temperature 设为 **0.7**。

- **实验维度**：
  - 主结果：6 类能力上的平均分与平均尝试次数。
  - 反馈驱动自纠正：Pass@1、Pass@2 及提升比例。
  - 资源消耗：token 消耗、执行时间、工具调用轮数。
  - 效率分析：Attempt Efficiency
