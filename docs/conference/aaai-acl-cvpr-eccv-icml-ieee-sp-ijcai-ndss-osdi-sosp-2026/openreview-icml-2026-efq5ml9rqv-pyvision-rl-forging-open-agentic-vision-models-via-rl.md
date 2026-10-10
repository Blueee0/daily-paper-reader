---
title: "PyVision-RL: Forging Open Agentic Vision Models via RL"
title_zh: PyVision-RL：通过强化学习锻造开放智能体视觉模型
authors: "Shitian Zhao, Shaoheng Lin, Ming Li, Haoquan Zhang, Wenshuo Peng, Kaipeng Zhang, Chen Wei"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://openreview.net/pdf/89e2477807db5cc737d271c7cc9dc27041ec351a.pdf"
tags: ["query:fin-mm-agent"]
score: 6.0
evidence: 维持多轮工具调用的智能体多模态强化学习框架
tldr: 面向智能体多模态模型的强化学习常出现交互坍缩，模型逐渐减少工具调用与多轮推理，削弱了智能体行为的收益。本文提出PyVision-RL框架，结合过采样-过滤-排序的采样策略与累积工具奖励来稳定训练并维持交互，据此构建了图像与视频理解模型。视频推理中采用按需上下文构建，动态采样任务相关帧。实验表明该框架有效缓解坍缩并提升多模态推理表现。
source: ICML-2026-Accepted
selection_source: conference_retrieval
motivation: 智能体多模态模型的强化学习易发生交互坍缩，模型减少工具使用与多轮推理，削弱智能体行为收益。
method: 提出PyVision-RL框架，结合过采样-过滤-排序的采样策略与累积工具奖励以稳定训练并维持多轮交互。
result: 实验表明该方法有效防止交互坍缩，提升图像与视频理解及多轮工具使用表现。
conclusion: 为开放权重多模态智能体的稳定强化学习与持续工具交互提供了通用训练范式。
---

## Abstract
Reinforcement learning for agentic multimodal models often suffers from interaction collapse, where models learn to reduce tool usage and multi-turn reasoning, limiting the benefits of agentic behavior. We introduce PyVision-RL, a reinforcement learning framework for open-weight multimodal models that stabilizes training and sustains interaction. Our approach combines an oversampling–filtering–ranking rollout strategy with an accumulative tool reward to prevent collapse and encourage multi-turn tool use. Using a unified training pipeline, we develop PyVision-Image and PyVision-Video for image and video understanding. For video reasoning, PyVision-Video employs on-demand context construction, selectively sampling task-relevant frames during reasoning to significantly reduce visual token usage. Experiments show strong performance and improved efficiency, demonstrating that sustained interaction and on-demand visual processing are critical for scalable multimodal agents.

---

## 论文详细总结（自动生成）

### 1. 检索相关性
维持多轮工具调用的智能体多模态强化学习框架。

### 2. 核心内容
面向智能体多模态模型的强化学习常出现交互坍缩，模型逐渐减少工具调用与多轮推理，削弱了智能体行为的收益。本文提出PyVision-RL框架，结合过采样-过滤-排序的采样策略与累积工具奖励来稳定训练并维持交互，据此构建了图像与视频理解模型。视频推理中采用按需上下文构建，动态采样任务相关帧。实验表明该框架有效缓解坍缩并提升多模态推理表现。

### 3. 对应检索需求
research on multimodal agents that integrate text, vision, and other modalities。

### 4. 来源与原文
- Source：ICML-2026-Accepted
- OpenReview：[https://openreview.net/forum?id=EFq5Ml9rqv](https://openreview.net/forum?id=EFq5Ml9rqv)
