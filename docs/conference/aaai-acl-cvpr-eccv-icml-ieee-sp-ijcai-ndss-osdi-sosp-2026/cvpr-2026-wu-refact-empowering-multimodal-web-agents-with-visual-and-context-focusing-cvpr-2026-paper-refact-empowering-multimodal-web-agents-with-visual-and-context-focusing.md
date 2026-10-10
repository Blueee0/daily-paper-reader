---
title: "ReFAct: Empowering Multimodal Web Agents with Visual and Context Focusing"
title_zh: ReFAct：以视觉与上下文聚焦增强多模态网页智能体
authors: "Wu, Rui, Zhang, Shuo, Tang, Xiaoxuan, Zhang, Ruirui, Liu, Yi, Jiang, Tao, Xu, Wenhao, Li, Yong"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://openaccess.thecvf.com/content/CVPR2026/papers/Wu_ReFAct_Empowering_Multimodal_Web_Agents_with_Visual_and_Context_Focusing_CVPR_2026_paper.pdf"
tags: ["query:fin-mm-agent"]
score: 6.0
evidence: 融合文本与视觉并主动聚焦跨模态上下文的多模态网页智能体
tldr: 多模态网页搜索智能体通过融合文本与视觉信息回答复杂查询，但视觉模态易信息过载，无关背景或复杂结构噪声会干扰注意力并误导决策。本文提出ReFAct框架，通过推理-聚焦-行动让智能体主动管理跨模态上下文，动态调整操作焦点以抑制噪声。该机制提升了多模态智能体在复杂网页任务中的稳健性。该工作虽非金融专用，但其跨模态聚焦方法可迁移至金融图文理解与问答场景。
source: CVPR-2026-Accepted
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-wu-refact-empowering-multimodal-web-agents-with-visual-and-context-focusing-cvpr-2026-paper/fig-001.webp\", \"caption\": \"\", \"page\": 1, \"index\": 1, \"width\": 532, \"height\": 394}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-wu-refact-empowering-multimodal-web-agents-with-visual-and-context-focusing-cvpr-2026-paper/fig-002.webp\", \"caption\": \"\", \"page\": 1, \"index\": 2, \"width\": 440, \"height\": 482}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-wu-refact-empowering-multimodal-web-agents-with-visual-and-context-focusing-cvpr-2026-paper/fig-003.webp\", \"caption\": \"\", \"page\": 1, \"index\": 3, \"width\": 402, \"height\": 504}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-wu-refact-empowering-multimodal-web-agents-with-visual-and-context-focusing-cvpr-2026-paper/fig-004.webp\", \"caption\": \"\", \"page\": 1, \"index\": 4, \"width\": 531, \"height\": 800}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-wu-refact-empowering-multimodal-web-agents-with-visual-and-context-focusing-cvpr-2026-paper/fig-005.webp\", \"caption\": \"\", \"page\": 3, \"index\": 5, \"width\": 692, \"height\": 1112}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-wu-refact-empowering-multimodal-web-agents-with-visual-and-context-focusing-cvpr-2026-paper/fig-006.webp\", \"caption\": \"\", \"page\": 3, \"index\": 6, \"width\": 592, \"height\": 768}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-wu-refact-empowering-multimodal-web-agents-with-visual-and-context-focusing-cvpr-2026-paper/fig-007.webp\", \"caption\": \"\", \"page\": 3, \"index\": 7, \"width\": 600, \"height\": 800}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-wu-refact-empowering-multimodal-web-agents-with-visual-and-context-focusing-cvpr-2026-paper/fig-008.webp\", \"caption\": \"\", \"page\": 3, \"index\": 8, \"width\": 531, \"height\": 800}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-wu-refact-empowering-multimodal-web-agents-with-visual-and-context-focusing-cvpr-2026-paper/fig-009.webp\", \"caption\": \"\", \"page\": 4, \"index\": 9, \"width\": 342, \"height\": 506}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-wu-refact-empowering-multimodal-web-agents-with-visual-and-context-focusing-cvpr-2026-paper/fig-010.webp\", \"caption\": \"\", \"page\": 4, \"index\": 10, \"width\": 1200, \"height\": 712}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-wu-refact-empowering-multimodal-web-agents-with-visual-and-context-focusing-cvpr-2026-paper/fig-011.webp\", \"caption\": \"\", \"page\": 4, \"index\": 11, \"width\": 1200, \"height\": 773}, {\"url\": \"assets/figures/cvpr-2026-accepted/cvpr-2026-wu-refact-empowering-multimodal-web-agents-with-visual-and-context-focusing-cvpr-2026-paper/fig-012.webp\", \"caption\": \"\", \"page\": 4, \"index\": 12, \"width\": 1200, \"height\": 775}]"
motivation: 多模态网页智能体易受视觉信息过载与噪声干扰，注意力被误导而偏离正确路径。
method: 提出ReFAct框架，通过推理、聚焦与行动让智能体主动管理跨模态上下文并调整操作焦点以抑制噪声。
result: 该方法有效缓解视觉噪声对多模态智能体的干扰，提升复杂查询处理表现。
conclusion: 该工作为多模态智能体的跨模态上下文管理提供了可迁移的聚焦机制。
---

