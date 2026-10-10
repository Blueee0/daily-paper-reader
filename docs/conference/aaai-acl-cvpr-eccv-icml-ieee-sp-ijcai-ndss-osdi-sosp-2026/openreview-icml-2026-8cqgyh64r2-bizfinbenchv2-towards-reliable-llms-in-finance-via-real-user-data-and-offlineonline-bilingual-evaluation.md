---
title: "BizFinBench.v2: Towards Reliable LLMs in Finance via Real-User Data and Offline/Online Bilingual Evaluation"
title_zh: BizFinBench.v2：基于真实用户数据与离线/在线双语评估的可信金融大模型
authors: "Xin Guo, Rongjunchen Zhang, Guilong Lu, Xuntao Guo, Jia Shuai, Zhi Yang, Liwen Zhang"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://openreview.net/pdf/2cc0a14b80a73c6acd7a62b579b8686a3c6509e0.pdf"
tags: ["query:fin-mm-agent"]
score: 5.0
evidence: 基于真实用户数据的金融评估基准
tldr: "现有金融大模型评测多依赖模拟或通用数据，导致报告性能与真实业务效果存在明显差距。本文提出BizFinBench.v2，首个基于中美股市真实用户问答数据构建的离线与在线一体化双语基准，包含28,860道题目、覆盖八项离线与两项在线任务。实验显示GPT-5准确率仅61.5%，远低于实际业务要求的84.8%，凸显了真实金融场景下模型能力的不足，为可信金融大模型评估提供了更贴近实务的标准。"
source: ICML-2026-Accepted
selection_source: conference_retrieval
motivation: 金融大模型评测多依赖模拟或通用数据，报告性能与真实业务效果差距明显。
method: 构建基于中美股市真实用户数据的离线与在线一体化双语基准BizFinBench.v2。
result: "含28860道题、八项离线与两项在线任务，GPT-5准确率仅61.5%低于业务要求。"
conclusion: 为可信金融大模型提供了更贴近真实业务的评估标准与数据基础。
---

## Abstract
Large language models are becoming increasingly significant in financial applications. Nevertheless, prevailing benchmarks are largely dependent on simulated or generic data, which leads to a significant gap between reported performance and actual efficacy in real-world scenarios. To tackle this challenge, we present BizFinBench.v2, the first integrated offline and online benchmark built upon authentic user query-response data from both Chinese and U.S. equity markets. It comprises 28,860 questions across eight offline and two online tasks. Experimental results show that GPT-5 achieves a mere 61.5\% accuracy, still failing to meet the practical business requirement (84.8\%). Among the evaluated commercial models, DeepSeek-R1 exhibits superior investment efficacy. Error analysis grounded in real financial practice reveals persistent limitations in existing models. By overcoming the constraints of prior benchmarks, BizFinBench.v2 provides a substantiated foundation for advancing LLM deployment in the financial sector. Our data and code are available at https://github.com/HiThink-Research/BizFinBench.v2.

---

## 论文详细总结（自动生成）

### 1. 检索相关性
基于真实用户数据的金融评估基准。

### 2. 核心内容
现有金融大模型评测多依赖模拟或通用数据，导致报告性能与真实业务效果存在明显差距。本文提出BizFinBench.v2，首个基于中美股市真实用户问答数据构建的离线与在线一体化双语基准，包含28,860道题目、覆盖八项离线与两项在线任务。实验显示GPT-5准确率仅61.5%，远低于实际业务要求的84.8%，凸显了真实金融场景下模型能力的不足，为可信金融大模型评估提供了更贴近实务的标准。

### 3. 对应检索需求
Identify benchmarks and evaluation methods for financial multimodal agents.

### 4. 来源与原文
- Source：ICML-2026-Accepted
- OpenReview：[https://openreview.net/forum?id=8cQGYH64R2](https://openreview.net/forum?id=8cQGYH64R2)
