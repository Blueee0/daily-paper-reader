---
title: Navigating Massive Visual Context in Retrieval-Augmented Generation via Multimodal Memory Graph
title_zh: 通过多模态记忆图导航检索增强生成中的海量视觉上下文
authors: "Qiuchen Wang, Shihang Wang, Yu Zeng, Qiang Zhang, Fanrui Zhang, Zhuoning Guo, Bosi Zhang, Wenxuan Huang, Lin Chen, Zehui Chen, Pengjun Xie, Ruixue Ding"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://openreview.net/pdf/15bcadd889fea39eb43c9100ff8bf6e8f045eccf.pdf"
tags: ["query:fin-mm-agent"]
score: 6.0
evidence: 通过记忆图对文本、图像与视频进行多模态检索增强推理
tldr: 传统检索增强生成依赖线性交互历史，难以应对信息稀疏但token密集的视觉数据长上下文推理。论文提出VimRAG，一种面向文本、图像与视频多模态检索增强推理的框架，将推理过程建模为动态有向无环图以结构化智能体状态与检索证据。该工作为多模态智能体的长上下文推理与记忆组织提供了通用方法。
source: ICML-2026-Accepted
selection_source: conference_retrieval
motivation: 传统RAG依赖线性交互历史，难以处理视觉数据信息稀疏却token密集的长上下文推理。
method: 提出VimRAG框架，将推理过程建模为动态有向无环图以结构化智能体状态与多模态证据。
result: 通过结构化记忆组织提升文本、图像与视频跨模态检索增强推理的效率与效果。
conclusion: 该工作为多模态智能体的长上下文推理与记忆管理提供了通用框架。
---

## Abstract
Effectively retrieving, reasoning, and understanding multimodal information remains a critical challenge for agentic systems. Traditional Retrieval-augmented Generation (RAG) methods rely on linear interaction histories, which struggle to handle long-context tasks, especially those involving information-sparse yet token-heavy visual data in iterative reasoning scenarios. To bridge this gap, we introduce VimRAG, a framework tailored for multimodal Retrieval-augmented Reasoning across text, images, and videos. Inspired by our systematic study, we model the reasoning process as a dynamic directed acyclic graph that structures the agent states and retrieved multimodal evidence. Building upon this structured memory, we introduce a Graph-Modulated Visual Memory Encoding mechanism, with which the significance of memory nodes is evaluated via their topological position, allowing the model to dynamically allocate high-resolution tokens to pivotal evidence while compressing or discarding trivial clues. To implement this paradigm, we propose a Graph-Guided Policy Optimization strategy. This strategy disentangles step-wise validity from trajectory-level rewards by pruning memory nodes associated with redundant actions, thereby facilitating fine-grained credit assignment. Extensive experiments demonstrate that VimRAG consistently achieves state-of-the-art performance on diverse multimodal RAG benchmarks.

---

## 论文详细总结（自动生成）

### 1. 检索相关性
通过记忆图对文本、图像与视频进行多模态检索增强推理。

### 2. 核心内容
传统检索增强生成依赖线性交互历史，难以应对信息稀疏但token密集的视觉数据长上下文推理。论文提出VimRAG，一种面向文本、图像与视频多模态检索增强推理的框架，将推理过程建模为动态有向无环图以结构化智能体状态与检索证据。该工作为多模态智能体的长上下文推理与记忆组织提供了通用方法。

### 3. 对应检索需求
multimodal reasoning over financial text, images, and structured data。

### 4. 来源与原文
- Source：ICML-2026-Accepted
- OpenReview：[https://openreview.net/forum?id=fylE5O8g5F](https://openreview.net/forum?id=fylE5O8g5F)
