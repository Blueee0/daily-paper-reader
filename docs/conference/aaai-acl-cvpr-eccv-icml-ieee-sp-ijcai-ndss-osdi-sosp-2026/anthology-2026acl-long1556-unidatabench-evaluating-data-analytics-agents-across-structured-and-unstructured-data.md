---
title: "UniDataBench: Evaluating Data Analytics Agents Across Structured and Unstructured Data"
title_zh: UniDataBench：跨结构化与非结构化数据评估数据分析智能体
authors: "Han Weng, Zhou Liu, Yuanfeng Song, Xiaoming Yin, Xing Chen, Wentao Zhang"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.acl-long.1556.pdf"
tags: ["query:fin-mm-agent"]
score: 6.0
evidence: 跨结构化与非结构化数据评估数据分析智能体的基准
tldr: 真实商业环境的数据分布于关系数据库、半结构化库与非结构化文件，但现有基准难以评估智能体跨数据类型的能力。论文提出UniDataBench，一个基于真实行业分析报告构建的多源基准，用于评估数据分析智能体处理多样数据源并提取洞察的能力。该工作为跨结构化与非结构化数据的分析智能体评测提供了统一平台。
source: ACL-2026-Long
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-001.webp\", \"caption\": \"\", \"page\": 3, \"index\": 1, \"width\": 2270, \"height\": 822}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-002.webp\", \"caption\": \"\", \"page\": 4, \"index\": 2, \"width\": 3255, \"height\": 3234}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-003.webp\", \"caption\": \"\", \"page\": 6, \"index\": 3, \"width\": 347, \"height\": 347}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-004.webp\", \"caption\": \"\", \"page\": 6, \"index\": 4, \"width\": 722, \"height\": 491}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-005.webp\", \"caption\": \"\", \"page\": 6, \"index\": 5, \"width\": 1024, \"height\": 1024}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-006.webp\", \"caption\": \"\", \"page\": 6, \"index\": 6, \"width\": 1024, \"height\": 1024}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-007.webp\", \"caption\": \"\", \"page\": 6, \"index\": 7, \"width\": 1024, \"height\": 1024}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-008.webp\", \"caption\": \"\", \"page\": 6, \"index\": 8, \"width\": 1024, \"height\": 1024}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-009.webp\", \"caption\": \"\", \"page\": 6, \"index\": 9, \"width\": 793, \"height\": 898}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-010.webp\", \"caption\": \"\", \"page\": 6, \"index\": 10, \"width\": 588, \"height\": 542}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-011.webp\", \"caption\": \"\", \"page\": 6, \"index\": 11, \"width\": 676, \"height\": 531}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-012.webp\", \"caption\": \"\", \"page\": 6, \"index\": 12, \"width\": 528, \"height\": 464}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-013.webp\", \"caption\": \"\", \"page\": 6, \"index\": 13, \"width\": 381, \"height\": 357}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-014.webp\", \"caption\": \"\", \"page\": 6, \"index\": 14, \"width\": 395, \"height\": 341}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-015.webp\", \"caption\": \"\", \"page\": 6, \"index\": 15, \"width\": 377, \"height\": 353}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-016.webp\", \"caption\": \"\", \"page\": 6, \"index\": 16, \"width\": 442, \"height\": 325}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-017.webp\", \"caption\": \"\", \"page\": 6, \"index\": 17, \"width\": 732, \"height\": 681}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-018.webp\", \"caption\": \"\", \"page\": 6, \"index\": 18, \"width\": 653, \"height\": 686}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-019.webp\", \"caption\": \"\", \"page\": 6, \"index\": 19, \"width\": 612, \"height\": 612}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-020.webp\", \"caption\": \"\", \"page\": 6, \"index\": 20, \"width\": 1024, \"height\": 1024}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-021.webp\", \"caption\": \"\", \"page\": 6, \"index\": 21, \"width\": 1280, \"height\": 1280}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-022.webp\", \"caption\": \"\", \"page\": 6, \"index\": 22, \"width\": 1280, \"height\": 1280}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-023.webp\", \"caption\": \"\", \"page\": 6, \"index\": 23, \"width\": 422, \"height\": 346}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-024.webp\", \"caption\": \"\", \"page\": 6, \"index\": 24, \"width\": 443, \"height\": 279}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-025.webp\", \"caption\": \"\", \"page\": 6, \"index\": 25, \"width\": 769, \"height\": 594}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-026.webp\", \"caption\": \"\", \"page\": 6, \"index\": 26, \"width\": 1024, \"height\": 1024}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-027.webp\", \"caption\": \"\", \"page\": 6, \"index\": 27, \"width\": 853, \"height\": 754}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-028.webp\", \"caption\": \"\", \"page\": 6, \"index\": 28, \"width\": 1082, \"height\": 950}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-029.webp\", \"caption\": \"\", \"page\": 6, \"index\": 29, \"width\": 1024, \"height\": 1024}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-030.webp\", \"caption\": \"\", \"page\": 6, \"index\": 30, \"width\": 1024, \"height\": 1024}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-031.webp\", \"caption\": \"\", \"page\": 6, \"index\": 31, \"width\": 772, \"height\": 575}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-032.webp\", \"caption\": \"\", \"page\": 6, \"index\": 32, \"width\": 1024, \"height\": 1024}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-033.webp\", \"caption\": \"\", \"page\": 8, \"index\": 33, \"width\": 8342, \"height\": 3778}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-034.webp\", \"caption\": \"\", \"page\": 9, \"index\": 34, \"width\": 2344, \"height\": 1751}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-035.webp\", \"caption\": \"\", \"page\": 9, \"index\": 35, \"width\": 2343, \"height\": 1751}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-036.webp\", \"caption\": \"\", \"page\": 14, \"index\": 36, \"width\": 1560, \"height\": 1310}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-037.webp\", \"caption\": \"\", \"page\": 16, \"index\": 37, \"width\": 2100, \"height\": 900}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-038.webp\", \"caption\": \"\", \"page\": 16, \"index\": 38, \"width\": 1500, \"height\": 1200}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-039.webp\", \"caption\": \"\", \"page\": 18, \"index\": 39, \"width\": 1634, \"height\": 1456}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-040.webp\", \"caption\": \"\", \"page\": 19, \"index\": 40, \"width\": 2400, \"height\": 1800}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1556/fig-041.webp\", \"caption\": \"\", \"page\": 19, \"index\": 41, \"width\": 2400, \"height\": 1800}]"
motivation: 真实商业数据分布于多种结构化与非结构化源，现有基准难以评估智能体跨数据类型能力。
method: 提出UniDataBench多源基准，基于真实行业分析报告合成与真实分析趋势一致的数据。
result: 构建了覆盖关系数据库、半结构化库与非结构化文件的分析智能体评测平台。
conclusion: 该基准为跨结构化与非结构化数据的分析智能体评估提供了统一标准。
---

