---
title: "CiQi-Agent: Aligning Vision, Tools and Aesthetics in Multimodal Agent for Cultural Reasoning on Chinese Porcelains"
title_zh: CiQi-Agent：在中文瓷器文化推理中协调视觉、工具与美学的多模态智能体
authors: "Wenhan Wang, Zhixiang Zhou, Zhongtian Ma, Yanzhu Chen, Ziyu Lin, Hao Sheng, Pengfei Liu, Wenqi Shao, Qiaosheng Zhang, Yu Qiao"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://media.eventhosts.cc/Conferences/ECCV2026/pdfs/14476.pdf"
tags: ["query:fin-mm-agent"]
score: 6.0
evidence: 具备视觉工具与多模态检索的多模态智能体
tldr: 古瓷器鉴赏需要大量历史、材质与美学专业知识，普通用户难以参与。本文提出CiQi-Agent，一个面向中文古瓷器鉴定的领域多模态智能体，支持多图输入、视觉工具调用与多模态检索增强生成，对朝代、窑口、釉色、纹饰等六个属性进行细粒度鉴赏分析。该系统将视觉、工具与美学对齐，为文化遗产理解与专家鉴赏提供了可用的智能辅助方案。
source: ECCV-2026-Accepted-Program
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-d300e7d7293ac50c3516a09d/fig-001.webp\", \"caption\": \"\", \"page\": 1, \"index\": 1, \"width\": 808, \"height\": 876}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-d300e7d7293ac50c3516a09d/fig-002.webp\", \"caption\": \"\", \"page\": 2, \"index\": 2, \"width\": 1536, \"height\": 1024}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-d300e7d7293ac50c3516a09d/fig-003.webp\", \"caption\": \"\", \"page\": 2, \"index\": 3, \"width\": 1536, \"height\": 1024}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-d300e7d7293ac50c3516a09d/fig-004.webp\", \"caption\": \"\", \"page\": 2, \"index\": 4, \"width\": 1536, \"height\": 1024}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-d300e7d7293ac50c3516a09d/fig-005.webp\", \"caption\": \"\", \"page\": 2, \"index\": 5, \"width\": 476, \"height\": 644}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-d300e7d7293ac50c3516a09d/fig-006.webp\", \"caption\": \"\", \"page\": 2, \"index\": 6, \"width\": 748, \"height\": 746}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-d300e7d7293ac50c3516a09d/fig-007.webp\", \"caption\": \"\", \"page\": 2, \"index\": 7, \"width\": 1536, \"height\": 1024}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-d300e7d7293ac50c3516a09d/fig-008.webp\", \"caption\": \"\", \"page\": 5, \"index\": 8, \"width\": 4210, \"height\": 1448}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-d300e7d7293ac50c3516a09d/fig-009.webp\", \"caption\": \"\", \"page\": 6, \"index\": 9, \"width\": 3673, \"height\": 1556}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-d300e7d7293ac50c3516a09d/fig-010.webp\", \"caption\": \"\", \"page\": 8, \"index\": 10, \"width\": 684, \"height\": 230}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-d300e7d7293ac50c3516a09d/fig-011.webp\", \"caption\": \"\", \"page\": 8, \"index\": 11, \"width\": 655, \"height\": 766}]"
motivation: 古瓷器鉴赏门槛高，普通用户缺乏历史、材质与美学专业知识难以参与。
method: 构建领域多模态智能体，融合多图输入、视觉工具调用与多模态检索增强生成。
result: 可对朝代、窑口、釉色、纹饰等六类属性进行细粒度鉴赏分析。
conclusion: 为文化遗产理解与专家鉴赏提供了可复用的多模态智能体范式。
---

