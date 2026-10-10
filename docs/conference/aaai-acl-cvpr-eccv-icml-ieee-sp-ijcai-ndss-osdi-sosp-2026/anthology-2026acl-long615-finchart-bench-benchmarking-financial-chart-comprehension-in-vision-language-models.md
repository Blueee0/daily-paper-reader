---
title: "FinChart-Bench: Benchmarking Financial Chart Comprehension in Vision-Language Models"
title_zh: FinChart-Bench：视觉语言模型金融图表理解基准
authors: "Dong Shu, Haoyang Yuan, Yuchen Wang, Yanguang Liu, Huopu Zhang, Mengnan Du"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.acl-long.615.pdf"
tags: ["query:fin-mm-agent"]
score: 9.0
evidence: 首个面向真实金融图表理解的视觉语言模型基准
tldr: 金融图表具有复杂时序结构和领域术语，但现有视觉语言模型研究少有覆盖。论文提出FinChart-Bench，首个面向真实金融图表的基准，包含2015至2024年的1200张图表图像及7016道真假判断、单选和问答题目。对26个先进模型的系统评测揭示了开源与闭源模型差距缩小等关键发现，为金融多模态理解与评测提供了重要基础。
source: ACL-2026-Long
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-001.webp\", \"caption\": \"\", \"page\": 2, \"index\": 1, \"width\": 332, \"height\": 375}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-002.webp\", \"caption\": \"\", \"page\": 2, \"index\": 2, \"width\": 2000, \"height\": 2000}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-003.webp\", \"caption\": \"\", \"page\": 2, \"index\": 3, \"width\": 2000, \"height\": 2000}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-004.webp\", \"caption\": \"\", \"page\": 2, \"index\": 4, \"width\": 2000, \"height\": 2000}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-005.webp\", \"caption\": \"\", \"page\": 2, \"index\": 5, \"width\": 2000, \"height\": 2000}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-006.webp\", \"caption\": \"\", \"page\": 2, \"index\": 6, \"width\": 2000, \"height\": 2000}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-007.webp\", \"caption\": \"\", \"page\": 2, \"index\": 7, \"width\": 2000, \"height\": 2000}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-008.webp\", \"caption\": \"\", \"page\": 2, \"index\": 8, \"width\": 332, \"height\": 375}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-009.webp\", \"caption\": \"\", \"page\": 5, \"index\": 9, \"width\": 1388, \"height\": 1388}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-010.webp\", \"caption\": \"\", \"page\": 5, \"index\": 10, \"width\": 1388, \"height\": 1388}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-011.webp\", \"caption\": \"\", \"page\": 5, \"index\": 11, \"width\": 1351, \"height\": 1314}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-012.webp\", \"caption\": \"\", \"page\": 5, \"index\": 12, \"width\": 768, \"height\": 747}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-013.webp\", \"caption\": \"\", \"page\": 5, \"index\": 13, \"width\": 768, \"height\": 747}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-014.webp\", \"caption\": \"\", \"page\": 5, \"index\": 14, \"width\": 768, \"height\": 747}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-015.webp\", \"caption\": \"\", \"page\": 5, \"index\": 15, \"width\": 1351, \"height\": 1314}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-016.webp\", \"caption\": \"\", \"page\": 15, \"index\": 16, \"width\": 800, \"height\": 702}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-017.webp\", \"caption\": \"\", \"page\": 15, \"index\": 17, \"width\": 584, \"height\": 242}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-018.webp\", \"caption\": \"\", \"page\": 15, \"index\": 18, \"width\": 714, \"height\": 763}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-019.webp\", \"caption\": \"\", \"page\": 15, \"index\": 19, \"width\": 584, \"height\": 242}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-020.webp\", \"caption\": \"\", \"page\": 15, \"index\": 20, \"width\": 548, \"height\": 524}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-021.webp\", \"caption\": \"\", \"page\": 15, \"index\": 21, \"width\": 821, \"height\": 886}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-022.webp\", \"caption\": \"\", \"page\": 15, \"index\": 22, \"width\": 1874, \"height\": 1128}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-023.webp\", \"caption\": \"\", \"page\": 16, \"index\": 23, \"width\": 945, \"height\": 566}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-024.webp\", \"caption\": \"\", \"page\": 16, \"index\": 24, \"width\": 987, \"height\": 556}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-025.webp\", \"caption\": \"\", \"page\": 16, \"index\": 25, \"width\": 1117, \"height\": 1091}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-026.webp\", \"caption\": \"\", \"page\": 16, \"index\": 26, \"width\": 978, \"height\": 655}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-027.webp\", \"caption\": \"\", \"page\": 16, \"index\": 27, \"width\": 802, \"height\": 559}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-028.webp\", \"caption\": \"\", \"page\": 16, \"index\": 28, \"width\": 769, \"height\": 1036}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-029.webp\", \"caption\": \"\", \"page\": 17, \"index\": 29, \"width\": 1201, \"height\": 553}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-030.webp\", \"caption\": \"\", \"page\": 17, \"index\": 30, \"width\": 653, \"height\": 831}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-031.webp\", \"caption\": \"\", \"page\": 17, \"index\": 31, \"width\": 785, \"height\": 826}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-032.webp\", \"caption\": \"\", \"page\": 17, \"index\": 32, \"width\": 793, \"height\": 711}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-033.webp\", \"caption\": \"\", \"page\": 17, \"index\": 33, \"width\": 998, \"height\": 565}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-034.webp\", \"caption\": \"\", \"page\": 17, \"index\": 34, \"width\": 1824, \"height\": 1062}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-035.webp\", \"caption\": \"\", \"page\": 18, \"index\": 35, \"width\": 976, \"height\": 909}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-036.webp\", \"caption\": \"\", \"page\": 18, \"index\": 36, \"width\": 1811, \"height\": 1149}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-037.webp\", \"caption\": \"\", \"page\": 18, \"index\": 37, \"width\": 1003, \"height\": 745}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-038.webp\", \"caption\": \"\", \"page\": 18, \"index\": 38, \"width\": 873, \"height\": 721}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-039.webp\", \"caption\": \"\", \"page\": 18, \"index\": 39, \"width\": 895, \"height\": 992}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-040.webp\", \"caption\": \"\", \"page\": 18, \"index\": 40, \"width\": 886, \"height\": 565}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-041.webp\", \"caption\": \"\", \"page\": 19, \"index\": 41, \"width\": 988, \"height\": 848}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-042.webp\", \"caption\": \"\", \"page\": 19, \"index\": 42, \"width\": 1499, \"height\": 841}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-043.webp\", \"caption\": \"\", \"page\": 19, \"index\": 43, \"width\": 1499, \"height\": 841}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-044.webp\", \"caption\": \"\", \"page\": 19, \"index\": 44, \"width\": 1029, \"height\": 674}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-045.webp\", \"caption\": \"\", \"page\": 19, \"index\": 45, \"width\": 1034, \"height\": 607}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-046.webp\", \"caption\": \"\", \"page\": 19, \"index\": 46, \"width\": 889, \"height\": 587}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-047.webp\", \"caption\": \"\", \"page\": 19, \"index\": 47, \"width\": 921, \"height\": 462}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-048.webp\", \"caption\": \"\", \"page\": 20, \"index\": 48, \"width\": 937, \"height\": 807}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-049.webp\", \"caption\": \"\", \"page\": 20, \"index\": 49, \"width\": 1037, \"height\": 692}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-050.webp\", \"caption\": \"\", \"page\": 20, \"index\": 50, \"width\": 1600, \"height\": 1556}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-051.webp\", \"caption\": \"\", \"page\": 20, \"index\": 51, \"width\": 1001, \"height\": 974}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-052.webp\", \"caption\": \"\", \"page\": 20, \"index\": 52, \"width\": 1600, \"height\": 1556}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-053.webp\", \"caption\": \"\", \"page\": 20, \"index\": 53, \"width\": 1001, \"height\": 974}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-054.webp\", \"caption\": \"\", \"page\": 20, \"index\": 54, \"width\": 1001, \"height\": 974}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-055.webp\", \"caption\": \"\", \"page\": 20, \"index\": 55, \"width\": 1001, \"height\": 974}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-056.webp\", \"caption\": \"\", \"page\": 20, \"index\": 56, \"width\": 1001, \"height\": 974}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-057.webp\", \"caption\": \"\", \"page\": 20, \"index\": 57, \"width\": 1001, \"height\": 974}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-058.webp\", \"caption\": \"\", \"page\": 20, \"index\": 58, \"width\": 1001, \"height\": 974}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-059.webp\", \"caption\": \"\", \"page\": 20, \"index\": 59, \"width\": 1600, \"height\": 1556}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-060.webp\", \"caption\": \"\", \"page\": 20, \"index\": 60, \"width\": 1001, \"height\": 974}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-061.webp\", \"caption\": \"\", \"page\": 20, \"index\": 61, \"width\": 1001, \"height\": 974}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-062.webp\", \"caption\": \"\", \"page\": 20, \"index\": 62, \"width\": 1001, \"height\": 974}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-063.webp\", \"caption\": \"\", \"page\": 20, \"index\": 63, \"width\": 1001, \"height\": 974}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-064.webp\", \"caption\": \"\", \"page\": 20, \"index\": 64, \"width\": 1001, \"height\": 974}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-065.webp\", \"caption\": \"\", \"page\": 20, \"index\": 65, \"width\": 1001, \"height\": 974}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long615/fig-066.webp\", \"caption\": \"\", \"page\": 20, \"index\": 66, \"width\": 1001, \"height\": 974}]"
motivation: 金融图表具有复杂时序结构与领域术语，现有视觉语言模型研究对其覆盖不足。
method: 构建FinChart-Bench基准，采集1200张金融图表并标注真假、单选和问答共7016题。
result: 对26个先进视觉语言模型的评测揭示开源与闭源模型性能差距正在缩小等关键发现。
conclusion: 该基准为金融图表多模态理解提供了标准化评测平台与重要洞察。
---

