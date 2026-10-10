---
title: "PASS: Probabilistic Agentic Supernet Sampling for Interpretable and Adaptive Chest X-Ray Reasoning"
title_zh: PASS：面向可解释自适应胸部X光推理的概率化智能体超网采样
authors: "Yushi Feng, Junye Du, Yingying Hong, Qifan Wang, Lequan Yu"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://ojs.aaai.org/index.php/AAAI/article/download/40328/44289"
tags: ["query:fin-mm-agent"]
score: 5.0
evidence: 工具增强的多模态智能体框架，基于多工具图
tldr: 现有工具增强智能体存在推理黑箱、多模态整合不足与流程僵化低效等问题。本文提出PASS，面向胸部X光推理，在多工具图上自适应采样智能体工作流，产出带可解释概率的决策路径。该方法提升了多模态整合能力与推理可解释性，为医疗等高风险领域的智能体设计提供参考。
source: AAAI-2026-Accepted
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-40328/fig-001.webp\", \"caption\": \"\", \"page\": 2, \"index\": 1, \"width\": 1154, \"height\": 1239}]"
motivation: 工具增强智能体存在黑箱推理、多模态整合差与流程僵化问题。
method: 在多工具图上自适应采样智能体工作流，生成带概率的可解释决策路径。
result: 面向胸部X光推理实现可解释且自适应的多模态智能体流程。
conclusion: 为高风险领域提供可解释、可自适应的工具增强智能体框架。
---

## Abstract
Existing tool-augmented agentic systems are limited in the real world by (i) black-box reasoning steps that undermine trust of decision-making and pose safety risks, (ii) poor multimodal integration, which is inherently critical for healthcare tasks, and (iii) rigid and computationally inefficient agentic pipelines. We introduce PASS (Probabilistic Agentic Supernet Sampling), the first multimodal framework to address these challenges for Chest X-Ray (CXR) reasoning. PASS adaptively samples agentic workflows over a multi-tool graph, yielding decision paths annotated with interpretable probabilities. Given the complex CXR reasoning task with multimodal medical data, PASS leverages its learned task-conditioned distribution over the agentic supernet. Thus, it adaptively selects the most suitable tool at each supernet layer, offering probability-annotated trajectories for post-hoc audits and directly enhancing medical AI safety. PASS also continuously compresses salient findings into an evolving personalized memory, while dynamically deciding whether to deepen its reasoning path or invoke an early exit for efficiency. To optimize a Pareto frontier balancing performance and cost, we design a novel three-stage training procedure, including expert knowledge warm-up, contrastive path-ranking, and cost-aware reinforcement learning. To facilitate rigorous evaluation, we introduce CAB-E, a comprehensive benchmark for multi-step, safety-critical, free-form reasoning. Experiments across various benchmarks validate that PASS significantly outperforms strong baselines in multiple metrics (e.g., accuracy, LLM-Judge, semantic similarity, etc.) while balancing computational costs, pushing a new paradigm shift towards interpretable, adaptive, and multimodal medical agentic systems.

---

## 论文详细总结（自动生成）

# PASS：面向可解释自适应胸部X光推理的概率化智能体超网采样——论文中文总结

## 1. 核心问题与整体含义（研究动机与背景）

- **现实需求**：胸部X光（CXR）是全球最常执行的诊断影像检查，但解读需要多结构综合评估，耗时且高度依赖专家经验。
- **现有AI工具局限**：
  - 专用AI工具（分类、分割、报告生成）任务单一，难以支撑复杂临床推理。
  - 大型基础模型（GPT-4o、LLaVA-Med、CheXagent）虽整合视觉-文本推理，但常出现幻觉、缺乏领域鲁棒性，且作为"黑箱"不适用于高风险医疗场景。
- **多智能体系统的新进展与缺陷**：
  - 多智能体医疗AI（如MedRAX）通过协调领域工具提升了准确率，但依赖ReAct式黑箱LLM决策，可信度与安全性存疑。
  - 最新智能体超网（如MaAS）通过学习工作流分布实现自适应、成本感知推理，但**两大根本缺陷**：(i) 仅面向纯文本推理，缺乏多模态整合；(ii) 其文本梯度机制在LLM内部提示空间中隐式运行，可解释性与可追溯性有限。
- **核心问题**：亟需一个**多模态、真正可解释、自适应且高效**的医疗智能体系统。
- **整体含义**：PASS是**首个面向CXR推理的多模态智能体超网采样框架**，代表向可信、自适应、透明、成本感知的医疗智能体系统范式的转变。

## 2. 方法论

### 2.1 核心思想
- 将工作流构建视为**由多模态生成策略支配的隐式决策过程**：给定（CXR图像 I、文本问题 q、个性化上下文记忆 C），在多工具有向无环图上自适应采样智能体工作流 τ，产出带可解释概率的决策路径。
- 目标：在**最大化诊断效用 U** 与**最小化复合成本 L**（延迟、token用量、隐私风险）之间取得平衡：

