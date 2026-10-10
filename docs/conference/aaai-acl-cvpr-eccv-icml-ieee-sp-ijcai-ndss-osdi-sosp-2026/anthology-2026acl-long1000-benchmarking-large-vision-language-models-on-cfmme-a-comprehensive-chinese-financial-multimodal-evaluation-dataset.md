---
title: "Benchmarking Large Vision-Language Models on CFMME: A Comprehensive Chinese Financial Multimodal Evaluation Dataset"
title_zh: CFMME：面向大型视觉语言模型的中文金融多模态综合评估数据集
authors: "Qian Chen, Xianyin Zhang, Yanzhi Liu, Lifan Guo, Feng Chen, Chi Zhang"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.acl-long.1000.pdf"
tags: ["query:fin-mm-agent"]
score: 10.0
evidence: 中文金融多模态评测基准
tldr: "大型视觉语言模型已能统一处理视觉与文本模态，但缺乏面向金融业务全流程的中文多模态评估基准。本文提出CFMME，一个包含6,052个实例的中文金融多模态评测数据集，覆盖八类金融图像模态与四项核心多模态任务，从基础知识到复杂真实应用全面考察模型的感知、理解、推理与认知能力。该基准为金融多模态智能体的能力评估提供了系统化标准，填补了中文金融多模态评测的空白。"
source: ACL-2026-Long
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1000/fig-001.webp\", \"caption\": \"\", \"page\": 14, \"index\": 1, \"width\": 612, \"height\": 214}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1000/fig-002.webp\", \"caption\": \"\", \"page\": 16, \"index\": 2, \"width\": 863, \"height\": 435}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1000/fig-003.webp\", \"caption\": \"\", \"page\": 17, \"index\": 3, \"width\": 780, \"height\": 297}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1000/fig-004.webp\", \"caption\": \"\", \"page\": 18, \"index\": 4, \"width\": 1659, \"height\": 2342}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1000/fig-005.webp\", \"caption\": \"\", \"page\": 18, \"index\": 5, \"width\": 2976, \"height\": 3968}]"
motivation: 视觉语言模型发展迅速，但缺少覆盖金融业务全流程的中文多模态评估基准。
method: 构建包含6052个实例的CFMME基准，覆盖八类金融图像模态与四类核心多模态任务。
result: 从感知、理解、推理到认知系统评估LVLM在金融业务全流程中的能力表现。
conclusion: 为中文金融多模态模型与智能体提供了系统化的评测标准与数据基础。
---

## Abstract
The emergence of Large Vision-Language Models (LVLMs) has substantially expanded model capabilities beyond text-only understanding, enabling unified inference across both visual and textual modalities and supporting a broader range of real-world applications. To comprehensively evaluate the perception, understanding, reasoning, and cognition capabilities of LVLMs throughout the entire financial business workflow in Chinese contexts, we introduce CFMME, a novel Chinese financial multimodal evaluation benchmark. CFMME comprises 6,052 instances spanning from fundamental academic knowledge to complex real-world applications, covering eight primary financial image modalities and four core multimodal tasks. On CFMME, we conduct a thorough evaluation of representative LVLMs. The results show that the state-of-the-art model attains an overall accuracy of 66.11% on the question answering task and an average score of 77.18 on the detection, recognition, and information extraction tasks, indicating substantial room for improvement in current LVLMs. In addition, we conduct detailed analyses of error causes, cross-modal capabilities, and multi-orientation settings, yielding valuable insights for future research. We hope that CFMME will spur further progress in LVLMs, especially by improving their performance on multiple multimodal tasks in the financial domain.

---

## 论文详细总结（自动生成）

# CFMME：面向大型视觉语言模型的中文金融多模态综合评估数据集——论文总结

## 1. 核心问题与整体含义（研究动机与背景）

- **背景**：大型视觉语言模型（LVLMs）已从纯文本理解扩展到视觉-文本联合推理，在通用领域（MME、MMMU、MMBench）和中文领域（CMMU、CMMMU）均有对应评测基准。
- **问题**：金融领域存在大量多样化视觉数据（表格、图表、印章、文档等），但现有金融多模态基准存在明显不足：
  - **FAMMA**（英文）：数据主要来自教科书与考试，覆盖窄；
  - **FinMME**（英文）：主要依赖研究报告与网页截图；
  - **MME-Finance**（中英双语）：数据量受限；
  - **VisFinEval**（中文）：仅聚焦问答任务，缺乏多任务评估。
- **动机**：尚无基准能系统、全面地评估 LVLMs 在中文金融业务全流程中感知、理解、推理与认知四层能力。
- **整体含义**：作者提出 **CFMME**（Chinese Financial Multimodal Evaluation），包含 **6,052 个实例**，覆盖 **8 类金融图像模态** 与 **4 项核心多模态任务**，从基础知识到复杂真实应用，填补中文金融多模态评测空白。

