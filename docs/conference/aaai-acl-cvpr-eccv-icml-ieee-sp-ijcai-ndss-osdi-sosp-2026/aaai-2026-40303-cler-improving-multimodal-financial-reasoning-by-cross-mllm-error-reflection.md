---
title: "CLER: Improving Multimodal Financial Reasoning by Cross-MLLM Error Reflection"
title_zh: CLER：通过跨多模态大模型错误反思改进金融多模态推理
authors: "Shuangyan Deng, Zhongsheng Wang, Rui Mao, Ciprian Doru Giurcăneanu, Jiamou Liu"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://ojs.aaai.org/index.php/AAAI/article/download/40303/44264"
tags: ["query:fin-mm-agent"]
score: 9.0
evidence: 通过检索与反思对金融文本与视觉输入进行多模态金融推理
tldr: 多模态大模型已能联合推理金融文本与视觉输入，但在金融术语、逻辑一致性和数值计算上仍有不足，且商用大模型推理成本高限制规模化应用。本文提出成本有效的CLER框架，将对比检索与逐步反思结合，仅在测试阶段调用商用大模型生成推理，并利用含八千余条纠错对的FinErrorSet数据集。实验表明该方法提升了多模态金融推理表现。该工作直接面向金融图文多模态推理与问答，具有高度相关性。
source: AAAI-2026-Accepted
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-40303/fig-001.webp\", \"caption\": \"\", \"page\": 2, \"index\": 1, \"width\": 1722, \"height\": 1180}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-40303/fig-002.webp\", \"caption\": \"\", \"page\": 4, \"index\": 2, \"width\": 1822, \"height\": 1034}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-40303/fig-003.webp\", \"caption\": \"\", \"page\": 6, \"index\": 3, \"width\": 929, \"height\": 592}, {\"url\": \"assets/figures/aaai-2026-accepted/aaai-2026-40303/fig-004.webp\", \"caption\": \"\", \"page\": 7, \"index\": 4, \"width\": 1128, \"height\": 749}]"
motivation: 多模态大模型虽能联合推理金融文本与图像，但在金融术语、逻辑一致性和数值计算上仍薄弱，且商用模型推理成本高。
method: 提出成本有效的CLER框架，将对比检索与逐步反思结合，并构建含八千余条纠错对的FinErrorSet数据集。
result: 实验表明该方法在测试阶段以较低成本有效提升多模态金融推理准确率。
conclusion: 该工作为金融多模态推理与问答提供了实用且可扩展的改进方案。
---

## Abstract
Recent advances in Multimodal Large Language Models (MLLMs) have enabled joint reasoning over financial textual and visual inputs. However, they still struggle with financial terminology, logical consistency, and numerical computations. Moreover, while commercial large models perform well on reasoning tasks, their high inference costs limit their scalable usage in real world financial applications. We thus propose a cost-effective framework, CLER, that combines contrastive retrieval with step-wise reflection to improve reasoning performance. Also, the reasoning cost is only generated in the test stage when using commercial large models. CLER leverages FinErrorSet, a dataset of 8,000+ mistake correction pairs from diverse open-source MLLMs. A fine grained retriever is trained to identify structurally relevant errors for self-correction through individual reflection. Experiments on three benchmarks show that CLER consistently outperforms other baselines. To our knowledge, CLER is the first framework to use cross-model errors for financial reasoning.

---

## 论文详细总结（自动生成）

# CLER：通过跨多模态大模型错误反思改进金融多模态推理

## 1. 核心问题与研究动机

- **背景**：多模态大语言模型（MLLMs）已能联合处理金融文本与视觉输入（图表、表格等），但主流模型（GPT-4o、Claude-3.5 等）在金融多模态推理基准上的准确率常低于 60%，在**金融术语理解、逻辑一致性、数值计算**方面持续表现不佳。
- **成本痛点**：闭源商用模型推理成本高昂——图像分辨率提升导致视觉 token 数量呈**平方级增长**，显著推高计算复杂度与推理延迟，限制其在真实金融场景中的规模化应用。
- **核心思想来源**：借鉴社会认知理论中的"替代性学习"（vicarious learning）、错误示例学习与"负面知识"理论——**向他人（其他模型）的错误学习**比只学习正确示例更能促进深度反思与纠错。
- **核心研究问题**：开源 MLLMs 能否为闭源模型提供有价值的负面示例，使 MLLMs 通过**跨模型错误反思**提升金融多模态推理的准确率与效率？
- **三大挑战**：
  1. 从模型生成的推理过程中识别并提取有意义的错误实例（金融任务知识密集、多模态、上下文依赖强）；
  2. 异构 MLLM 之间推理风格差异大，负知识迁移困难；
  3. 多步推理中通用错误（如公式误用、金融逻辑误解）过于宽泛，缺乏可操作的针对性指导。