$$\max_\theta \mathbb{E}_{(q,I,C)\sim Q}\left[\mathbb{E}_{\hat a\sim p_\theta} U(\hat a, a^\star) - \lambda\cdot\mathbb{E}_{\tau\sim\pi_\theta} L(\tau)\right]$$

### 2.2 智能体超网
- **超网 G = (V, E)**：节点为智能体容器（类型包括 SEGMENTATION、CLASSIFY、GROUNDING、REPORT、VQA-ANALYZE、GUIDELINE LOOKUP、MKG），边为合法工具调用。
- 每个容器存有共享相同I/O签名但骨干/训练轮次可不同的工具集 Tv。
- **统一形式接口**：输入 xv = (q(sub), I(roi), C(sub), η)；输出 yv = (ρv, ℓv, κv)，即多模态载荷 + 延迟 + token成本，保证即插即用。
- **动作空间**：A(st) = {(v, Tv,k) | (vt→v) ∈ E} ∪ {EARLY EXIT}，其中 EARLY EXIT 可提前终止以节省资源。

### 2.3 控制器架构 πθ
- 状态编码器 ψ 将多模态状态映射为共享表示：

$$h_t = \mathrm{LN}(z_t),\quad z_t = W_I\cdot\xi(I) \parallel W_Q\cdot\zeta(q,C) \parallel W_M\cdot\mu(M_t)$$

  - ξ(I)：冻结的ViT-B/16图像编码器（CLS token投影至R²⁵⁶）
  - ζ(q,C)：Sentence-BERT式文本编码器（投影至R¹²⁸）
  - μ(Mt)：动态记忆编码器（池化隐状态至R¹²⁸）
- **策略头**为单隐层FFN + ReLU，输出带合法动作掩码的softmax分布：

$$\pi_\theta(a_t|s_t)=\mathrm{Softmax}\big(\mathrm{mask}_{A(s_t)}[W_2\cdot\sigma(W_1 h_t)]/\alpha\big)$$

  温度 α 从2.0退火至0.8。
- **个性化上下文记忆**：有界大小的"先进先摘要"（FIFS）缓冲，每次工具调用后由冻结LLM将JSON响应压缩为向量摘要，支持在真实场景中进行精准的上下文诊断。

### 2.4 三阶段训练流程
| 阶段 | 方法 | 目标函数/损失 |
|---|---|---|
| **I. 专家知识引导预热** | 用GPT-4o生成工作流草图，再由放射科医师人机回环校正，得到一步决策数据集 Dexp，进行行为克隆 | L_BC = E[−log πθ(a⋆\|s)] |
| **II. 启发式引导对比路径排序** | 对未标注数据采样K条候选路径，用启发式奖励 Rh（指南合规、解剖连贯、简洁性）评分，InfoNCE对比损失强化高奖励路径 | L_CPR = −Σ p(τk) log πθ(τk)，p由Rh经温度softmax得到 |
| **III. 成本感知强化学习** | 直接用端任务效用微调策略，奖励含熵惩罚 | R(τ) = U(â,a⋆) − λ·L(τ) − γ·H(â) |

- **推理流程**：逐步采样动作→执行工具→摘要写入记忆→更新轨迹，遇 EARLY EXIT 或达最大步数则合成最终答案，返回答案与完整工作流。
- **不确定性感知**：答案分布的后验熵 Hθ 可用于量化认知不确定性，并作为高熵输出的正则项。

## 3. 实验设计

### 3.1 数据集 / Benchmark
- **SLAKE**（Liu et al. 2021）：6,437对图像-问题，原生自由形式医学VQA，评估零样本泛化。
- **CAB-Standard**（Fallahpour et al. 2025）：2,500条多选题CXR诊断查询。
- **CAB-E（作者提出）**：2,550条多步CXR推理案例，含**500条安全关键实例**，强调多跳、临床接地、自由形式回答与安全关键场景；公开可获取。

### 3.2 评价指标
- CAB-E：Accuracy、LLM-as-a-Judge（基于专家引导评分标准）、BLEU、METEOR、ROUGE-L、嵌入相似度、端到端延迟。
- CAB-Standard：Accuracy + Latency。
- SLAKE：嵌入相似度 + Latency。
- 安全关键子集：幻觉率 + 盲法人类放射科医师评估。

### 3.3 对比方法（四类）
1. **通用VLM**：GPT-4o（零样本/微调）、CoT、ComplexCoT、SC（CoT×5）
2. **推理中心VLM**：o3-mini（+LLaVA-Med作视觉前端）
3. **医疗/CXR专用VLM**：LLaVA-Med、CheXagent
4. **智能体系统**：MedRAX，以及经多模态适配的MaAS、AFlow

## 4. 资源与算力

- **硬件**：单张 **NVIDIA H800（80GB）GPU**，并可访问 OpenAI 的 GPT API 用于相关基线。
- **优化配置**：AdamW、梯度裁剪1.0、权重衰减0.01、余弦学习率调度、熵奖励0.01、RL使用5步前向展开截断。
- **未明确说明**：论文**未报告训练总时长、具体训练轮次、API调用量**等算力细节。这是可复现性上的一个信息缺口。

