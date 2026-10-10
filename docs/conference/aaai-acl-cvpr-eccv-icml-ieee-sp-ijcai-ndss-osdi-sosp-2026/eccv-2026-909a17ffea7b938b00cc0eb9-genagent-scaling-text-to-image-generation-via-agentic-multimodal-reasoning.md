---
title: "GenAgent: Scaling Text-to-Image Generation via Agentic Multimodal Reasoning"
title_zh: GenAgent：通过智能体多模态推理扩展文本到图像生成
authors: "Kaixun Jiang, Yuzheng Wang, Junjie Zhou, Pandeng Li, Zhihang Liu, Chen-Wei Xie, Zhaoyu Chen, Yun Zheng, Wenqiang Zhang"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://media.eventhosts.cc/Conferences/ECCV2026/pdfs/3910.pdf"
tags: ["query:fin-mm-agent"]
score: 4.0
evidence: 将生成模型作为工具调用的智能体多模态推理框架
tldr: 紧耦合的统一多模态模型在理解与生成之间存在权衡且训练成本高，现有多模型流水线又结构僵化。本文提出GenAgent，一个解耦的智能体框架，由单一多模态模型负责理解，将图像生成模型视为可调用工具，并自适应地进行推理、工具调用、视觉判断与反思以迭代优化输出。实验表明该框架在文本到图像生成上具备可扩展性，为多模态智能体的工具编排提供了新思路，但并未聚焦金融场景。
source: ECCV-2026-Accepted-Program
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-909a17ffea7b938b00cc0eb9/fig-001.webp\", \"caption\": \"\", \"page\": 2, \"index\": 1, \"width\": 747, \"height\": 619}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-909a17ffea7b938b00cc0eb9/fig-002.webp\", \"caption\": \"\", \"page\": 2, \"index\": 2, \"width\": 747, \"height\": 619}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-909a17ffea7b938b00cc0eb9/fig-003.webp\", \"caption\": \"\", \"page\": 5, \"index\": 3, \"width\": 512, \"height\": 512}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-909a17ffea7b938b00cc0eb9/fig-004.webp\", \"caption\": \"\", \"page\": 5, \"index\": 4, \"width\": 512, \"height\": 512}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-909a17ffea7b938b00cc0eb9/fig-005.webp\", \"caption\": \"\", \"page\": 5, \"index\": 5, \"width\": 512, \"height\": 512}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-909a17ffea7b938b00cc0eb9/fig-006.webp\", \"caption\": \"\", \"page\": 12, \"index\": 6, \"width\": 1403, \"height\": 636}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-909a17ffea7b938b00cc0eb9/fig-007.webp\", \"caption\": \"\", \"page\": 12, \"index\": 7, \"width\": 1260, \"height\": 748}]"
motivation: 统一多模态模型存在理解与生成的权衡且训练成本高，现有多模型流水线结构僵化。
method: 提出解耦的GenAgent框架，单一多模态模型负责理解，图像生成模型作为工具被调用并进行推理与反思迭代。
result: 实验表明该框架在文本到图像生成任务上具备可扩展性与灵活性，优于紧耦合方案。
conclusion: 为多模态智能体的工具编排与生成任务提供了可迁移的解耦式智能体范式。
---

## Abstract
We introduce GenAgent, an agentic framework that unifiesvisual understanding and generation. GenAgent overcomes the limita-tions of tightly coupled unified models (which suffer from understand-ing–generation trade-offs and high training data costs) and the struc-tural bottlenecks of existing complex multi-model pipelines through aflexible, decoupled architecture: Understanding is handled by a singlemultimodal model, while generation is achieved by treating image gen-eration models as invokable tools. Given an image prompt, GenAgentadaptively engages in reasoning, tool invocation, visual judgment, andreflection to iteratively refine outputs until the criteria are met. We em-ploy a two-stage training strategy: first, we cold-start the agent with su-pervised fine-tuning on high-quality tool-invocation and reflection datato bootstrap multi-turn agent behaviors; second, we perform end-to-endagentic reinforcement learning, combining pointwise rewards (final im-age quality) and pairwise rewards (reflection accuracy), and utilizinga round-aware trajectory resampling strategy to balance improvementsacross distinct capabilities. Without modifying the underlying genera-tors, GenAgent significantly boosts the base model (FLUX.1-dev) by23.6% on GenEval++ and 14.0% on WISE. Beyond substantial per-formance gains, our framework demonstrates three key emergent prop-erties: (1) cross-tool generalization to generators with varying capabili-ties, (2) test-time scaling with consistent improvements across interactionrounds, and (3) task-adaptive reasoning. Project page: https://deep-kaixun.github.io/genagent-page/

---

## 论文详细总结（自动生成）

# GenAgent：通过智能体多模态推理扩展文本到图像生成 —— 论文总结

## 1. 核心问题与研究动机

