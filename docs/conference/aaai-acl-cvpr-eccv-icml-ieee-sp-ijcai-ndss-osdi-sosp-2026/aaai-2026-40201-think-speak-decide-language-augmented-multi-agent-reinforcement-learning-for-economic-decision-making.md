---
title: "Think, Speak, Decide: Language-Augmented Multi-Agent Reinforcement Learning for Economic Decision-Making"
title_zh: 思考、表达、决策：面向经济决策的语言增强多智能体强化学习
authors: "Heyang Ma, Qirui Mi, Qipeng Yang, Zijun Fan, Bo Li, Haifeng Zhang"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://ojs.aaai.org/index.php/AAAI/article/download/40201/44162"
tags: ["query:fin-mm-agent"]
score: 6.0
evidence: 面向经济决策的语言增强多智能体强化学习
tldr: 经济决策既依赖价格、税收等结构化信号，也依赖同伴对话与媒体叙事等非结构化语言，而多智能体强化学习难以处理语言的语义歧义。本文提出LAMP框架，通过Think-Speak-Decide流程将语言融入经济决策：先解读数值观测提取短期冲击与长期趋势并缓存高价值推理轨迹，再生成并交换语言信息。该框架缩小了与真实经济场景的差距，为结合语言与结构化数据的金融经济决策智能体提供了方法基础。
source: AAAI-2026-Accepted
selection_source: conference_retrieval
motivation: 经济决策同时依赖结构化价格信号与非结构化语言，而多智能体强化学习难以处理语言的语义歧义与语境。
method: 提出LAMP框架，按思考-表达-决策流程将语言引入经济决策，先解读数值提取趋势并缓存推理，再生成并交换语言信息。
result: 该方法在含语言线索的经济决策环境中缩小了与真实场景的差距。
conclusion: 该工作为融合语言与结构化数据的金融经济决策智能体提供了新范式。
---

## Abstract
Economic decision‑making depends not only on structured signals—such as prices and taxes—but also on unstructured language, including peer dialogue and media narratives. While multi‑agent reinforcement learning (MARL) has shown promise in optimizing economic decisions, it struggles with the semantic ambiguity and contextual richness of language. We propose LAMP (Language‑Augmented Multi‑Agent Policy), the first framework to integrate language into economic decision‑making, narrowing the gap to real‑world settings.
LAMP follows a Think–Speak–Decide pipeline:
(1) Think interprets numerical observations to extract short‑term shocks and long‑term trends, caching high‑value reasoning trajectories.
(2) Speak crafts and exchanges strategic messages based on the reasoning, updating beliefs by parsing peer communications.
(3) Decide fuses numerical data, reasoning, and reflections into a MARL policy to optimize language‑augmented decision‑making.
Experiments in economic simulation show that LAMP outperforms both MARL and LLM‑only baselines in cumulative return (+63.5%, +34.0%), robustness (+18.8%, +59.4%), and interpretability. These results demonstrate the potential of language‑augmented policies to deliver more effective and robust economic strategies.

---

## 论文详细总结（自动生成）

# 论文总结：Think, Speak, Decide —— 面向经济决策的语言增强多智能体强化学习（LAMP）

## 1. 核心问题与整体含义

- **研究动机**：真实经济决策不仅依赖价格、税收、工资等**结构化数值信号**，还高度依赖**非结构化语言信号**，如同伴对话、媒体报道、政策叙事与公众舆论。
- **现有方法的缺口**：
  - 传统 **MARL**（如 MADDPG）假定干净、结构化的通信协议，难以处理自然语言的语义歧义、上下文丰富性与潜在欺骗性。
  - 现有 **LLM 经济研究**（Homo Silicus、Generative Agents、EconAgent、EconGym、TradingAgents 等）多用于**直接生成动作或模拟行为**，缺少对多智能体策略的系统性优化，难以产出稳健、可操作的政策洞见。
  - 已有的 MARL+LLM 工作（FAMA、LAMARL、MAPoRL、CORY）主要面向**合作型**场景，而经济决策通常具有**动态、非合作、长时程**特征，且需同时处理数值与含噪语言，因此并不适配。
- **核心研究问题**：在复杂多智能体经济环境中，智能体如何**解读并利用自然语言信息**来支撑最优决策？
- **整体含义**：论文提出 **LAMP（Language-Augmented Multi-Agent Policy）** 框架，将 LLM 的推理与反思能力嵌入 MARL 的策略优化流程，缩小仿真与真实经济场景之间的差距，为"语言+结构化数据"融合的经济决策智能体提供新范式。

## 2. 方法论：核心思想与关键技术

### 2.1 问题形式化

- 基于 TaxAI 的经济建模，将语言引入观测：每个家庭的增强观测为
  **mᵢₜ = E( L(aᵢₜ, eᵢₜ, Oᵍₜ) )**，其中 L 为 LLM 生成文本消息，E 为文本嵌入模型（映射到 Rⁿ）。
- 建模为**部分可观测马尔可夫博弈** M = ⟨N, S, O, A, P, R, δ⟩：
  - 政府动作 Aᵍₜ = {τₜ, ξₜ, τₐ,ₜ, ξₐ,ₜ, rᵍₜ}（劳动/资产边际税率参数 + 支出产出比）；
  - 家庭动作 Aʰ,ⁱₜ = {pᵢₜ, hᵢₜ}（储蓄率、劳动供给）；
  - 家庭目标：最大化消费—闲暇的终身效用（CRRA 效用 + Frisch 劳动负效用，含折现因子 β、风险厌恶 η、Frisch 弹性倒数 γ）；政府目标为 GDP 增长。

