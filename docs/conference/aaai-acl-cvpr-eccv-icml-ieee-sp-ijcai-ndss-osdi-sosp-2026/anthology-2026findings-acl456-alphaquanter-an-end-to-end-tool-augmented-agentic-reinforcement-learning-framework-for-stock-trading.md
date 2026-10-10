---
title: "AlphaQuanter: An End-to-End Tool-Augmented Agentic Reinforcement Learning Framework for Stock Trading"
title_zh: AlphaQuanter：面向股票交易的端到端工具增强智能体强化学习框架
authors: "Zheye Deng, Weixiang Yan, Changlong Yu, Jiashu Wang"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.findings-acl.456.pdf"
tags: ["query:fin-mm-agent"]
score: 8.0
evidence: 面向自主股票交易决策的工具增强智能体强化学习框架
tldr: 现有基于大模型的自动交易多智能体框架存在效率低、信号不一致、缺乏端到端优化等问题。论文提出AlphaQuanter，一种单智能体框架，利用强化学习在透明且工具增强的决策流程上学习动态策略，使智能体能自主编排工具并按需主动获取信息。实验表明该方法在股票交易任务上取得领先表现，为金融决策智能体提供了可优化范式。
source: ACL-2026-Findings
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl456/fig-001.webp\", \"caption\": \"\", \"page\": 3, \"index\": 1, \"width\": 1502, \"height\": 361}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl456/fig-002.webp\", \"caption\": \"\", \"page\": 3, \"index\": 2, \"width\": 480, \"height\": 270}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl456/fig-003.webp\", \"caption\": \"\", \"page\": 3, \"index\": 3, \"width\": 4016, \"height\": 495}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl456/fig-004.webp\", \"caption\": \"\", \"page\": 3, \"index\": 4, \"width\": 2498, \"height\": 361}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl456/fig-005.webp\", \"caption\": \"\", \"page\": 3, \"index\": 5, \"width\": 405, \"height\": 407}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl456/fig-006.webp\", \"caption\": \"\", \"page\": 3, \"index\": 6, \"width\": 405, \"height\": 407}]"
motivation: 现有LLM自动交易多智能体框架效率低、信号不一致且缺乏端到端优化。
method: 提出AlphaQuanter单智能体框架，用强化学习在工具增强决策流程上学习动态策略并自主编排工具。
result: 实验表明该框架能自主获取信息并形成透明推理过程，在股票交易上取得领先表现。
conclusion: 该工作为金融交易决策智能体提供了端到端可优化的工具增强范式。
---

## Abstract
While Large Language Model (LLM) agents show promise in automated trading, they still face critical limitations. Prominent multi-agent frameworks often suffer from inefficiency, produce inconsistent signals, and lack the end-to-end optimization required to learn a coherent strategy from market feedback. To address this, we introduce **AlphaQuanter**, a single-agent framework that uses reinforcement learning (RL) to learn a dynamic policy over a transparent, tool-augmented decision workflow, which empowers a single agent to *autonomously orchestrate tools* and *proactively acquire information* on demand, establishing a transparent reasoning process. Extensive experiments demonstrate that AlphaQuanter achieves state-of-the-art performance on key financial metrics. Besides, human evaluation shows the learned reasoning patterns reveal more faithful and coherent tool-usage behaviors, providing steps toward verifiable LLM-driven trading. Our code and data can be found at https://github.com/horizon-llm/AlphaQuanter.

---

## 论文详细总结（自动生成）

# AlphaQuanter 论文中文总结

## 1. 核心问题与整体含义
- **背景**：LLM 智能体在自动交易中展现潜力，但现有方法存在明显瓶颈：多智能体框架效率低、信号不一致、决策冗余且脆弱；基于 prompt 的方法对提示工程敏感、鲁棒性差；传统深度强化学习虽可端到端优化收益，但黑盒性强，难以追溯到具体证据。
- **核心问题**：如何在部分可观测市场中，让交易智能体主动编排外部工具、按需获取信息，并形成可验证、可审计的决策轨迹，同时直接优化长期交易收益。
- **整体含义**：论文提出 **AlphaQuanter**，将工具使用纳入强化学习策略，使单智能体能够自主决定“何时调用哪个工具、如何基于证据决策”，目标是在盈利能力、推理透明度和推理成本之间取得平衡。

## 2. 方法论
- **核心思想**：采用单智能体、ReAct 风格的工作流，将交易任务建模为**工具增强的马尔可夫决策过程（MDP）**，并用 RL 端到端优化整个决策轨迹。
- **MDP 建模**：
  - 状态 \(s=(\text{initial\_context}, \text{query\_history}, \text{query\_result})\)，记录股票、日期、历史工具调用及返回结果。
  - 动作空间包括两类：查询动作 \(A_q\)（调用市场数据、基本面、情绪、宏观等工具）和决策动作 \(A_d=\{\text{BUY}, \text{SELL}, \text{HOLD}\}\)。
  - 查询动作会追加状态，决策动作终止回合；目标是最大化轨迹累计奖励。
- **认知工作流**：Plan → Acquire → Reason → Act/Decision → Update。智能体先形成初始假设，再逐步调用工具、分析证据，最后输出 `<answer>BUY/SELL/HOLD</answer>`。每一步通常只调用一个工具，最多 8 次工具调用。
- **奖励设计**：
  - 总奖励 \(R=\alpha R_{\text{result}}+R_{\text{format}}+R_{\text{tool}}\)。
  - **结果奖励**基于指数加权未来收益，判断市场处于强看涨、强看跌或横盘状态，再按动作给离散奖励。例如强看涨时 BUY +1.0、SELL -1.0、HOLD -0.75；横盘时 HOLD +1.0、BUY/SELL -0.5。
  - **格式奖励**控制推理长度在约 200–600 token 区间，避免过短或冗长。
  - **工具奖励**控制工具调用次数在约 4–8 次，惩罚重复调用、非法参数、未来日期以及“一次性收集全部数据再回答”的退化模式。
- **训练方式**：使用 GRPO 算法、verl 框架，以 Qwen2.5-3B-Instruct 和 Qwen2.5-7B-Instruct 为 backbone；推理时采用确定性解码（temperature=0）。

## 3. 实验设计
- **数据集/场景**：五只信息丰富的美股：GOOGL、META、MSFT、NVDA、TSLA。数据按时间划分：
  - 训练：2022-09-01 至 2024-03-30，约 19 个月、395 个交易日。
  - 验证：2024-05-15 至 2024-11-14，约 6 个月、128 个交易日。
  - 测试：2025-01-01 至 2025-06-30，约 6 个月、122 个交易日。
  - 各集合之间留约 30 个交易日间隔，防止泄漏。
- **信息源**：四类工具，包括市场数据与技术指标、基本面数据、情绪数据（新闻、Reddit）、宏观经济指标。
- **Benchmark/对比方法**：
  - Market：Buy-and-Hold。
  - Rule：MACD、ZMR。
  - RL：FinRL 中的 A2C、PPO。
  - LM：Chronos-2。
  - LLM：FinMem、TradingAgents。
  - Multi-Agent：TradingAgents 搭配 Qwen2.5-3B/7B、Q
