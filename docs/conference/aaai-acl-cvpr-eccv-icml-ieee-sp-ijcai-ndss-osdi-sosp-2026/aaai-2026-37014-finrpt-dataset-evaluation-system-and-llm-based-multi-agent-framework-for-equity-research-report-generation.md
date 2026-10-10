---
title: "FinRpt: Dataset, Evaluation System and LLM-based Multi-agent Framework for Equity Research Report Generation"
title_zh: FinRpt：面向股票研究报告生成的数据集、评估系统与大模型多智能体框架
authors: "Song Jin, Shuqi Li, Shukun Zhang, Rui Yan"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://ojs.aaai.org/index.php/AAAI/article/download/37014/40976"
tags: ["query:fin-mm-agent"]
score: 7.0
evidence: 整合七类金融数据的股票研究报告生成
tldr: 股票研究报告的自动生成此前缺乏专门任务定义、数据与评估标准，制约了大模型在金融分析中的应用。本文首次形式化股票研究报告生成任务，提出FinRpt基准，构建整合七类金融数据的自动数据集流水线，并设计包含十一项指标的综合评估体系与基于大模型的多智能体生成框架。实验验证了该框架在报告质量上的有效性，为金融文档理解与自动分析决策提供了标准化评测基础。
source: AAAI-2026-Accepted
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-37014/fig-001.webp\", \"caption\": \"\", \"page\": 3, \"index\": 1, \"width\": 512, \"height\": 512}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-37014/fig-002.webp\", \"caption\": \"\", \"page\": 3, \"index\": 2, \"width\": 538, \"height\": 673}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-37014/fig-003.webp\", \"caption\": \"\", \"page\": 3, \"index\": 3, \"width\": 512, \"height\": 512}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-37014/fig-004.webp\", \"caption\": \"\", \"page\": 3, \"index\": 4, \"width\": 808, \"height\": 475}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-37014/fig-005.webp\", \"caption\": \"\", \"page\": 3, \"index\": 5, \"width\": 507, \"height\": 259}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-37014/fig-006.webp\", \"caption\": \"\", \"page\": 3, \"index\": 6, \"width\": 503, \"height\": 264}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-37014/fig-007.webp\", \"caption\": \"\", \"page\": 4, \"index\": 7, \"width\": 4791, \"height\": 2817}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-37014/fig-008.webp\", \"caption\": \"\", \"page\": 4, \"index\": 8, \"width\": 350, \"height\": 454}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-37014/fig-009.webp\", \"caption\": \"\", \"page\": 7, \"index\": 9, \"width\": 1538, \"height\": 1471}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-37014/fig-010.webp\", \"caption\": \"\", \"page\": 7, \"index\": 10, \"width\": 2725, \"height\": 341}]"
motivation: 大模型在股票预测与问答上表现良好，但股票研究报告的全自动生成仍属空白，且缺乏数据与评估指标。
method: 提出FinRpt基准，构建整合七类金融数据的自动数据集流水线，并设计含十一项指标的评估系统与多智能体生成框架。
result: 该数据集与评估体系支撑了报告生成模型的训练与评测，多智能体框架在多项指标上展现出良好生成质量。
conclusion: 首次定义并系统化股票研究报告生成任务，为金融文档理解与自动分析提供了可复用的基准与框架。
---

## Abstract
While LLMs have shown great success in financial tasks like stock prediction and question answering, their application in fully automating Equity Research Report generation remains uncharted territory. In this paper, we formulate the Equity Research Report (ERR) Generation task for the first time. To address the data scarcity and the evaluation metrics absence, we present an open-source evaluation benchmark for ERR generation - FinRpt. We frame a Dataset Construction Pipeline that integrates 7 financial data types and produces a high-quality ERR dataset automatically, which could be used for model training and evaluation. We also introduce a comprehensive evaluation system including 11 metrics to assess the generated ERRs. Moreover, we propose a multi-agent framework specifically tailored to address this task, named FinRpt-Gen, and train several LLM-based agents on the proposed datasets using Supervised Fine-Tuning and Reinforcement Learning. Experimental results indicate the data quality and metrics effectiveness of the benchmark FinRpt and the strong performance of FinRpt-Gen, showcasing their potential to drive innovation in the ERR generation field. All code and datasets are publicly available.

---

## 论文详细总结（自动生成）

