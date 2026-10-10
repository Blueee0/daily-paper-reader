---
title: "Finch: Benchmarking Finance & Accounting across Spreadsheet-Centric Enterprise Workflows"
title_zh: Finch：面向以表格为中心的企业工作流的财务与会计基准
authors: "Haoyu Dong, Pengkun Zhang, Yan Gao, Xuanyu Dong, Yilin Cheng, Mingzhe Lu, Adina Yakefu, Shuxin Zheng"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.findings-acl.523.pdf"
tags: ["query:fin-mm-agent"]
score: 8.0
evidence: 含多模态表格与图表的金融企业工作流
tldr: 真实企业金融与会计工作流交织着数据录入、检索、计算与可视化，且文档充满表格图表等多模态杂乱内容，现有评测难以覆盖。作者提出FinWorkBench（Finch），源自安然等机构2000至2025年的真实工作区，并设计LLM辅助的工作流挖掘构建流程。该基准为金融多模态文档理解与智能体评测提供了贴近实战的平台。
source: ACL-2026-Findings
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-001.webp\", \"caption\": \"\", \"page\": 3, \"index\": 1, \"width\": 664, \"height\": 392}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-002.webp\", \"caption\": \"\", \"page\": 3, \"index\": 2, \"width\": 692, \"height\": 1056}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-003.webp\", \"caption\": \"\", \"page\": 3, \"index\": 3, \"width\": 674, \"height\": 1037}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-004.webp\", \"caption\": \"\", \"page\": 4, \"index\": 4, \"width\": 1204, \"height\": 891}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-005.webp\", \"caption\": \"\", \"page\": 4, \"index\": 5, \"width\": 2173, \"height\": 769}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-006.webp\", \"caption\": \"\", \"page\": 5, \"index\": 6, \"width\": 1373, \"height\": 786}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-007.webp\", \"caption\": \"\", \"page\": 5, \"index\": 7, \"width\": 1231, \"height\": 785}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-008.webp\", \"caption\": \"\", \"page\": 14, \"index\": 8, \"width\": 650, \"height\": 650}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-009.webp\", \"caption\": \"\", \"page\": 14, \"index\": 9, \"width\": 408, \"height\": 314}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-010.webp\", \"caption\": \"\", \"page\": 14, \"index\": 10, \"width\": 430, \"height\": 289}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-011.webp\", \"caption\": \"\", \"page\": 14, \"index\": 11, \"width\": 435, \"height\": 316}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-012.webp\", \"caption\": \"\", \"page\": 14, \"index\": 12, \"width\": 435, \"height\": 333}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-013.webp\", \"caption\": \"\", \"page\": 14, \"index\": 13, \"width\": 430, \"height\": 325}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-014.webp\", \"caption\": \"\", \"page\": 14, \"index\": 14, \"width\": 473, \"height\": 333}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-015.webp\", \"caption\": \"\", \"page\": 14, \"index\": 15, \"width\": 1536, \"height\": 567}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-016.webp\", \"caption\": \"\", \"page\": 14, \"index\": 16, \"width\": 448, \"height\": 351}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-017.webp\", \"caption\": \"\", \"page\": 22, \"index\": 17, \"width\": 652, \"height\": 1490}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-018.webp\", \"caption\": \"\", \"page\": 22, \"index\": 18, \"width\": 659, \"height\": 1503}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-019.webp\", \"caption\": \"\", \"page\": 22, \"index\": 19, \"width\": 374, \"height\": 770}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-020.webp\", \"caption\": \"\", \"page\": 22, \"index\": 20, \"width\": 375, \"height\": 808}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-021.webp\", \"caption\": \"\", \"page\": 22, \"index\": 21, \"width\": 356, \"height\": 784}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-022.webp\", \"caption\": \"\", \"page\": 22, \"index\": 22, \"width\": 772, \"height\": 358}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-023.webp\", \"caption\": \"\", \"page\": 22, \"index\": 23, \"width\": 722, \"height\": 385}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-024.webp\", \"caption\": \"\", \"page\": 22, \"index\": 24, \"width\": 630, \"height\": 774}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-025.webp\", \"caption\": \"\", \"page\": 22, \"index\": 25, \"width\": 796, \"height\": 308}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-026.webp\", \"caption\": \"\", \"page\": 22, \"index\": 26, \"width\": 791, \"height\": 863}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-027.webp\", \"caption\": \"\", \"page\": 23, \"index\": 27, \"width\": 1278, \"height\": 914}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-028.webp\", \"caption\": \"\", \"page\": 23, \"index\": 28, \"width\": 597, \"height\": 957}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-029.webp\", \"caption\": \"\", \"page\": 23, \"index\": 29, \"width\": 642, \"height\": 707}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-030.webp\", \"caption\": \"\", \"page\": 24, \"index\": 30, \"width\": 1134, \"height\": 794}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-031.webp\", \"caption\": \"\", \"page\": 24, \"index\": 31, \"width\": 1829, \"height\": 678}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-032.webp\", \"caption\": \"\", \"page\": 25, \"index\": 32, \"width\": 834, \"height\": 938}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-033.webp\", \"caption\": \"\", \"page\": 25, \"index\": 33, \"width\": 819, \"height\": 936}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-034.webp\", \"caption\": \"\", \"page\": 25, \"index\": 34, \"width\": 685, \"height\": 863}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-035.webp\", \"caption\": \"\", \"page\": 25, \"index\": 35, \"width\": 645, \"height\": 790}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-036.webp\", \"caption\": \"\", \"page\": 26, \"index\": 36, \"width\": 1384, \"height\": 728}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-037.webp\", \"caption\": \"\", \"page\": 26, \"index\": 37, \"width\": 1264, \"height\": 858}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-038.webp\", \"caption\": \"\", \"page\": 27, \"index\": 38, \"width\": 1890, \"height\": 679}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-039.webp\", \"caption\": \"\", \"page\": 27, \"index\": 39, \"width\": 1113, \"height\": 653}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl523/fig-040.webp\", \"caption\": \"\", \"page\": 27, \"index\": 40, \"width\": 1200, \"height\": 683}]"
motivation: 真实企业财务工作流杂乱且多模态，现有评测缺乏对表格图表等实战内容的覆盖。
method: 构建FinWorkBench基准，采集安然等机构真实工作区，并用LLM辅助挖掘构建工作流。
result: 形成覆盖预算、交易、资产管理等领域的多模态财务工作流评测集。
conclusion: 为金融智能体在真实多模态企业场景中的能力评测提供重要基准。
---

