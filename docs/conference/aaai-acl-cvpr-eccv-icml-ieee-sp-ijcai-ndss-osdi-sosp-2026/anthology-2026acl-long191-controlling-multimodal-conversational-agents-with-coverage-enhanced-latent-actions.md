---
title: Controlling Multimodal Conversational Agents with Coverage-Enhanced Latent Actions
title_zh: 用覆盖率增强的潜在动作控制多模态对话智能体
authors: "Yongqi Li, Hao Lang, Tieyun Qian, Yongbin Li"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.acl-long.191.pdf"
tags: ["query:fin-mm-agent"]
score: 4.0
evidence: 通过潜在动作强化学习控制多模态对话智能体
tldr: 视觉语言模型日益被用作多模态对话智能体，但基于强化学习的微调面临文本词元空间过大的挑战。本文改为学习紧凑的潜在动作空间进行RL微调，采用从观测中学习机制构建码本，用未来观测估计当前潜在动作。该方法缓解了大词元空间带来的训练困难，提升了多模态对话智能体的可控性。
source: ACL-2026-Long
selection_source: conference_retrieval
motivation: 多模态对话智能体RL微调受制于巨大的文本词元空间。
method: 学习紧凑潜在动作空间，用从观测中学习构建码本进行RL微调。
result: 缓解大词元空间训练难题，提升多模态对话智能体的可控性。
conclusion: 为多模态对话智能体的强化学习控制提供紧凑动作表示方案。
---

## Abstract
Vision-language models are increasingly employed as multimodal conversational agents (MCAs) for diverse conversational tasks. Recently, reinforcement learning (RL) has been widely explored for adapting MCAs to various human-AI interaction scenarios. Despite showing great enhancement in generalization performance, fine-tuning MCAs via RL still faces challenges in handling the extremely large text token space. To address this, we learn a compact latent action space for RL fine-tuning instead. Specifically, we adopt the learning from observation mechanism to construct the codebook for the latent action space, where future observations are leveraged to estimate current latent actions that could further be used to reconstruct future observations. However, the scarcity of paired image-text data hinders learning a codebook with sufficient coverage. Thus, we leverage both paired image-text data and text-only data to construct the latent action space, using a cross-modal projector for transforming text embeddings into image-text embeddings. We initialize the cross-modal projector on paired image-text data, and further train it on massive text-only data with a novel cycle consistency loss to enhance its robustness. We show that our latent action based method outperforms competitive baselines on two conversation tasks across various RL algorithms. Code and data are available at https://github.com/AlibabaResearch/DAMO-ConvAI/tree/main/MMLatentAction.

---

## 论文详细总结（自动生成）

### 1. 检索相关性
通过潜在动作强化学习控制多模态对话智能体。

### 2. 核心内容
视觉语言模型日益被用作多模态对话智能体，但基于强化学习的微调面临文本词元空间过大的挑战。本文改为学习紧凑的潜在动作空间进行RL微调，采用从观测中学习机制构建码本，用未来观测估计当前潜在动作。该方法缓解了大词元空间带来的训练困难，提升了多模态对话智能体的可控性。

### 3. 对应检索需求
research on multimodal agents that integrate text, vision, and other modalities。

### 4. 来源与原文
- Source：ACL-2026-Long
- OpenReview：[https://aclanthology.org/2026.acl-long.191/](https://aclanthology.org/2026.acl-long.191/)
