---
title: "Graph2Eval: Automatic Multimodal Task Generation for Agents via Knowledge Graphs"
title_zh: Graph2Eval：通过知识图谱为智能体自动生成多模态任务
authors: "Chen, Yurun, Hu, Xueyu, Liu, Yuhan, Wang, Ziqi, Liao, Zeyi, Chen, Lin, Wei, Feng, Qian, Yuxi, Zheng, Bo, Yin, Keting, Zhang, Shengyu"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://openaccess.thecvf.com/content/CVPR2026/papers/Chen_Graph2Eval_Automatic_Multimodal_Task_Generation_for_Agents_via_Knowledge_Graphs_CVPR_2026_paper.pdf"
tags: ["query:fin-mm-agent"]
score: 6.0
evidence: 基于知识图谱自动生成多模态智能体评测任务
tldr: 现有面向多模态智能体的静态数据集难以扩展，而用大模型生成任务又常出现语义不一致与不可解问题。本文提出Graph2Eval，以异构数据源构建知识图谱，自动生成可扩展且语义有据的智能体任务。该框架提升了评测任务的多样性与可解性，为多模态智能体能力评估提供了新的自动化基准生成途径。
source: CVPR-2026-Accepted
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-chen-graph2eval-automatic-multimodal-task-generation-for-agents-via-knowledge-graphs-cvpr-2026-paper/fig-001.webp\", \"caption\": \"\", \"page\": 4, \"index\": 1, \"width\": 1248, \"height\": 401}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-chen-graph2eval-automatic-multimodal-task-generation-for-agents-via-knowledge-graphs-cvpr-2026-paper/fig-002.webp\", \"caption\": \"\", \"page\": 4, \"index\": 2, \"width\": 1358, \"height\": 399}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-chen-graph2eval-automatic-multimodal-task-generation-for-agents-via-knowledge-graphs-cvpr-2026-paper/fig-003.webp\", \"caption\": \"\", \"page\": 4, \"index\": 3, \"width\": 1252, \"height\": 450}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-chen-graph2eval-automatic-multimodal-task-generation-for-agents-via-knowledge-graphs-cvpr-2026-paper/fig-004.webp\", \"caption\": \"\", \"page\": 4, \"index\": 4, \"width\": 513, \"height\": 245}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-chen-graph2eval-automatic-multimodal-task-generation-for-agents-via-knowledge-graphs-cvpr-2026-paper/fig-005.webp\", \"caption\": \"\", \"page\": 4, \"index\": 5, \"width\": 1361, \"height\": 449}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-chen-graph2eval-automatic-multimodal-task-generation-for-agents-via-knowledge-graphs-cvpr-2026-paper/fig-006.webp\", \"caption\": \"\", \"page\": 4, \"index\": 6, \"width\": 416, \"height\": 306}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-chen-graph2eval-automatic-multimodal-task-generation-for-agents-via-knowledge-graphs-cvpr-2026-paper/fig-007.webp\", \"caption\": \"\", \"page\": 4, \"index\": 7, \"width\": 2154, \"height\": 792}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-chen-graph2eval-automatic-multimodal-task-generation-for-agents-via-knowledge-graphs-cvpr-2026-paper/fig-008.webp\", \"caption\": \"\", \"page\": 4, \"index\": 8, \"width\": 454, \"height\": 792}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-chen-graph2eval-automatic-multimodal-task-generation-for-agents-via-knowledge-graphs-cvpr-2026-paper/fig-009.webp\", \"caption\": \"\", \"page\": 4, \"index\": 9, \"width\": 487, \"height\": 259}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-chen-graph2eval-automatic-multimodal-task-generation-for-agents-via-knowledge-graphs-cvpr-2026-paper/fig-010.webp\", \"caption\": \"\", \"page\": 4, \"index\": 10, \"width\": 491, \"height\": 316}]"
motivation: 静态评测数据集难以扩展，大模型生成任务存在幻觉与不可解问题。
method: 基于异构数据源构建知识图谱，自动生成语义一致的多模态智能体任务。
result: 生成的评测任务具备更好的可扩展性与可解性，能更全面评估智能体能力。
conclusion: 为多模态智能体提供可扩展的自动化评测基准生成框架。
---

## Abstract
As multimodal LLM-driven agents advance in autonomy and generalization, traditional static datasets face inherent scalability limitations and are insufficient for fully assessing their capabilities in increasingly complex and diverse tasks. Existing studies have attempted to generate agent tasks using LLMs, but due to the inherent hallucinations of LLMs and the lack of internal data relationship modeling, these tasks often exhibit semantic inconsistencies and solvability issues. To address these challenges, we introduce Graph2Eval, a knowledge-graph-driven framework for automated, scalable, and semantically grounded agent task generation. At its core, Graph2Eval leverages a knowledge graph built from heterogeneous external data sources as a structured task space, generating multimodal agent tasks through subgraph sampling and task construction guided by task templates and meta-path strategies. To further ensure task reliability, a multi-stage filtering pipeline based on node reachability analysis, LLM scoring, and similarity analysis ensures the diversity and solvability of the generated tasks. By unifying both RAG Agent and Web Agent scenarios, Graph2Eval enables efficient generation of multimodal document understanding tasks and multi-step web interaction tasks. We instantiate the framework with Graph2Eval-Bench, a curated dataset of 1,319 tasks spanning document understanding and web interaction scenarios. Extensive experiments show that, on average, Graph2Eval improves task semantic consistency by 20% and solvability by 17% over baselines, while Graph2Eval-Bench effectively distinguishes agent performance, offering a new perspective on automated agent evaluation.

---

## 论文详细总结（自动生成）

# Graph2Eval 论文中文总结

## 1. 核心问题与整体含义
- **研究动机**：多模态 LLM 智能体能力不断增强，但传统静态评测数据集存在可扩展性差、任务类型有限的问题，容易让智能体“记住答案”而非真正泛化。
- **现有自动生成方法的不足**：
  - 缺乏显式实体—关系建模：直接让 LLM 处理文本/图像生成任务，易产生语义不一致和不可解任务。
  - 对动态环境适配有限：Web 任务生成多依赖静态文档或简化环境，难以建模真实网站中的页面关系和交互流程。
- **整体含义**：论文提出 Graph2Eval，将知识图谱作为结构化“任务空间”，自动生成语义有据、可解、可扩展的多模态智能体任务，统一覆盖 RAG Agent 的文档理解任务与 Web Agent 的多步网页交互任务。

## 2. 方法论
- **核心思想**：从异构外部数据源构建知识图谱，把任务生成转化为图谱上的子图采样与任务构造问题。
- **五阶段流程**：
  1. **数据摄入**：文档进行语义分块、嵌入计算、元数据标注；网页通过 URL 爬取、DOM 与截图提取、模拟人类交互、规则与 LLM 过滤、安全约束。
  2. **KG 构建**：定义图 \(G=(V,E,R)\)。节点来自段落、标题、超链接、表单、按钮、表格单元等；节点表示拼接文本与视觉描述后嵌入，存入向量数据库。边分为 \(E_{text}\) 与 \(E_{web}\)，覆盖结构、语义、上下文、引用、导航、交互、布局等关系。
  3. **子图采样**：给定任务目标 \(g\)，提取子图 \(G_g\)。文档模式按余弦相似度阈值 \(\tau\) 或结构匹配筛选节点，并限制节点类型；Web 模式先找任务种子节点，再收集 \(k\)-hop 邻居，保留有效网页节点与元素节点。
  4. **任务生成**：
     - 文档理解：任务模板库 →