## Abstract
We introduce FinWorkBench (a.k.a. Finch) for evaluating AI agents on real-world, enterprise-grade finance and accounting workflows that interleave data entry, structuring, formatting, web search, cross-file retrieval, calculation, modeling, validation, translation, visualization, and reporting. Finch is sourced from authentic enterprise workspaces from Enron (15,000 files and 500,000 emails) and other financial institutions, covering the period 2000–2025 and preserving the in-the-wild messiness of multimodal artifacts such as tables and charts across diverse domains including budgeting, trading, asset management, and operational management.We propose a workflow construction process that combines LLM-assisted mining of workflows from authentic enterprise environments with expert annotation: (1) LLM-assisted, expert-verified derivation of workflows from real-world email threads and spreadsheet version histories, and (2) meticulous annotation requiring over 700 hours of expert effort. This yields 172 composite workflows with 384 tasks, involving 1,710 spreadsheets with 27 million cells, along with PDFs and other artifacts, capturing the intrinsically messy, long-horizon, knowledge-intensive, and collaborative nature of real-world enterprise work.We conduct both human and automated evaluations of frontier AI systems, including GPT 5.1, Claude Sonnet/Opus 4.5, Gemini 3 Pro, Grok 4, and Qwen 3 Max. Under human evaluation, GPT 5.1 Pro spends an average of 16.8 minutes per workflow yet passes only 38.4% of workflows. Comprehensive case studies further surface the challenges that real-world enterprise workflows pose for AI agents.

---

## 论文详细总结（自动生成）

# FINCH 论文总结

## 1. 核心问题与整体含义（研究动机与背景）
- **研究动机**：金融与会计（F&A）是企业中高风险、知识密集、劳动密集的核心工作，但真实工作流高度杂乱、长程且依赖上下文：表格、PDF、邮件、图表、图片等多模态工件相互交织，存在多版本协作编辑、跨表引用、复杂布局、隐式公式逻辑、术语歧义等问题。
- **核心问题**：当前前沿 AI Agent 能否真正处理专业人士日常面对的、杂乱且长程的企业级 F&A 工作流？
- **整体含义**：现有评测多基于干净、孤立的小型表格或 QA 对，难以反映真实企业工作的复合性、协作性和多模态特性。论文提出 **FINCH（FinWorkBench）**，一个源自真实企业环境的 F&A 工作流基准，用于系统评估 AI Agent 在真实企业场景中的能力与瓶颈。