## Abstract
In real-world business environments, data is stored in a variety of sources, including structured relational databases, semi-structured databases, and unstructured files. The ability to extract reasonable insights across these diverse sources is integral to data-driven decision-making. Existing benchmarks, however, are limited in assessing agents’ capabilities across these diverse data types. To address this gap, we introduce UniDataBench, a multi-source benchmark designed to evaluate the performance of data analytics agents in handling diverse data sources. Specifically, UniDataBench is constructed based on real-life industry analysis reports, employing a pipeline to synthesize data that aligns with authentic analytical trends. It encompasses diverse datasets spanning relational databases, CSV files, and NoSQL stores to reflect real-world business settings, and provides a unified framework for evaluating how effectively agents can explore multiple data formats, extract insights, and generate meaningful summaries and recommendations. Based on UniDataBench, we propose a novel LLM-based agent named ReActInsight, an autonomous agent that performs end-to-end analysis over diverse data sources by automatically discovering cross-source linkages, decomposing goals, and generating robust, self-correcting code to extract actionable insights. Our benchmark and agent together provide a framework for facilitating the development of data analytics agents in real-world applications.

---

## 论文详细总结（自动生成）

# UniDataBench：跨结构化与非结构化数据评估数据分析智能体 —— 论文总结

## 一、核心问题与整体含义（研究动机与背景）

