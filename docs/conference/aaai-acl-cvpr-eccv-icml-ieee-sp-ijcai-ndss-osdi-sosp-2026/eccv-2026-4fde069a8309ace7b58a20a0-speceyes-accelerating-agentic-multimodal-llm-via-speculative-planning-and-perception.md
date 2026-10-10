---
title: "SpecEyes: Accelerating Agentic Multimodal LLM via Speculative Planning and Perception"
title_zh: SpecEyes：通过推测性规划与感知加速智能体式多模态大模型
authors: "Haoyu Huang, Jinfa Huang, Zhongwei Wan, Xiawu Zheng, Rongrong Ji, Jiebo Luo"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://media.eventhosts.cc/Conferences/ECCV2026/pdfs/2792.pdf"
tags: ["query:fin-mm-agent"]
score: 7.0
evidence: 调用视觉工具的智能体式多模态大模型
tldr: 智能体式多模态大模型依赖迭代调用视觉工具进行推理，但级联的感知、推理与工具调用循环带来严重的顺序延迟，即智能体深度瓶颈。本文提出SpecEyes，一种智能体级推测加速框架，利用轻量级多模态模型规划无需工具的执行路径，直接回答大量查询，从而绕过昂贵的工具使用循环。实验表明该方法在保持推理能力的同时显著降低延迟并提升系统并发能力，为多模态智能体的高效部署提供了新思路。
source: ECCV-2026-Accepted-Program
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-001.webp\", \"caption\": \"\", \"page\": 2, \"index\": 1, \"width\": 2000, \"height\": 1124}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-002.webp\", \"caption\": \"\", \"page\": 2, \"index\": 2, \"width\": 500, \"height\": 500}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-003.webp\", \"caption\": \"\", \"page\": 2, \"index\": 3, \"width\": 1000, \"height\": 1000}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-004.webp\", \"caption\": \"\", \"page\": 5, \"index\": 4, \"width\": 1536, \"height\": 1084}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-005.webp\", \"caption\": \"\", \"page\": 5, \"index\": 5, \"width\": 807, \"height\": 807}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-006.webp\", \"caption\": \"\", \"page\": 5, \"index\": 6, \"width\": 807, \"height\": 536}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-007.webp\", \"caption\": \"\", \"page\": 13, \"index\": 7, \"width\": 1654, \"height\": 1025}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-008.webp\", \"caption\": \"\", \"page\": 13, \"index\": 8, \"width\": 1654, \"height\": 1023}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-009.webp\", \"caption\": \"\", \"page\": 13, \"index\": 9, \"width\": 1654, \"height\": 1023}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-010.webp\", \"caption\": \"\", \"page\": 13, \"index\": 10, \"width\": 1654, \"height\": 1026}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-011.webp\", \"caption\": \"\", \"page\": 14, \"index\": 11, \"width\": 1908, \"height\": 1247}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-012.webp\", \"caption\": \"\", \"page\": 14, \"index\": 12, \"width\": 1908, \"height\": 1247}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-013.webp\", \"caption\": \"\", \"page\": 14, \"index\": 13, \"width\": 1908, \"height\": 1247}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-014.webp\", \"caption\": \"\", \"page\": 14, \"index\": 14, \"width\": 1908, \"height\": 1248}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-015.webp\", \"caption\": \"\", \"page\": 14, \"index\": 15, \"width\": 1908, \"height\": 1247}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-016.webp\", \"caption\": \"\", \"page\": 14, \"index\": 16, \"width\": 1908, \"height\": 1247}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-017.webp\", \"caption\": \"\", \"page\": 14, \"index\": 17, \"width\": 966, \"height\": 606}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-018.webp\", \"caption\": \"\", \"page\": 14, \"index\": 18, \"width\": 966, \"height\": 606}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-019.webp\", \"caption\": \"\", \"page\": 14, \"index\": 19, \"width\": 1930, \"height\": 1207}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-020.webp\", \"caption\": \"\", \"page\": 15, \"index\": 20, \"width\": 1103, \"height\": 783}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-021.webp\", \"caption\": \"\", \"page\": 15, \"index\": 21, \"width\": 1103, \"height\": 783}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-022.webp\", \"caption\": \"\", \"page\": 15, \"index\": 22, \"width\": 1103, \"height\": 783}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-4fde069a8309ace7b58a20a0/fig-023.webp\", \"caption\": \"\", \"page\": 15, \"index\": 23, \"width\": 1103, \"height\": 783}]"
motivation: 智能体式多模态模型迭代调用视觉工具导致级联延迟，严重限制系统并发与实时性。
method: 提出智能体级推测加速框架，用轻量多模态模型规划无工具执行路径以绕过工具循环。
result: 在保持推理能力的前提下显著降低智能体深度带来的延迟并提升并发能力。
conclusion: 为多模态智能体的高效推理提供了推测性规划与感知的加速范式。
---