### 2.2 Think–Speak–Decide 三段式流程

**（1）Think：语言化新闻生成 + 双路径推理**

- **新闻类型判定**：在固定检查点 Lᵢ 发布**长期趋势新闻**；当关键指标 Xₜ =（财富基尼 G_w、社会福利 W、人均 GDP Y）的变化超过阈值 σ 时发布**短期冲击新闻**；否则为 none。
- **新闻合成**：
  - 短期：R^shortₜ = L_S(Oᵍₜ, Oᵍₜ₋₁, R^long_{Lₖ})；
  - 长期：R^long_{Lᵢ} = L_L(Oᵍ_{Lᵢ₋₁:Lᵢ})。
- **智能体推理**：接收新闻后推断自身经济状态 κᵢₜ ∈ {0(差),1(中),2(好)}，并生成私有推理 ψᵢₜ。
- **双经验池 + 检索**：
  - 短期缓冲：H^short_{t,i} = Top_{k₁}(Tᵢ)（按奖励排序的推理轨迹）；
  - 长期 FAISS 索引：H^long_k = H^long_{k−1} ∪ Top_{k₂}(∪ᵢ Tᵢ)；
  - 上下文提示：H^i_{k,t} = kNN_{k₃}(H^long_k) ∪ H^short_{t,i}，使智能体能在相似情境中复用高回报策略。

**（2）Speak：策略性表达与对手建模**

- LLM 为每个智能体生成 **3 条候选公开声明**，由**自注意力打分器 S** 打分形成分布 p^i,·ₜ，采样一条广播给所有智能体（记广播语句多重集为 Vₜ）。
- **反思模块** L_reflect(O^{h,i}ₜ, Vₜ, ψᵢₜ) 输出：
  - 对每个同伴 j 的财富层级估计 w^{i→j}ₜ ∈ {low, mid, high}；
  - 信念置信度 τ^{i→j}ₜ ∈ [0, 10]；
  - 关于自身处境的简短自反思 αᵢₜ。
- 这些评估反馈给打分器 S 与 LLM 策略，形成"语言推理—对话—自适应协调"的闭环。

**（3）Decide：语言增强的 MARL 策略**

- 所有文本（私有推理、反思）经文本编码器 E_text 池化为 h^iₜ，再经投影 P: R^D → R^d 并 L2 归一化得到语言嵌入 m̃ᵢₜ；**编码器冻结，梯度不回传**以保证稳定性。
- 融合状态 xₜ = (Oᵍₜ, m^{1:Nₕ}ₜ) 与联合动作 aₜ 存入回放缓冲 D。
- 采用 **MADDPG（CTDE 架构）**：集中式 Critic 最小化 Bellman 误差，分散式 Actor 通过确定性策略梯度最大化期望 Q 值。

**（伪代码 Algorithm 1 概要）**：每个 episode 重置环境 → 每步判定新闻类型 → Think 生成新闻 → 对每个智能体：清空当前步经验、在长期检查点检索经验池、生成长/短期推理、必要时生成声明、自反思更新信念与信任、生成动作 → 执行动作并存储 → 更新 Q_φ 与 {θᵢ} → 将 Top 轨迹写入短期/长期经验池。

## 3. 实验设计

- **仿真环境 / Benchmark**：**TaxAI**——动态经济模拟器，建模异质家庭与政府之间的复杂互动，并使用**真实世界数据校准**，被视为现实且具挑战性的经济决策测试平台。
- **三类经济场景**：
  - **S1 经济稳定**：与训练条件一致；
  - **S2 经济放缓**：中等分布偏移（增长下降、温和市场压力）；
  - **S3 危机冲击**：大幅耦合偏移，评估稳健性。
- **评价指标（5 项）**：① 家庭平均奖励；② 社会福利（家庭效用总和）；③ 总消费；④ 总劳动供给；⑤ Years（崩溃前模拟年数，上限 300，越高越稳定）。其中消费与劳动对效用有非单调影响，主要用于分析政策偏好。
- **对比基线（相同训练预算与时长）**：
  - **传统类**：Random、Rule-Based（效用—生产模型）、MADDPG；
  - **LLM 类**：Only-LLM、CoT、ReAct、Reflexion（统一使用 **Qwen2.5-72B-Instruct-INT4** 骨干与相同提示）。
- **消融实验**：w/o Speak、w/o Experience Pool、w/o Long-Term、w/o Short-Term、w/o Timing Scheduler。

## 4. 资源与算力

- **论文未明确报告** GPU 型号、数量、训练时长、显存占用或总计算量等任何算力细节。
- 文中仅间接提及：
  - LLM 骨干为 **Qwen2.5-72B-Instruct-INT4**（所有 LLM 基线共用）；
  - 使用 **FAISS** 构建长期经验索引；
  - 训练框架为 **MADDPG**，并说明"所有基线使用相同训练预算与 horizon"。
- 此外，LAMP 每一步都需调用 LLM 进行推理、声明生成与反思，其**推理成本与延迟**未做量化讨论，属于明显的资源透明度缺口。

## 5. 实验数量与充分性

- **实验规模**：
  - **主实验**：3 个经济场景 × 8 个基线（4 传统 + 4 LLM），正文给出 S1 的完整表格（Table 2），并以柱状图（Fig. 3、Fig. 4）展示三类场景对比；S2、S3 的完整结果被放在 extended version。
  - **消融实验**：5 组消融设置（Table 3），系统拆解 Speak、经验池、长期推理、短期推理、触发时机。
  - 每个结果报告 **mean ± SD**，具有一定统计严谨性。
- **充分性评估**：
