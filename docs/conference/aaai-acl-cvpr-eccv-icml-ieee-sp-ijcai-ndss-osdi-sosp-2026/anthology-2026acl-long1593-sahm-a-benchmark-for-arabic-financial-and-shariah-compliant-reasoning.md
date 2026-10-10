---
title: "SAHM: A Benchmark for Arabic Financial and Shari’ah-Compliant Reasoning"
title_zh: SAHM：面向阿拉伯语金融与伊斯兰教法合规推理的基准
authors: "Rania Elbadry, Sarfraz Ahmad, Ahmed Heakl, Dani Bouch, Momina Ahsan, Muhra AlMahri, Marwa Elsaid Khalil, Yuxia Wang, Salem Lahlou, Sophia Ananiadou, Veselin Stoyanov, Jimin Huang, Xueqing Peng, Preslav Nakov, Zhuohan Xie"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.acl-long.1593.pdf"
tags: ["query:fin-mm-agent"]
score: 5.0
evidence: 基于文档的金融问答基准与指令微调数据集
tldr: "英文金融自然语言处理已因情感分析、文档理解与问答基准而快速发展，而阿拉伯语金融与伊斯兰金融领域却研究不足，尽管实际需求旺盛。本文提出SAHM，一个基于文档的基准与指令微调数据集，涵盖AAOIFI准则问答、教法问答、会计考试、金融情感分析、抽取式摘要与事件因果推理等七类任务，共14,380条专家核验实例。研究评测了19个开源与闭源模型，为多语言金融文档问答提供了标准化基准。"
source: ACL-2026-Long
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1593/fig-001.webp\", \"caption\": \"\", \"page\": 1, \"index\": 1, \"width\": 1296, \"height\": 1322}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1593/fig-002.webp\", \"caption\": \"\", \"page\": 2, \"index\": 2, \"width\": 1024, \"height\": 1126}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1593/fig-003.webp\", \"caption\": \"\", \"page\": 3, \"index\": 3, \"width\": 500, \"height\": 500}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1593/fig-004.webp\", \"caption\": \"\", \"page\": 3, \"index\": 4, \"width\": 512, \"height\": 512}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1593/fig-005.webp\", \"caption\": \"\", \"page\": 3, \"index\": 5, \"width\": 844, \"height\": 1144}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1593/fig-006.webp\", \"caption\": \"\", \"page\": 3, \"index\": 6, \"width\": 408, \"height\": 612}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1593/fig-007.webp\", \"caption\": \"\", \"page\": 7, \"index\": 7, \"width\": 380, \"height\": 380}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1593/fig-008.webp\", \"caption\": \"\", \"page\": 7, \"index\": 8, \"width\": 500, \"height\": 500}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1593/fig-009.webp\", \"caption\": \"\", \"page\": 7, \"index\": 9, \"width\": 512, \"height\": 512}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1593/fig-010.webp\", \"caption\": \"\", \"page\": 14, \"index\": 10, \"width\": 2940, \"height\": 3304}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1593/fig-011.webp\", \"caption\": \"\", \"page\": 16, \"index\": 11, \"width\": 2940, \"height\": 2201}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1593/fig-012.webp\", \"caption\": \"\", \"page\": 19, \"index\": 12, \"width\": 2558, \"height\": 1352}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1593/fig-013.webp\", \"caption\": \"\", \"page\": 20, \"index\": 13, \"width\": 2940, \"height\": 1841}]"
motivation: 阿拉伯语金融与伊斯兰金融自然语言处理研究不足，缺乏可信金融助手的基准与数据。
method: "构建基于文档的SAHM基准与指令微调数据集，覆盖七类金融任务，共14,380条专家核验实例。"
result: 评测19个开源与闭源模型，揭示了当前模型在阿拉伯语金融推理与问答上的能力差距。
conclusion: 为多语言金融文档理解与问答提供了标准化基准，推动可信金融助手研究。
---

## Abstract
English financial NLP has progressed rapidly through benchmarks for sentiment, document understanding, and financial question answering, while Arabic financial NLP remains comparatively under-explored despite strong practical demand for trustworthy finance and Islamic-finance assistants. We introduce SAHM, a document-grounded benchmark and instruction-tuning dataset for Arabic financial NLP and Shari’ah-compliant reasoning. SAHM contains 14,380 expert-verified instances spanning seven tasks: AAOIFI standards QA, fatwa-based QA/MCQ, accounting and business exams, financial sentiment analysis, extractive summarization, and event–cause reasoning, curated from authentic regulatory, juristic, and corporate sources. We evaluate 19 strong open and proprietary LLMs using task-specific metrics and rubric-based scoring for open-ended outputs, and find that Arabic fluency does not reliably translate to evidence-grounded financial reasoning: models are substantially stronger on recognition-style tasks than on generation and causal reasoning, with the largest gaps on event–cause reasoning. We release the benchmark, evaluation framework, and an instruction-tuned model to support future research on trustworthy Arabic financial NLP.

---

## 论文详细总结（自动生成）

# SAHM 论文中文总结

## 1. 核心问题与整体含义

- **研究动机**：英文金融 NLP 已有大量基准（情感分析、表格推理、金融问答、财报理解等），但阿拉伯语金融 NLP 几乎空白。阿拉伯语有约 4.22 亿使用者，海湾主权财富约 4.9 万亿美元，伊斯兰金融产业规模约 4–5 万亿美元，涉及 sukuk、murabaha、takaful 等需遵循 Shari’ah 合规的金融工具。
- **核心缺口**：现有阿拉伯语基准多局限于银行意图识别或一般宗教问答，缺乏同时覆盖现代金融能力与伊斯兰教法合规推理的评测资源；阿拉伯语大模型也未在金融领域被系统评测。
- **论文目标**：提出 **SAHM**，首个阿拉伯语金融与 Shari’ah 合规推理基准，联合评估合规推理与核心金融能力，支持可信阿拉伯语金融助手研究。
- **整体含义**：论文强调“阿拉伯语流利不等于金融推理能力”，并证明领域适配可在较小参数模型上显著缩小与前沿大模型的差距。

## 2. 方法论

### 2.1 核心思想

- 构建一个**文档 grounded、专家验证**的阿拉伯语金融基准，覆盖七个任务：
  1. AAOIFI 准则问答；
  2. 教法 fatwa 问答/MCQ；
  3. 会计考试 MCQ；
  4. 商业考试 MCQ；
  5. 金融报告情感分析；
  6. 报告抽取式摘要；
  7. 事件—原因推理 QA。
- 数据来源包括 AAOIFI 标准、7 国 13 个 fatwa 网站、Argaam 金融报告、阿拉伯语会计/商业考试。
- 总规模为 **14,380 条专家核验实例**，任务格式涵盖 MCQ、开放生成、抽取摘要与因果推理。

### 2.2 数据构建流程

- **Shari’ah Standards QA**：
  - 对 1,264 页、52 项 AAOIFI 标准进行 OCR，使用 Gemini-2.5-Pro；
  - 两名伊斯兰金融专家校验，OCR 精确匹配率 **
