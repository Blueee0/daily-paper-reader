---
title: "MM-DeepResearch: A Simple and Effective Multimodal Agentic Search Baseline"
title_zh: MM-DeepResearch：一个简洁有效的多模态智能体搜索基线
authors: "Huanjin Yao, Qixiang Yin, Min Yang, Ziwang Zhao, Yibo Wang, Haotian Luo, Jingyi Zhang, Jiaxing Huang"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://openreview.net/pdf/770a877299dc2d3638738480ecdcf15cc6cfb393.pdf"
tags: ["query:fin-mm-agent"]
score: 7.0
evidence: 具备多工具调用与跨模态综合的多模态研究智能体
tldr: 构建能显式推理规划、多工具调用并跨模态综合的多模态研究智能体面临三大挑战：多模态检索问答数据稀缺、缺乏有效搜索轨迹、在线搜索API训练成本高昂。作者提出基于超图的Hyper-Search问答生成方法，连接模态内外的视觉与文本节点，并引入DR-TTS分解搜索过程。该工作为多模态智能体的深度检索研究提供了简洁有效的基线。
source: ICML-2026-Accepted
selection_source: conference_retrieval
motivation: 开发多模态研究智能体面临检索问答数据稀缺、搜索轨迹缺乏与在线搜索成本高昂的挑战。
method: 提出超图式问答生成方法Hyper-Search与搜索轨迹分解方法DR-TTS，支撑多工具跨模态检索。
result: 生成需多工具求解的检索密集型多模态问答，形成简洁有效的深度研究基线。
conclusion: 为多模态智能体的跨模态搜索与推理研究提供可复用方法。
---

## Abstract
We aim to develop a multimodal research agent capable of explicit reasoning and planning, multi-tool invocation, and cross-modal information synthesis, enabling it to conduct deep research tasks. However, we observe three main challenges in developing such agents: (1) scarcity of search-intensive multimodal QA data, (2) lack of effective search trajectories, and (3) prohibitive cost of training with online search APIs. To tackle them, we first propose **Hyper-Search**, a hypergraph-based QA generation method that models and connects visual and textual nodes within and across modalities, enabling to generate search-intensive multimodal QA pairs that require invoking various search tools to solve. Second, we introduce **DR-TTS**, which first decomposes search-involved tasks into several categories according to search tool types, and respectively optimize specialized search tool experts for each tool. It then recomposes tool experts to jointly explore search trajectories via tree search, producing trajectories that successfully solve complex tasks using various search tools. Third, we build an offline search engine supporting multiple search tools, enabling agentic reinforcement learning without using costly online search APIs. With the three designs, we develop **MM-DeepResearch**, a powerful multimodal deep research agent, and extensive results shows its superiority across benchmarks.

---

## 论文详细总结（自动生成）

### 1. 检索相关性
具备多工具调用与跨模态综合的多模态研究智能体。

### 2. 核心内容
构建能显式推理规划、多工具调用并跨模态综合的多模态研究智能体面临三大挑战：多模态检索问答数据稀缺、缺乏有效搜索轨迹、在线搜索API训练成本高昂。作者提出基于超图的Hyper-Search问答生成方法，连接模态内外的视觉与文本节点，并引入DR-TTS分解搜索过程。该工作为多模态智能体的深度检索研究提供了简洁有效的基线。

### 3. 对应检索需求
research on multimodal agents that integrate text, vision, and other modalities。

### 4. 来源与原文
- Source：ICML-2026-Accepted
- OpenReview：[https://openreview.net/forum?id=XZAOCytvKQ](https://openreview.net/forum?id=XZAOCytvKQ)
