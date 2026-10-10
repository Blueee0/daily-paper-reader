---
title: "FinToolSyn: A forward synthesis Framework for Financial Tool-Use Dialogue Data with Dynamic Tool Retrieval"
title_zh: FinToolSyn：面向金融工具调用对话数据的前向合成框架与动态工具检索
authors: "Caishuang Huang, Yang Qiao, Rongyu Zhang, Junjie Ye (叶俊杰), Pu Lu, Wuwenxi, Meng Zhou, Xiku Du, Qi Zhang, Tao Gui, Xuan-Jing Huang (黄萱菁)"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.findings-acl.746.pdf"
tags: ["query:fin-mm-agent"]
score: 8.0
evidence: 面向金融工具调用对话的前向合成与动态工具检索
tldr: 现有金融工具调用数据合成多采用逆向范式，从预采样工具反推用户查询，导致查询过于显式、无法反映真实事件驱动的隐式需求，且静态工具集忽略了大规模工具空间中的动态检索。为此，本文提出FinToolSyn前向合成框架，直接生成高质量的金融工具使用对话并引入动态工具检索。实验表明该框架能提升数据的真实性与多样性，为金融场景下工具增强型智能体的训练与评估提供更可靠的数据基础。
source: ACL-2026-Findings
selection_source: conference_retrieval
motivation: 现有金融工具调用数据合成依赖逆向范式，查询人工显式且工具集静态，难以反映真实事件驱动的隐式需求。
method: 提出前向合成框架FinToolSyn，直接生成高质量金融工具使用对话，并集成动态工具检索以应对大规模工具空间。
result: 实验显示该框架生成的对话更贴近真实需求，数据质量与多样性优于传统逆向合成方法。
conclusion: 为金融领域工具增强型大模型智能体的训练与评测提供了更真实、可扩展的数据合成方案。
---

## Abstract
Tool-use capabilities are vital for Large Language Models (LLMs) in finance, a domain characterized by massive investment targets and data-intensive inquiries. However, existing data synthesis methods typically rely on a reverse synthesis paradigm, generating user queries from pre-sampled tools. This approach inevitably introduces artificial explicitness, yielding queries that fail to capture the implicit, event-driven nature of real-world needs. Moreover, its reliance on static tool sets overlooks the dynamic retrieval process required to navigate massive tool spaces. To address these challenges, we introduce FinToolSyn , a forward synthesis framework designed to generate high-quality financial dialogues. Progressing from persona instruction and atomic tool synthesis to dynamic retrieval dialogue generation, our pipeline constructs a repository of 43,066 tools and synthesizes over 148k dialogue instances, incorporating dynamic retrieval to emulate the noisy candidate sets typical of massive tool spaces. We also establish a dedicated benchmark to evaluate tool-calling capabilities in realistic financial scenarios. Extensive experiments demonstrate that models trained on FinToolSyn achieve a 21.06% improvement, providing a robust foundation for tool learning in financial scenarios.

---

## 论文详细总结（自动生成）

# FinToolSyn 论文中文总结

## 一、核心问题与研究动机

- **背景**：金融领域投资标的海量、查询数据密集，LLM 的静态知识难以满足高时效性与专业严谨性要求，因此工具调用能力对金融智能体至关重要。
- **核心痛点（现有"逆向合成"范式的两大缺陷）**：
  - **人工显式性（Artificial Explicitness）**：从预采样工具反推用户查询，相当于"答案先于问题"，合成查询往往参数过于完整（如直接给出 `ticker=AAPL`），退化为简单的槽位填充，无法反映真实交流中的模糊性与隐式需求。
  - **静态工具集**：忽略大规模工具空间中的动态检索过程，模型只需在有限候选中选择，无需承担在噪声、异构工具库中导航的认知负担。
- **整体含义**：论文主张从"需求→工具"的真实轨迹出发，提出**前向合成（Forward Synthesis）**框架，重建事件驱动、隐式表达、需多步推理的金融对话，为金融工具学习提供更可靠的数据与评测基础。

## 二、方法论：FinToolSyn 前向合成框架

核心思想是**沿真实需求轨迹自底向上生成数据**：从人格指令锚定 → 需求导向的原子工具合成 → 带动态检索的多轮对话生成。分三阶段：

### 阶段 1：人格锚定的金融指令合成
- 从大型问答平台收集 4,000 条原始查询（Q_raw），用 LLM 逆向推断潜在**用户人格 P**（含基础画像：人口统计与心理状态；金融画像：素养、风险偏好等），去重后得到 **1,000+ 独特人格**。
- 引入金融语料（新闻、财报）作为刺激上下文 **C**，将指令生成建模为 `i_new ∼ P_M(·|P, C)`，保证专业术语继承与认知深度对齐，产出 **60,000 条种子指令**。

