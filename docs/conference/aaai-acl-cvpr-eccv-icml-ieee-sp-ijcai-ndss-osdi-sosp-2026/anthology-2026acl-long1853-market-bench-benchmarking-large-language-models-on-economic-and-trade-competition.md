---
title: "Market-Bench: Benchmarking Large Language Models on Economic and Trade Competition"
title_zh: Market-Bench：面向经济与贸易竞争的大模型评测基准
authors: "Yushuo Zheng, Huiyu Duan, Zicheng Zhang, Yucheng Zhu, Xiongkuo Min, Guangtao Zhai"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.acl-long.1853.pdf"
tags: ["query:fin-mm-agent"]
score: 5.0
evidence: 面向经济与贸易竞争任务的大模型评测基准
tldr: 大模型管理与获取经济资源的能力尚不清晰。本文提出Market-Bench，构建可配置的多智能体供应链经济模型，让大模型充当负责采购与零售的零售商智能体：采购阶段在预算约束拍卖中竞价，零售阶段设定价格、生成营销标语并通过基于角色的注意力机制触达买家。基准记录完整的竞价与定价轨迹。该工作为经济金融场景下的智能体能力评测提供了基准，但与多模态视觉理解关联有限。
source: ACL-2026-Long
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1853/fig-001.webp\", \"caption\": \"\", \"page\": 1, \"index\": 1, \"width\": 2250, \"height\": 2250}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1853/fig-002.webp\", \"caption\": \"\", \"page\": 3, \"index\": 2, \"width\": 480, \"height\": 466}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1853/fig-003.webp\", \"caption\": \"\", \"page\": 3, \"index\": 3, \"width\": 431, \"height\": 503}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1853/fig-004.webp\", \"caption\": \"\", \"page\": 3, \"index\": 4, \"width\": 407, \"height\": 410}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1853/fig-005.webp\", \"caption\": \"\", \"page\": 3, \"index\": 5, \"width\": 1312, \"height\": 816}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1853/fig-006.webp\", \"caption\": \"\", \"page\": 3, \"index\": 6, \"width\": 656, \"height\": 408}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1853/fig-007.webp\", \"caption\": \"\", \"page\": 4, \"index\": 7, \"width\": 3165, \"height\": 2250}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1853/fig-008.webp\", \"caption\": \"\", \"page\": 6, \"index\": 8, \"width\": 3999, \"height\": 1098}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1853/fig-009.webp\", \"caption\": \"\", \"page\": 7, \"index\": 9, \"width\": 3999, \"height\": 202}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1853/fig-010.webp\", \"caption\": \"\", \"page\": 7, \"index\": 10, \"width\": 3999, \"height\": 1035}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1853/fig-011.webp\", \"caption\": \"\", \"page\": 7, \"index\": 11, \"width\": 3996, \"height\": 190}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1853/fig-012.webp\", \"caption\": \"\", \"page\": 7, \"index\": 12, \"width\": 3997, \"height\": 762}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1853/fig-013.webp\", \"caption\": \"\", \"page\": 8, \"index\": 13, \"width\": 2553, \"height\": 1690}]"
motivation: 大模型在管理与获取经济资源方面的能力尚不明确，缺乏系统评测手段。
method: 构建可配置多智能体供应链经济模型，让大模型作为零售商在拍卖中竞价、设定价格并生成营销标语。
result: 基准完整记录竞价与定价轨迹，用于评估大模型在经济竞争中的表现。
conclusion: 该基准为经济金融决策智能体的能力评测提供了可复用的实验平台。
---

## Abstract
The ability of large language models (LLMs) to manage and acquire economic resources remains unclear. In this paper, we introduce Market-Bench , a comprehensive benchmark that evaluates the capabilities of LLMs in economically-relevant tasks through economic and trade competition. Specifically, we construct a configurable multi-agent supply chain economic model where LLMs act as retailer agents responsible for procuring and retailing merchandise. In the procurement stage, LLMs bid for limited inventory in budget-constrained auctions. In the retail stage, LLMs set retail prices, generate marketing slogans, and provide them to buyers through a role-based attention mechanism for purchase. Market-Bench logs complete trajectories of bids, prices, slogans, sales, and balance-sheet states, enabling automatic evaluation with economic, operational, and semantic metrics. Benchmarking on 20 open- and closed-source LLM agents reveals significant performance disparities and winner-take-most phenomenon, i.e. , only a small subset of LLM retailers can consistently achieve capital appreciation, while many hover around the break-even point despite similar semantic matching scores. Market-Bench provides a reproducible testbed for studying how LLMs interact in competitive markets.

---

## 论文详细总结（自动生成）

# Market-Bench 论文中文总结

## 1. 核心问题与整体含义
- **研究动机**：大语言模型（LLM）管理与获取经济资源的能力仍不清晰。现有评测多只考察单一能力：社会模拟侧重开放式角色扮演，缺少资金、库存、破产等硬经济约束；经济/博弈模拟侧重数值策略，却往往忽略自由文本营销语言的作用。
- **核心缺口**：缺少一个同时要求“数值优化”与“语义适应”的闭环经济评测环境，即在稀缺、竞争、预算约束和破产风险下，检验 LLM 能否完成采购、定价与营销的联合决策。
- **论文问题**：当代 LLM 能否在具有稀缺性和竞争性的市场中，同时进行定量推理与语义适配，并维持经济生存？
- **整体含义**：论文提出 **Market-Bench**，把 LLM 作为零售商智能体放入多智能体供应链经济中，使语言直接具有经济后果，从而评测 LLM 在竞争市场中的“双过程”能力。

## 2. 方法论
- **核心思想**：构建一个可配置的多智能体供应链经济模型，形式化为带财务与物理约束的部分可观测马尔可夫博弈。LLM 零售商在采购阶段竞标有限库存，在零售
