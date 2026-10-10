---
title: "Navigating Large-Scale Document Collections: MuDABench for Multi-Document Analytical QA"
title_zh: 导航大规模文档集合：MuDABench多文档分析型问答基准
authors: "Zhanli Li, Yixuan Cao, Lvzhou Luo, Ping Luo"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.findings-acl.341.pdf"
tags: ["query:fin-mm-agent"]
score: 6.0
evidence: 面向金融文档集合、需定量综合的分析型问答
tldr: 现有多文档问答基准通常只需少量文档且跨文档推理有限，难以反映真实分析需求。作者提出MuDABench，面向大规模半结构化文档集合的分析型问答基准，问题需跨众多文档抽取并综合信息完成定量分析。该基准利用文档级元数据与标注金融数据库进行远监督构建，含超8万页与332个分析问答实例，并配套评测协议，为金融文档问答研究提供新挑战。
source: ACL-2026-Findings
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl341/fig-001.webp\", \"caption\": \"\", \"page\": 13, \"index\": 1, \"width\": 1701, \"height\": 1170}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl341/fig-002.webp\", \"caption\": \"\", \"page\": 13, \"index\": 2, \"width\": 1700, \"height\": 2667}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl341/fig-003.webp\", \"caption\": \"\", \"page\": 13, \"index\": 3, \"width\": 420, \"height\": 420}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl341/fig-004.webp\", \"caption\": \"\", \"page\": 13, \"index\": 4, \"width\": 1700, \"height\": 1201}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl341/fig-005.webp\", \"caption\": \"\", \"page\": 13, \"index\": 5, \"width\": 1114, \"height\": 1280}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl341/fig-006.webp\", \"caption\": \"\", \"page\": 13, \"index\": 6, \"width\": 402, \"height\": 388}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl341/fig-007.webp\", \"caption\": \"\", \"page\": 13, \"index\": 7, \"width\": 420, \"height\": 420}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl341/fig-008.webp\", \"caption\": \"\", \"page\": 13, \"index\": 8, \"width\": 1700, \"height\": 1680}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl341/fig-009.webp\", \"caption\": \"\", \"page\": 13, \"index\": 9, \"width\": 1700, \"height\": 1954}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl341/fig-010.webp\", \"caption\": \"\", \"page\": 13, \"index\": 10, \"width\": 1224, \"height\": 1182}]"
motivation: 现有多文档问答基准跨文档推理有限，无法反映大规模文档中的真实定量分析需求。
method: 提出MuDABench基准，利用文档元数据与标注金融数据库以远监督方式构建分析型问答。
result: 构建含超8万页文档与332个分析问答实例的基准，并配套评测协议。
conclusion: 为面向金融文档集合的跨文档分析型问答提供具挑战性的评测平台。
---

## Abstract
This paper introduces the task of analytical question answering over large, semi-structured document collections. We present MuDABench, a benchmark for multi-document analytical QA, where questions require extracting and synthesizing information across numerous documents to perform quantitative analysis. Unlike existing multi-document QA benchmarks that typically require information from only a few documents with limited cross-document reasoning, MuDABench demands extensive inter-document analysis and aggregation. Constructed via distant supervision by leveraging document-level metadata and annotated financial databases, MuDABench comprises over 80,000 pages and 332 analytical QA instances. We also propose an evaluation protocol that measures final answer accuracy and uses intermediate-fact coverage as an auxiliary diagnostic signal for the reasoning process. Experiments reveal that standard RAG systems, which treat all documents as a flat retrieval pool, perform poorly. To address these limitations, we propose a multi-agent workflow that orchestrates planning, extraction, and code generation modules. While this approach substantially improves both process and outcome metrics, a significant gap remains compared to human expert performance. Our analysis identifies two primary bottlenecks: single-document information extraction accuracy and insufficient domain-specific knowledge in current systems. MuDABench is available at https://github.com/Zhanli-Li/MuDABench.

---

## 论文详细总结（自动生成）

## 1. 核心问题与整体含义

- **研究动机**：现有问答研究多聚焦单文档、网页式多跳或长上下文，通常假设相关内容可被检索进一个上下文窗口。但真实场景中，如金融监管、审计、行业研究，往往需要对大规模、半结构化文档集合进行**分析型问答**：跨几十甚至上千份文档抽取事实，再进行聚合、比较、统计或计算。
- **背景缺口**：
  - HotpotQA、2WikiMultiHopQA、MuSiQue 等主要基于 Wikipedia，文档少、短、同质，跨文档推理有限。
  - LongBench、RULER、LongDocURL 等关注长上下文，但通常仍假设相关信息可放入单次上下文。
  - FinanceBench 偏单文档金融 QA，FinAgentBench 偏 agentic retrieval，而非大规模跨文档聚合分析。
  - Aryn、DocETL 等工作流论文未公开大规模基准。
- **整体含义**：论文提出 **MuDABench**，一个面向大规模半结构化金融文档集合的多文档分析型 QA 基准，要求模型从年报、ESG 报告、公司公告等文档中抽取并综合信息，完成定量分析。其目标是推动可扩展文档分析系统研究。

## 2