## Abstract
The connoisseurship of antique Chinese porcelain demands extensive historical expertise, material understanding, and aesthetic sensitivity, making it difficult for non-specialists to engage. To democratize cultural-heritage understanding and assist expert connoisseurship, we introduce CiQi-Agent—a domain-specific Porcelain Connoisseurship Agent for intelligent analysis of antique Chinese porcelain. CiQi-Agent supports multi-image porcelain inputs and enables vision tool invocation and multimodal retrieval-augmented generation, performing finegrained connoisseurship analysis across six attributes: dynasty, reign period, kiln site, glaze color, decorative motif, and vessel shape. Beyond attribute classification, it captures subtle visual details, retrieves relevant domain knowledge, and integrates visual and textual evidence to produce coherent, explainable connoisseurship descriptions. To achieve this capability, we construct a large-scale, expert-annotated dataset CiQi-VQA, comprising 29,596 porcelain specimens, 51,553 images, and 557,940 visual question–answering pairs, and further establish a comprehensive benchmark CiQi-Bench aligned with the previously mentioned six attributes. CiQi-Agent is trained through supervised fine-tuning, reinforcement learning, and a tool-augmented reasoning framework that integrates two categories of tools: a vision tool and multimodal retrieval tools. Experimental results show that CiQi-Agent (7B) outperforms all competitive openand closed-source models across all six attributes on CiQi-Bench, achieving on average 12.2% higher accuracy than GPT-5.

---

## 论文详细总结（自动生成）

# CiQi-Agent 论文中文总结

## 1. 核心问题与整体含义

- **研究动机**：中国古瓷器鉴赏需要历史知识、材质理解与美学敏感性，专业门槛高，普通公众难以参与；同时，专家级鉴赏也依赖细粒度视觉判断与证据推理。
- **现有方法不足**：
  - 传统计算机视觉多将瓷器鉴赏简化为细粒度分类/识别任务，只输出标签，缺乏语言推理、历史解释与可解释分析。
  - 通用多模态大模型（MLLMs）在瓷器这一专业领域表现不佳，原因是领域数据稀缺、判断不稳定、缺少统一评测标准，输出常不完整、不专业。
- **核心目标**：构建一个面向中国古代瓷器的领域专用多模态智能体 **CiQi-Agent**，融合视觉感知、工具调用、多模态检索增强生成与领域推理，实现可解释的细粒度瓷器鉴赏。
- **整体含义**：论文试图将文化遗产理解从“识别”推进到“专家式鉴赏推理”，并为其他文物类型（古钱币、书法、绘画等）提供可扩展的智能体范式。

## 2. 方法论

### 2.1 核心思想

- CiQi-Agent 支持多图输入，围绕六个属性进行鉴赏：**朝代、帝王年号、窑口、釉色、纹饰、器型**。
- 智能体不仅做属性分类，还捕捉细微视觉细节、检索领域知识、整合视觉与文本证据，生成连贯且可解释的鉴赏描述。
- 核心能力通过三部分实现：
  1. **领域数据与基准构建**：CiQi-VQA 与 CiQi-Bench。
  2. **两阶段训练范式**：SFT + RL，逐步从基础能力走向策略性工具调用。
  3. **工具增强推理框架**：视觉工具 + 多模态检索工具。

### 2.2 数据与基准构建

- **CiQi-VQA**：
  - 29,596 件原始瓷器标本，51,553 张图像，557,940 个视觉问答对。
  - 覆盖 38 个朝代（公元前 2 世纪—公元 19 世纪）、100+ 器型、200+ 釉色、200+ 纹饰。
  - 每条瓷器至少有一张高质量图像和标准化名称，名称编码四个关键属性：朝代、釉色、器型、纹饰；部分还包含年号与窑口。
  - 对约 61.18% 缺少详细描述的标本，由专家团队补充鉴赏描述；专家还审核并修正所有标准化名称。
  - 使用 MLLM 将标准化名称、描述文本和图像整理为六段式鉴赏描述，并生成 VQA 数据。
  - 每个标本生成 5 个 VQA 训练样本，再通过轻量增强生成 4 个语义一致但表达不同的变体，最终约 20 个 VQA/标本。
- **CiQi-Bench**：
  - 775 件高质量瓷器标本，878 张图像。
  - 两种评测协议：
    1. **多选问答**：7 个问题，覆盖四关键属性、两年附加属性和完整标准化名称；使用 GPT-5 生成有挑战性的干扰项。
    2. **自由形式生成**：模型生成整体文本描述，由 LLM 评估器对六个属性分别打分。
- **统计**：
  - SFT 训练集：28,821 件，50,675 张图，557,165 个问题。
  - RL 训练集：10,275 件/图/问题，是 SFT 数据子集。
  - 评测集：775 件，878 张图，775 个自由形式问题，5,425 个多选问题。
  - 总计：29,596 件，51,553 张图，557,940 个 VQA 问题，5,425 个多选问题。