## Abstract
Multimodal Web Search Agents demonstrate a practically valuable capability by fusing information from diverse modalities (e.g., text and vision), retrieved iteratively from the internet, to address complex user queries. However, the visual modality is prone to information overload, and the noise contained within it--such as irrelevant background details or complex structures--can disrupt the model's attention, misdirecting its operational focus toward an erroneous path. To address the aforementioned challenge, we propose ReFAct (Reasoning, Focusing, and Acting), a novel framework that empowers the agent to actively manage its cross-modal context. This allows the agent to adjust its operational focus, thereby mitigating the impact of noise on multimodal Web Search Agents. Specifically, ReFAct employs a Grounding tool for active visual perception to dynamically filter information. We also design external memory-based Defocus/Refocus operations for selective information retention, further modulating information density within the multimodal context. Ultimately, this ensures the agent maintains focus during problem-solving. To evaluate and enhance agent capabilities in complex and noisy multimodal contexts, we first propose a pipeline for constructing datasets with flexible complexity. We introduce a new open-source benchmark: GroundedVQA. Finally, we experimentally demonstrate the effectiveness of our proposed method on GroundedVQA and other widely-used benchmarks.

---

## 论文详细总结（自动生成）

# ReFAct 论文中文总结

## 1. 核心问题与整体含义

- **研究背景**：以 Search-R1、R1-Searcher、DeepResearcher 为代表的文本型网页搜索智能体，通过"迭代推理 + 网络检索"缓解了大模型参数知识滞后的问题。但真实世界的用户查询往往基于图像等多模态信息，因此多模态网页搜索智能体（如 MMSearch-R1、WebWatcher）成为必然趋势。
- **核心痛点**：多模态能力引入了严重的**上下文噪声**问题，具体分为两类：
  - **视觉噪声**：图像中无关背景、复杂纹理分散模型注意力，可能把操作焦点引向错误路径，导致初始搜索查询错误，从而建立"**虚假事实基础（false factual basis）**"。如图 1 所示，窗外反射的 Galata 塔使智能体误将建筑识别为"大卫塔"，进而给出错误结论。
  - **检索噪声**：网页中广告、导航栏等非必要元素稀释关键信息，干扰最终推理。
- **整体含义**：论文主张智能体必须从"被动接收信息"转向"**主动管理跨模态上下文**"，提出统一的"聚焦（focusing）"概念，使智能体能动态调整视觉注意力与工作记忆负载。

## 2. 方法论

### 核心思想
将智能体与多模态网页环境的交互形式化为序贯决策过程。在每一步 $t$，智能体观测状态 $o_t$ 并维护上下文历史 $H_t$。不同于被动累积所有观测的标准智能体，ReFAct 通过显式的"聚焦动作"主动**策展（curate）**自己的上下文，将动作空间扩展为同时管理视觉注意力与工作记忆负载。

### 关键技术细节

- **视觉聚焦（Visual Focusing）**：引入主动 Grounding 机制。智能体在执行图像检索前，可生成 `Ground(It, bbox)` 动作，其中 `bbox = [x1, y1, x2, y2]` 指定目标裁剪区域，环境随后以裁剪区域 `It[bbox]` 作为精确查询。**关键设计**：由智能体直接预测边界框，避免引入第三方检测模型的外部偏差，使 grounding 能力可与推理过程在训练中联合优化。

- **记忆聚焦（Memory Focusing）**：双记忆系统——有限的高价值**活跃工作记忆 $H_t$** 与无限的**外部记忆 $M_t$**，由两个互补工具控制流量：
  - **Defocus**：遇到信息密集但当前非关键的内容（如长文全文）时，将原始内容卸载至 $M_t$，仅在 $H_t$ 中保留精炼的、承载证据的摘要与唯一引用 ID。
  - **Refocus(id)**：当后续推理需要此前卸载的细节时，通过摘要中的 ID 精确检索原始内容，避免模糊、易错的检索。

- **集成式主动推理循环**：统一为"推理—聚焦—行动（Reasoning, Focusing, and Acting）"循环。典型轨迹为：
  $$\tau = (q, I_0, \dots, r_t, \text{Ground}(bbox), \text{ImgSearch}(I_{crop}), \dots, r_{t+k}, \text{Refocus}(id), r_{t+k+1}, \text{Answer})$$
  确保每个外部动作都建立在主动策展、降噪的输入之上。

