---
title: "Cogito: A Cognitive Agentic Framework Driven by Dynamic Graph of Thoughts for Financial Report Generation"
title_zh: Cogito：基于动态思维图的金融报告生成认知智能体框架
authors: "Chen Lifan, Wei Ding, Jingwen Yang, Xiuze Zhou, Jingan Chen, Fan Lin"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.findings-acl.430.pdf"
tags: ["query:fin-mm-agent"]
score: 7.0
evidence: 面向专业金融报告生成的认知智能体框架
tldr: 金融报告生成需汇聚并推理多源信息，但传统思维链推理路径受限于预定义的静态计算拓扑，难以应对真实金融环境的动态不确定性。本文提出Cogito，一个认知驱动的智能体框架，其核心是动态思维图推理机制，可动态建模智能体的推理过程并灵活组织多源证据。实验表明该框架在专业金融报告生成任务上优于静态思维链方法，为金融分析决策中的智能体推理提供了更自适应的范式。
source: ACL-2026-Findings
selection_source: conference_retrieval
motivation: 金融报告生成需推理多源信息，但传统思维链的静态计算拓扑难以应对真实金融环境的动态不确定性。
method: 提出Cogito认知智能体框架，核心为动态思维图推理机制，动态建模并组织智能体的推理过程。
result: 实验表明该框架在专业金融报告生成上优于静态思维链方法，推理更灵活自适应。
conclusion: 为金融分析与报告生成中的智能体推理提供了动态图结构的认知化范式。
---

## Abstract
Financial report generation is a complex task that requires gathering and reasoning over multi-source information. Recent advances in Large Language Models have made them a promising solution for automating this process. However, the reasoning paths in traditional Chain-of-Thought paradigms are inherently constrained by predefined, static computational topologies, rendering them ill-equipped to handle the dynamic uncertainties of real-world financial environments. To tackle this challenge, we propose Cogito, a cognitively grounded agentic framework for professional financial report generation. At its core, Cogito is driven by Dynamic Graph of Thoughts, a novel reasoning mechanism that models the agent’s reasoning process as an evolving topology for adaptive exploration.We further introduce a Social Collaboration Mechanism to facilitate coordinated agent interaction. Finally, Cogito is instantiated as a multi-agent system, where four specialized agents collaboratively execute the end-to-end report generation task. Extensive experiments on enterprise- and industry-level financial report generation benchmarks demonstrate the superiority of Cogito in data quality, analytical validity, and presentation quality.

---

## 论文详细总结（自动生成）

# Cogito：基于动态思维图的金融报告生成认知智能体框架 — 论文总结

## 1. 核心问题与整体含义（研究动机与背景）

- **任务背景**：金融报告生成是一项知识密集、劳动密集的复杂任务。专家需要在开放且充满噪声的信息环境中进行多轮迭代检索，并依赖深厚的领域专长，将碎片化的市场数据重构为逻辑连贯的专业叙述。
- **现有方法的不足**：
  - **微调类方法**（如 BloombergGPT）：注入的是静态知识，难以适应实时市场动态。
  - **多智能体框架**（如 FinDebate、TradingAgents）：通过角色扮演提升专业性，但受限于预定义的静态工作流，只能研究预设主题。
  - **通用深度研究系统**（如 Deep Research）：检索能力强，但缺乏关键领域专长。
- **核心矛盾**：传统 Chain-of-Thought 及其后续变体（ToT、GoT）的推理路径本质上依赖**预定义的静态计算拓扑**，即便近期的动态变体也仅将适应性局限于封闭范围内的逻辑纠错或搜索剪枝，无法应对真实金融场景中的"未知的未知"（unknown unknowns）。
- **核心主张**：推理必须超越对预定义计划的优化，实现**信息驱动的拓扑变异**——即根据意外外部发现动态生成新的探索分支。作者借笛卡尔"Cogito, ergo sum"之意，提出让智能体具备动态、演化式思维能力，从静态执行者转变为认知学习的主动主体。

## 2. 论文提出的方法论

### 2.1 核心思想
Cogito 是一个认知驱动的智能体框架，将认知科学三大理论（双过程理论 DPT、Bates 的 Berrypicking 模型、交互记忆系统 TMS）落地为可执行的推理机制，核心由三大组件构成：**ECM（演化认知机制）+ Dy-GoT（动态思维图）+ SCM（社会协作机制）**。

### 2.2 演化认知机制（ECM）
- 结合 DPT 与 Berrypicking 模型：先用**快思考**完成蓝图规划，再进入**慢思考**的批量纵向研究模式。
- 在时间步 t，并行执行一批活跃节点 V_t，产生的深度推理输出 O_t 与意外发现 D_t 共同送入**横向审计机制**（快思考），判断是构建下一批任务还是终止。
- 拓扑演化公式：G_{t+1} = Ω(G_t, Γ(D_t, O_t))（若审计判定继续），否则保持 G_t 不变。其中 Γ 是任务生成函数，Ω 是演化算子，负责将新计划拓扑集成进当前图。
- 关键点：Cogito 不只是追加任务，而是**基于中间发现重构认知轨迹**。