## 2. 方法论：核心思想与关键技术细节
- **核心思想**：从真实企业协作环境（邮件线程、表格版本历史、最终交付物）中挖掘并构建工作流，而非人工构造玩具任务。
- **工作流构建流程**：
  - **邮件线程挖掘**：用 GPT-5 从 Enron 邮件语料中识别明确陈述业务目标且附带表格的协作消息，区分“强 grounding”（输入与参考答案均为附件）和“部分 grounding”（仅有输入或输出）两类。
  - **版本化表格挖掘**：收集 Enron 与 EUSES 的版本化工作簿，用 LLM 差分识别连续版本，推断底层工作流；专家验证并精修输入/参考文件，剔除无意义变更。
  - **最终交付物构建**：从投资机构、世界银行、加拿大/英国政府等高质量工件中，由领域专家编写真实工作流指令，构造输入与参考文件；并改编 WideSearch 10 例和 DABStep 3 例以覆盖网络搜索与多源 QA。
- **统一 Schema**：每个工作流包含自然语言指令、输入文件、参考输出，并标注任务类型（数据录入/导入、结构化/格式化、检索、计算、建模、验证、翻译、可视化、报告等）与业务类型（预算、交易、资产管理、运营管理等）。
- **质量控制**：5 名专家（含 3 名 9 年以上行业经验者）参与，每个工作流至少 2 人独立验证，约 40% 至少一轮修订，复杂案例多轮迭代；ChatGPT/Claude 作为辅助检查器，最终由人工确认；总计超过 **700 小时**专家标注。
- **评估方法**：
  - **人工评估**：专家并排检查输入、参考输出与模型输出，按指令是否被满意完成给出二值 pass/fail，允许多种合理解法。
  - **LLM-as-Judge**：支持修改、生成、QA 三类文件处理；对修改任务计算结构化 diff（`diff_ref`、`diff_model`）并构造紧凑快照（每表首尾 10 行、前 5 列及所有修改行列），同时渲染截图以感知合并单元格、条件格式、图表等；按完整性、正确性、避免过度编辑、可读性四维评分，输出二值结果与理由；网络搜索任务允许 1% 容差。
- **API 基线设计**：以 SpreadsheetBench 为框架，扩展为富语义 Markdown 编码，每单元格编码为 `(Address, Value, Type, Formula)`；支持多模态输入；采用单次代码生成协议，在 Docker 沙箱中执行 Python 脚本，10 分钟超时，temperature=0.7。

## 3. 实验设计：数据集/场景、Benchmark 与对比方法
- **Benchmark**：FINCH 包含 **172 个复合工作流、384 个任务**，涉及 **1,710 个表格（27M 单元格）**，另有 17 个 PDF、12 张图片、3 个 Word 文档及 JSON/CSV/Markdown。
- **数据来源**：
  - Enron 邮件语料（约 15,000 表格文件、500,000 邮件、150 名员工）
  - EUSES 表格语料（约 450 个金融表格）
  - 证券与资产管理公司、世界银行、加拿大和英国政府公开文件
  - WideSearch、DABStep 等公开语料
  - 时间跨度覆盖 2000–2025。
- **场景特征**：
  - 78.5% 工作流为多任务（>1 task），仅 21.5% 单任务。
  - 86.6% 涉及多个文件，最多 14 个文件；92.4% 涉及多个输入/参考 sheet，平均 8 个 sheet，最多 91 个。
  - 中位工作流覆盖 15K 单元格，平均 157K，最大 370 万；平均 21.5K 公式（中位 212）。
  - 20.3% 含图表，7.6% 需推理 PDF 或图像；20 个工作流涉及非表格文件。
- **对比方法/模型**：
  - **产品侧 Agent**：ChatGPT（GPT-5.1 Pro 模式）、Claude（Opus 4.5 / Sonnet 4.5 Thinking 模式）。
  - **API 侧模型**：GPT-5.1、Claude Sonnet 4.5、Gemini 3 Pro Preview、Grok 4、Qwen 3 Max。
  - **基线框架**：SpreadsheetBench，扩展编码与多模态支持。
  - **额外案例**：Claude Coworker（Opus 4.6）用于 20 个代表性任务的工具调用开销分析。
- **评估设置**：人工评估为金标准；自动评估以 GPT-5-mini 为主 judge，GPT-5.1 作为更强 judge 做对比；禁用历史聊天以避免跨运行泄漏。

## 4. 资源与算力
- **未明确说明**：论文为基准构建与评测类工作，**没有报告 GPU 型号、数量或训练时长**，也未训练新模型。
- **涉及的计算资源**：
  - API 调用与产品接口访问前沿模型；
  - API 基线在 Docker 容器 + Jupyter Kernel Gateway 中执行，挂载数据集卷，**10 分钟会话超时**；
  - 多模态输入处理、LLM-as-Judge 自动化评估、截图渲染等依赖模型 API，但未给出具体算力消耗。