### 阶段 2：任务分解的原子工具前向合成
- **任务分解三步走**：① 深度逻辑推理（从种子指令推导信息交互链）→ ② 原子映射（拆解为独立子任务，遵守单一职责原则）→ ③ 标准化工具生成（遵循 MCP 协议，严格类型约束）。
- **双层验证与演化**：LLM 判定 + 规则检查，覆盖结构完整性与逻辑正确性；失败样本不丢弃，经诊断报告迭代精炼至收敛或达 `T_max=3`；最后归一化聚类合并，得到 **43,066 个原子工具**。
- **双检索架构**：
  - 语义向量索引：`h_i = Encoder(Concat(n_i, d_i))`，捕获表层语义相关性。
  - 工具依赖图 `G_tool=(V,E)`，边集分四类：直接工具依赖 E_TD、间接工具依赖 E_TI、直接参数依赖 E_PD、间接参数依赖 E_PI（参数级优先于工具级，直接优先于间接）。

### 阶段 3：全局控制的动态检索对话生成
- **多智能体仿真**：User Agent（按人格发起/澄清）、Assistant Agent（决定调用工具或直接回答）、Tool Agent（随机化输出以模拟真实 API 不稳定）、Global Agent（监督对话状态与一致性）。
- **对话计划与自适应更新**：由 `Plan_0 = M_GA(I_seed, P, C)` 初始化，作为可变状态 `Plan_t` 持续演进；当计划与工具输出冲突时触发重规划（`Plan_t → Plan_{t+1}`），防止错误累积。
- **闭环监督轨迹合成**：
  - User Agent 候选查询经**对抗判别器 D(q_t, q_real)**过滤人工显式性，再经质量检查与纠错反馈。
  - Assistant Agent 的动作决策与动作质量（工具选择、参数正确性）受 Global Agent 校验。
  - Tool Agent 无监督随机输出，保留真实 API 的不稳定性。
- **三种检索配置**：静态检索（固定候选）、向量检索（轮级语义搜索 + 指代消解）、图增强检索（K-hop 邻居引入硬负例），模拟含无关/部分相关/冗余工具的噪声候选集。

## 三、实验设计

- **数据资源**：FinToolSyn 产出 **148,984 条对话、约 130 万轮（653k turns 按另一处表述）**，源自 43,066 个工具；对比 xLAM、ToolAlpaca、ToolLLM、When2Call、BUTTONInstruct、APIGen-MT-5k、ToolACE、ToolMind 等资源（在工具数、对话数、平均轮数上均领先，平均 8.79 轮）。
- **自建 Benchmark——FinToolBench**：843 条经金融专业标注员人工验证的金标准样本，覆盖 16 种组合场景（单/多轮 × 单/多候选工具 × 单/并行/串行调用），分布均衡（每场景 50–63 条）。
- **评测维度**：
  - Tool-Call：ST-SC、ST-MC、MT-SC、MT-MC 四种配置。
  - Non-Tool-Call：Unavailability Detection (UD)、Clarification Inquiry (CI)、Direct Response (DR)。
  - 两种交互范式：Prompt Mode（schema 序列化文本注入系统提示）与 Function Calling (FC) Mode（原生 JSON 元数据）。
- **评分机制**：CB-HWS（熔断式分层加权评分），含"fail-fast"硬规则检查（格式合规、工具幻觉、参数 schema）与 LLM 软评估；引入领域指标 **KDA（关键数字准确率）** 与 **ITA（调用时机准确率）**。
- **对比方法**：
  - 闭源：Gemini-2.5-Flash/Pro、Claude-4.0-Sonnet、GPT-3.5-Turbo、GPT-4o。
  - 开源：DeepSeek-V3.1-Terminus、Qwen3-235B-Instruct、Qwen2.5-72B/32B/14B/7B、Qwen3-32B/14B/8B。
- **泛化评测**：BFCL-v4、τ-bench（工具调用迁移）；GSM8K、MMLU、HumanEval（通用推理保持）。
- **消融实验**：Base、逆向合成（Reverse Syn.）、前向合成+静态检索、前向合成+动态检索（Full）。

## 四、资源与算力

- **训练算力**：**8 张 NVIDIA H20 GPU**，LoRA 参数高效微调（rank=16, alpha=32, dropout=0.05，作用于全部线性模块），1 epoch，最大序列长度 32,768，全局 batch size 128（梯度累积 16），学习率 2e-4，余弦调度 + warmup 0.1，AdamW（Fused），BF16。
- **数据合成模型**：Global Agent 使用 DeepSeek-V3.1-Terminus；User/Assistant/Tool Agent 使用 Qwen3-235B-A22B-Instruct-2507（temperature 0.6）；检索召回 top-10，`T_max=3`。
- **评测**：温度 0，最大 9,182 tokens；Judge 模型为 DeepSeek-V3.2。
- **未明确说明**：论文**未给出训练/合成的具体时长、总 GPU 小时数或能耗数据**，仅说明使用了 8×H20 与 1 epoch。

## 五、实验数量与充分性