### 2.3 动态思维图（Dy-GoT）
- 与标准 GoT 在静态图中寻找最优路径不同，Dy-GoT 将认知建模为**有限状态机**。
- 形式化定义：时变元组 G_t = (V_t, E_t, Φ_t)，Φ_t: V_t → S 将每个节点映射到生命周期状态（Ready、Finished、Reflecting 等）。
- 定义演化算子集合 Ω = {AddNode, AddEdge, ...}，智能体在执行中触发算子即执行图更新 G_{t+1} = Ω(G_t)，引擎随即通过状态更新函数 U(G_{t+1}) 重算受影响子图的就绪状态，实现**无人工干预的自动推理编排**。

### 2.4 社会协作机制（SCM）
- 基于 TMS，包含两部分：
  - **专家角色注入机制（ERIM）**：基于解空间生成专业身份，与领域上下文 C_dom 一起注入基础提示，ρ+ = ERIM(ρ_base, C_dom)，强制智能体加载领域特定思维范式。
  - **团队协作感知机制（TCPM）**：上游智能体调用下游时显式感知其画像 M = {id_dst, Need_dst, Act_dst}，指令生成策略受此约束：I_c = π(M, ρ+)。例如知道下游是负责事实核查的 ToolAgent 时，会自动过滤主观评论型搜索意图。

### 2.5 四智能体框架
- **ResearcherAgent**：认知中枢与编排者，驱动 ECM，执行蓝图分解、深度分析与持续横向审计。
- **ToolAgent**：感知接口与执行单元，封装 API 到代码生成器的工具包，自主选择工具。
- **DIKAgent**：知识策展，执行"抽取—验证—融合"流程，通过事实提取与自反思验证剔除噪声。
- **WriterAgent**：最终呈现者，执行基于依赖的**自底向上递归写作策略**，从叶节点微观小节逐步聚合为宏观论证。

## 3. 实验设计

- **数据集**：构建了 20 个研究目标的数据集（10 个企业级 + 10 个行业级），来自权威金融平台，覆盖科技、医疗、消费、航空航天、金融、能源等行业；企业级任务侧重纵向深度分析（如 Starbucks 疫情前后对比、Apple AI 战略影响），行业级任务侧重横向比较（如 AWS/Azure/Google 云资本开支战）。包含中英文查询以测试跨语言能力。
- **评测指标**：
  - 主观评测（LLM-as-a-Judge，Gemini 3 Pro）：总分 100，分 Data（35）、Analysis（35）、Presentation（30）三个维度，涵盖 Richness、Authority、Entity Completeness、Insightfulness、Structural Logic、Multilingual、Professionalism、Expressiveness 等子项。
  - 客观语言指标：Fog Index、Flesch-Kincaid Grade、Max Dependency Depth、Distinct-3、MTLD。
  - 每次评测运行 5 次取平均。
- **对比基线（3 类共 10 个）**：
  - LLM + 搜索工具：DeepSeek-V3.2、GPT-5.1、Claude Sonnet 4.5。
  - 开源智能体框架：GPT-Researcher、OpenManus、DeerFlow。
  - 闭源商业深度研究系统：Gemini DeepResearch、GPT Deep Research、Grok DeepSearch、Perplexity Research。
- **实现细节**：以 Gemini 2.5 Flash 和 Pro 为骨干模型，集成金融 API（Finnhub、Alpha Vantage、FMP）与通用检索 API（Tavily）。

## 4. 资源与算力

- **论文未明确披露**所用 GPU 型号、数量或训练时长。由于该工作属于**推理/智能体编排类研究**（非模型训练），主要依赖 Gemini 2.5 Flash/Pro 等商业 API 与外部检索 API，因此不涉及自训练算力。
- 文中提到：单次研究运行需 **12 分钟以上**，并随研究复杂度增加直至触及最大上限。
- 局限部分也承认：演化认知架构的复杂性与严格的事实验证流程导致**显著的 token 消耗**，限制了在更大规模数据集上评测的可行性。
- **评价**：算力/成本信息的披露不充分，读者难以评估其经济可行性与可复现性。

## 5. 实验数量与充分性

实验组数较为丰富，大致包括：

- **主实验（RQ1）**：在 2 个粒度（企业级、行业级）上与 10 个基线对比（Table 1）。
- **逻辑链抽取量化（Table 2）**：对 4 个基线做多跳探索深度的客观交叉验证。
- **语言学特征分析（Table 3）**：与 Gemini SOTA 对比 Fog Index、FK-Grade、Max Dep. Depth、Distinct-3。
- **推理能力消融（RQ2）**：CoT (V1) vs ToT (V2) vs Dy-GoT (V3)，含认知覆盖度、复杂度构成、t-SNE 语义空间分析（Figure 3）。
- **DIK 策略消融（RQ3）**：Raw Data → Extracted Facts → Validated Facts 三档对比，覆盖 Unique Info、Recall、Faithfulness、Cite Accuracy、Info Density（Figure 4）。
- **SCM 消融（RQ4）**：TCPM 在 4 种骨干模型上的影响（Table 4）；ERIM 对生成质量的影响（Table 5）。
- **深度—效用均衡分析**：边际知识增益 vs 冗余率，确定最优停止点 d=3（Figure 5）。