## Abstract
Agentic multimodal large language models (MLLMs) (e.g.,OpenAI o3 [41] and Gemini Agentic Vision [10]) achieve remarkablereasoning capabilities through the iterative invocation of visual tools.However, the cascaded perception, reasoning, and tool-calling loops intro-duce significant sequential overhead. This overhead, termed agentic depth,incurs prohibitive latency and seriously limits system-level concurrency.To this end, we propose SpecEyes, an agentic-level speculative accelera-tion framework that breaks this sequential bottleneck. Our key insight isthat a lightweight MLLM can plan a tool-free execution path to directlyanswer many queries, bypassing the expensive tool-use loop. To regulatethis speculative planning, we introduce a cognitive gating mechanismbased on answer separability, which quantifies the model’s confidence inself-verification without requiring oracle labels. Furthermore, we designa heterogeneous parallel funnel that exploits the small model’s statelessconcurrency to mask the large model’s stateful serial execution, therebymaximizing system throughput. Extensive experiments on V* Bench,HR-Bench, and POPE demonstrate that SpecEyes achieves 1.1 − 3.35×speedup over the baseline while preserving or even improving accuracy,thereby boosting serving throughput under concurrent workloads.

---

## 论文详细总结（自动生成）

# SpecEyes 论文总结

## 1. 核心问题与研究动机

- **背景**：多模态大模型（MLLM）正从"单次前向、被动编码图像"转向**智能体式（agentic）范式**——在推理过程中主动调用外部视觉工具（zoom-in、crop、OCR 等），形成"感知—推理—工具调用"的迭代循环，在细粒度视觉检验、多步组合推理、主动信息搜寻等任务上表现突出。
- **核心痛点**：这一循环引入严重的顺序开销，作者将其形式化为 **agentic depth（智能体深度）D**。每一步工具选择因果依赖于上一步的观测结果（马尔可夫链式依赖），造成双重灾难：
  - **延迟爆炸**：单查询端到端延迟随 D 线性增长，`L_agent(q) = Σ_{d=0}^{D(q)} (c_llm + c_tool(t_d))`。
  - **并发崩塌**：每条查询的工具链会改写各自的私有状态，批处理效率被严重限制，硬件并行度大量闲置；批级吞吐受最"深"轨迹支配，`Θ_batched ≈ B / (max_i L_agent(q_i) + c_sched)`，长尾查询会拖死整个 batch。
- **现有方法的不足**：
  - Token 级推测解码（Medusa、EAGLE、SpecReason 等）只加速单步生成，仍在**固定推理轨迹内**运作，工具调用依然全串行，且草稿/验证交互可能拉长生成轨迹，产生额外开销。
  - 多模态 token 剪枝、时序压缩、KV-cache 压缩等只降低单步计算量，**不消除重复的工具调用**。
- **核心洞察（概念跃迁）**：大量查询其实**不需要深度工具辅助推理**，一个轻量的无工具视觉模型仅凭原图即可答对——前提是能可靠识别出这类查询。由此提出"快思考 / 慢思考"异构架构：小模型凭直觉快速给出推测答案，大智能体模型只保留给真正需要多步工具交互的查询。

## 2. 方法论

### 2.1 总体框架：四阶段推测流水线