## 2. 方法论

### 核心思想
提出 **CLER（Contrastive Learning for Error Retrieval）**，首个系统利用低成本开源 MLLM 产生的跨模型错误，通过**对比检索 + 逐步个性化反思**来增强闭源模型金融多模态推理的框架。整体分三阶段：错误库构建 → 对比检索器训练 → 模型特定反思与纠错。

### 关键技术细节

- **任务定义**：输入实例 X = (c, q, I, O)，其中 c 为文本上下文、q 为问题、I 为视觉输入集合、O 为候选答案；要求模型生成逐步推理轨迹 R̂ = {r̂₁, …, r̂_T} 并预测正确答案 A*。

- **阶段一：错误数据库构建（FinErrorSet）**
  - 使用三个开源 MLLM（DeepSeek-VL-2、Qwen-VL-2.5、InternVL-3）在 FinMR 与 FAMMA 训练集上按"Let's think step by step"提示生成推理链。
  - 由同一批模型充当**步骤检查器**，逐步比对 ground-truth 标注，识别错误步骤 r′_{i,j} 并修订为正确版本 r*_{i,j}，形成**错误–修正对**。
  - 最终数据库 D = {(r′₁,₁, r*₁,₁), …, (r′_{i,j}, r*_{i,j})}。
  - 统计：共 **3,258 个问题、8,852 条错误步骤**；专家推理占 58.0%、数学推理占 42.0%；来源模型分布为 DeepSeek-VL-2（30.1%）、InternVL-3（30.4%）、Qwen-VL-2.5（39.5%）。

- **阶段二：对比学习检索器训练（Algorithm 1）**
  - 基于 **Sup-SimCSE** 编码器，目标是对**语义与结构相似**的错误进行准确检索。
  - 训练参数：batch size B = 128，epochs E = 5，温度 τ = 0.07。
  - 损失形式为 InfoNCE 风格：以错误步骤 r′_i 为 anchor，对应修正 r*_i 为正样本，其余错误步骤为负样本；计算正样本相似度 sim⁺_i 与负样本相似度集合 sim⁻_i，按
    L_i = −log[exp(sim⁺_i/τ) / (exp(sim⁺_i/τ) + Σ_{sim∈sim⁻_i} exp(sim/τ))]
    逐样本计算并批内平均后梯度下降更新编码器。

- **阶段三：步骤级错误反思与纠错**
  - 推理时闭源 MLLM 先生成多步推理链 R = {r₁, …, r_T}；对每一步 r_t，用检索器在 D 中查询 **top-1 语义与结构最相似的错误步骤** r′_{i,j} 及其修正 r*_{i,j}。
  - 模型生成针对自身推理轨迹的**纠错洞察** I(r_t, r′_{i,j}, r*_{i,j})，再通过反思函数 r̂_t = Self-correction(r_t, I(·)) 修订该步，得到精炼链 R̂。
  - 关键设计：不直接套用他人生成的通用原则，而是让每个模型**个性化反思**，生成与自身推理结构对齐的上下文敏感修正。

## 3. 实验设计

### 数据集 / 基准
- **FinMR**：专家级金融多模态推理基准，3,200 题，含详细文本上下文、金融图像与专家标注解释（数学 / 专家两类子集）。
- **FAMMA**：多语言金融多模态推理基准，大学水平专业知识要求，每题配一张或多张图像。
- **MMMU-Finance**：MMMU 基准的金融子集，1,110 个样本，覆盖 Finance、Economics、Accounting 领域，**95% 视觉输入为金融表格**，以数学推理题为主。

### 对比方法
- **CoT**：链式思维提示（Let's Think Step by Step）。
- **LEAP**：从零样本 CoT 错误中提炼显式指导原则，推理时结合原则与示例。
- **RICP**：教师–学生框架，教师分析学生错误，推理时动态检索相关错误案例构建问题特定原则。
- **CLER（本文）**。

### 测试模型
- GPT-4o、Gemini-2.0-flash、Claude-4-sonnet（temperature = 0.7）。

## 4. 资源与算力

- 论文明确提到：所有实验在 **4 块 NVIDIA A100 GPU** 上进行。
- 错误数据库由三个开源模型（Qwen2.5-VL-72B-Instruct、DeepSeek-VL-2、InternVL-3-78B）构建；闭源模型推理温度设为 0.7。
- **未明确说明**：检索器的具体训练时长、总 GPU 小时数、推理阶段的具体 token 开销等，论文未给出详细算力消耗报告。

## 5. 实验数量与充分性

实验规模大致如下：

