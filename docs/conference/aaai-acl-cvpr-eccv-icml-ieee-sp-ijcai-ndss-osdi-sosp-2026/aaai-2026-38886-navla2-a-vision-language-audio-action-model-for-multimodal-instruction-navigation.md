---
title: "NaVLA$^2$: A Vision-Language-Audio-Action Model for Multimodal Instruction Navigation"
title_zh: NaVLA²：面向多模态指令导航的视觉-语言-音频-动作模型
authors: "Jugang Fan, Peihao Chen, Changhao Li, Qing Du, Jian Chen, Mingkui Tan"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://ojs.aaai.org/index.php/AAAI/article/download/38886/42848"
tags: ["query:fin-mm-agent"]
score: 4.0
evidence: 融合文本、视觉与音频多模态指令的导航智能体
tldr: 具身导航在部分可观测环境中难以理解指令，现有任务仅提供单模态指令，在多相似物体的复杂场景中易产生歧义与失败。本文提出MINav任务与NaVLA2模型，用对象类别、RGB图像、语言描述与音频描述组成的多模态指令精确描述导航路径。模型通过视觉-语言-音频-动作联合建模消歧并定位目标。该工作展示多模态融合对智能体感知与决策的价值，但其面向导航而非金融领域。
source: AAAI-2026-Accepted
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-38886/fig-001.webp\", \"caption\": \"\", \"page\": 1, \"index\": 1, \"width\": 531, \"height\": 370}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-38886/fig-002.webp\", \"caption\": \"\", \"page\": 1, \"index\": 2, \"width\": 512, \"height\": 512}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-38886/fig-003.webp\", \"caption\": \"\", \"page\": 3, \"index\": 3, \"width\": 978, \"height\": 391}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-38886/fig-004.webp\", \"caption\": \"\", \"page\": 5, \"index\": 4, \"width\": 2020, \"height\": 856}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-38886/fig-005.webp\", \"caption\": \"\", \"page\": 7, \"index\": 5, \"width\": 640, \"height\": 480}]"
motivation: 现有导航任务只提供单模态指令，在含多个相似物体的复杂环境中易被误解而导致导航失败。
method: 提出MINav任务与NaVLA2模型，用对象类别、图像、语言和音频构成的多模态指令描述路径，并做视觉-语言-音频-动作联合建模。
result: 多模态线索帮助智能体消歧并准确在环境中定位目标物体。
conclusion: 该工作表明多模态融合能提升具身智能体的指令理解与导航能力。
---

## Abstract
Embodied navigation is a fundamental capability for intelligent agents, yet remains challenging in partially observable environments where navigation instructions can be difficult to interpret. However, existing tasks only provide unimodal instructions, which are ambiguous in complex multimodal environments with multiple similar objects, and may result in misinterpretation and navigation failure. To overcome these limitations, we introduce MINav, a novel task where the navigation path is precisely described by a multimodal instruction. The instruction provides multimodal cues, including object categories, RGB images, language descriptions, and auditory descriptions, which help the agent to disambiguate and ground objects in the environment and navigate effectively. We further construct a large-scale dataset of 43.9K navigation episodes using a two-stage pipeline that first annotates multimodal references of objects and then synthesizes diverse multimodal instructions. We find that existing methods struggle on MINav task, indicating substantial room for improvement in agents' multimodal grounding. To address this, we propose NaVLA^2, a vision-language-audio-action model that additionally integrates spatial audio and employs a CoThinkAct module to jointly generate high-level reasoning and consistent low-level actions. Experimental results demonstrate that NaVLA^2 significantly outperforms competitive baselines on MINav benchmark. We hope that our proposed MINav and NaVLA^2 will facilitate future research toward agents with stronger multimodal understanding and grounding capabilities for navigation.

---

## 论文详细总结（自动生成）

## 1. 核心问题与整体含义
- **研究动机**：具身导航是智能体与人类、环境交互的基础能力，但在部分可观测环境中，导航指令往往难以准确理解。
- **现有问题**：已有导航任务多只提供单模态指令，例如目标点、对象类别、目标图像、音频目标或纯文本指令。在包含多个相似物体的复杂场景中，这类指令容易产生歧义，导致错误 grounding 与导航失败。
- **核心含义**：论文提出 **MINav** 新任务，用多模态指令精确描述导航路径。指令可同时包含对象类别、RGB 图像、语言描述和听觉描述，帮助智能体消歧、定位对象并完成导航。
- **整体贡献**：构建 43.9K 导航 episode 的大规模数据集，提出 **NaVLA²** 视觉-语言-音频-动作模型，并验证多模态融合对具身导航智能体的重要价值。