- **结论**：若关注训练算力，该论文未提供；其资源成本主要体现在 **700+ 小时专家标注**和大量模型 API 调用上。

## 5. 实验数量与充分性
- **实验规模**：
  - 自动评估覆盖全部 **172 个 workflow**；
  - 人工评估覆盖全部 workflow（Opus 4.5 因新发布未做人工评估）；
  - 按任务数分组：1、2、3、≥4 任务，分析通过率与耗时；
  - 按 9 类任务类型统计通过率；
  - 非表格工件子集：20 个 workflow；
  - Rubric 四维评分：完整性、正确性、避免过度编辑、可读性；
  - 工具调用开销案例：20 个代表性任务；
  - 错误分析：对失败 workflow 进行人工轨迹检查与归因。
- **充分性**：
  - 覆盖多模型、多任务类型、多业务领域、多模态文件，人工与自动评估相互印证，整体较充分。
  - 但部分类别样本偏少：翻译仅 3 个、网络搜索 11 个、资产管理 3 个；非表格子集仅 20 个；工具调用案例仅 20 个且非随机抽样。
- **客观性与公平性**：
  - 统一指令、统一 judge、禁用历史聊天、API 侧统一单次生成与 temperature，具有一定公平性。
  - 但产品侧 Agent 与 API 侧设置不同：产品 Agent 可多轮交互、执行反馈、自我纠错，API 基线为严格单次生成，**可能低估 API 模型真实能力**，两者不能完全直接比较。
  - LLM judge 与人工一致性较高（GPT-5-mini judge 与人工在 GPT-5.1 Pro 和 Sonnet 4.5 上分别一致 82.1% 和 90.2%），但仍有 judge 偏差，自动分数应视为近似。

## 6. 主要结论与发现
- **整体通过率低**：即使最强 Agent 也通过不到 50% 的工作流。
  - 人工评估：GPT-5.1 Pro **38.4%**，平均耗时 **16.8 分钟/工作流**；Claude Sonnet 4.5 为 **25.0%**。
  - 自动评估：GPT-5.1 Pro **41.9%**，Claude Opus 4.5 **43.0%**，Claude Sonnet 4.5 **29.1%**。
  - API 侧：GPT-5.1 32.0%、Gemini 3 Pro 27.3%、Grok 4 23.8%、Qwen 3 Max 14.5%。
- **长程复合是瓶颈**：GPT-5.1 Pro 在 ≤2 任务工作流通过率 **44.3%**，>2 任务降至 **23.5%**；≥4 任务仅 **5.6%**。
- **任务类型差异大**：数据录入/导入 25.0%、结构化/格式化 29.1%、网络搜索 9.1%、跨表检索 35.1%、计算 39.2%、验证 37.8%、金融建模 33.3%、翻译 **0.0%**、摘要/可视化 36.4%（GPT-5.1 Pro 人工评估）。
- **非表格工件更难**：涉及 PDF/Word/图像的工作流，GPT-5.1 Pro 通过率 **35.0%**，低于整体 38.4%；Sonnet 4.5 为 25.0%。
- **正确性是主要瓶颈**：Rubric 评分中，Sonnet 4.5 完整性 55.8% 但正确性仅 36.0%；Opus 4.5 完整性 69.8%、正确性 45.3%。
- **错误归因**（以 Claude Sonnet 4.5 产品侧失败为例）：
  - 任务理解错误 10%；
  - 数据检索错误 25%；
  - 公式推理错误 35%；
  - 代码生成错误 25%；
  - 数据渲染错误 5%。
- **失败源于能力组合而非单一缺失**：模型在孤立任务上可能已具备相关能力，但在真实企业极端条件下（大而碎的表格生态、语义同质密集、不规则布局、公式隐式逻辑、多模态工件）局部小错会被长程执行放大。
- **工具调用开销**：非 web 任务中位 **14 次**工具调用（范围 6–25）；两个 web 搜索任务分别需 **107 和 71 次**调用；任务类型数量不能线性解释工具调用开销，业务逻辑深度和跨表依赖影响更大。

## 7. 优点
- **真实企业来源**：基于 Enron、EUSES、世界银行、政府文件等真实工件，保留“in-the-wild”杂乱性，而非合成玩具任务。
- **创新的工作流挖掘**：从邮件线程和表格版本历史中诱导工作流，捕捉真实协作上下文与变更意图。
- **高质量专家标注**：700+ 小时、5 名专家、多轮质控、约 40% 修订，标注难度高且流程严谨。
- **复合长程设计**：78.5% 多任务，任务交织于共享表格与文件，贴近真实工作。
- **多模态与异构文件**：覆盖表格、PDF、图片、Word、图表、公式等，评估维度丰富。
- **双轨评估**：人工评估为金标准，LLM-as-Judge 可扩展