- **Phase I — 启发式工具必要性判断**：由大智能体模型 M_L 通过轻量二分类提示 `P_judge` 输出 `g(q,I) ∈ {0,1}`；`g=0` 判为可仅凭全局图像作答，进入 Phase II；`g=1` 直接转 Phase IV。只用 M_L 生成一个二值 token，不调用工具，开销可忽略；选 M_L 而非 M_S 是因为其工具调用能力使其判断更可靠。
- **Phase II — 推测预测**：小模型 M_S 无工具地直接生成答案 `ŷ_S` 及逐 token 的完整 logit 分布。该推理是**无状态的（stateless）**，可在 batch 内完全并行。
- **Phase III — 置信度切换（认知门控）**：计算答案可分性得分 `S_sep`，若 `≥ τ` 则直接接受答案，否则回退。
- **Phase IV — 智能体回退**：被拒或需工具的查询交由 M_L 执行完整的状态化感知—推理循环，作为"安全网"。

### 2.2 认知门控：答案可分性（Answer Separability）

- **概率式置信度的缺陷**：softmax 存在标定偏差，logit 幅值大时易过度自信；逐 token 的 `p_max` 在标点、格式等低熵位置会被虚高，几何平均聚合也未显式度量"最优预测与强竞争者之间的差距"，易导致**误接受**。
- **可分性分数定义**（对第 n 个 token，将 logit 降序排列）：
  - `S_sep^(n) = (ℓ[1] − μ_K) / (σ_K + ε)`，其中 `μ_K`、`σ_K` 为 top-K logit 的均值与标准差。
  - 直观含义：领先 logit 相对最近竞争者的**决策间隔**；大值代表清晰决策边界，小值代表候选间存在歧义。
  - 两大优势：(i) **尺度不变性**（分子分母同比例缩放，抵消 softmax 标定伪影）；(ii) 通过方差项显式建模 top 候选间的竞争格局。
- **Token→答案级聚合**：三种策略 `S_sep^mean`、`S_sep^min`、`S_sep^bottom-r`（取最差 r 比例 token 的均值），再做 sigmoid 归一化。默认采用 **min 聚合**，依据是风险论论证（命题 1）：答案级错误事件 `E = ∪_n E_n`，由联合界 `P(E) ≤ Σ P(E_n)`，在"`P(E_n)` 随 `S_sep^(n)` 单调递减"这一工作假设下，对 min 设阈值可保证每个 token 都超过置信门槛，从而给出最紧的错误上界。min 策略扮演**最坏情况守卫**，偏保守、优先保证精确率。

### 2.3 异构并行漏斗（吞吐加速）

- **批并行前端**：Phase I（延迟 `c_J`）与 Phase II（延迟 `c_S`）均为无状态单轮前向，可完全批并行。
- **漏斗式服务**：B 条查询 → 筛出 `βB` 条工具无关、`(1−β)B` 条需工具；前者中 `αβB` 被接受直接返回，残差集 `R = (1−β)B + (1−α)βB = (1−βα)B` 回退到串行智能体执行。
- **期望延迟**：`E[L_SpecEyes] = c_J + β·c_S + (1 − βα)·L_agent`，由于 `c_J + βc_S ≪ L_agent`，当 `βα > 0.6` 时延迟由轻量前端主导。
- **吞吐加速比**：`Θ_SpecEyes / Θ_agent ≈ 1/(1 − βα)`，由筛选率 β 与门控接受率 α 共同决定；连续批处理（如 vLLM）对基线与本方法同比例放大，故不改变加速比。

## 3. 实验设计

- **数据集 / Benchmark（共 7 个评测划分）**：
  - **V\***：Direct Attributes（115 题，属性识别）与 Relative Position（76 题，空间推理）。
  - **HR-Bench**：高分辨率感知，4K 与 8K 子集各 800 题。
  - **POPE**：yes/no 幻觉探测，Adversarial / Popular / Random 三个划分各 3000 题。
  - 全部以**准确率**为指标。