### GroundedVQA 数据集构建（"先构建后采样"范式）
- **Phase I：图像—知识图谱构建**。以输入图像 $I$ 为根节点，用 Qwen3-VL-235B-A22B-Instruct 检测候选实体并生成视觉描述 $v_i$；用 Google Serper API 进行图像检索（top-10），再由 Qwen3-VL 校验，仅保留高置信实体（Grounded Entities）；以其文本身份 $s_i$ 为查询做 Google 文本搜索（top-5，经 Jina Reader 解析），用 LLM 抽取新实体（Retrieved Entities）并迭代扩展，逐步构建完整知识图谱 $G_I$。
- **Phase II：QA 生成**。从 $G_I$ 采样子图，由 LLM 转化为多跳问题，将查询锚定到实体的视觉描述上，答案由检索到的事实合成。
- **Phase III：混合验证**。训练集采用自动拒绝采样（用 Qwen-2.5VL-32B 在**无图**条件下测试，若仅凭参数知识即可答对则丢弃）；评估集经严格人工核验，剔除可由全局图像启发式解决的"捷径"问题。
- **两级难度**：Level-1（聚焦实体推理：视觉接地 → 精确识别 → 知识推理）；Level-2（跨实体关系推理：多目标接地 → 顺序检索 → 关联推理）。

### 强化学习（RL）训练
- 采用 **GRPO** 算法，无需独立 critic 模型。目标函数为：
  $$\mathcal{J}_{GRPO}(\theta) = \mathbb{E}_{q \sim D}\left[\frac{1}{G}\sum_{i=1}^{G}\frac{\pi_\theta(\tau_i|q,I)}{\pi_{\theta_{old}}(\tau_i|q,I)}\hat{A}_i\right] - \beta \mathbb{D}_{KL}(\pi_\theta \| \pi_{ref})$$
  优势值 $\hat{A}_i$ 通过组内相对归一化计算：$\hat{A}_i = \frac{R(\tau_i) - \text{mean}(\{R(\tau_j)\})}{\text{std}(\{R(\tau_j)\}) + \epsilon}$
- **复合奖励**：正确性奖励 $r_{acc}$（LLM-as-a-Judge 判断语义等价，稀疏结果信号隐式激励有效的中间接地动作）+ 格式奖励 $r_{fmt}$（惩罚无效工具调用或畸形边界框）。总奖励 $R(\tau) = (1-\lambda)r_{acc} + \lambda r_{fmt}$。
- **注**：训练阶段主要针对主动视觉接地，未对 Defocus/Refocus 的动态上下文变化做 RL 优化（因该场景下的 RL 稳定性仍是开放问题）。

## 3. 实验设计

### 数据集 / 场景
- **GroundedVQA-Test**（自建，域内主评测）：高视觉噪声、复杂多步推理。规模为训练集 1,200（Level-1）+ 300（Level-2），测试集 261（Level-1）+ 56（Level-2）。其目标实体面积占比严重偏向 < 0.2，噪声显著高于传统 VQA 数据集。
- **MMSearch**：评估多模态搜索性能的综合基准。
- **SimpleVQA**：评估多模态事实性的综合基准。
- **LiveVQA-new**：测试训练截止后的视觉知识处理能力。

### 对比方法（四类）
1. **Vanilla ReAct 基线**：Qwen2.5-VL-7B/32B/72B、GPT-5-mini、Gemini-2.5-flash 配标准 ReAct 工具。
2. **ReFAct 架构验证**：同样的基础模型 + ReFAct 框架（不训练），用于隔离架构贡献。
3. **RL 训练智能体**：DeepEyes、WebWatcher、MMSearch-R1。
4. **闭源模型**：GPT-5-mini、Gemini-2.5-flash 作为上界参考。

### 指标
采用 **pass@1**，由 Gemini-2.5-pro 作为 LLM-as-Judge 判定正确性。

## 4. 资源与算力

- **GPU**：8×A100。
- **训练配置**：基座模型 Qwen2.5-VL-7B-Instruct；RL 训练 2 个 epoch；学习率 $2\times10^{-6}$；KL 系数 $\beta = 0.01$；奖励权重 $\lambda = 0.1$；组大小 $G = 8$。
- **训练语料**：GroundedVQA 训练集 + 从 FVQA 训练集随机采样的 3,000 条数据。
- **未明确说明**：论文未给出具体训练时长、总 GPU 小时数或显存占用等细节。

## 5. 实验数量与充分性

- **主实验**：4 个 benchmark × 约 11 个模型/方法组合，覆盖 4 类对比组。
- **鲁棒性分析**：按目标实体空间占比将 GroundedVQA 测试集分为三档（<5%、5%–10%、>10%）分层评测（图 5）。
- **消融实验**（表 3）：共 3 组——
  - 数据消融：不使用 GroundedVQA 数据训练（Level-1 掉 8.0%，Level-2 掉 7.1%）；
  - 机制消融：移除记忆聚焦（掉 1.9% / 3.6%）、移除视觉聚焦（掉 11.1% / 10.7%）。
