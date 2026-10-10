---
title: Hierarchical Procedural Meta-Reasoning for Generalizable Multimodal Agents
title_zh: 面向可泛化多模态智能体的分层程序化元推理
authors: "Yao Fu, Shengyi Qian, Pierluca D'Oro, Fanyi Xiao, Honglak Lee, Joseph Tighe, Manchen Wang"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://openreview.net/pdf/334654ec8cef7a659a9987c22f149fdac6ce1c2c.pdf"
tags: ["query:fin-mm-agent"]
score: 7.0
evidence: 具备元推理与程序性知识的多模态智能体
tldr: 多模态智能体经微调虽性能强，但在移动导航等多样应用与频繁系统变更的真实任务中泛化能力有限。作者认为瓶颈在于智能体是否具备足够的任务程序性知识，并提出程序感知的多模态智能体与元推理框架，将任务知识显式表示为自然语言并借助外部搜索补充。该框架提升了智能体在复杂真实场景中的泛化能力，为多模态智能体研究提供新思路。
source: ICML-2026-Accepted
selection_source: conference_retrieval
motivation: 多模态智能体在多样且多变的真实任务中泛化能力不足，根源在于缺乏任务程序性知识。
method: 提出程序感知多模态智能体与元推理框架，将任务知识显式表示为自然语言并借助外部搜索。
result: 在移动导航等复杂真实任务中提升智能体的泛化表现。
conclusion: 以程序性知识与元推理为切入点，为可泛化多模态智能体提供新框架。
---

## Abstract
While multimodal agents can achieve strong performance through fine-tuning, their ability to generalize remains limited in complex real-world tasks such as mobile navigation, where diverse applications, frequent system changes, and customized workflows are common in practice. We argue that a fundamental bottleneck lies in whether an agent possesses sufficient task-specific procedural knowledge to accomplish a given goal. Such procedural knowledge may be provided by the general capabilities of large language models, or obtained from additional external resources such as web search when necessary. Based on this view, we propose Procedure-Aware Multimodal Agent with Meta Reasoning, a framework that explicitly represents task knowledge as natural-language procedures and trains a procedure-aware grounded agent to condition its actions on this knowledge. By learning to leverage procedural knowledge from different sources, our approach enables robust generalization across tasks, applications, interface versions, and multi-app workflows, achieving substantial improvements on challenging Android benchmarks.

---

## 论文详细总结（自动生成）

### 1. 检索相关性
具备元推理与程序性知识的多模态智能体。

### 2. 核心内容
多模态智能体经微调虽性能强，但在移动导航等多样应用与频繁系统变更的真实任务中泛化能力有限。作者认为瓶颈在于智能体是否具备足够的任务程序性知识，并提出程序感知的多模态智能体与元推理框架，将任务知识显式表示为自然语言并借助外部搜索补充。该框架提升了智能体在复杂真实场景中的泛化能力，为多模态智能体研究提供新思路。

### 3. 对应检索需求
research on multimodal agents that integrate text, vision, and other modalities。

### 4. 来源与原文
- Source：ICML-2026-Accepted
- OpenReview：[https://openreview.net/forum?id=v2H2vzRqcr](https://openreview.net/forum?id=v2H2vzRqcr)
