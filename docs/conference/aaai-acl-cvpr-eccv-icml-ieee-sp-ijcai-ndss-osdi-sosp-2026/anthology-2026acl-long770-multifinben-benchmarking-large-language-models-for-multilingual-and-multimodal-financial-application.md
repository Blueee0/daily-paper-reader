---
title: "MultiFinBen: Benchmarking Large Language Models for Multilingual and Multimodal Financial Application"
title_zh: MultiFinBen：面向多语言与多模态金融应用的大语言模型基准评测
authors: "Xueqing Peng, Lingfei Qian, Yan Wang, Ruoyu Xiang, Yueru He, Yang Ren, Mingyang Jiang, Vincent Jim Zhang, Yuqing Guo, Jeff Zhao, Huan He, Yi Han, Yun Feng, Yuechen Jiang, Yupeng Cao, Haohang Li, Yangyang Yu, Xiaoyu Wang, Penglei Gao, Shengyuan Lin, Keyi Wang, Shanshan Yang, Yilun Zhao, Zhiwei Liu, Peng Lu, Jerry Huang, Suyuchen Wang, Triantafillos Papadopoulos, Polydoros Giannouris, Efstathia Soufleri, Nuo Chen, Zhiyang Deng, Heming Fu, Yijia Zhao, Mingquan Lin, Meikang Qiu, Kaleb E. Smith, Arman Cohan, Xiao-Yang Liu, Jimin Huang, Guojun Xiong, Alejandro Lopez-Lira, Xi Chen, Jun’ichi Tsujii, Jian-Yun Nie, Sophia Ananiadou, Qianqian Xie"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.acl-long.770.pdf"
tags: ["query:fin-mm-agent"]
score: 9.0
evidence: 专家标注的多语言多模态金融基准
tldr: 现有金融领域大模型评测大多局限于纯文本和单一语言，难以覆盖真实场景中的报告、新闻、扫描文件与会议录音。作者提出 MultiFinBen，首个经专家标注的多语言（五种语言）与多模态（文本、视觉、音频）金融评测基准，并新增跨语言金融推理与金融OCR两个任务族，考察从财报和新闻中整合证据以及从含表格图表扫描件中抽取结构化文本的能力。实验表明当前模型在这些任务上仍有明显缺口。该工作为金融多模态智能体的能力评测提供了可复用的基准与方法。
source: ACL-2026-Long
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long770/fig-001.webp\", \"caption\": \"\", \"page\": 1, \"index\": 1, \"width\": 3123, \"height\": 3063}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long770/fig-002.webp\", \"caption\": \"\", \"page\": 2, \"index\": 2, \"width\": 1452, \"height\": 2067}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long770/fig-003.webp\", \"caption\": \"\", \"page\": 5, \"index\": 3, \"width\": 5400, \"height\": 1500}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long770/fig-004.webp\", \"caption\": \"\", \"page\": 9, \"index\": 4, \"width\": 4223, \"height\": 3770}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long770/fig-005.webp\", \"caption\": \"\", \"page\": 9, \"index\": 5, \"width\": 1956, \"height\": 1722}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long770/fig-006.webp\", \"caption\": \"\", \"page\": 9, \"index\": 6, \"width\": 7547, \"height\": 6671}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long770/fig-007.webp\", \"caption\": \"\", \"page\": 23, \"index\": 7, \"width\": 1663, \"height\": 728}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long770/fig-008.webp\", \"caption\": \"\", \"page\": 27, \"index\": 8, \"width\": 3738, \"height\": 1836}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long770/fig-009.webp\", \"caption\": \"\", \"page\": 30, \"index\": 9, \"width\": 3818, \"height\": 1916}]"
motivation: 现有金融领域大模型评测多为纯文本、单语言且已被现有模型接近饱和，无法反映真实金融分析中的多语言多模态信息。
method: 作者构建首个专家标注的多语言（五种语言）多模态（文本、视觉、音频）金融基准，并设计跨语言金融推理与金融OCR两类新任务。
result: 实验显示当前模型在跨语言证据整合与含表格图表扫描件抽取等任务上仍存在明显能力缺口。
conclusion: 该基准为金融多模态智能体的能力评测提供了可复用的任务与方法基础。
---