- **背景**：视觉理解与图像生成是多模态智能的两大支柱。已有研究表明，将二者紧耦合可提升复杂生成任务的表现，但现有路线各有瓶颈：
  - **集成式（紧耦合统一模型）**：或将强理解模块嵌入生成模型，或构建统一架构处理交错图文输入。问题在于存在**理解—生成性能权衡**，且训练依赖**海量高质量交错数据**，灵活性差（提升某一能力需重训整个模型）。
  - **模块化解耦系统**：早期工作（如 RePrompt）只做单轮提示词优化；近期智能体方法分为两类：①免训练的多智能体系统，靠提示工程串联闭源 API，推理模式僵化、部署昂贵；②独立训练的功能模块（如 corrector + verifier）配合 Best-of-N 采样，严重依赖大量采样，轨迹质量不稳定、算力开销大。
- **核心问题**：如何在**性能与系统复杂度之间取得更优平衡**，让单一多模态模型既能理解、判断、反思，又能驱动多轮生成？
- **整体含义**：论文提出 **GenAgent**，用解耦的智能体架构实现理解与生成的"功能统一"——单个多模态模型充当中央大脑，图像生成模型仅作为**可调用工具**，通过自适应推理、工具调用、视觉判断与反思迭代优化输出。其价值在于：不修改底层生成器即可显著提升其表现，并可随工具升级而扩展。

## 2. 方法论

### 2.1 核心思想
- **解耦式智能体框架**：由多模态模型 πθ（负责规划、判断、反思）+ 交互式图像生成工具 `ImageGen` 组成。
- **推理流程**：
  1. 接收用户查询 q，推理意图并生成可调用格式的改写提示 P₁（含推理轨迹 T₁）；
  2. 调用工具生成图像 I₁ = ImageGen(P₁)；
  3. 判断 I₁ 是否满足需求：满足则输出终止符 a；否则由判断轨迹 J₁ 指出缺陷，并产生反思轨迹 T₂ 与新提示 P₂，进入下一轮；
  4. 循环直至满足要求或达到最大交互轮数 n_max。
- **完整多模态思维链轨迹**：o = {q, T₁, P₁, I₁, J₁, …, Tₙ, Pₙ, Iₙ, Jₙ, a}，最终图像 Iₙ 为输出。

### 2.2 阶段一：监督微调（冷启动）
- **诊断分析**（Qwen2.5-VL-7B on GenEval++）发现三大缺陷，说明直接 RL 效率低下：
  - 工具调用不可靠（错误率 13.36%）；
  - 改写质量差（49.28% 样本与原始输入词差 ≤ 5）；
  - 反思无效（提升仅 0.36%）。
- **数据构建流水线**：
  - **Prompt Pool**：收集开源数据 + 合成需复杂推理的数据，经 FLUX.1-dev 三次生成过滤，仅保留**全部失败**的困难样本；
  - **单轮轨迹合成**：以 Qwen3-VL-235B-A22B-Thinking 为教师模型蒸馏思考过程与改写提示 P₁，过滤格式错误样本后生成图像；
  - **判断合成**：给出显式评判规则，让模型输出判断依据（推理时不显式提供规则，隐式习得）；成功样本保留，失败样本进入两轮反思；
  - **反思合成**：升级教师为 Gemini 2.5 Pro，并利用参考图像作为额外提示；过滤显式引用提示图的轨迹，通过成对比较剔除第二轮更差的样本，再做逐点评估保留达标样本。
- **数据采样**：按数据类型与第二轮是否终止做平衡采样，最终得到 **32K 高质量冷启动样本**；刻意避免所有样本都以 `done` 结束，以保留 RL 探索空间。
- **训练细节**：掩码环境反馈 token，损失仅计算在模型响应上。

### 2.3 阶段二：智能体强化学习（Agentic RL）
- **算法**：采用 **GRPO**。对每个查询采样一组轨迹 {o₁,…,o_G}，目标函数为：
  - J(θ) = (1/G) Σᵢ (1/|oᵢ|) Σₜ min[ clip(σᵢ,ₜ, 1−ε, 1+ε)·Aᵢ, σᵢ,ₜ·Aᵢ ]
  - 其中 σᵢ,ₜ 为新旧策略在 t 步的似然比；损失仅计算 πθ 生成的输出 token，**掩码环境观测（生成的图像）**；
  - 组归一化优势：Aᵢ = (rᵢ − mean({rᵢ})) / std({rᵢ})。
- **混合奖励机制**（解决图像质量难量化、结果奖励过粗的问题）：
  - **逐点奖励（Pointwise）**：用先进 MLLM 作生成式奖励模型，先输出逐步推理再判定；提供详细标准与样本特定提示；**仅当全部条件满足才给分**，否则为 0；
  - **成对奖励（Pairwise）**：核心洞见是"真正的反思应带来全程一致的质量提升"，仅当 MLLM 判定**所有相邻图像对均为后者更优**时给 0.3，否则 0；判定时随机打乱位置以避免位置偏置；
  - **总奖励**：r = r_point + r_format + λ·r_pair，其中 r_point ∈ {0, 0.7}，r_format ∈ {0, −0.2}，当 r_point = 0 时 λ = 0.5，否则 λ = 1。
