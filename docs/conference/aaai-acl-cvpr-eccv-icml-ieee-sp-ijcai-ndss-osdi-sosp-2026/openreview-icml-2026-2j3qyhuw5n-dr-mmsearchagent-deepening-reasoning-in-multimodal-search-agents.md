---
title: "DR-MMSearchAgent: Deepening Reasoning in Multimodal Search Agents"
title_zh: DR-MMSearchAgent：深化多模态搜索智能体的推理
authors: "Shengqin Wang, Wentao Yan, Huichi Zhou, Yihang Chen, Kun Shao, Zhizhong Zhang, Yuan Xie"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://openreview.net/pdf/d3b1f47942e50c2e0ed1cb5f067a5a0a8e1a20a5.pdf"
tags: ["query:fin-mm-agent"]
score: 6.0
evidence: 利用外部工具并强化推理的多模态搜索智能体
tldr: 智能体式多模态模型借助外部工具处理复杂任务，但常出现交互过早崩溃：终端奖励仅挂在末位标记上，使优势难以区分具探索行为的轨迹；冗余上下文又妨碍智能体吸收有用反馈。本文提出Deepening Reasoning MMSearchAgent，利用结构邻近性从整批轨迹中推导优势信号，鼓励生成不同长度的探索轨迹。该工作提升了多模态智能体工具使用与检索推理的稳健性，对金融多模态工具型智能体具有方法借鉴价值。
source: ICML-2026-Accepted
selection_source: conference_retrieval
motivation: 智能体式多模态模型常出现交互过早崩溃，因终端奖励设计使探索轨迹难以被区分且冗余上下文干扰反馈吸收。
method: 提出DR-MMSearchAgent，利用结构邻近性从整批rollout轨迹推导优势信号，鼓励生成不同长度的探索轨迹。
result: 该方法缓解了交互崩溃，提升了多模态搜索智能体的探索与工具使用表现。
conclusion: 该工作为多模态工具型智能体的强化学习推理优化提供了通用思路。
---

## Abstract
Agentic multimodal models have garnered significant attention for their ability to leverage external tools to tackle complex tasks. However, it is observed that such agents often meet premature interaction collapse, caused by two primary reasons: 1) the terminal reward often appending on the last token prevents the advantage from distinguishing trajectories with exploratory behavior; 2) excessively redundant context hinders the agent from absorbing useful feedback. To address these issues, we propose the Deepening Reasoning MMSearchAgent, the framework leverages the structural proximity to derive advantage signals from the whole rollout trajectories in an entire batch, such that trajectories of different lengths are further encouraged to be generated, even when containing the same correct answer. Additionally, differentiated gaussian rewards are employed to dynamically calibrate interaction tolerance, thereby ensuring information reliability and reducing redundancy. To support multi-turn interaction training, we have
constructed a multi-step deep-reasoning dataset including 3602 high-quality QA pairs with at least 3 reasoning steps. Extensive experiments demonstrate that our method achieves state-of-the-art performance, outperforming the MMSearch-R1 by 8.4\% on FVQA-test.

---

## 论文详细总结（自动生成）

### 1. 检索相关性
利用外部工具并强化推理的多模态搜索智能体。

### 2. 核心内容
智能体式多模态模型借助外部工具处理复杂任务，但常出现交互过早崩溃：终端奖励仅挂在末位标记上，使优势难以区分具探索行为的轨迹；冗余上下文又妨碍智能体吸收有用反馈。本文提出Deepening Reasoning MMSearchAgent，利用结构邻近性从整批轨迹中推导优势信号，鼓励生成不同长度的探索轨迹。该工作提升了多模态智能体工具使用与检索推理的稳健性，对金融多模态工具型智能体具有方法借鉴价值。

### 3. 对应检索需求
Explore tool use and retrieval augmentation in financial multimodal agents.

### 4. 来源与原文
- Source：ICML-2026-Accepted
- OpenReview：[https://openreview.net/forum?id=2j3QyhUw5N](https://openreview.net/forum?id=2j3QyhUw5N)
