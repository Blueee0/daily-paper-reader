---
title: "HiveMind: Contribution-Guided Online Prompt Optimization of LLM Multi-Agent Systems"
title_zh: HiveMind：面向LLM多智能体系统的贡献引导在线提示优化
authors: "Yihan Xia, Taotao Wang, Shengli Zhang, Zhangyuhua Weng, Bin Cao, Soung Chang Liew"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://ojs.aaai.org/index.php/AAAI/article/download/40222/44183"
tags: ["query:fin-mm-agent"]
score: 4.0
evidence: 面向金融交易决策的LLM多智能体系统
tldr: LLM多智能体系统在金融交易等复杂决策场景中表现出色，但单个智能体的有效性评估与在线优化仍是难题。本文提出HiveMind，一个通过贡献分析实现自适应的框架，采用Shapley值量化各智能体贡献，并据此进行贡献引导的在线提示优化。该方法可自动识别并改进表现欠佳的智能体，提升多智能体协作在金融决策等任务中的整体效果。
source: AAAI-2026-Accepted
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-40222/fig-001.webp\", \"caption\": \"\", \"page\": 3, \"index\": 1, \"width\": 5028, \"height\": 1936}]"
motivation: 多智能体系统中个体智能体效果难以评估，表现欠佳者缺乏在线优化手段。
method: 提出HiveMind框架，用Shapley值量化贡献并据此进行贡献引导在线提示优化。
result: 可自动识别并改进低效智能体，提升金融交易等复杂决策场景的协作表现。
conclusion: 为多智能体系统的自适应优化提供了可量化的贡献评估与优化机制。
---

## Abstract
Recent advances in LLM-based multi-agent systems have demonstrated remarkable capabilities in complex decision-making scenarios such as financial trading and software engineering. However, evaluating each individual agent’s effectiveness and online optimization of underperforming agents remain open challenges. To address these issues, we present HiveMind, a self-adaptive framework designed to optimize LLM multi-agent collaboration through contribution analysis. At its core, HiveMind introduces Contribution-Guided Online Prompt Optimization (CG-OPO), which autonomously refines agent prompts based on their quantified contributions. We first propose the Shapley value as a grounded metric to quantify each agent's contribution, thereby identifying underperforming agents in a principled manner for automated prompt refinement. To overcome the computational complexity of the classical Shapley value, we present DAG-Shapley, a novel and efficient attribution algorithm for Directed Acyclic Graph (DAG)-structured multi-agent workflows that leverages the inherent DAG structure of the agent workflow to axiomatically prune non-viable coalitions. By hierarchically reusing intermediate outputs of agents in the DAG, our method further reduces redundant computations, and achieving substantial cost savings without compromising the theoretical guarantees of Shapley values. Evaluated in a multi-agent stock-trading scenario, HiveMind achieves superior performance compared to static baselines. Notably, DAG-Shapley reduces LLM calls by over 80 percent while maintaining attribution accuracy comparable to full Shapley values, establishing a new standard for efficient credit assignment and enabling scalable, real-world optimization of multi-agent collaboration.

---

## 论文详细总结（自动生成）

### 1. 检索相关性
面向金融交易决策的LLM多智能体系统。

### 2. 核心内容
LLM多智能体系统在金融交易等复杂决策场景中表现出色，但单个智能体的有效性评估与在线优化仍是难题。本文提出HiveMind，一个通过贡献分析实现自适应的框架，采用Shapley值量化各智能体贡献，并据此进行贡献引导的在线提示优化。该方法可自动识别并改进表现欠佳的智能体，提升多智能体协作在金融决策等任务中的整体效果。

### 3. 对应检索需求
Find research on multimodal agents applied to financial analysis and decision making.

### 4. 来源与原文
- Source：AAAI-2026-Accepted
- OpenReview：[https://ojs.aaai.org/index.php/AAAI/article/view/40222](https://ojs.aaai.org/index.php/AAAI/article/view/40222)