## Abstract
Large vision-language models (LVLMs) have made significant progress in chart understanding. However, financial charts, characterized by complex temporal structures and domain-specific terminology, remain notably underexplored. We introduce FinChart-Bench, the first benchmark specifically focused on real-world financial charts. FinChart-Bench comprises 1,200 financial chart images collected from 2015 to 2024, each annotated with True/False (TF), Multiple Choice (MC), and Question Answering (QA) questions, totaling 7,016 questions. We conducted a comprehensive evaluation of 26 state-of-the-art LVLMs on FinChart-Bench. Our evaluation reveals critical insights: (1) the performance gap between open-source and closed-source models is narrowing, (2) performance degradation occurs in upgraded models within families, (3) many models struggle with instruction following, (4) both advanced models show significant limitations in spatial reasoning abilities, and (5) current LVLMs are not reliable enough to serve as automated evaluators. These findings highlight important limitations in current LVLM capabilities for financial chart understanding.

---

## 论文详细总结（自动生成）

# FinChart-Bench 论文中文总结

## 1. 核心问题与整体含义（研究动机与背景）

- **领域空白**：大型视觉语言模型（LVLMs）在图表理解上已取得显著进展，但**金融图表**因其复杂的时间结构、密集的视觉布局和领域专业术语，长期处于研究盲区。
- **潜在价值**：金融图表承载市场行为、公司业绩与经济趋势的关键信息，若能被 LVLM 可靠解读，有望为金融行业带来数十亿美元级别的价值。
- **现有基准的三大缺陷**：
  - 过度依赖 LVLM 自动生成数据并充当自动评估器，而当前模型尚不可靠；
  - 评估设计存在严重歧义，例如真值“140 Million”是否应接受“140M”“$140M”“140000000”等变体；
  - 缺乏金融专用数据集，且多数基准仅对少量子集做单轮人工校验。
