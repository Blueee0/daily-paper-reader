---
title: "Fin-STAR: Structure-as-Semantics to Resolve Implicitness in Financial Retrieval"
title_zh: Fin-STAR：以结构即语义解决金融检索中的隐含性问题
authors: "Yu Zou (邹煜), Yan Chen, Lida He, Qi Zhou, Xiaorui Zhou, Aixi Zhong, Yi Wang, Wei Li, Qingyu Wang, Jiatao Li, Wei Gong, Jialei Zeng, Jingmei Zhao, Ke Jiang, Qing Li"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.findings-acl.2151.pdf"
tags: ["query:fin-mm-agent"]
score: 7.0
evidence: 将结构视为内在语义的金融文档检索方法
tldr: 金融文档中的关键事实往往依赖全局结构线索而非表层文本，现有检索增强生成仅将结构当作物理导航骨架，易导致语义误读。论文提出Fin-STAR，将层级结构重新定义为内在语义，引入结构增强的语义索引机制。该工作提升了高风险金融文档检索的准确性，对金融文档理解与多模态结构化推理具有参考价值。
source: ACL-2026-Findings
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl2151/fig-001.webp\", \"caption\": \"\", \"page\": 2, \"index\": 1, \"width\": 4085, \"height\": 2320}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl2151/fig-002.webp\", \"caption\": \"\", \"page\": 4, \"index\": 2, \"width\": 6400, \"height\": 3600}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl2151/fig-003.webp\", \"caption\": \"\", \"page\": 6, \"index\": 3, \"width\": 1811, \"height\": 1632}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl2151/fig-004.webp\", \"caption\": \"\", \"page\": 11, \"index\": 4, \"width\": 2295, \"height\": 1219}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl2151/fig-005.webp\", \"caption\": \"\", \"page\": 12, \"index\": 5, \"width\": 4400, \"height\": 3115}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl2151/fig-006.webp\", \"caption\": \"\", \"page\": 13, \"index\": 6, \"width\": 2448, \"height\": 1203}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl2151/fig-007.webp\", \"caption\": \"\", \"page\": 13, \"index\": 7, \"width\": 2448, \"height\": 1203}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl2151/fig-008.webp\", \"caption\": \"\", \"page\": 13, \"index\": 8, \"width\": 2448, \"height\": 1203}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl2151/fig-009.webp\", \"caption\": \"\", \"page\": 13, \"index\": 9, \"width\": 2448, \"height\": 1203}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl2151/fig-010.webp\", \"caption\": \"\", \"page\": 13, \"index\": 10, \"width\": 2448, \"height\": 1203}]"
motivation: 金融文档关键事实依赖全局结构线索，现有RAG仅把结构当导航骨架，易致语义误读。
method: 提出Fin-STAR框架，将层级结构重新定义为内在语义，并引入结构增强的语义索引机制。
result: 通过结构化语义索引提升金融文档检索准确度，缓解高风险场景下的语义误解问题。
conclusion: 该工作为金融文档理解中的结构化语义检索提供了新思路。
---

## Abstract
Understanding financial documents is critical for high-stakes decision-making yet hindered by systemic semantic implicitness: key facts are rarely explicit in surface text and often determined by global structural cues. Missing these cues invites semantic misinterpretations, such as misreading what a number refers to, an outcome unacceptable in high-stakes environments. However, existing Retrieval-Augmented Generation (RAG) systems typically treat structure as a physical navigational skeleton rather than intrinsic semantic knowledge. To address this, we introduce Fin-STAR (Financial STructure-As-Semantics Retrieval), a framework redefining hierarchy as intrinsic semantics. Fin-STAR incorporates a novel Structure-Enriched Semantic Indexing mechanism that augments the hierarchical lineage with snippet-derived virtual nodes, and injects this enriched context via a semantic cross-attention paradigm, rendering implicit cues explicit. By grounding evidence within its structural scope, we preserve factual invariance and ensure contextual integrity. Addressing the lack of granular public datasets, we conduct experiments on FinTierQA Gold, a curated expert benchmark. Results show that Fin-STAR outperforms state-of-the-art hierarchical and graph-based baselines across diverse query complexities, document types, and markets. Notably, ablations confirm that our semantic injection consistently outperforms alternative strategies. Finally, we release FinTierQA, comprising 3.9M pairs automatically constructed from 78k documents via our framework .

---

## 论文详细总结（自动生成）

# Fin-STAR 论文结构化总结

## 1. 核心问题与整体含义

- **研究背景**：金融文档（年报、招股书、ESG 报告等）是高风险决策场景，但存在“系统性语义隐含性”：关键事实往往不在局部文本中显式给出，而依赖全局层级结构线索，例如标题、章节路径、页码/表格归属、时间元数据等。
- **核心问题**：现有 RAG 系统通常把文档结构仅当作“物理导航骨架”，而非内在语义知识。普通 RAG 的分块会切断 snippet 与层级结构的关系；层次化 RAG 常通过摘要恢复结构，但会损失数值精度；GraphRAG 等方法重视语义连通性，却忽略“结构容器”语义，可能把“Risk Factors”与“Financial Results”等不同章节的证据错误混合。
- **整体含义**：论文提出 **Fin-STAR**，将文档层级重新定义为内在语义，通过结构增强索引与语义注入，把隐含结构线索显式化，从而在高风险金融检索与推理中保持事实不变性和数值精度。论文同时发布专家校验基准 **FinTierQA Gold** 和大规模自动构造数据集 **FinTierQA**。

