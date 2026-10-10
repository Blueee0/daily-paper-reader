---
title: "Two Heads Are Better than One: Distilling Large Language Model Features into Small Models with Feature Decomposition and Mixture"
title_zh: 双头胜一头：通过特征分解与混合将大语言模型特征蒸馏到小模型
authors: "Tianhao Fu, Xinxin Xu, Weichen Xu, Jue Chen, Ruilong Ren, Bowen Deng, Xinyu Zhao, Jian Cao, Xixin Cao"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://ojs.aaai.org/index.php/AAAI/article/download/38981/42943"
tags: ["query:fin-mm-agent"]
score: 4.0
evidence: 通过强化学习将LLM蒸馏到小模型以用于金融市场做市
tldr: 强化学习做市已受广泛关注，将大模型用作智能体虽性能突出却推理缓慢，而针对该任务的LLM蒸馏研究尚属空白。论文提出归一化荧光探针分析大模型特征机制，并据此设计协作做市框架CMM。该工作面向金融市场做市决策，但未涉及视觉或多模态信息，与多模态金融智能体的核心诉求关联有限。
source: AAAI-2026-Accepted
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-38981/fig-001.webp\", \"caption\": \"\", \"page\": 1, \"index\": 1, \"width\": 1183, \"height\": 862}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-38981/fig-002.webp\", \"caption\": \"\", \"page\": 3, \"index\": 2, \"width\": 2875, \"height\": 1038}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-38981/fig-003.webp\", \"caption\": \"\", \"page\": 4, \"index\": 3, \"width\": 2991, \"height\": 2204}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-38981/fig-004.webp\", \"caption\": \"\", \"page\": 4, \"index\": 4, \"width\": 1475, \"height\": 663}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-38981/fig-005.webp\", \"caption\": \"\", \"page\": 7, \"index\": 5, \"width\": 9000, \"height\": 6000}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-38981/fig-006.webp\", \"caption\": \"\", \"page\": 7, \"index\": 6, \"width\": 9000, \"height\": 6000}]"
motivation: 将大模型用作做市智能体推理缓慢，而针对该金融任务的LLM蒸馏研究尚属空白。
method: 提出归一化荧光探针分析LLM特征机制，并据此设计协作做市CMM框架进行蒸馏。
result: 通过特征分解与混合将大模型能力迁移到小模型，缓解做市场景的推理速度瓶颈。
conclusion: 该工作聚焦金融做市决策，但未涉及多模态信息，与金融多模态智能体关联较弱。
---

## Abstract
Market making (MM) through Reinforcement Learning (RL) has attracted significant attention in financial trading. With the development of Large Language Models (LLMs), more and more attempts are being made to apply LLMs to financial areas. A simple, direct application of LLM as an agent shows significant performance. Such methods are hindered by their slow inference speed, while most of the current research has not studied LLM distillation for this specific task. To address this, we first propose the normalized fluorescent probe to study the mechanism of the LLM’s feature. Based on the observation found by our investigation, we propose Cooperative Market Making (CMM), a novel framework that decouples LLM features across three orthogonal dimensions: layer, task, and data. Various student models collaboratively learn simple LLM features along with different dimensions, with each model responsible for a distinct feature to achieve knowledge distillation. Furthermore, CMM introduces an Hájek-MoE to integrate the output of the student models by investigating the contribution of different models in a kernel function-generated common feature space. Extensive experimental results on four real-world market datasets demonstrate the superiority of CMM over the current distillation method and RL-based market-making strategies.

---

## 论文详细总结（自动生成）

# 论文总结：《Two Heads Are Better than One: Distilling Large Language Model Features into Small Models with Feature Decomposition and Mixture》

## 1. 核心问题与整体含义
- **研究动机**：市场做市（Market Making, MM）是金融交易核心任务；强化学习（RL）做市已有较多研究。大语言模型（LLM）直接作为做市智能体时表现突出，甚至超过传统 RL 方法，但推理速度慢，难以满足实时交易对亚秒级延迟的需求。
- **关键空白**：现有 LLM 蒸馏多集中于“大 LLM 到小 LLM”的同构蒸馏，小 LLM 仍不够轻量；针对市场做市任务的跨架构 LLM 蒸馏研究不足。直接使用传统蒸馏将 LLM 特征迁移到小模型效果较差。
- **核心假设**：单个小模型难以捕捉 LLM 深层、高维、复杂特征；若将 LLM 特征沿“层、任务、数据”三个正交维度分解，再交由多个专门化小模型协作学习，可更有效完成跨架构知识蒸馏。
- **整体含义**：论文提出协作做市框架 CMM，试图在保留 LLM 金融决策能力的同时，显著降低推理延迟与算力消耗，使其适用于实时做市场景。

## 2. 方法论
### 2.1 归一化荧光探针（Normalized Fluorescent Probe）
- **目的**：分析 LLM 内部特征与不同输出任务之间的因果/影响关系。
- **流程**：
  - 对模型各模块参数注入高斯噪声和均匀噪声，并在不同幅度范围内随机采样。
  - 记录参数扰动后各输出变量的变化，并进行归一化，消除噪声幅度差异。
  - 对多种噪声分布和幅度取平均，得到“模块—输出”影响矩阵 \(S\)。
  - 对每个输出取影响最大的模块，形成因果归因图 \(C\)。
- **主要发现**：
  - LLM 不同层负责不同任务：浅层偏向预测中间价（mid-price），中层偏向价差（spread），深层偏向总量（total volume）。
  - 同一层在处理异质输入数据时特征差异显著，例如不同市场波动率下特征聚类明显分离。

### 2.2 正交特征分解蒸馏（OFDD）
- **核心思想**：沿三个正交维度分解 LLM 特征，每个特征类型由一个专门小模型学习：
  - **层维度**：浅层、中层、深层特征分别蒸馏给不同小模型，对应中间价、价差、总量预测。
  - **任务维度**：围绕做市任务中的中间价、价差、总量三个子任务进行特征蒸馏与 logit 蒸馏，使小模型学习对应 LLM 输出 logits。
  - **数据/市场类型维度**：按历史 5 日波动率将样本分为低、中、高三档，分别训练保守、中性、激进策略的小模型。
- **实现要点**：层维度与任务维度高度相关，因此对应配对的蒸馏小模型在后续 MoE 融合中获得较大权重。论文还尝试不同小模型架构以选择最优结构。

### 2.3 Hájek 投影混合专家（
