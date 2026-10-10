---
title: "Beyond the Final Answer: Evaluating the Reasoning Trajectories of Tool-Augmented Agents"
title_zh: 超越最终答案：评估工具增强智能体的推理轨迹
authors: "Wonjoong Kim, Sangwu Park, Yeonjun In, Sein Kim, Dongha Lee, Chanyoung Park"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://openreview.net/pdf/7d5327de58d4127fdb448224ae67e4992b959e15.pdf"
tags: ["query:fin-mm-agent"]
score: 5.0
evidence: 面向工具增强智能体的免参考多维评估框架
tldr: 现有工具增强智能体的评测多局限于最终答案匹配，忽略效率、幻觉与自适应性等轨迹质量。论文提出TRACE，一种免参考的多维评估框架，通过累积历史知识的证据库来评估智能体推理轨迹，并构建了多样化的元评估数据集进行验证。该工作为工具增强智能体的过程性评测提供了可复用方法，对金融多模态智能体的评估设计亦有借鉴意义。
source: ICML-2026-Accepted
selection_source: conference_retrieval
motivation: 现有工具增强智能体评测只关注答案匹配，忽视效率、幻觉与自适应性等轨迹质量。
method: 提出TRACE免参考评估框架，利用累积历史知识的证据库对智能体推理轨迹进行多维评估。
result: 构建了包含多样样本的元评估数据集，验证TRACE能有效评估工具增强LLM的推理轨迹。
conclusion: 该框架为智能体过程性评估提供了通用方法，可迁移到金融多模态智能体的评测设计。
---

## Abstract
Although recent tool-augmented benchmarks involve complex requests, evaluation remains limited to answer matching, neglecting critical trajectory aspects like efficiency, hallucination, and adaptivity. The most straightforward method for evaluation is to compare an agent’s trajectory with the ground-truth, but annotating all valid ground-truth trajectories is prohibitively expensive. In this manner, we introduce TRACE, a reference free framework for the multi-dimensional evaluation of tool-augmented LLMs. By incorporating an evidence bank which accumulates knowledge from preceding steps, TRACE assesses an agent’s reasoning trajectory effectively. To validate our framework, we develop a new meta-evaluation dataset with diverse and flawed trajectories, each labeled with multi-faceted performance scores. Our results confirm that TRACE accurately evaluates complex trajectories even with small open source LLMs. Furthermore, we apply our method to evaluate the trajectories that agents produce while solving tool-augmented tasks, presenting previously unreported observations and their corresponding insights.

---

## 论文详细总结（自动生成）

### 1. 检索相关性
面向工具增强智能体的免参考多维评估框架。

### 2. 核心内容
现有工具增强智能体的评测多局限于最终答案匹配，忽略效率、幻觉与自适应性等轨迹质量。论文提出TRACE，一种免参考的多维评估框架，通过累积历史知识的证据库来评估智能体推理轨迹，并构建了多样化的元评估数据集进行验证。该工作为工具增强智能体的过程性评测提供了可复用方法，对金融多模态智能体的评估设计亦有借鉴意义。

### 3. 对应检索需求
Identify benchmarks and evaluation methods for financial multimodal agents.

### 4. 来源与原文
- Source：ICML-2026-Accepted
- OpenReview：[https://openreview.net/forum?id=PRfEvn1UHp](https://openreview.net/forum?id=PRfEvn1UHp)