## Abstract
Real-world financial analysis involves information across multiple languages and modalities, from reports and news to scanned filings and meeting recordings. Yet most existing evaluations of LLMs in finance remain text-only, monolingual, and largely saturated by current models. To bridge these gaps, we present MultiFinBen, the first expert-annotated multilingual (five languages) and multimodal (text, vision, audio) benchmark for evaluating LLMs in realistic financial contexts. MultiFinBen introduces two new task families: multilingual financial reasoning, which tests cross-lingual evidence integration from filings and news, and financial OCR, which extracts structured text from scanned documents containing tables and charts. Rather than aggregating all available datasets, we apply a structured, difficulty-aware selection based on advanced model performance, ensuring balanced challenge and removing redundant tasks. Evaluating 21 leading LLMs shows that even frontier multimodal models like GPT-4o achieve only 46.01% overall, stronger on vision and audio but dropping sharply in multilingual settings. These findings expose persistent limitations in multilingual, multimodal, and expert-level financial reasoning. All datasets, evaluation scripts, and leaderboards are publicly released.

---

## 论文详细总结（自动生成）

# MultiFinBen 论文结构化总结

## 1. 核心问题与整体含义（研究动机与背景）

- **现实需求与评测现状的错位**：真实金融分析需要跨语言、跨模态地整合信息（财报、新闻、扫描件、会议录音），但现有金融 LLM 评测大多停留在**纯文本、单一语言**，且已被当前模型接近饱和。
- **现有基准的三大局限**：
  - **单语言、单模态**：多数只覆盖英文文本，忽视跨语言理解与文本/表格/图表/PDF/音频的多模态推理。
  - **任务难度失衡**：多为简单聚合，未做难度校准。例如 FinBen 中 8 个文本分类数据集有 7 个在零样本下准确率已超 60%，导致分数虚高、掩盖真实短板。
  - **缺失关键场景**：此前无基准涉及多语言金融推理（整合异构来源）与扫描版金融 PDF 的 OCR 抽取。
- **整体含义**：论文提出 **MultiFinBen**——首个经专家标注、覆盖五种语言与三种模态（文本、视觉、音频）的金融基准，旨在系统性地暴露当前 LLM 在跨语言、跨模态、专家级金融推理上的真实边界。

## 2. 方法论

### 核心思想
构建一个**统一、可解释、可扩展**的金融评测框架，沿**模态、语言、任务**三个正交维度组织数据集，并引入**难度感知（difficulty-aware）**的数据集筛选机制，避免无差别聚合。

### 关键设计细节
- **三维组织**：
  - **模态**：文本、视觉（图表/表格/图像）、音频（财报电话会议）。
  - **语言**：英语、中文、日语、西班牙语、希腊语；覆盖单语言、双语、多语言三种设定。
  - **任务**：沿用 FinBen 的七类核心任务——信息抽取（IE）、文本分析（TA）、问答（QA）、文本生成（TG）、风险管理（RM）、预测（FO）、决策（DM）。
- **难度感知筛选机制**：
  - 用 GPT-4o 与 LLaMA-3.1-70B-Instruct 两个代表性模型计算**标准化平均分**作为难度指标：
    - **公式**：`s̄_d = ½ (s_GPT-4o,d + s_LLaMA3.1,d)`
    - 选择这两个模型的原因：GPT-4o 提供前沿推理与指令对齐，LLaMA-3.1-70B-Instruct 提供开放透明的基线；两者架构、规模、训练语料互补，可给出独立于单一模型偏置的复杂度估计。
  - **三档难度**：easy（`s̄_d > 60`）、medium（`20 ≤ s̄_d ≤ 60`）、hard（`s̄_d < 20`）。
  - **筛选规则**：在每个「模态–语言–任务」配置内，保留**模型间差异最大**的数据集；若出现并列，选表现更低者以保留未来提升空间。

### 两类新任务族
- **多语言金融问答（PolyFiQA）**：提供多语言上下文 `C = {R, N_en, N_zh, N_ja, N_es, N_el}`，其中 R 为财报（10-K/10-Q），N_lang 为同期五语种新闻；模型需跨文档整合多语言信息生成答案。
  - 直接取材于原生语种披露与新闻，而非翻译对齐，保留真实措辞与文化框架。
  - 分 **PolyFiQA-Easy** 与 **PolyFiQA-Expert** 两个难度层级。
- **金融 OCR**：将每份 PDF 切分为页级图像 `{I₁, I₂, …, Iₙ}`，模型对每页生成 HTML 序列 `Tᵢ = OCR(Iᵢ)`，需保留标题、表格、段落等文档结构。
  - 目标不仅是文字识别，更是**结构保真与语义恢复**。