### 2.3 工具设计

- 所有工具调用封装在标准 `<tool_call></tool_call>` 标签中。
- **视觉工具**：`image_zoom_in_tool`
  - 智能体先分析全局图像，再自主预测需要细看的局部区域，输出边界框参数，提取高分辨率子图，作为细粒度感知证据。
- **检索工具**：
  - `search_image`：用 CLIP 编码查询图像，与数据库图像嵌入做余弦相似度，返回 top-k 相似条目及元数据。
  - `search_text`：查询文本同时由 CLIP 编码器和文本嵌入模型编码，得到两个语义空间向量，分别检索后按参数 α 融合，返回最相关记录。
  - 检索库：主要来自 CiQi-VQA，包含 8,161 件精选瓷器、16,830 张图像，并补充 49,606 条来自专业文章的清洗纯文本条目。

### 2.4 两阶段训练流程

- 基础模型：**Qwen2.5-VL-7B-Instruct**。
- **Phase I：基础能力**
  - SFT：在 CiQi-VQA 上训练，加入指令跟随数据以保留通用推理能力，并加入 10,575 个日常瓷器样本减少过拟合。
  - RL：使用 **GRPO**，以强工具调用奖励鼓励模型快速学会工具调用机制，生成合成工具调用轨迹。
- **Phase II：策略能力**
  - 将 Phase I 生成的合成轨迹合并回 SFT 语料，使模型内化推理与工具调用模式。
  - 再进行 RL，奖励重新设计，将工具调用奖励与鉴赏准确率挂钩，鼓励有目的、有效的工具调用。
- **奖励设计**：
  - 总奖励：\( R = \gamma_{format} \cdot R_{format} + \gamma_{acc} \cdot R_{acc} + R_{tool} \)
  - 权重：\( \gamma_{format}=0.2 \)，\( \gamma_{acc}=1.0 \)。
  - **格式奖励** \(R_{format}\)：符合格式为 0，否则 -1。
  - **准确率奖励** \(R_{acc}\)：六属性分数 + 一致性分数，由 LLM-as-a-Judge 给出；若真值不含某属性，则该属性不参与平均。
  - **工具调用奖励**：
    - Phase I：若调用 \(k_{tool}\) 个工具，\(R_{tool}=k_{tool}\)，鼓励早期掌握工具调用。
    - Phase II：若调用 \(m_{tool}\) 个不同工具，\(R_{tool}=(0.9+0.1m_{tool})R_{acc}\)；无工具调用则无工具奖励，促使工具调用真正提升准确率。

### 2.5 LLM-as-a-Judge

- 由于瓷器属性表达存在大量同义但词汇不同的情况，精确匹配或嵌入相似度不可靠。
- 要求模型在 `<answer></answer>` 标签中输出标准化命名，由 LLM 评估器按结构化评分标准逐属性打分。
- 使用 **Qwen2.5-72B-Instruct** 作为评估器。
- 验证结果：专家评分与 LLM 评分在六属性上高度相关：
  - 朝代 Pearson 1.00，MAE 0.01；
  - 年号 1.00，MAE 0.00；
  - 窑口 0.98，MAE 0.04；
  - 釉色 0.96，MAE 0.03；
  - 纹饰 0.94，MAE 0.07；
  - 器型 0.86，MAE 0.08。

## 3. 实验设计

### 3.1 数据集与 Benchmark

- 训练数据：CiQi-VQA。
- 评测基准：CiQi-Bench。
- 评测协议：
  - 多选问答准确率；
  - 自由形式生成，由 Qwen2.5-72B-Instruct 作为 LLM-as-a-Judge 逐属性打分。

### 3.2 对比方法

- **闭源模型**：
  - GPT-5、GPT-4.1、GPT-4o、OpenAI o3、Gemini 2.5 Pro、Claude Opus 4。
- **开源模型**：
  - Qwen2.5-VL-72B-Instruct、GLM-4.5V（106B）、InternVL3.5-241B-A28B-Flash、Kimi-VL-A3B-Instruct（16B）。
- **本文方法
