---
title: "Towards Budget-Aware Agentic AI: Optimizing Tool Use with Intention-Based World Models"
title_zh: 迈向预算感知的智能体AI：用意图世界模型优化工具使用
authors: "Hanbing Liu, Chunhao Tian, Nan An, Ziyuan Wang, Pinyan Lu, Changyuan Yu, Qi Qi"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://openreview.net/pdf/164753eeb6ead7e3915981e02c2b49085987cbce.pdf"
tags: ["query:fin-mm-agent"]
score: 6.0
evidence: 调用外部工具的预算受限工具增强智能体
tldr: 预算受限的工具增强智能体需在严格货币预算下调用外部工具完成多步任务，但巨大的状态动作空间与高昂探索成本使直接规划不可行。本文提出INTENT，一种推理时规划框架，利用意图感知的层次化世界模型预测未来工具使用与风险校准成本，在线引导决策。在成本增强的StableToolBench上，INTENT能严格满足预算约束并显著提升任务表现，为工具增强智能体的成本控制提供了通用方法。
source: ICML-2026-Rejected-Public
selection_source: conference_retrieval
motivation: 工具增强智能体在严格预算下调用外部工具，直接规划因状态空间巨大而不可行。
method: 提出INTENT推理时规划框架，用意图感知层次世界模型预测工具使用与成本。
result: 在成本增强的StableToolBench上严格满足预算约束并显著提升任务完成表现。
conclusion: 为预算受限的工具增强智能体提供了可推广的成本感知规划方法。
---

## Abstract
We study budget-constrained tool-augmented agents, where a large language model must solve multi-step tasks by invoking external tools under a strict monetary budget.
  We formalize this setting as sequential decision making in context space with priced and stochastic tool executions, making direct planning intractable due to massive state–action spaces, high variance of outcomes and prohibitive exploration cost.

To address these challenges, we propose INTENT, an inference-time planning framework that leverages an intention-aware hierarchical world model to anticipate future tool usage, risk-calibrated cost, and guide decisions online. Across cost-augmented StableToolBench, INTENT strictly enforces hard budget feasibility while substantially improving task success over baselines, and remains robust under dynamic market shifts such as tool price changes and varying budgets. To facilitate future research on budget-aware agentic AI, we publicly release our code and datasets: https://anonymous.4open.science/r/icml_agent-A77F.

---

## 论文详细总结（自动生成）

### 1. 检索相关性
调用外部工具的预算受限工具增强智能体。

### 2. 核心内容
预算受限的工具增强智能体需在严格货币预算下调用外部工具完成多步任务，但巨大的状态动作空间与高昂探索成本使直接规划不可行。本文提出INTENT，一种推理时规划框架，利用意图感知的层次化世界模型预测未来工具使用与风险校准成本，在线引导决策。在成本增强的StableToolBench上，INTENT能严格满足预算约束并显著提升任务表现，为工具增强智能体的成本控制提供了通用方法。

### 3. 对应检索需求
tool augmented agents that use external APIs and retrieval for financial tasks。

### 4. 来源与原文
- Source：ICML-2026-Rejected-Public
- OpenReview：[https://openreview.net/forum?id=1MITZNzDFs](https://openreview.net/forum?id=1MITZNzDFs)