- **整体含义**：论文提出 **FinChart-Bench**，这是首个专门面向真实金融图表的基准，试图以“高质量人工校验 + 无歧义单 token 答案”弥补上述缺口。

## 2. 方法论：核心思想与关键技术细节

- **核心思想**：通过五阶段流水线，从真实企业演示幻灯片中提取金融图表，结合自动化生成与**两轮严格人工评估**，构建高质量、可复现、答案无歧义的评测基准。
- **五阶段流水线**：
  - **(a) 数据源**：采集 2015–2024 年企业演示幻灯片，来源包括 Bloomberg News 与公司官网，涵盖公司主办会议及投行等第三方活动，多数为外部主办而非传统路演。
  - **(b) 图表提取**：将 PDF 每页转为高分辨率图像，用 **Qwen2.5-VL-7B-Instruct** 输出边界框坐标（JSON 格式 `bbox_2d`），程序化裁剪，产出超 **130,000** 张候选图表。
  - **(c) 图表过滤（第一轮人工）**：按四条标准人工筛选——必须是图表、完整清晰、高分辨率无干扰、复杂度适中。保留 **71,000+** 张（每年约 7,000 张），再每年人工精选 120 张，最终 **1,200 张**。
  - **(d) QA 生成**：用 **GPT-4.1** 为每张图生成三类任务各 2 对问答，共 **7,200 对**。答案严格限制为单 token：TF 为“True/False”，MC 为“A/B/C/D”，QA 为单个数字（不含标点与单位，单位在题干中给出）；QA 的推理步骤单独存为元数据，不作为评分真值。
  - **(e) QA 评估与修正（第二轮人工）**：逐对校验，正确者保留、答案错误者人工修正（含推理步骤）、问题不清者删除，最终保留 **7,016 题**。
