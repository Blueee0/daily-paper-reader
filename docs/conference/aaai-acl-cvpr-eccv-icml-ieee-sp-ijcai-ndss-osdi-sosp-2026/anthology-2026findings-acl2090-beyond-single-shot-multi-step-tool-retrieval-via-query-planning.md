---
title: "Beyond Single-Shot: Multi-step Tool Retrieval via Query Planning"
title_zh: 超越单次检索：基于查询规划的多步工具检索
authors: "Wei Fang, James Glass"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.findings-acl.2090.pdf"
tags: ["query:fin-mm-agent"]
score: 6.0
evidence: 面向LLM智能体的多步工具检索与查询规划
tldr: 大语言模型智能体在庞大且动态的工具库上依赖高效检索，但单次稠密检索难以应对复杂请求，存在用户抽象目标与工具技术文档之间的语义鸿沟，也难以建模工具的组合关系。为此作者提出 ToolQP，将检索建模为迭代式查询规划，把指令分解为子任务并动态生成查询与检索器交互，从而针对组合所需的子任务缩小语义差距。实验表明该轻量框架提升了组合式工具检索效果。该工作为工具增强型智能体的检索与工具调用提供了可迁移的方法。
source: ACL-2026-Findings
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl2090/fig-001.webp\", \"caption\": \"\", \"page\": 3, \"index\": 1, \"width\": 3836, \"height\": 1764}]"
motivation: 大语言模型智能体在庞大动态工具库上进行单次稠密检索时，难以应对复杂请求和工具组合，存在目标与文档间的语义鸿沟。
method: 作者提出 ToolQP 轻量框架，将检索建模为迭代式查询规划，把指令分解为子任务并动态生成查询与检索器交互。
result: 实验表明该框架能针对组合所需的子任务缩小语义差距，有效提升复杂请求下的工具检索效果。
conclusion: 该工作为工具增强型智能体的检索与工具调用提供了可迁移的方法思路。
---

## Abstract
LLM agents operating over massive, dynamic tool libraries rely on effective retrieval, yet standard single-shot dense retrievers struggle with complex requests. These failures primarily stem from the disconnect between abstract user goals and technical documentation, and the limited capacity of fixed-size embeddings to model combinatorial tool compositions. To address these challenges, we propose ToolQP, a lightweight framework that models retrieval as iterative query planning. Instead of single-shot matching, ToolQP decomposes instructions into sub-tasks and dynamically generates queries to interact with the retriever, effectively bridging the semantic gap by targeting the specific sub-tasks required for composition. We train ToolQP using synthetic query trajectories followed by optimization with Reinforcement Learning with Verifiable Rewards (RLVR). Experiments demonstrate that ToolQP achieves state-of-the-art performance, exhibiting superior zero-shot generalization, robustness across diverse retrievers, and significant improvements in downstream agentic execution.

---

## 论文详细总结（自动生成）

## 1. 核心问题与整体含义

- **研究背景**：LLM 智能体需要在庞大、动态的工具库（API、数据库、软件工具等）上执行复杂任务，工具检索是实际框架中的关键初始步骤。然而，工具库规模可达数万 API，无法将全部工具上下文放入 LLM 上下文窗口。
- **核心问题**：标准单次稠密检索（single-shot dense retrieval）在复杂请求上表现不佳，主要源于三个挑战：
  - **语义错位**：用户抽象目标（如“让录音高质量”）与工具技术文档（如 `scipy.signal.lfilter` 的参数与数学描述）之间存在鸿沟。
  - **组合瓶颈**：固定维度嵌入难以编码多个异构工具的组合关系，而真实任务常需多工具协同。
  - **缺乏交互式工具集意识**：单次检索把工具库视为静态数据库，无法处理工具间依赖、内部约束或工具集动态变化。
- **整体含义**：论文提出将工具检索从“静态相似度匹配”重构为“迭代式查询规划”，以桥接语义鸿沟、逐步检索组合所需工具，并利用环境反馈发现工具依赖，从而提升检索精度与下游智能体执行成功率。

## 2. 方法论

### 核心思想
- 提出 **ToolQP（Tool Query Planner）**，一个轻量、模块化的查询规划框架，将检索器视为可交互的动态环境，而非静态索引。
- 通过“规划—查询生成—聚合”三阶段，把复杂用户指令分解为子任务，并动态生成查询与检索器交互，最终聚合出相关工具列表。

### 关键技术细节
- **三阶段流程**：
  1. **规划（Planning by Task Decomposition）**：生成自然语言计划 \(P\)，并将用户查询 \(q\) 分解为逻辑子任务序列 \(\{s_n\}\)。
  2. **交互式查询生成（Interactive Query Generation）**：针对每个子任务，逐步生成搜索查询 \(\{q_t\}\)；每步观察检索反馈 \(O_t = E(q_t; D)\)，再生成下一查询 \(q_{t+1}\)，直到覆盖子任务，形成查询—检索轨迹 \(\{(q_t, O_t)\}\)。
  3. **检索聚合（Retrieval Aggregation）**：采用 **peak-rank 聚合**——对每个唯一工具，取其所有检索尝试中的最高排名作为最终排名，避免偏向需要更多查询尝试的子任务。
- **数据生成与 SFT**：
  - 使用教师模型（`gpt-4.1-mini`）从 ToolRet 训练集合成查询轨迹。
  - 流程：Plan Alignment（将计划解析为子任务并分配目标工具）→ Query Generation（仅基于子任务描述生成候选查询，避免直接使用工具名）→ Query Verification and Trajectory Construction（用检索器验证查询，保留达到排名阈值 \(r_\tau=5\) 的查询；以概率 \(p=0.4\) 保留失败尝试，模拟试错与自我纠错）。
  - 合成数据用于标准监督微调（SFT），采用最大似然与 teacher forcing。
- **RLVR 训练**：
  - 在 SFT 基础上使用 **Reinforcement Learning with Verifiable Rewards (RLVR)**，具体采用 **GRPO**（Group Relative Policy Optimization）。
  - 总奖励：\(R = \beta_1 R_{\text{retrieval}} + \beta_2 R_{\text{format}} + \beta_3 R_{\text{plan}}\)。
    - \(R_{\text{retrieval}}\)：基于最终聚合工具列表