- **轮次感知轨迹重采样（Round-Aware Trajectory Resampling）**：
  - 动机：不同轨迹长度对应不同认知技能（单轮 → 指令理解与提示改写；多轮 → 内省判断与迭代反思），无约束 rollout 会导致能力失衡（过早终止或无效循环）；
  - 做法：每查询先过采样 G′ = 12 条轨迹，再按**工具调用次数分组**均匀采样，构成 G = 8 的优化批次，扩展探索空间、防止策略坍缩为单一模式。

## 3. 实验设计

- **Benchmark（3 个）**：
  1. **GenEval++**：指令遵循保真度（比原 GenEval 语义更丰富、组合更多样）；
  2. **WISE**：世界知识驱动的语义评估（文化、时间、空间、生物、物理、化学）；
  3. **Imagine**：创意/超现实生成（属性迁移、时空、混合、多物体）。
- **对比方法（四类）**：
  - 扩散模型：FLUX.1-dev、Qwen-Image；
  - 统一架构：Janus-Pro-7B、T2I-R1、Bagel、Bagel w/ Self-CoT、闭源 GPT-4o；
  - 解耦方法：PromptEnhancer (7B)、T2I-Copilot、ReflectionFlow；
  - 自身消融变体：w/o tool（退化为单次改写）、+SFT、+RL、w/ Qwen-Image。
  - 公平性设定：所有多轮基线与本方法统一取 n_max = 2；默认生成工具均为 FLUX.1-dev。
- **主要结果**：
  - 配 FLUX.1-dev：GenEval++ 0.325 → **0.561**（+23.6%），WISE 0.55 → **0.69**（+14.0%），Imagine 6.072 → **6.825**；
  - 换 Qwen-Image：GenEval++ **0.725**、WISE **0.72**、Imagine **7.794**，逼近 GPT-4o（0.739 / 0.80 / 8.560），在开源方法中领先；
  - 相比解耦基线：GenEval++ 0.561 vs T2I-Copilot 0.496、ReflectionFlow 0.361、PromptEnhancer 0.382。
- **消融与分析实验**：
  - 训练阶段消融（Base / SFT / RL，Table 5）；
  - **成对奖励**消融（RL w/o r_pair）与**重采样**消融（RL w/o resample），并统计"改写增益 / 反思增益 / 反思触发率"；
  - **生成工具泛化**（Sana1.5-1.6B → FLUX.1-dev → Qwen-Image）；
  - **交互轮数**影响（第 1/2/3 轮归一化得分）；
  - **与 Best-of-N 对比**：BoN(N=1) 48.20、BoN(N=2) 51.07、GenAgent(2 Imgs) 56.10（高 5.03%），同时验证奖励模型准确性；
  - **案例研究**：三种推理模式（事实核查与纠错、精修与编辑、兼顾真实感的创意实现）、分布外（GSM8K 数学可视化）案例、失败案例（过度反思）。

## 4. 资源与算力

- **训练**：40 × NVIDIA A100 GPU，分配为 24（策略）/ 8（图像生成）/ 8（奖励服务）；图像生成工具与奖励模型部署为独立交互式服务器。
- **推理**：仅需 2 GPU（1 策略 + 1 生成）。
- **训练超参**：
  - SFT：LLaMAFactory，3 epochs，AdamW，batch size 256，学习率 1×10⁻⁵；
  - RL：增强 GRPO，batch size 240，1 epoch，每 prompt 采样 G′=12 → 降采样至 G=8，KL 系数 0.0，最大响应长度 16,384 tokens，学习率 1×10⁻⁶；
  - 交互工具为 FLUX.1-dev 的 8 步蒸馏版，n_max = 3；奖励模型为 Qwen3-VL-30B-A3B；RL 训练基于 verl 框架。
- **未明确说明**：论文**未给出具体训练时长/墙钟时间**，仅给出 GPU 数量与超参配置；推理时间成本与训练动态放在补充材料中。

## 5. 实验数量与充分性

- **规模**：3 个 benchmark × 约 10+ 个对比方法；4 类自身变体；至少 5 组消融/分析（训练阶段、成对奖励、重采样、工具泛化、交互轮数）+ BoN 诊断 + 案例研究，共约 6~7 个表格与 6 个图。
- **充分性评价**：
  - **较充分**：覆盖指令遵循、知识推理、创意生成三类互补能力；消融设计有针对性（分别验证 r_pair 与 resampling 的必要性，并用"反思比例/反思增益"量化行为变化）；工具泛化测试了从 1.6B 小模型到 Qwen-Image 的跨能力迁移，验证了可扩展性。
  - **公平性**：统一以 FLUX.1-dev 为默认工具、