- **最终数据构成**：2,383 道 True/False、2,349 道 Multiple Choice、2,284 道 Reasoning QA。
- **评估指标**：
  - 主指标为 **Exact Match (EM)**，因所有真值均为单 token，无歧义、可复现；
  - 辅助指标 **Avg.** 为三任务按题量加权的平均分：
    - `Avg. = (X·Score_TF + Y·Score_MC + Z·Score_QA) / (X + Y + Z)`，其中 X、Y、Z 分别为三类任务的题目数。
- **提示格式**：统一要求模型以 `Result = [[ answer ]]` 格式返回答案，便于自动解析。

## 3. 实验设计

- **数据集/场景**：FinChart-Bench 本身，1,200 张真实金融图表（2015–2024），7,016 道题，覆盖 **14 种图表类型**（如 Bar with num 占 40%、Bar with line 26%、Line 13% 等）。
- **评测对象**：共 **26 个**先进 LVLM，分为三类：
  - **通用开源（13 个）**：Llama-4 (17B)、Llama-3.2 (11B)、Llava-v1.6 (7B)、Qwen2.5-VL (7B)、Qwen2-VL (7B)、DeepSeek-VL2 (2.8B)、Gemma-3 (12B)、Mistral-3.1 (24B)、Sa2VA (8B)、nanoVLM (222M)、Cosmos-Reason1 (7B)、MedGemma (4B)、Blip-2 (2.7B)。
  - **图表专用开源（5 个）**：UniChart (201M)、Matcha (282M)、ChartGemma (3B)、ChartInstruct-LLama2 (7B)、ChartInstruct-FlanT5 (3B)。
  - **闭源专有（8 个）**：GPT-5、GPT-4.1、GPT-4.1-mini、GPT-4o、o3、o4-mini、Claude Sonnet 4、Gemini 2.5 Pro。
- **对比维度**：三类模型横向对比、同家族跨代对比、不同图表类型细粒度对比、性能与成本（每百万 token 输入/输出价格）权衡对比。
- **评测方式**：所有模型使用统一提示格式与官方配置，任务涵盖 TF / MC / QA，报告各任务得分与加权平均分。

## 4. 资源与算力

- **GPU 配置**：除 LLaMa 4 外，所有实验在**单张 NVIDIA A100 SXM4（80GB）**上完成；LLaMa 4 使用 **4 张 NVIDIA A100 SXM4（共 320GB）**。
- **精度设置**：所有开源模型以 **bfloat16** 精度加载，其余参数保持官方默认，未做额外修改。
- **训练时长**：论文**未提及**训练时长，因其为基准评测类工作，不涉及模型训练。
- **人工成本**：两轮人工评估从 **2025 年 3 月持续至 6 月**；图表过滤约 1,000 张/小时/人，QA 校验修正约 80 对/小时/人。

## 5. 实验数量与充分性

- **实验规模**：覆盖 26 个模型 × 3 类任务 × 14 种图表类型，外加成本/性能权衡分析与模型家族跨代对比，整体规模较大。
- **是否有消融实验**：作为基准论文，**未设置传统消融实验**，重点在于多模型、多任务的横向评测。
- **充分性**：
  - 模型覆盖广泛，兼顾开源、图表微调与闭源三大类，规模从 222M 到 24B，具有代表性；
  - 提供图表类型级别的细粒度结果（Figure 3 与附录 Figure 18），可定位模型弱点。