- **评价**：实验设计较为充分且具有针对性，主表区分了"架构贡献"与"训练贡献"，消融实验也清晰定位了各组件贡献。客观性方面，使用 LLM-as-Judge 并配合人工核验的测试集，减少了字符串匹配偏差。**但存在一定局限**：RL 训练仅在 7B 单一规模上验证，未展示 32B/72B 的 RL 结果；记忆聚焦机制未参与 RL 训练，其效果仅在推理期消融中体现；此外作者也承认评测集中在高噪声视觉场景，通用基准上的表现揭示出方法存在权衡。

## 6. 主要结论与发现

- **ReFAct-7B 在 RL 训练的开源智能体中表现领先**：GroundedVQA 上 Level-1 达 0.513、Level-2 达 0.375，显著优于 MMSearch-R1（0.433 / 0.304）与 WebWatcher（0.372 / 0.232）。
- **在极端噪声场景下优势最明显**：目标占比 <5% 时，比 MMSearch-R1 绝对提升 +6.3%；而基线模型在极端噪声下准确率均急剧下降（<15%）。
- **不必要接地时不过度处理**：在 SimpleVQA 等低噪声任务上保持较强适应性。
- **与闭源模型存在差距**：在 SimpleVQA、LiveVQA 上落后于 Gemini-2.5-flash，揭示主动视觉聚焦机制的**内在权衡**——区域级聚焦虽能滤噪，但会降低搜索查询的丰富度，对需要整体图像理解的 LiveVQA 不利。
- **架构的即插即用效果依赖基座能力**：对 Qwen 系列提升显著（72B 在 Level-1 上 +0.111），但对 GPT-5-mini 和 Gemini-2.5-flash 收益微弱甚至为负，说明 ReFAct 依赖模型已有的接地能力。
- **视觉聚焦是关键瓶颈**：消融显示移除 Ground 工具造成的性能损失最大（-11.1% / -10.7%），而记忆聚焦贡献较小，说明本基准的主要瓶颈是视觉而非文本过载。

## 7. 优点

- **问题定位精准且切中要害**：清晰刻画了视觉噪声与检索噪声两类干扰，并用图 1 直观展示了"虚假事实基础"如何从错误初始查询级联放大。
- **方法设计具有统一性**：以"主动聚焦"为核心概念，把视觉接地与工作记忆管理统一到同一动作空间，思路优雅。
- **接地能力与推理联合优化**：由智能体直接预测 bbox 而非依赖外部检测器，避免了外部偏差，使接地策略能通过 RL 从环境反馈中自然涌现（学会何时该裁剪、何时冗余）。
- **Defocus/Refocus 的精确检索设计**：用唯一 ID 精确回取原文，避免了模糊检索的错误风险，是对长程上下文管理的有效工程方案。
- **数据集构建严谨**：采用图像—知识图谱的"构建—采样"流程，配合训练集自动拒绝采样与测试集人工核验的双重验证，确保问题**必须经过接地—检索—推理完整链条**才能回答，基准硬度有保障。
- **实验论证充分**：通过"纯架构（不训练）"与"RL 训练"两类对比分离了架构与训练的贡献；分层噪声分析（图 5）直接验证了抗噪假设。

## 8. 不足与局限

- **训练覆盖不完整**：论文明确承认 RL 阶段仅针对视觉接地优化，未对 Defocus/Refocus 做 RL 训练，理由是该场景下 RL 稳定性仍是开放问题。这意味着记忆聚焦的实际潜力未被充分释放，其效果仅通过推理期消融间接验证。
- **模型规模单一**：仅训练并发布 ReFAct-7B，未验证方法在更大规模模型（32B/72B）上的 RL 表现，泛化性存疑。
- **存在性能权衡**：区域级聚焦会降低搜索查询的丰富度，在需要整体图像理解的任务（如 LiveVQA）上表现不如闭源模型，说明该方法并非通用最优。
- **强依赖基座能力**：对缺乏接地能力的模型（如部分闭源模型）收益微弱甚至为负，限制了方法的普适性。
- **算力信息不完整**：仅给出 GPU 型号与数量，未报告训练时长、总计算量等，不利于复现成本评估。
- **评测偏差风险**：正确性判定依赖 LLM-as-Judge（Gemini-2.5-pro），可能引入与人工判断不一致的偏差；数据集规模相对有限（测试集共 317 条），Level-2 仅 56 条，统计稳定性值得关注。
- **应用限制**：当前设计针对静态图像，作者也指出未来需扩展到实时视频、音频等连续数据流，说明现有框架尚未覆盖更广泛的真实多模态场景。

（完）