**充分性与客观性评估**：
- 优点：覆盖了主效果、组件消融、客观指标交叉验证、语义空间可视化等多个层面；采用 5 次重复取平均以降低随机性；引入逻辑链抽取和语言学指标来对冲 LLM-as-Judge 的风格偏差，体现了较好的方法论自觉。
- 不足：数据集仅 20 个目标，规模偏小（作者以"资源消耗极高"为由解释）；评测器 Gemini 3 Pro 本身也是同类模型，可能存在自偏好偏差；对"客观公平性"的论证虽有努力但仍有局限。

## 6. 主要结论与发现

- **整体性能**：Cogito 在企业级（95.2）和行业级（96.7）均达到 SOTA，显著优于最强的开源基线 GPT-Researcher，并超过闭源商业 SOTA Gemini DeepResearch。
- **深度推理优势**：在企业级纵向分析中，Cogito 有 **16.4%** 的逻辑链达到深度 ≥4，是 Gemini（7.6%）的两倍以上，证实 ECM 有效驱动了更深探索。
- **行业级深度的边界**：在需要横向广度比较的行业任务中，Cogito 深度有界，作者归因于**基础设施差距**（公共搜索 API 召回上限低于 Gemini 专有搜索引擎）而非算法缺陷。
- **语言学特征**：Cogito 的 FK-Grade 达 14.8（Gemini 为 12.8），Max 句法依存深度 16.67（Gemini 15.50），表明其优先追求结构严谨与句法复杂度，而非迎合 LLM 评判者偏好的流畅可读性。
- **DIK 发现**：从原始数据到事实抽取使信息密度从 0.180 跃升至 0.911，但会引发"压缩性幻觉"，Faithfulness 降至 0.684；加入事实核查后 Faithfulness 回升至 0.769，引用准确率达 0.888。
- **SCM 发现**：TCPM 提升指令构建质量，对小参数模型有"性能补偿效应"；ERIM 移除会导致词汇多样性（MTLD）下降 10.2%、FK-Grade 下降 0.16、领域深度评分从 4.8 降至 4.7。
- **均衡点**：最优认知停止点 d=3，此后新洞察递减而冗余上升。

## 7. 优点

- **理论驱动的设计**：将 DPT、Berrypicking 模型、TMS 三大认知科学理论系统性地转化为可执行机制，理论—方法—实现链条完整。
- **动态拓扑创新**：Dy-GoT 用有限状态机 + 演化算子实现了"信息驱动的拓扑变异"，突破了以往动态变体仅限封闭范围优化的局限，是相对 CoT/ToT/GoT 的实质性推进。
- **四智能体分工明确**：Researcher/Tool/DIK/Writer 的职责划分清晰，且 DIKAgent 的"抽取—验证—融合"与 WriterAgent 的自底向上写作形成了可追溯的证据链。
- **评测维度多元**：主观 LLM 评分 + 客观语言学指标 + 逻辑链抽取交叉验证，有效缓解了单一 LLM-as-Judge 的风格偏差问题。
- **分析深入**：不仅报告总分，还做了 t-SNE 语义空间、深度—效用权衡等细粒度分析，并诚实讨论了行业级任务中的不足及其原因。
- **伦理与风险意识**：明确声明工具定位（增强而非替代人类分析师），并说明数据合规使用。

## 8. 不足与局限

- **数据集规模小**：仅 20 个研究目标，作者归因于演化架构的高 token 消耗，但这限制了统计显著性与泛化结论的强度。
- **算力/成本披露不足**：未说明 GPU 型号、数量、训练时长；单次运行 12+ 分钟与高 token 消耗意味着实际部署成本可能很高。
- **检索基础设施瓶颈**：依赖公共搜索 API（Tavily 等），召回上限低于商业搜索引擎，导致行业级广度任务受限——这既是技术限制也是可复现性障碍。
- **评测偏差风险**：LLM-as-Judge 使用 Gemini 3 Pro，而被对比的强基线之一恰是 Gemini DeepResearch，存在潜在自偏好或同源偏差；虽有客观指标对冲，但覆盖仍有限。
- **主观指标解释**：作者将 Gemini 在 Insightfulness 上的优势解释为"风格偏差"，这一归因虽有逻辑链证据支持，但仍带有一定主观性。
- **泛化性未验证**：未来工作才计划用 ERIM 扩展到其他领域的开放报告任务，当前结论主要限于金融领域。
- **动态机制的稳定性风险**：演化式拓扑虽灵活，但可能带来不可预测的探索路径与结果稳定性问题，文中未充分讨论。
- **基线时效性存疑**：所对比的部分模型（如 GPT-5.1、DeepSeek-V3.2）版本标注偏新，需注意其可复现性。

（完）