- **现实痛点**：现代企业智能（Business Intelligence）中，最有价值的洞察很少存在于单一、结构良好的数据集中，而往往来自对**碎片化、多格式信息环境**的综合（关系型数据库、CSV、NoSQL、非结构化文本文件等）。从高层业务目标出发、迭代式地跨源探索并提炼洞察，是数据驱动决策的核心能力。
- **现有基准的缺口**：
  - 早期基准（如 DS-1000、DSEval、Text2Analysis、DABench）聚焦于**孤立、细粒度**的代码生成或特定问题分析，多局限于 CSV 单一格式。
  - 面向端到端高层目标的基准（如 InsightBench、DABstep）虽推进了多步推理评估，但通常**只覆盖单一、自包含的数据源**，或局限于单一企业管理域。
  - 部分基准的洞察由 LLM 合成或人为植入趋势，且分析结论由人工设计，削弱了对真实场景的评估效力。
  - 现有支持多格式的智能体（Code Interpreter、Pandas Agent、DABstep 的 ReAct 式 Agent）多为**各格式孤立处理**，缺乏跨源联合推理。
- **论文含义**：提出 **UniDataBench**（多源数据分析基准）与 **ReActInsight**（跨源自主分析智能体），二者共同构成一个促进真实场景数据分析智能体研发的评测框架。

## 二、方法论

### 2.1 UniDataBench 基准构建（三阶段流水线）

- **阶段 A：从真实报告中抽取洞察**
  - 专家从真实企业业务分析报告（产品指标、销售波动、用户反馈情感、市场竞争等）中抽取核心业务结论，再抽象为**高层分析目标**（例如把"北方区因物流延迟导致销售下滑"抽象为"分析销售波动的根因"）。
  - 由独立资深数据科学家团队进行**交叉验证**，确保映射逻辑符合实际业务逻辑。
  - 洞察分类体系（改编自 QuickInsights，Ding et al. 2019）分四类：**Trend（趋势）、Comparison（对比）、Extreme Value（极值）、Attribution（归因）**。
- **阶段 B：数据合成与校验**
  - 因原始数据敏感不可得，采用三步生成：
    1. 基于问题—洞察对构造包含领域逻辑（如 `Lead Rate = CTR × CVR`）的指令提示，引导 LLM 设计**多源数据 Schema**，再人工检查其连贯性与正确性；
    2. **主动注入干扰列/干扰事件**（如 `campaign_id`、`weather_index`、无关的营销周期），提升分析复杂度与真实感；
    3. 指令 LLM 生成 **Python 脚本**（而非直接生成数据文本）来合成数据，以规避长文本长度限制与长程结构一致性难题；非结构化文档则单独由 LLM 扩写生成。
  - **验证**：用 Python 脚本生成与洞察相关的可视化图表，由数据分析专家进行 human-in-the-loop 复核，确认每条目标洞察都**可被视觉证据发现**，未通过者不入库。
- **统计规模**：100 个分析任务、439 条目标洞察、223 个数据文件；任务分三档难度——25 个 easy（单格式）、50 个 medium（两格式）、25 个 hard（三至四种格式）；覆盖 5 大业务域（用户行为 29、业务绩效 23、市场竞争 13、销售渠道 18、宏观行业 17）；文件类型分布 CSV 110（49.3%）、DB 49（22.0%）、NoSQL 32（14.3%）、TXT 32（14.3%）；平均行数 17,945。
- **标注可靠性**：3 名资深数据科学家（数据科学学位 + 3 年以上 BI 经验），经校准会议，ICC(2,1) = 0.79（"Good" 级一致性）。