# FinRpt 论文中文总结

## 1. 核心问题与整体含义
- **研究背景**：大语言模型已在金融情感分析、信息抽取、问答、股票预测等任务中取得进展，但“股票研究报告（Equity Research Report, ERR）全自动生成”仍是空白。
- **核心问题**：ERR 通常包含财务分析、新闻分析、管理层与公司发展、风险、投资潜力、买卖评级等多段内容，需要专业金融知识、市场理解和写作经验。现有工作缺少专门任务定义、高质量数据和系统评估指标。
- **主要障碍**：
  - 数据稀缺：输入信息分散在公司公告、财报、新闻、股价、市场指数等多源异构数据中。
  - 评估不足：ROUGE、BERTScore 等 NLP 指标难以衡量财务指标准确性、股价预测准确性和金融专业性。
  - 方法限制：单一大模型难以稳定生成结构复杂、逻辑连贯的专业 ERR。
- **整体含义**：论文首次形式化 ERR 生成任务，提出开源基准 FinRpt，包括数据集、评估系统和多智能体框架 FinRpt-Gen，试图推动金融报告自动生成研究标准化。

## 2. 方法论
### 2.1 任务形式化
- 给定股票代码 \(s\) 和研究日期 \(t\)，系统收集并结构化相关信息 \(S=[O,F,A,N,P,M]\)，生成 ERR \(R\)。
- 输入信息包括：公司信息 \(O\)、财务指标 \(F\)、公司公告 \(A\)、公司相关新闻 \(N\)、历史股价 \(P\)、历史市场指数 \(M\)。
- 输出 ERR 至少包含 6 个部分：财务分析、新闻分析、管理层与发展分析、风险分析、投资潜力评估、推荐评级（买入/卖出）。
- 注：摘要称整合 7 类金融数据，但正文输入定义列出 6 类，存在表述不一致。

### 2.2 数据集构建流水线
- **数据来源**：Yahoo Finance、Eastmoney、Sina Finance、AKShare 等。
- **数据采集模块**：收集公司信息、财务指标、公告、新闻、历史股价、市场指数；用 GPT-4o-mini 摘要公告和新闻，并用 BERTScore、MinHash 去重相似新闻。
- **过滤**：排除缺少财务指标、新闻少于 2 条、公告摘要少于 300 中文字符的样本。
- **初始生成**：用 FinRpt-Gen 框架和 GPT-4o 自动生成初始 ERR。
- **数据增强模块**：
  - 推荐评级纠正器：若生成的买卖评级与真实趋势标签不一致，则重新推断，直到预测正确。
  - 专家报告纠正器：检索分析日期前一周 Eastmoney 上的专家 ERR，用 GPT-4o 审核并精炼信息准确性、逻辑一致性和写作风格。
  - LLM 润色器：用 GPT-4o 提升可读性、连贯性和逻辑流。
- 最终构建 6,825 份 ERR，包含中英文版本。

### 2.3 FinRpt-Gen 多智能体框架
- 包含 3 个模块、9 个智能体：
  - **信息抽取模块**：新闻抽取智能体、利润表抽取智能体、资产负债表抽取智能体、现金流表抽取智能体。
  - **信息分析模块**：财务分析智能体、新闻分析智能体、状态分析智能体、风险分析智能体。
  - **预测模块**：预测智能体，结合前述分析、历史股价和市场指数，生成投资潜力评估和推荐评级。
- 新闻抽取智能体对新闻按对股价影响排序，保留前 10 条；财务抽取智能体分别从利润表、资产负债表、现金流表中提取关键指标。

### 2.4 训练方法
- **监督微调（SFT）**：重点微调财务分析、新闻分析、状态分析和预测四个关键智能体，采用 LoRA。
  - 目标：最大化在给定输入 \(X\) 下生成目标文本 \(Y\) 的对数似然，仅更新低秩适配参数 \(\Delta\theta\)。
- **强化学习（RL）**：进一步优化预测智能体，采用 DAPO（基于 GRPO/PPO 的策略梯度算法）。
  - 奖励函数：\(Reward = \alpha \cdot ACC(R_{rec}, R^*_{rec}) + \beta \cdot ROUGE\text{-}1(R_{invest}, R^*_{invest}) + \gamma \cdot ROUGE\text{-}L(R_{invest}, R^*_{invest