## 2. 方法论

### 2.1 核心思想
- 从 **知识评估** 与 **应用评估** 两个维度构建基准，兼顾学术知识与真实业务场景。

### 2.2 知识评估（2,818 实例）
- **学科子集**：来自 43 本公开教材（微观经济学、宏观经济学、金融学、商业银行学等），共 **562 实例**。
- **认证子集**：来自 20 类资格考试（注册会计师、中级会计师、初级会计师、注册税务师、证券/基金/期货从业资格等），共 **2,256 实例**。
- 题型包含单选题、多选题、判断题（以多选形式呈现）。
- **难度设计**：560 道多答案题、2,258 道单答案题；308 个多图实例、2,510 个单图实例；**238 道题的选项以图像形式呈现**（截图选项），2,580 道题选项为文本。
- **数据处理流程**：PDF/Word/网页 → pdfplumber/PaddleOCR 解析 → 抽取题目、选项、答案、解析 → 正则去 HTML 标签 → 人工修正字符 → 过滤纯文本实例。

### 2.3 应用评估（3,234 实例）
覆盖四项任务：

| 任务 | 子任务 | 规模 | 数据来源与关键设计 |
|---|---|---|---|
| **检测** | 印章检测（公司/个人） | 756 | 内部印章检测模型预标注 + Label Studio 校验 |
| **识别** | 印章识别 | 213 | ICDAR 2023 ReST 测试集，重新标注，覆盖椭圆/圆/方/三角/菱形 |
| | 表格识别 | 400 | ICDAR 2023 SVRD、TabRecSet、内部数据；312 单页、82 跨页；全线/不完整线/无线表格 |
| | 公式识别 | 200 | 来自教材与考试；128 纯符号公式、72 含中文公式 |
| **信息抽取** | 限定类别/开放类别 | 875 | HUST-CELL（500）、Baidu-FEST（275）、CMB2017（100）；统一 JSON 重标注，仅用测试集 |
| **问答** | 多选/开放 | 790 | 表格、蜡烛图、股权结构图、统计图；505 多选 + 285 开放 |

- **识别任务标注方法**：内部版面分析模型定位 → Qwen3-VL-Plus 与 MinerU2.5 生成伪标签 → 编辑距离大时用 DianJin-OCR-R1 精修 → 人工严格校验（倾向保留编辑距离大的困难样本）。
- **问答数据生成**：Qwen3-VL-Plus 每图生成 10 个候选问题 → 人工筛选/加难 → 人工与 LVLM 并行作答 → 一致性审核（一致则单专家快审，不一致则三专家深度评估）。

### 2.4 质量管控
- 20 名标注员：3 名经济学博士（学科子集）、8 名持证专家（认证子集，每题由 3 名通过该考试的专家复核）、12 名应用评估标注员（6 初级 + 3 博士 + 3 分析师）。
- 全部标注员培训 1 周，全流程约 **1,600 小时**。

## 3. 实验设计

### 3.1 评测对象
- 共评估 **14 个 LVLM**（零样本设定）：
  - 闭源：GPT-4o
  - 开源：Llama-3.2-11B-Vision、Qwen3-VL 系列（8B/235B-A22B，Instruct/Thinking）、InternVL3.5 系列（8B/241B-A28B）、GLM-V 系列（GLM-4.1V-9B、GLM-4.5V）、Kimi-VL 系列（A3B Instruct/Thinking）、ERNIE-4.5-VL 系列（28B-A3B Instruct/Thinking）。

### 3.2 评测指标
- 知识评估：Accuracy、Weighted F1
- 检测：mAP
- 印章识别：1-NED
- 公式识别：CDM、ExpRate@CDM
- 表格识别：TEDS、Structure TEDS
- 信息抽取：字段级 F1
- 问答：Accuracy

### 3.3 实验设置
- 零样本；每个任务使用统一 prompt；温度、top_p、presence_penalty 按各模型官方推荐设置。
- 开源模型通过 vLLM 在 **8 张 NVIDIA A100 GPU** 上本地部署；闭源模型通过 API 访问。

### 3.4 分析性实验
- **错误分析**：对顶级模型的失败案例进行归纳。
- **跨模态能力分析**：表格图像 vs. 表格 HTML 输入对比。
- **多方向鲁棒性分析**：将应用评估问答图像旋转 90°/180°/270°。

## 4. 资源与算力

- **推理部署**：8 × NVIDIA A100 GPU，使用 vLLM 部署开源模型。
- **训练时长/训练算力**：论文 **未明确说明**。本文为评测基准论文，不涉及模型训练，故未报告训练算力开销。
- **数据标注人力**：20 名标注员，约 1,600 小时标注与审核。
- 伪标签生成使用 Qwen3-VL-Plus、MinerU2.5、DianJin-OCR-R1 等模型。