- **双轨评估**：人工评估为金标准，LLM-as-Judge 可扩展至全量工作流，并报告二者一致性、四维 rubric 与失败理由，兼顾评估深度与规模。
- **可复现与可扩展**：统一 schema、Docker 沙箱、明确的输入/参考输出和任务分类，为后续模型比较、错误诊断与基准扩展提供基础。
- **诊断价值强**：不仅给出通过率，还按任务数、任务类型、文件模态、rubric 维度和工具调用开销进行细分，能定位“长程复合”“公式推理”“跨表检索”等具体瓶颈。

## 8. 局限与潜在问题
- **产品 Agent 与 API 基线不完全可比**：产品侧可多轮交互、观察执行反馈并自我纠错，API 侧采用单次代码生成协议，可能低估 API 模型在交互式设置下的真实能力；因此两者排名和差距需谨慎解读。
- **部分类别样本偏少**：翻译、网络搜索、资产管理、非表格工件、工具调用分析等子集规模较小，相关通过率波动较大，统计结论的稳健性有限。
- **LLM-as-Judge 仍有偏差风险**：尽管与人工一致性较高，但自动 judge 可能偏好特定格式、忽略隐性业务规则，或在复杂表格 diff 中漏判；论文也承认自动分数应视为近似。
- **二值 pass/fail 指标较粗粒度**：工作流通常包含多个任务，二值判定可能掩盖“部分完成”“多数步骤正确但最后一步失败”等差异，难以完全反映模型能力梯度。
- **数据来源的时空与领域偏差**：Enron、EUSES 等语料带有特定年代、行业和组织文化特征，表格工具、文件格式与业务流程可能与当前企业实践存在差异；政府/世行文件也偏特定报告场景。
- **构建与评估成本高**：700+ 小时专家标注、多轮质控、人工并排评估和截图渲染，使基准扩展和频繁复评成本较高，可能限制社区大规模迭代。
- **隐私、许可与伦理约束**：使用真实企业邮件、工作簿和公开文件虽经处理，但仍涉及敏感信息脱敏、版权与再分发边界；不同司法辖区的合规要求可能影响数据开放。
- **多模态与图表评分仍有限**：虽然纳入 PDF、图像、Word 和图表，但自动 judge 对图表语义、布局意图和视觉一致性的判断仍不如人工，相关结论需保守。
- **工具调用统计非随机抽样**：20 个代表性任务的分析能提供洞见，但不能直接外推到全部 172 个工作流，工具调用次数与任务难度之间的关系仍需更大规模验证。

## 9. 对领域的影响与启示
- **评测范式转移**：从干净、孤立的小型表格任务或 QA 对，转向真实企业协作中产生的端到端、多文件、多模态、长程工作流；这更接近 Agent 落地时的实际挑战。
- **能力瓶颈重新定位**：模型并非缺少单一原子能力，而是在长程执行中因检索、公式推理、代码生成、渲染等局部错误累积而失败；未来研究应关注一致性、验证、自我纠错和过程监督。
- **系统设计启示**：企业级 F&A Agent 需要规划器、工具调用、代码执行沙箱、多模态解析、跨表引用、记忆与审计机制，而非仅依赖更强的基座模型。
- **基准建设方法**：从真实协作痕迹（邮件线程、版本历史、最终交付物）中挖掘工作流，再由领域专家精修和验证，是构建高生态效度基准的有效路径。
- **人机协作定位**：当前最强 Agent 通过率仍低于 50%，且耗时较长，短期内更适合作为专业人员的辅助工具，用于草稿生成、检索、格式化和初步校验，而非完全替代人工。
- **未来方向**：过程奖励/验证器、表格专用表示、工具学习、多智能体分工、成本-精度权衡、交互式评估协议，以及更细粒度的部分得分指标，都是值得探索的方向。

## 10. 总结
FINCH 的核心贡献在于把真实企业 F&A 工作流转化为可评测基准，并用人工与自动双轨评估揭示了前沿 Agent 在长程复合、多模态、公式推理和跨表依赖上的显著不足。其价值不仅是一个新 benchmark，更在于提供了一套从数据挖掘、专家质控到错误归因的评估方法论。对学术界，它提示应重视端到端真实工作流与过程性能力；对工业界，它说明当前 Agent 尚需人机协作与工程化保障才能进入高风险金融会计场景。

（完）