## 2. 方法论
- **任务定义**：
  - 智能体在未见室内环境中随机初始化，接收多模态指令。
  - 指令中最后一个对象为目标，之前对象为 landmark。
  - 每步观测包括 egocentric RGB 图像与双耳空间音频。
  - 动作空间为 `{FORWARD, TURN_LEFT, TURN_RIGHT, STOP}`，前进 25cm，转向 30°。
  - 在目标 3 米半径内输出 `STOP` 视为成功。
- **数据构建两阶段流程**：
  - **对象多模态参考标注**：为 HM3DSem 场景中对象生成四元组 `⟨类别, 代表图像, 语言描述, 听觉描述⟩`。
    - 类别：将 1,660 类映射为 312 个基础类别。
    - 代表图像：从对象 2 米内有效视角渲染，按 `帧覆盖率 × CLIP(全图,类别) × CLIP(裁剪对象,类别)` 选最高分图像。
    - 语言描述：结合 VLA-3D 场景图提取外在空间关系，用 VLM 生成内在属性，再由 GPT 汇总。
    - 听觉描述：GPT 生成声音描述，检索 Freesound 音频，BERT 相似度低于 0.5 丢弃，文本描述作为听觉参考。
  - **导航 episode 生成**：
    - 起点与终点同层，距离 5–30 米。
    - 沿最短路径选择 1–5 个附近对象，最后一个为目标，其余为 landmark。
    - 为每个对象随机选择一种模态表示，分阶段规划轨迹并拼接。
    - 若最终路径与原始测地路径比超过 2，则丢弃。
    - 用 GPT-4o 结合相对方向与对象参考生成多模态指令。
- **MINav 模拟器**：
  - 基于 Habitat 与 SoundSpaces 2.0。
  - 在含听觉参考的 episode 中动态启用音频传感器，将音频片段插入对象中心，使用双耳麦克风与 RIR 卷积生成空间音频。
- **NaVLA² 模型架构**：
  - 多模态输入分别编码，经轻量 adapter 对齐后拼接送入 LLM。
  - 使用 Vicuna-7B-v1.5、CLIP ViT-L/14、CLAP、SpatialAST。
  - **双分支音频编码**：
    - 语义分支：双耳降混为单声道，经语义音频编码器与 adapter。
    - 空间分支：原始双耳信号经空间音频编码器与 adapter。
    - 二者拼接形成最终音频表示，兼顾“是什么声音”和“声音来自哪里”。
  - **CoThinkAct 模块**：
    - 基于 LLM 最后层 hidden state 并行执行两分支。
    - 一支经 `lm_head` 生成自然语言 chain-of-thought，描述当前目标与相对方向，并以特殊 token `[NAV]` 结束。
    - 另一支取 `[NAV]` 对应 hidden embedding，经 `action_head` 解码为 N 个低层动作。
    - 实现“边思考边行动”，提高可解释性与动作一致性。
- **三阶段训练**：
  - **Stage 1 音频-文本对齐**：271K 语义音频-文本对，扩展为 813K 空间音频-文本对，训练音频 adapter 2 epoch。
  - **Stage 2 多模态指令微调**：约 1M 多模态 QA 样本，训练 1 epoch，增强单模态理解。
  - **Stage 3 MINav 微调**：379K 导航训练样本，LoRA rank 16，联合训练 token embeddings、lm head、action head。

## 3. 实验设计
- **数据集 / 场景**：
  - 基于 HM3DSem 场景。
  - 共生成 43,908 个训练 episode，来自 145 个训练场景。
  - 测试集含 2,628 个 episode，来自 36 个测试场景。
  - 另由 3 名专家筛选出 test-mini，共 360 个高质量 episode。
- **Benchmark**：MINav benchmark，评估未见环境中的多模态指令导航。
- **评价指标**：SR、OSR、SPL、SoftSPL、NE、nDTW、TL。
- **对比方法**：
  - Zero-shot：Random、Qwen2.5-Omni、Gemini-1.5-flash、CA-Nav + GPT-4。
  - Finetuned：IL(instr-nav)、RL(goal-nav)、RL(instr-nav)、Navid。
  - 输入模态包括 V=Vision、A=Audio、T=Text。
- **主要结果**：