- **客观与公平性**：
  - 统一提示模板、统一答案格式、统一 bfloat16 精度与官方配置，评测流程可复现；
  - 单 token 真值 + EM 指标避免了 GPT 评估带来的主观性；
  - 但**未报告多次运行方差或置信区间**，且闭源 API 版本更新可能影响可复现性。

## 6. 主要结论与发现

- **开源与闭源差距缩小，闭源或已触瓶颈**：Mistral-3.1 与 Qwen2.5-VL 在部分任务上接近甚至超过 GPT-4o；GPT 家族各代性能稳定，暗示闭源模型在金融图表理解上可能已达瓶颈。
- **升级模型出现性能退化**：LLaMa 4 平均分高于 LLaMa 3.2，但在 MC 任务上落后（59.70% vs 64.00%）；GPT-4.1-mini 在 MC 上超过 GPT-4.1（86.77% vs 83.19%），与 OpenAI 官方报告一致。
- **指令遵循能力不足**：DeepSeek-VL2、nanoVLM、Blip-2 及全部图表微调模型在 TF 上低于 63%、MC 上低于 10%，主要因难以遵循复杂输出格式；多数失败模型参数量小于 3B。
- **图表微调模型表现反而差**：可能因过度微调牺牲了基座模型的通用指令遵循能力，揭示了任务专精与通用能力的权衡。
- **空间推理是核心瓶颈**：模型在“Line with Number”“Bar with Number”等直接标注数值的图表上表现较好，但在“Line”“Bar”“Area”“Line with Area”“Line with Scatter”等需将视觉元素与坐标轴对齐的图表上显著下降。
- **LVLM 不足以充当自动评估器**：Qwen2.5-VL 初步提取的图表经人工过滤后近半数被丢弃，且模型普遍缺乏指令遵循与空间推理能力，验证了依赖人工评估的必要性。
- **高级模型性能模式趋同**：闭源与先进开源模型在各类图表上呈现相似的成功/失败模式，暗示存在共享瓶颈。
- **成本效益结论**：o4-mini（$1/$4.4）与 GPT-4.1-mini（$0.4/$1.8）性价比最佳，GPT-4o 因价格高、性能不占优已不具实用性。

## 7. 优点

- **首创性**：首个专注真实金融图表的基准，填补金融多模态理解评测空白。
- **数据质量高**：全量数据经历**两轮人工评估**（图表过滤 + QA 校验修正），远超多数基准仅对子集做单轮检查的做法。
- **评估无歧义**：所有真值设计为单 token，EM 即可可靠度量，无需昂贵的 GPT 评估，兼具可复现性与低成本。
- **任务设计精巧**：在“需要深度推理”与“答案易于评估”之间取得平衡，QA 的推理过程单独保留为元数据，兼顾监督信息与评估客观性。
- **评测全面**：26 个模型、三类任务、14 种图表类型，并提供成本-性能权衡分析，对实际部署有直接参考价值。
- **发现具有洞察力**：如“升级模型性能退化”“微调损害指令遵循”“空间对齐是瓶颈”等结论对后续模型设计有启发意义。

## 8. 不足与局限

- **规模受限**：受人工校验成本制约，最终仅 1,200 张图、7,016 题，规模远小于 ChartQA、PlotQA 等自动化生成的基准。
- **采样偏差风险**：每年仅从约 7,000 张合格图中精选 120 张，选择标准可能引入主观偏差，且覆盖年份虽长但样本稀疏。
- **领域与语言覆盖有限**：数据主要来自英文企业演示幻灯片，未说明是否涵盖多语言、多市场或非上市公司场景。
- **无消融实验**：作为基准论文，未对提示模板、答案格式约束、模型规模等变量做系统性消融，难以量化各设计选择的影响。
- **闭源模型统计不一致**：正文称评估 7 个闭源模型，但实际列出 8 个，存在表述瑕疵。
- **可复现性隐忧**：闭源 API 模型版本会持续更新，实验结论可能随版本变化而失效；未报告多次运行方差。
- **推理过程未被评估**：QA 的推理步骤仅作元数据存储，未纳入评分，无法衡量模型的推理链条质量。
- **应用限制**：基准聚焦“看懂图表”，但真实金融决策还涉及多图跨页推理、表格与文本联合理解等，当前设计未覆盖这些更复杂场景。

（完）