- **实验规模（约 6 大类）**：
  1. 主结果：2 个 Panel × 约 20 个模型，覆盖 4 种 Tool-Call 配置 + 3 种 Non-Tool-Call 类别 + 2 个领域指标。
  2. 细粒度错误分析（Table 5）：格式错误、工具幻觉、参数错误、工具选择/参数打分明细。
  3. 泛化实验（Figure 3 / Table 15）：5 个通用基准，含逐模型 Δ 值。
  4. 消融实验（Table 6、12、13）：逆向 vs 前向、静态 vs 动态检索，含 Tool-Call 与 Non-Tool 两维度。
  5. 案例研究（Table 14）：实体识别与隐式参数提取对比。
  6. 附录：数据分布统计、API 分类体系、监督流程示例、标注指南、评分伪代码。
- **充分性与客观性评价**：
  - **较充分**：主结果 + 消融 + 泛化 + 错误分析 + 案例，形成较完整的证据链；对比基线涵盖主流闭源与开源模型。
  - **较公平**：四个微调变体保持相同超参；Prompt/FC 两种范式分别评测，避免范式混淆。
  - **潜在偏差风险**：
    - Benchmark 为**自建**，且评测依赖 **LLM Judge（DeepSeek-V3.2）**，可能与训练数据分布同源，存在偏好风险。
    - 表 3 中部分基线在不同 Panel/表中数值不完全一致，且 Panel B 部分开源模型（如 Qwen2.5-72B 在 FC 模式骤降至 14.62）异常，作者未充分解释。
    - 消融仅基于 Qwen3-8B 单一模型，跨模型稳健性验证有限。

## 六、主要结论与发现

- **性能提升显著**：模型在 FinToolSyn 上训练后取得 **21.06% 的提升**；FinTool-Qwen3-14B 在 Prompt Mode 平均达 71.06、FC Mode 达 70.03，**超越 GPT-4o（62.31 / 63.86）**，并优于更大的 Qwen3-235B。
- **多轮长程稳定性强**：在 MT-SC 等复杂设置中超越 GPT-4o；串行执行（serial）场景优势尤为明显（Prompt Mode 61.62 vs GPT-4o 46.69，FC Mode 57.03 vs 47.25）。
- **金融业务逻辑掌握**：基线 ITA 常为 0，微调模型最高达 **74.07**，显著优于 Claude-4.0-Sonnet（44.44），证明其重视前置校验与逻辑正确性；KDA 也保持高位。
- **消融结论**：逆向合成虽提升工具调用（64.01），但导致 Non-Tool 准确率崩塌至 **15.01**（"人工显式性"偏差）；前向合成恢复决策逻辑（44.03），动态检索进一步将 Tool-Call 推至 68.31、综合最优 55.86。
- **泛化无损**：GSM8K/MMLU/HumanEval 波动均在 ±2 分内（最大 |Δ|=1.74），BFCL/τ-bench 持平或小幅提升，无明显灾难性遗忘。
- **可解释失败模式**：微调模型存在"亲工具偏差"（pro-tool bias），Non-Tool 场景无效调用率偏高（56.8%），但澄清意图失败率最低（0.6%–1.9%）。

## 七、优点（方法/实验亮点）

- **范式创新**：明确提出并验证"前向合成"范式，从需求出发反推工具，系统性解决"人工显式性"偏差，并用消融实验定量证明其价值。
- **闭环可控合成**：借鉴控制论，将 Global Agent 提升为动态规划者与审计者，实现生成过程中的反馈驱动重合成，避免错误累积。
- **噪声感知的检索建模**：通过向量检索 + 图增强 + K-hop 硬负例，逼真模拟大规模异构工具空间的检索挑战，训练出抗噪能力更强的智能体。
- **细粒度工具分解**：坚持单一职责原则、拒绝"上帝 API"，并建立四类依赖关系图，兼顾可复用性与逻辑关联建模。
- **专用评测体系**：CB-HWS 熔断机制 + KDA/ITA 领域指标，对高风险金融场景的数值精度与流程合规提出零容忍要求，评测设计严谨。
- **数据规模与质量并重**：丢弃率 <10%，人工接受率 94.2%，并附详细标注指南与失败案例分析。
- **兼顾通用能力**：验证了领域微调不损害通用推理，具有较好的迁移性。

## 八、不足与局限

- **领域迁移成本高**：依赖领域特定工具分类体系与依赖图，迁移至医疗、法律等需专家驱动的重校准，非平凡工作。
- **合成开销大**：多智能体编排 + 迭代对抗过滤带来较高算力开销，相比传统开环生成成本更高。
- **仿真与真实存在差距**：虽模拟计划-事实冲突与随机工具失败，但与生产级金融 API 的极端边界案例、实时延迟波动仍有差距。
- **模型自身缺陷**：微调后存在"亲工具偏差"，在无适用工具或参数不足时仍倾向投机性调用（无效调用率偏高），需后续对齐工作缓解。
- **评测客观性隐忧**：自建 benchmark + LLM Judge 评分可能引入同源偏差；消融实验仅覆盖单一模型规模，跨模型泛化验证不足。
- **算力信息披露不完整**：未给出训练时长、总计算量或成本分析，可复现性与能耗评估受限。
- **部分数据表内部一致性存疑**：不同 Panel/表格中同类基线数值存在差异，且个别开源模型 FC 模式表现异常，论文解释不足。

（完）
