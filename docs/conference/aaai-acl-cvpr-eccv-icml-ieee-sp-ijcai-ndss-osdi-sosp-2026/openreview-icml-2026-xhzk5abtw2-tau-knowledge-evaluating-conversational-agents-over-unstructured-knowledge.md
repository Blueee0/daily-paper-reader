---
title: "$\\tau$-Knowledge: Evaluating Conversational Agents over Unstructured Knowledge"
title_zh: τ-Knowledge：面向非结构化知识的对话智能体评估
authors: "Quan Shi, Alexandra Zytek, Pedram Razavi, Karthik R Narasimhan, Victor Barres"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://openreview.net/pdf/35cd91ec01a5bae03ff42e28a7b6e4bf6d92f26d.pdf"
tags: ["query:fin-mm-agent"]
score: 6.0
evidence: 在金融科技场景中协调外部知识检索与工具调用的智能体评测
tldr: 现有基准往往将检索与工具使用割裂评估，难以反映长程真实智能体行为。本文提出tau-Knowledge，扩展tau-Bench，要求智能体在交互中协调外部非结构化知识与工具输出，生成可验证且合规的状态变更。新增tau-Banking域模拟真实金融科技客户场景。实验揭示完全智能体化评估中的不足，为金融领域检索增强工具型智能体提供了更贴近现实的评测框架。
source: ICML-2026-Accepted
selection_source: conference_retrieval
motivation: 现有基准把检索与工具使用分开评估，缺乏对非结构化数据上完全智能体化长程交互的真实考察。
method: 作者扩展tau-Bench提出tau-Knowledge，构建tau-Banking金融科技域，要求智能体协调外部自然语言知识与工具输出完成合规状态变更。
result: 新评测环境暴露出智能体在知识检索与工具协调上的能力缺口，验证了更贴近现实的评估价值。
conclusion: 该工作为金融科技等知识密集型场景的检索增强工具型智能体提供了现实化评测基准。
---

## Abstract
Conversational agents are increasingly deployed in knowledge-intensive settings, where correct behavior depends on retrieving and applying domain-specific knowledge from large, proprietary, and unstructured corpora during live interactions with users. Yet most existing benchmarks evaluate retrieval or tool use independently of each other, creating a gap in realistic, fully agentic evaluation over unstructured data in long-horizon interactions. We introduce $\tau$-Knowledge, an extension of $\tau$-Bench for evaluating agents in environments where success depends on coordinating external, natural-language knowledge with tool outputs to produce verifiable, policy-compliant state changes. Our new domain, $\tau$-Banking, models realistic fintech customer support workflows in which agents must navigate roughly 700 interconnected knowledge documents while executing tool-mediated account updates. Across embedding-based retrieval and terminal-based search, even frontier models with high reasoning budgets achieve only $\sim$25.5\% pass^1, with reliability degrading sharply over repeated trials. Agents struggle to retrieve the correct documents from densely interlinked knowledge bases and to reason accurately over complex internal policies. Overall, $\tau$-Knowledge provides a realistic testbed for developing agents that integrate unstructured knowledge in human-facing deployments.

---

## 论文详细总结（自动生成）

### 1. 检索相关性
在金融科技场景中协调外部知识检索与工具调用的智能体评测。

### 2. 核心内容
现有基准往往将检索与工具使用割裂评估，难以反映长程真实智能体行为。本文提出tau-Knowledge，扩展tau-Bench，要求智能体在交互中协调外部非结构化知识与工具输出，生成可验证且合规的状态变更。新增tau-Banking域模拟真实金融科技客户场景。实验揭示完全智能体化评估中的不足，为金融领域检索增强工具型智能体提供了更贴近现实的评测框架。

### 3. 对应检索需求
tool augmented agents that use external APIs and retrieval for financial tasks。

### 4. 来源与原文
- Source：ICML-2026-Accepted
- OpenReview：[https://openreview.net/forum?id=XHZK5abtw2](https://openreview.net/forum?id=XHZK5abtw2)
