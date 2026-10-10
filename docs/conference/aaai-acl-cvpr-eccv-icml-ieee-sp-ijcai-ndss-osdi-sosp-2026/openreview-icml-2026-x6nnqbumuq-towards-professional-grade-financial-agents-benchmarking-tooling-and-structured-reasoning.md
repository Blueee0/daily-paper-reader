---
title: "Towards Professional-Grade Financial Agents: Benchmarking, Tooling, and Structured Reasoning"
title_zh: 迈向专业级金融智能体：基准、工具与结构化推理
authors: "Cheng Huang, Jinghua Piao, Ranran Wang, Yong Li"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://openreview.net/pdf/064e79817c371d922b4bc0e73e69e0336cc3db58.pdf"
tags: ["query:fin-mm-agent"]
score: 9.0
evidence: 53个领域工具的金融工具库与结构化智能体框架
tldr: 现有LLM金融智能体在真实工作流中受制于缺乏整体基准和非结构化推理的脆弱性。作者提出ProFinR专业金融推理基准（528道专家题）与含53个领域工具的Financial Tool Universe，并构建基于有向无环图与案例库的ProFinAgent结构化智能体框架。该工作为金融工具增强推理提供基准与工具支撑，推动专业级金融智能体落地。
source: ICML-2026-Accepted
selection_source: conference_retrieval
motivation: 现有金融LLM智能体缺少整体基准，且非结构化推理脆弱，难以胜任真实金融工作流。
method: 提出ProFinR基准、含53个领域工具的金融工具库，以及基于有向无环图与案例库的ProFinAgent框架。
result: 构建528道专家设计的金融问题与13类工具，为复杂金融推理提供结构化求解方案。
conclusion: 该工作以基准与工具双轮驱动，推动专业级金融智能体的评测与推理能力提升。
---

## Abstract
While Large Language Model (LLM) agents have shown encouraging progress in financial reasoning, their effectiveness in realistic financial workflows is severely hindered by the lack of holistic benchmarks and the fragility of unstructured reasoning. To address this gap, we introduce ProFinR, the first Professional Finance Reasoning benchmark, covering four financial domain tasks and comprising 528 expert-designed problems. To solve these complex financial reasoning questions, we construct the Financial Tool Universe, a tool library containing 53 domain-specific tools organized into 13 categories. Building on the tool library, we introduce ProFinAgent, a structured agent framework based on Directed Acyclic Graph (DAG) and Case-Based Memory (CBM). Compared with strictly sequential workflows, ProFinAgent coordinates tool execution through a DAG planner for parallel efficiency and uses CBM to retrieve prior cases for more reliable decision-making. Experimental results demonstrate that ProFinAgent achieves a 49.81% performance gain over state-of-the-art baselines with a 47.1% reduction in inference latency. Our code is available at https://github.com/tsinghua-fib-lab/ProFinAgent.

---

## 论文详细总结（自动生成）

### 1. 检索相关性
53个领域工具的金融工具库与结构化智能体框架。

### 2. 核心内容
现有LLM金融智能体在真实工作流中受制于缺乏整体基准和非结构化推理的脆弱性。作者提出ProFinR专业金融推理基准（528道专家题）与含53个领域工具的Financial Tool Universe，并构建基于有向无环图与案例库的ProFinAgent结构化智能体框架。该工作为金融工具增强推理提供基准与工具支撑，推动专业级金融智能体落地。

### 3. 对应检索需求
tool augmented agents that use external APIs and retrieval for financial tasks。

### 4. 来源与原文
- Source：ICML-2026-Accepted
- OpenReview：[https://openreview.net/forum?id=x6nNQBumUQ](https://openreview.net/forum?id=x6nNQBumUQ)