### 数据构建流程（专家在环）
- 三名金融专家（经济学/商业/会计背景）参与新闻筛选、问题撰写、指南制定、标注与质量控制，累计投入 **130+ 小时**（Label Studio）。
- 每条问题按 **Relevance（1–4）** 与 **Consistency（1–3）** 双维度由多名标注者独立打分，累计分 > 5 才保留。
- 标注者间一致性：PolyFiQA-Easy 达 **89.38%**，PolyFiQA-Expert 达 **91.21%**（采用 Gwet's AC1）。
- 新闻生成采用「要点提取 → GPT-4o 辅助起草 → 人工后编辑」三阶段半自动管线。

## 3. 实验设计

### 基准构成
- **规模**：36 个数据集，覆盖 5 种语言、3 种模态、7 类任务、3 个难度层级（6 个 easy、18 个 medium、12 个 hard）。
- **文本（单语言）**：26 个数据集从 68 个候选中按难度校准选出。
  - 英文：SC、FinRED、FINER-ORD（IE）；Headlines、TSA（TA）；XBRL-Math、FinQA、TATQA（QA）；ECTSUM、EDTSUM（TG）；CCF（RM）；BigData22（FO）；MSFT（DM）。
  - 中文：RRE（IE）、AIE/LNE（TA）、FinanceIQ（QA）。
  - 日语：chabsa（TA）。西班牙语：MultiFin、TSA、EFPA、FNS-2023。希腊语：GRFinNUM、GRMultiFin、GRFinQA、GRFNS-2023。
- **双语**：DOLFIN（英–西，文档级金融翻译）。
- **多语言**：新引入 PolyFiQA-Easy / PolyFiQA-Expert。
- **视觉**：TableBench（英 QA）+ 新构建的 EnglishOCR、JapaneseOCR、SpanishOCR、GreekOCR。
- **音频**：MDRM-test（ASR，medium）、FinAudioSum（摘要，hard）。

### 评测模型（21 个）
- 闭源：GPT-4o、o3-mini。
- 开源通用：Llama-4-Scout、Gemma-3-4B/27B、Qwen2.5-Omni-7B、Llama-3.1-70B-Instruct、Deepseek-V3、Qwen2.5-32B-Instruct、DeepSeek-R1-Distill-Qwen-32B-Japanese。
- 领域专用：XuanYuan（中文金融）、FinMA-ES（西语）、Plutus-8B（希腊语）、FinMA-7B（英文金融）。
- 视觉专用：LLaVA-1.6、Deepseek-VL。
- 音频专用：Whisper-V3、Qwen2-Audio、Qwen2-Audio-Instruct、SALMONN-7B/13B。

### 评测指标
- 各任务原有指标：F1、Entity F1、Accuracy、ROUGE-1/ROUGE-L、MCC、Sharpe Ratio（SR）、WER 等。
- 附加指标：BERTScore、数值一致性检查、编辑距离。
- 最终报告**模态平衡总分**（text/vision/audio 三类平均分的均值）。

### 四个研究问题（RQ）
- RQ1：LLM 在多语言多模态真实金融场景下的性能缺陷有多严重？
- RQ2：不同模态间是否存在偏置或权衡？
- RQ3：单语言能力能否泛化到复杂多语言跨语言推理？
- RQ4：难度感知框架如何帮助细致分析模型强弱？

## 4. 资源与算力

- **GPU 资源**：由 NVIDIA 学术资助计划支持，使用 **32K A100 GPU-hours**（在 Brev 平台上）。
- **API 费用**：OpenAI 与 TogetherAI（DeepSeek、Llama-4、Gemma-3）官方 API，温度设为 0；含 API 成本在内的总支出约 **80,000 美元**。
- **部署方式**：开源模型用 **vLLM** 在本地 GPU 上部署评测；评测管线基于 **LM Evaluation Harness** 定制。
- **说明**：论文未披露训练时长或自训练算力（该工作为评测基准，主要算力消耗在推理评测）。

## 5. 实验数量与充分性