## 2. 方法论

### 2.1 核心思想

- 将文档层级路径、章节标题、表格归属等结构信息转化为语义上下文，与局部 snippet 一起索引。
- 通过“结构即语义”的方式，让模型在检索和生成时知道一个数字、术语或事实到底属于哪个章节、哪类语义范围。
- 强调 **事实不变性**：结构注入只作为上下文增强，不覆盖或污染原始 snippet 中的实体、数字和时间等关键事实。

### 2.2 结构增强语义索引

- **双门控语义单元构建**：
  - 第一门：将表格视为不可分割单元，线性化为自然语言，保留实体—属性—值关系。
  - 第二门：边界感知软切分，动态调整 snippet 边界，使其符合自然语义边界并完整包含表格。
- **结构路径构造**：
  - 给定规范化 snippet `ci` 及其层级路径 `hi`，用小型语言模型 `Gθ` 生成判别性虚拟节点 `vi = Gθ(ci, hi)`。
  - 得到增强路径 `Pi = hi ⊕ vi`。
  - 约束：虚拟节点需具备判别性，且路径深度 `Depth(Pi) ≤ 5`。
- **语义注入 via Cross-Attention**：
  - 将 snippet 表示 `Hci` 作为 Query，将增强路径表示 `HPi` 作为 Key 和 Value。
  - 计算结构上下文向量：`Hsi = Attn(Q = Hci, K = V = HPi)`。
  - 最终结构注入表示：`H+ci = Hsi ⊕ Hci`。
  - 采用拼接而非加性/摘要式融合，形成“结构正交约束”，使原始 snippet 保留在独立子空间中，保证 `E(ci) ⊆ E(H+ci)`，即关键事实元素仍可恢复。

### 2.3 在线检索与生成

- **逻辑引导查询规划**：
  - 将复合用户意图 `Q` 分解为原子子查询 `{qsub}`。
  - 做语义补全和指代消解，使每个子查询明确目标实体。
  - 构建符号逻辑拓扑 `T`，规定子查询结果的组合方式与顺序，如交、差、聚合等。
  - 生成合成指令 `I`，指导下游生成。
- **混合检索**：
  - 对每个原子子查询独立检索 Top-K 证据。
  - 双流策略：稠密语义匹配 `H+ci` 与 `qsub`，结合 BM25 稀疏符号约束。
- **证据链聚合与生成**：
  - 原子事实验证：对每个 `qsub` 独立验证其 Top-K 证据，减少不同意图间噪声干扰。
  - 逻辑控制合成：依据符号逻辑拓扑 `T` 和合成指令 `I`，将已验证子答案合成为连贯回答，保持全局逻辑一致性和证据忠实性。

## 3. 实验设计

- **数据集/基准**：
  - **FinTierQA Gold**：专家仲裁基准，270 篇长文档，约 60K 页，覆盖 17 个行业、9 个类别、中/港/美三市场，文档类型包括 Annual、IPO、ESG 报告。
  - 文档被解析为层级 JSON 块，对齐 H1–H4 章节。
  - 五级难度：
    - T1：原子局部跨度，直接检索，4,050 条，30%。
    - T2：主题内、同 H1 链式推理，≥2 hops，3,240 条，24%。
    - T3：跨主题、跨 H1 链式推理，≥3 hops，2,700 条，20%。
    - T4：全局全文聚合，2,160 条，16%。
    - T5：多文档跨文档对齐与比较，1,350 条，10%。
  - 标注流程：三模型合成（Gemini 3 Pro、Grok 4.1-Thinking、GPT 5.2-Thinking）+ 18 位金融专家共识验证，Fleiss’ Kappa 0.84，保留率 74.3%。
  - **FinTierQA**：大规模自动构造数据集，78,564 份文件，8,657 家公司，中/港/美市场 2015–2024，3,928,500 个样本，五级难度均衡分布。
- **对比方法**：
  - 全局图索引 RAG：GraphRAG、LightRAG。
  - 细粒度 KG 推理 RAG：HippoRAG2、ArchRAG。
  - 层次树 RAG：RAPTOR、PageIndex。
- **评价指标**：
  - Answer F1：答案 token 重叠。
  - Evidence F1：句子级证据重叠。
  - Joint F1：Answer F1 与 Evidence F1 的调和平均。
  - Numeric Accuracy：带绝对/相对容差的数值匹配。
  - Semantic Answer Similarity、Token Consumption 用于补充分析。
- **检索协议**：
  - 分析 `k ∈ {1,...,10}` 的检索敏感性。
  - 采用统一 Tier-Adaptive Protocol：T1–T5 分别固定 `k = {1, 3, 4, 5, 6}`，减少模型特定超参偏差。

## 4. 资源与算力

- 文中明确提到：所有实验在 **4 张 NVIDIA Tesla V100（32GB）GPU** 上进行。
- 使用模型：
  - 嵌入模型：Qwen3-Embedding-8B。
  - 答案生成器：Qwen3-32B。
  - 小型语言模型 `Gθ`：Qwen3-8B。
  - 数据合成使用 Gemini 3 Pro、Grok 4.1-Thinking、GPT 5.2-Thinking。
- **未明确说明**：训练时长、总 GPU 小时、能耗、是否对模型进行微调等信息。从描述看
