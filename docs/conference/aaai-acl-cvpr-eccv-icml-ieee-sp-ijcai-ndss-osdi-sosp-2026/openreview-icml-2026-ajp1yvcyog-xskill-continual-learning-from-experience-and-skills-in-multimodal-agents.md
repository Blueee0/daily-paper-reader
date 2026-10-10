---
title: "XSkill: Continual Learning from Experience and Skills in Multimodal Agents"
title_zh: XSkill：多模态智能体中基于经验与技能的持续学习
authors: "Guanyu Jiang, Zhaochen Su, Xiaoye Qu, Yi R. Fung"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://openreview.net/pdf/d2d53316f305c31624bb729a7b76925398cbb925.pdf"
tags: ["query:fin-mm-agent"]
score: 6.0
evidence: 多模态工具智能体的经验与技能持续学习
tldr: 多模态智能体虽能借助多种工具完成复杂推理，但在开放环境中常出现工具使用低效、编排僵化的问题。本文提出XSkill双流框架，从历史轨迹中提取并检索两类可复用知识：提供动作级指导的经验与提供任务级规划的技能，并将知识提取与检索建立在视觉上下文之上，使智能体无需参数更新即可持续改进。实验表明该方法提升了工具选择与多轮任务执行的效率与灵活性。
source: ICML-2026-Accepted
selection_source: conference_retrieval
motivation: 多模态智能体在开放环境中工具使用低效、编排僵化，难以在不更新参数的情况下持续改进。
method: 提出XSkill双流框架，从轨迹中提取并检索动作级经验与任务级技能，并以视觉上下文为锚进行知识落地。
result: 实验显示该框架提升了工具选择与多轮任务的执行效率，实现无需参数更新的持续学习。
conclusion: 为多模态工具智能体的经验复用与持续能力提升提供了可迁移的知识驱动方案。
---

## Abstract
Multimodal agents can now tackle complex reasoning tasks with diverse tools, yet they still suffer from inefficient tool use and inflexible orchestration in open-ended settings. A central challenge is enabling such agents to continually improve without parameter updates by learning from past trajectories. We identify two complementary forms of reusable knowledge essential for this goal: experiences, providing concise action-level guidance for tool selection and decision making, and skills, providing structured task-level guidance for planning and tool use. To this end, we propose XSkill, a dual-stream framework for continual learning from experience and skills in multimodal agents. XSkill grounds both knowledge extraction and retrieval in visual observations. During accumulation, XSkill distills and consolidates experiences and skills from multi-path rollouts via visually grounded summarization and cross-rollout critique. During inference, it retrieves and adapts this knowledge to the current visual context and feeds usage history back into accumulation to form a continual learning loop. Evaluated on five benchmarks across diverse domains with four backbone models, XSkill consistently and substantially outperforms both tool-only and learning-based baselines. Further analysis reveals that the two knowledge streams play complementary roles in influencing the reasoning behaviors of agents and show superior zero-shot generalization. Code is available at https://github.com/XSkill-Agent/XSkill.

---

## 论文详细总结（自动生成）

### 1. 检索相关性
多模态工具智能体的经验与技能持续学习。

### 2. 核心内容
多模态智能体虽能借助多种工具完成复杂推理，但在开放环境中常出现工具使用低效、编排僵化的问题。本文提出XSkill双流框架，从历史轨迹中提取并检索两类可复用知识：提供动作级指导的经验与提供任务级规划的技能，并将知识提取与检索建立在视觉上下文之上，使智能体无需参数更新即可持续改进。实验表明该方法提升了工具选择与多轮任务执行的效率与灵活性。

### 3. 对应检索需求
research on multimodal agents that integrate text, vision, and other modalities。

### 4. 来源与原文
- Source：ICML-2026-Accepted
- OpenReview：[https://openreview.net/forum?id=AjP1yvCyoG](https://openreview.net/forum?id=AjP1yvCyoG)