- **实验规模**：21 个模型 × 36 个数据集，跨 3 模态、5 语言、3 难度层级、3 语言设定（单语/双语/多语）的系统评测。
- **多维度分析**：围绕 4 个 RQ 展开，并配以雷达图对比模态、语言、难度三个维度的分层表现。
- **补充实验**：附录提供 BERTScore、数值一致性、编辑距离等补充指标（Table 8、Table 9），以及错误分析（附录 I）与难度校准的完整列表（附录 D）。
- **客观性与公平性**：
  - 统一的评测管线、温度=0、模态平衡总分以消除模态样本量差异带来的偏差。
  - 难度校准基于两个互补模型，降低单一模型偏置。
  - 标注质量有量化的一致性指标（89.38%/91.21%）支撑。
- **潜在不足**：未进行随机基线或多数类基线的归一化（论文自陈），可能使简单/不均衡任务分数偏高。

## 6. 主要结论与发现

- **Finding 1（RQ1）**：当前 LLM 在多语言多模态金融推理上存在明显上限。最强模型 GPT-4o 总体仅 **46.01%**；Qwen2.5-Omni 33.53%、Llama-4 20.89%。文本专用最强模型 Llama-3.1-70B 仅 14.07%；Whisper-V3（纯音频）17.19%、LLaVA-1.6（纯视觉）5.15%、FinMA-7B（纯英文）8.94%。
- **Finding 2（RQ2）**：多模态模型存在**跨模态权衡**。GPT-4o 在文本任务（40.98%）上反而被文本专用的 Llama-3.1-70B（42.20%）超越；Qwen2.5-Omni、Llama-4 也低于各自的文本版本。但在视觉与音频任务上多模态模型显著优于单模态基线（GPT-4o 视觉 46.02%、音频 51.04%）。
- **Finding 3（RQ3）**：**单语言能力扩展不等于多语言推理**。GPT-4o 在多语言任务上仅 9.79%（Easy）与 5.31%（Expert）；反而整体分数较低的 Deepseek-V3（34.72%/30.35%）和 Llama-3.1-70B（25.04%/18.56%）表现更好，说明多语言推理是需要专门建模的不同挑战。
- **Finding 4（RQ4）**：难度感知设计支持**分层细粒度评测**。性能从 easy 的 32.73% 骤降至 hard 的 7.20%；除 Gemma-3-4B/27B 因多模态优势在 medium 表现较好外，多数模型呈 easy > medium > hard 单调趋势。领域专用模型（o3-mini、XuanYuan、R1-Qwen32B-JA）在 easy 上反而表现不佳，提示过度特化可能损害泛化。
- **新增数据集（PolyFiQA、四个 OCR）被证实为最难挑战之一**，系统性地揭示了跨语言与跨模态推理的薄弱环节。

## 7. 优点

- **首创性与覆盖广度**：首个统一覆盖五语言、三模态、三语言设定、七任务的金融基准，填补多语言推理与金融 OCR 两大空白。
- **难度感知方法论创新**：用双模型标准化分数与三档难度、按「模态–语言–任务」保留最大模型差异数据集的机制，取代简单聚合，使评测更具诊断性与可解释性，并支持随模型进步动态演化。
- **高质量专家标注**：专家在环流程、130+ 小时投入、双维度打分与量化一致性指标（>89%），保证数据可审计、可复现。
- **原生语种数据**：PolyFiQA 直接取材原生披露与新闻，而非翻译对齐，更贴近真实分析场景。
- **评测严谨**：统一管线、温度=0、模态平衡总分、多指标补充验证（BERTScore、数值一致性、编辑距离）。
- **开放透明**：数据集、代码与排行榜全部公开，并引入 MOF 模型开放度标签。

## 8. 不足与局限

- **开放数据集稀缺**：金融领域缺乏真正开源数据集，许多资源许可受限或模糊，限制再分发与标准化评测，覆盖可能无法完全反映真实任务多样性。
- **新数据集规模有限**：受高昂标注成本与专业门槛限制，新增数据集相比大规模 NLP 基准规模偏小，扩展规模与多样性有待提升。
- **多语言音频覆盖不足**：音频评测仅限英文财报电话会议，受法律与版权壁垒限制，未来需扩展至多语言。
- **模型覆盖不完整**：受算力与访问限制，仅评测了代表性但有限的 21 个模型，新兴与区域性模型未纳入。
- **无基线归一化**：评分未减去随机或多数类基线，可能在简单或不均衡任务上虚高，影响可比性。
- **潜在风险**：基准高分可能被误认为真实能力；部分语言与金融情境仍代表性不足，可能放大偏置；许可模糊与预训练数据泄漏存在伦理/法律风险。

（完）
