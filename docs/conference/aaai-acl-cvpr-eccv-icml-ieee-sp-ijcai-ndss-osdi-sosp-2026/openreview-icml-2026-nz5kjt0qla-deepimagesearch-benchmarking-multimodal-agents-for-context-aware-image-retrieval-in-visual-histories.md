---
title: "DeepImageSearch: Benchmarking Multimodal Agents for Context-Aware Image Retrieval in Visual Histories"
title_zh: DeepImageSearch：面向视觉历史中上下文感知图像检索的多模态智能体基准
authors: "Chenlong Deng, Mengjie Deng, Junjie Wu, Dun Zeng, Teng Wang, Qingsong Xie, Jiadeng Huang, Shengjie Ma, Changwang Zhang, Zhaoxiang Wang, Jun Wang, Yutao Zhu, Zhicheng Dou"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://openreview.net/pdf/8c83626cc4182ace747d9613669857cebf3e8c91.pdf"
tags: ["query:fin-mm-agent"]
score: 5.0
evidence: 面向视觉历史的上下文感知图像检索多模态智能体
tldr: 现有多模态检索系统假设查询与图像相关性可孤立度量，忽视真实视觉流中的时序依赖。论文提出DeepImageSearch，将图像检索重构为自主探索任务，要求智能体基于隐式上下文线索对原始视觉历史进行多步推理，并构建DISBench基准。该工作推动了多模态智能体在复杂视觉场景下的推理研究。
source: ICML-2026-Accepted
selection_source: conference_retrieval
motivation: 现有多模态检索假设查询与图像相关性可孤立度量，忽略视觉流中的时序依赖。
method: 提出DeepImageSearch智能体范式，将图像检索重构为对视觉历史的多步自主探索任务。
result: 构建了基于互联视觉数据的DISBench基准，用于评估智能体的上下文检索能力。
conclusion: 该工作推动多模态智能体在复杂视觉场景下的多步推理与检索研究。
---

## Abstract
Existing multimodal retrieval systems excel at semantic matching but implicitly assume that query-image relevance can be measured in isolation. This paradigm overlooks the rich dependencies inherent in realistic visual streams, where information is distributed across temporal sequences rather than confined to single snapshots. To bridge this gap, we introduce DeepImageSearch, a novel agentic paradigm that reformulates image retrieval as an autonomous exploration task. Models must plan and perform multi-step reasoning over raw visual histories to locate targets based on implicit contextual cues. We construct DISBench, a challenging benchmark built on interconnected visual data. To address the scalability challenge of creating context-dependent queries, we propose a human-model collaborative pipeline that employs vision-language models to mine latent spatiotemporal associations, effectively offloading intensive context discovery before human verification. Furthermore, we build a robust baseline using a modular agent framework equipped with fine-grained tools and a dual-memory system for long-horizon navigation. Extensive experiments demonstrate that DISBench poses significant challenges to state-of-the-art models, highlighting the necessity of incorporating agentic reasoning into next-generation retrieval systems.

---

## 论文详细总结（自动生成）

### 1. 检索相关性
面向视觉历史的上下文感知图像检索多模态智能体。

### 2. 核心内容
现有多模态检索系统假设查询与图像相关性可孤立度量，忽视真实视觉流中的时序依赖。论文提出DeepImageSearch，将图像检索重构为自主探索任务，要求智能体基于隐式上下文线索对原始视觉历史进行多步推理，并构建DISBench基准。该工作推动了多模态智能体在复杂视觉场景下的推理研究。

### 3. 对应检索需求
research on multimodal agents that integrate text, vision, and other modalities。

### 4. 来源与原文
- Source：ICML-2026-Accepted
- OpenReview：[https://openreview.net/forum?id=nZ5kjt0Qla](https://openreview.net/forum?id=nZ5kjt0Qla)