- **主实验**：3 个基准 × 3 个闭源模型 × 4 种方法（CoT / LEAP / RICP / CLER），覆盖 Math 与 Expertise 子集，共约 30+ 组结果对比（Table 2）。
- **消融实验**（Table 3，GPT-4o，7 个子集）：4 种配置——w/o CL Retriever & Reflection、w/o Reflection、w/o CL Retriever、完整 CLER。
- **个性化洞察对比**（Figure 3）：通用原则 vs. 个性化洞察，在 3 个模型上验证（增益约 3.0%）。
- **模型版本影响**（Table 4）：Claude-3.7-sonnet vs. Claude-4.0-sonnet，7 个数据集子集。
- **错误库规模影响**（Figure 4）：100% / 80% / 50% 三种规模，3 个基准。

**充分性与客观性评估**：
- 优点：覆盖多个数据集、多种模型、多个子任务维度（数学 vs. 专家），消融实验设计完整，能够清晰分离检索器与反思模块各自的贡献。
- 公平性：对比方法（LEAP、RICP）在同一提示与设置下运行，采用统一温度参数；数据库子采样时保持错误类型分布一致，较为公平。
- 局限：所有闭源模型结果依赖于同一检索器与提示模板，未报告多次运行方差或显著性检验；错误库构建所用开源模型与测试闭源模型存在分布差异，但文中未做交叉验证分析。

## 6. 主要结论与发现

- **整体性能**：CLER 在三个基准上均一致超越 CoT、LEAP、RICP。例如 GPT-4o 在 FinMR（Expertise）达 **65.90%**，较 CoT 提升 **+8.83%**；FinMR-All 提升 +7.01%；MMMU-Finance 提升 +4.01%。
- **反思不可缺失**：去掉反思模块后性能显著下降（如 FinMR-Expertise 65.90% → 60.33%）。
- **对比检索优于语义检索**：替换为普通语义相似度检索器后性能下降，证明**结构对齐**对检索相关错误模式的价值。
- **数学类子集增益最明显**：FinMR-Math 49.40% → 53.41%，MMMU-Math 62.77% → 66.78%，说明 CLER 特别擅长纠正步骤级数值推理错误（公式误用、中间步骤错误、数值条件混淆）。
- **个性化洞察优于通用原则**：三个模型均获得约 3% 增益（GPT-4o +3.0%、Gemini +3.04%、Claude +3.02%）。
- **数据库规模关键**：缩减至 80% / 50% 后性能持续下降，更大数据库提供更多样、更有信息量的反例。
- **模型版本协同**：Claude 4.0 相比 3.7 在所有基准上均有提升（FinMR +2.25%），表明模型能力进步可与 CLER 框架协同增效。
- **基线缺陷**：LEAP 在部分子集出现性能下降（如 GPT-4o FinMR-Math −6.43%），源于表面文本相似性检索在结构不匹配时产生误导性原则。

## 7. 优点

- **首创性**：据作者所述，CLER 是首个利用**跨模型错误**进行金融推理的框架。
- **成本效益高**：错误数据库由免费开源模型构建，闭源商用模型仅在测试阶段参与推理，显著降低整体成本。
- **细粒度设计**：步骤级（step-level）错误–修正对检索与反思，比通用原则更精准、更具上下文敏感性。
- **结构+语义双相似度检索**：对比学习使检索器能捕捉深层逻辑结构相似性，缓解表面文本相似性带来的误导。
- **资源贡献**：公开 **FinErrorSet**（8,000+ 错误–修正对），是该领域首个大规模金融推理错误数据集。
- **实验体系完整**：主实验、消融、个性化洞察、模型版本、数据库规模等多维度分析相互印证。
- **方法可迁移**：框架不依赖特定模型架构，在 GPT、Gemini、Claude 上均有效。

## 8. 不足与局限

- **依赖错误库质量与多样性**：性能受 FinErrorSet 覆盖范围限制，对训练库中未出现的新型错误可能泛化不足。
- **仅限步骤级反思**：可能忽略**跨步骤依赖**或更高阶的推理模式错误（如整体解题策略错误）。
- **数据库偏差风险**：错误库仅由三个特定开源模型生成，其错误分布可能无法代表其他模型或真实用户场景。
- **实验报告不完整**：未报告多次运行的方差、统计显著性检验，也未给出推理阶段的具体 token 成本或延迟数据，难以全面评估"成本效益"主张。
- **视觉处理局限**：论文指出高分辨率图像导致视觉 token 爆炸是成本根源，但 CLER 并未直接优化视觉编码或 token 压缩，未从根本上解决该问题。
- **应用限制**：需要预先构建高质量错误库并训练检索器，冷启动与领域迁移成本尚未讨论。
- **基准覆盖**：三个基准均以选择题形式为主，未验证开放式生成或真实交易决策场景下的表现。

（完）