### 2.2 ReActInsight 智能体（四阶段架构）

- **阶段 I：多源数据探索与跨源关联发现**
  - *异构 Schema 抽取*：自动识别 SQLite/CSV/JSON/TXT；轻量采样（`nrows = 1000`）提取元数据；对非结构化文本用 LLM 做内容摘要与背景扩写，生成"**伪 Schema**"（如摘要列），使其可被发现与关联。
  - *统一元数据中枢（MetaGraph）*：每个数据源的每一列作为节点，赋予全局唯一别名（如 `csv.sales.user_id`），存储数据类型与示例值。形式化：列 $c = (\text{id}(c), \tau(c), E(c))$，MetaGraph $G_M = \bigcup_{i=1}^{N} C_i$。
  - *实体图生成（EntityGraph）*：对列做两两比较，构造带权无向图 $G_E=(V,E,W)$，$V=G_M$；当两列类型兼容且相似度超过阈值 $\theta$ 时连边，边权为相似度：
    $$\text{Sim}(c_a,c_b) = w_n \cdot \text{Sim}_{name}(c_a,c_b) + w_v \cdot \text{Sim}_{val}(c_a,c_b)$$
    其中 $\text{Sim}_{name}$ 为**二元精确匹配**指示函数（$\in\{0,1\}$），$\text{Sim}_{val}$ 为采样值集合上的 **Jaccard 相似系数**；经验设定 $w_n=0.6,\ w_v=0.4$。
  - *可执行 Join-Hint 生成*：按权重降序排序边，取 top-$k$ 生成人类可读提示，如"You must JOIN ON: csv.sales.user_id = sqlite.users.customer_id"，直接注入后续代码生成。
- **阶段 II：ReAct 式分层规划**
  - 将高层目标先推理拆解为**子目标序列**，再进一步细化为**具体、可回答的子问题**（如"上季度各产品类别的总销售额是多少？"），直接指导代码生成。
- **阶段 III：鲁棒代码生成与自适应可视化**
  - 代码生成提示中**显式加入 Join-Hint**，引导正确构造跨源 JOIN / Pandas merge；
  - 在**沙箱**中执行并捕获 stdout/stderr，出错则触发**自纠错循环**（回灌原代码、错误信息、子目标，最多重试 `n_retries = 3`）；
  - **自适应可视化**：依据数据性质与子问题类型选择图表（散点图看相关性、时序图看趋势、热力图看矩阵、柱状图看对比）。
- **阶段 IV：洞察综合与总结**
  - 聚合各步观测、识别关键发现、构建连贯叙述，输出高层概览 + 可视化支撑的详细发现 + 可执行建议。
- **模型级联优化（Model Cascading）**：常规简单任务（如子问题生成）交给小模型（GPT-3.5-Turbo / GPT-4o-mini）；任务过难或自纠错反复失败时才升级到大模型（GPT-4o、GPT-5），以平衡性能与成本/时延。

## 三、实验设计

- **基准与场景**：自建 UniDataBench（100 任务 / 439 洞察 / 223 文件 / 4 种格式 / 3 档难度 / 5 大业务域）。
- **对比方法（6 个基线 + 本文方法）**：CodeGen、ReAct、Data-to-Dashboard（D2D）、Pandas Agent、DABstep 基线 Agent、AgentPoirot，以及 ReActInsight。
- **公平性适配**：为原本仅支持单源（CSV）的基线扩展文件读取工具，使其对全部格式具备**程序化访问能力**，实现"信息对等"，从而将**多步推理能力**作为唯一对比变量。
- **评价指标**：沿用 InsightBench 做法，采用 **G-Eval** 双层级评估：
  - *Insight-level*：对每条 ground-truth 洞察 $g$，