## 5. 实验数量与充分性

- **主要实验**：
  - 3个基准上的完整对比（CAB-E、CAB-Standard、SLAKE），涵盖10+基线。
  - 安全关键子集评估（含盲法放射科医师复核）。
  - 成本-准确率帕累托前沿分析（改变λ∈{0.0003, 0.003, 0.03, 0.3}）。
  - 消融实验（Table 3）：去除 Early-Exit、去除 Path-Rank 预训练、去除 Expert-Guided Warm-up。
- **充分性评估**：
  - **较充分**：覆盖多复杂度基准、多类基线、消融与成本分析，且提供安全关键子集与人类评估，设计相对严谨。
  - **客观性**：基线选择全面（含微调GPT-4o以隔离"领域训练"vs"概率化工作流"的贡献），指标多样，报告了标准差。
  - **公平性**：作者将原单模态方法（MaAS、AFlow）适配以相同视觉工具，附录提供详细结果，做法较为公平。
  - **待补充**：附录中的部分细节（如适配智能体的完整结果、CAB-E构建细节）在主文中未完全展开。

## 6. 主要结论与发现

- **准确性领先**：PASS在CAB-E上达91.22%准确率，超过最强基线MedRAX（89.54）+1.68，超CheXagent +7.55、LLaVA-Med +4.26。
- **语言质量最优**：LLM-J（84.28）、METEOR（33.21）、ROUGE-L（31.49）均最高，BLEU（8.51）次优，说明答案更贴近临床真实解答。
- **关键因素**：在相同数据上微调的GPT-4o仍落后于PASS，表明**概率化、查询依赖的工具轨迹**才是性能提升的关键，而非单纯的领域训练。
- **成本-准确率帕累托前沿**：λ=0.003时达最高准确率91.2%且成本可比；λ=0.03时成本降低约20%但仍保持约88%准确率，支持部署时灵活调参而无需重训。
- **安全关键场景**：PASS达93.50%准确率，超MedRAX +3.71、LLaVA-Med +5.75，且与MedRAX并列最低幻觉率（1.60%），显著优于GPT-4o。
- **消融验证**：去除Early-Exit导致准确率降至88.60（但成本降低94%）；路径排序预训练与预热对收敛速度与性能均有贡献。

## 7. 优点

- **方法论亮点**：
  - **可解释性**：每步决策路径带概率标注，支持事后审计与细粒度信任校准，直接面向医疗AI安全。
  - **多模态原生设计**：超网容器统一处理文本与图像载荷，克服了MaAS等纯文本方法的根本缺陷。
  - **三阶段课程学习**：从强监督（专家预热）到弱偏好（对比排序）再到端任务强化学习，逐步精细化，理论上每阶段均有形式化目标支撑。
  - **动态早期退出机制**：在推理中自适应决定深化或退出，实现精度-效率权衡。
  - **个性化演化记忆**：FIFS缓冲 + 摘要压缩，支持真实场景下的上下文感知诊断。
- **实验亮点**：
  - 新提出的**CAB-E**基准填补了现有CXR评测偏重简化分类/短答的空白，聚焦多跳、安全关键、自由形式推理。
  - 帕累托前沿分析提供了可落地的部署选项，而非单一固定配置。
  - 采用盲法人类放射科医师评估，增强结论可信度。
  - 通过微调GPT-4o对照实验巧妙隔离了变量。

## 8. 不足与局限

- **作者自述局限**：
  - 为保证临床安全与可解释性，PASS刻意采用**固定容器集合**，这是安全与灵活性之间的策略性权衡；未来需扩展至MRI/CT等影像类型并丰富容器与工具。
- **算力信息缺失**：未报告训练时长、轮次、API调用成本等，影响可复现性与部署成本评估。
- **延迟劣势**：相比LLaVA-Med等单次推理模型，PASS延迟更高（CAB-E上22.06s vs LLaVA-Med 21.43s，但SLAKE上11.68s高于LLaVA-Med的10.14s），虽为准确率权衡，但在实时临床场景中可能受限。
- **基准覆盖偏差**：
  - CAB-E由作者自建，虽公开，但其分布与真实临床场景的一致性、与既有基准的可比性仍需更多独立验证。
  - 安全关键子集仅500例，规模有限。
- **应用限制**：
  - 训练依赖GPT-4o生成工作流草图 + 放射科医师校正，**专家标注成本高**，难以大规模扩展。
  - 智能体容器与工具集为预定义，超网扩展性受限，可能无法覆盖罕见或新兴临床任务。
  - 在非CXR模态或非医疗高风险领域的泛化性仅为展望，尚未实验验证。
- **潜在偏差风险**：启发式奖励 Rh（指南合规、解剖连贯、简洁性）的设计可能隐含特定临床偏好，影响路径排序的客观性。

（完）