## 5. 实验数量与充分性

### 5.1 实验组数概览
- **主实验**：
  - 表 3：14 个模型在问答任务（知识 + 应用）上的整体对比；
  - 表 4：非推理模型在检测、识别、信息抽取任务上的对比；
  - 表 9–11（附录）：按子集、按来源、按类别的细分性能。
- **分析性实验**：
  - 错误案例分析（图 2，代表性失败案例）；
  - 跨模态对比（表 5，4 个模型 × 表格图像/HTML 两种输入）；
  - 多方向鲁棒性（表 6，4 个模型 × 4 个旋转角度）。
- **稳定性验证**：所有实验重复 **3 轮**，标准差均低于 1.5%。

### 5.2 充分性与公平性评估
- **充分性**：覆盖 14 个模型、4 大任务、多个子任务，辅以错误分析、跨模态与鲁棒性分析，维度较全面。
- **客观性**：零样本设定、统一 prompt、官方推荐参数、3 轮重复取标准差，评估流程规范。
- **公平性**：模型规模跨度大（8B–241B），同时包含 Instruct 与 Thinking 模式，闭源与开源均有覆盖；但部分模型（如 Llama-3.2、Kimi-VL）未参与全部任务，横向对比存在一定不完整。

## 6. 主要结论与发现

- **整体水平不足**：最优模型 Qwen3-VL-235B-A22B-Thinking 在问答任务上准确率仅 **66.11%**，在检测/识别/信息抽取任务上平均分 **77.18**；问答任务中应用评估最高仅 **54.94%**，远低于生产部署所需的 80%+。
- **中英文差异**：中文导向模型显著优于 GPT-4o 等英文导向模型，符合基准面向中文语境的定位。
- **检测是短板**：多数模型难以准确定位目标，最佳 GLM-4.5V 的 mAP 仅 **37.45**，细粒度 grounding 仍是重大挑战。
- **识别与信息抽取表现较好**：印章识别 1-NED 最高达 95.01，信息抽取 F1 最高达 93.43。
- **典型错误模式**：幻觉、感知障碍、金融术语理解不足、推理不合逻辑。
- **跨模态差距**：同一表格以 HTML 输入时性能显著优于图像输入，说明模型在复杂高密度图像感知与跨模态对齐上仍有不足。
- **方向鲁棒性差**：图像旋转后性能下降超 **10%**，需在训练数据中增加旋转样本。

## 7. 优点

- **覆盖全面**：6,052 实例，兼顾知识（教材 + 20 类认证考试）与应用（检测/识别/信息抽取/问答），8 类图像模态，4 项核心任务，是现有中文金融多模态基准中覆盖最广的。
- **难度设计巧妙**：将部分选项以图像形式呈现，增加多模态理解难度；保留多图、多答案、跨页表格等复杂样本。
- **标注流程严谨**：多阶段伪标签 + 人工校验、一致性审核机制、按考试通过资质匹配专家复核，1,600 小时投入保障质量。
- **数据污染控制**：识别与信息抽取任务仅选用测试集（组织方未公开标注），降低数据泄露风险。
- **分析维度丰富**：除主实验外，额外开展错误分析、跨模态对比、多方向鲁棒性分析，并提供 3 轮重复实验的标准差，增强结论可信度。
- **真实场景导向**：数据来源涵盖年报、研报、发票、银行 App、网页截图等，包含模糊背景、倾斜、水印、手机拍摄、手写等真实干扰。

## 8. 不足与局限

- **指标局限**：论文自述使用 Accuracy、CDM、TEDS 等指标可能无法全面评估 LVLM 输出质量（如开放问答的语义正确性）。
- **仅零样本**：未探索 few-shot 设定，可能低估模型真实潜力。
- **图像类型可扩展**：虽覆盖 8 类，但真实金融场景中的图像类型仍可进一步细化与扩充。
- **模型对比不完整**：部分模型（如 Llama-3.2、Kimi-VL）未参与检测/识别/信息抽取任务，跨模型横向比较存在缺口。
- **检测任务评测偏差风险**：检测仅聚焦印章（公司/个人两类），类别较少，且公司印章 mAP 普遍偏低（最佳仅 54.86），可能受标注粒度或数据分布影响。
- **算力报告不完整**：未说明推理总耗时、API 调用成本等资源开销，复现成本不透明。
- **应用限制**：基准聚焦中文金融语境，向其他语言或金融子领域（如保险、跨境支付）迁移需重新适配。
- **潜在偏差**：部分数据来自内部模型预标注与内部数据集，虽经人工校验，仍可能存在标注者主观偏差或数据分布偏向。

（完）