- **模型配置**：小模型 M_S = **Qwen3-VL-2B**；大智能体模型 M_L 分别实例化为 **DeepEyes** 与 **Thyme**，工具调用步数上限均为 5。
- **对比方法**：
  - 智能体基线：DeepEyes (w tools)、Thyme (w tools)。
  - 消融性对照：同一大模型**禁用工具**（w/o tools），用于隔离"路由"与"单纯跳过工具"的差异。
  - 已有高效推理方法：**SpecReason**（语义一致性验证的推测推理）。
  - 上界参考：Qwen3-VL-2B **draft only**（纯小模型直接作答）。
  - 本方法四种聚合变体：log / mean / bottom-r / min。
  - 草稿模型替换实验：Qwen3-VL-8B、Qwen2.5-VL-7B。
- **实现细节**：贪心解码（temperature 0），延迟统计包含工具执行时间；门控超参 `K=64`、`ε=10⁻⁶`、默认 min 聚合，bottom 变体取 `r=0.2`；阈值 τ 先在一个随机 10% 样本上可视化 `S_sep` 分布以确定粗搜索范围，再从固定网格中均匀采样选定，**不做逐样本或逐 benchmark 优化**。

## 4. 资源与算力

- 文中明确说明：**全部实验在单张 NVIDIA A100 40GB GPU 上运行**。
- 论文**未报告任何训练时长、训练算力或集群规模**——这与该方法属于**免训练（training-free）推理期加速**的定位一致：只涉及大/小模型的推理与工具执行。
- 也未报告大规模并发服务场景下的真实 GPU 集群吞吐测试（吞吐结论主要基于 `1/(1−βα)` 的解析模型与 batch size 消融曲线）。

## 5. 实验数量与充分性

- **实验规模大致为**：
  - 主实验 1 组（Tab. 1）：2 个智能体骨干 × 4 种门控聚合变体 + 4 类对照方法 × 7 个评测划分。
  - 草稿模型对比 1 组（Tab. 2）：2 个更大草稿模型（Qwen3-VL-8B、Qwen2.5-VL-7B）× draft-only 与 SpecEyes(min) × 2 个骨干 × 7 个划分。
  - 校准分析 1 组（Fig. 3）：4 种置信度指标的 KDE 可分性对比。
  - 消融实验 3 组：门控阈值（Fig. 4，2 骨干 × 3 benchmark）、服务 batch size（Fig. 5，3 benchmark）、top-K 取值（Fig. 6，4 个子集）。
- **充分性评价**：
  - **较充分**：覆盖 3 个不同性质的 benchmark（细粒度感知、高分辨率、幻觉鲁棒性），两个主流智能体骨干，四种聚合策略的横向对比，以及阈值/批大小/top-K/草稿模型四维消融；还特意加入"禁用工具"对照，证明收益来自**路由**而非简单跳过工具。
  - **公平性设计亮点**：阈值从固定网格中选取、不做逐样本调优，作者自陈"结果不构成上界"；延迟包含工具执行时间；小模型仅用于给出速度上界参考。
  - **可商榷之处**：主表中每个变体均报告"能保持基线精度的最佳操作点"，这种**取最优操作点**的报告方式对方法本身偏有利，缺少对操作点选取敏感性的完整统计；此外缺乏开放式生成任务的评测（三类 benchmark 均以选择题/判断题为主）。

## 6. 主要结论与发现

- **精度—速度双赢**：以 DeepEyes 为骨干时，SpecEyes(min) 平均加速 **1.73×**，同时平均精度从 **81.39% 提升到 84.26%**；以 Thyme 为骨干时平均加速 **1.42×**，精度从 82.29% 提升到 83.99%。
- **收益分布**：POPE 获益最大（DeepEyes 2.13–2.19×，Thyme 1.70–1.78×），且精度普遍高于基线（如 Adversarial 78.43% → 85.13%），说明绕过不必要的工具轨迹还能**减少幻觉错误**；V\* 收益稳健；**HR-Bench 是瓶颈**（1.08–1.13×；Thyme 在 8K 上甚至 0.95×），因高分辨率输入同时压低 β 与 α，使 `βα` 过低，此时固定的小模型开销超过节省，与式 (9) 一致。
- **min 聚合最优**：四种聚合中 `S_sep^min` 稳定给出最佳精度—速度折中；KDE 分析显示其正确/错误样本分布的双峰分离度 Δ 最大，而 `S_log` 受 softmax 过度自信拖累、`S_mean` 被均值
