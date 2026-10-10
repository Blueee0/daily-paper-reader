---
title: Strategic Navigation or Stochastic Search? How Agents and Humans Reason Over Document Collections
title_zh: 策略性导航还是随机搜索？智能体与人类如何在文档集合上推理
authors: "Łukasz Borchmann, Jordy Van Landeghem, Michał Turski, Shreyansh Padarha, Ryan Othniel Kearns, Adam Mahdi, Niels Rogge, Clémentine Fourrier, Siwei Han, Huaxiu Yao, Artemis Llabrés, Yiming Xu, Dimosthenis Karatzas, Hao Zhang, Anupam Datta"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://openreview.net/pdf/49a006be2baa861f64ba087f7e193e535f064093.pdf"
tags: ["query:fin-mm-agent"]
score: 6.0
evidence: 多模态智能体在异构文档集合上的推理
tldr: "多模态智能体有望自动化文档密集型工作流，但其究竟具备策略性推理还是仅做随机试错搜索仍不明确。本文提出MADQA，一个基于800份异构PDF文档、2,250道人工撰写问题的基准，并引入衡量准确率与努力权衡的评估协议。实验显示最优智能体虽在原始准确率上可比肩人类，但成功的问题集与人类差异显著，揭示了当前智能体在文档推理上的局限，为多模态文档智能体评估提供了新框架。"
source: ICML-2026-Accepted
selection_source: conference_retrieval
motivation: 多模态智能体能否在文档密集任务中进行真正的策略性推理尚不清楚。
method: 构建MADQA基准，含800份PDF与2250道问题，并设计准确率-努力权衡评估协议。
result: 最优智能体准确率接近人类，但成功的问题集与人类差异显著。
conclusion: 揭示了智能体文档推理的局限，为多模态文档智能体提供了新评测框架。
---

## Abstract
Multimodal agents offer a promising path to automating complex document-intensive workflows. Yet, a critical question remains: do these agents demonstrate genuine strategic reasoning, or merely stochastic trial-and-error search?  To address this, we introduce MADQA, a benchmark of 2,250 human-authored questions grounded in 800 heterogeneous PDF documents. Guided by Classical Test Theory, we design it to maximize discriminative power across varying levels of agentic abilities. To evaluate agentic behavior, we introduce a novel protocol that measures the accuracy-effort trade-off. Using this framework, we show that while the best agents can match human searchers in raw accuracy, they succeed on largely different questions and rely on brute-force search to compensate for weak strategic planning. They fail to close the nearly 20\% gap to oracle performance, persisting in unproductive loops. We release the dataset and evaluation harness to help facilitate the transition from brute-force retrieval to calibrated, efficient reasoning.

---

## 论文详细总结（自动生成）

### 1. 检索相关性
多模态智能体在异构文档集合上的推理。

### 2. 核心内容
多模态智能体有望自动化文档密集型工作流，但其究竟具备策略性推理还是仅做随机试错搜索仍不明确。本文提出MADQA，一个基于800份异构PDF文档、2,250道人工撰写问题的基准，并引入衡量准确率与努力权衡的评估协议。实验显示最优智能体虽在原始准确率上可比肩人类，但成功的问题集与人类差异显著，揭示了当前智能体在文档推理上的局限，为多模态文档智能体评估提供了新框架。

### 3. 对应检索需求
understanding financial documents such as reports, tables, and charts。

### 4. 来源与原文
- Source：ICML-2026-Accepted
- OpenReview：[https://openreview.net/forum?id=ds3ZOevkwx](https://openreview.net/forum?id=ds3ZOevkwx)
