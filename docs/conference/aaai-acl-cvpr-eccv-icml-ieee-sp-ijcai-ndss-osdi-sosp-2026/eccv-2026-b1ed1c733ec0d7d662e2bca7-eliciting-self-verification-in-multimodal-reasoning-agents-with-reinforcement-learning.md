---
title: Eliciting Self-Verification in Multimodal Reasoning Agents with Reinforcement Learning
title_zh: 用强化学习激发多模态推理智能体的自验证能力
authors: "Vishwas Sathish, Viresh Ranjan, Xinliang Zhu, Arnab Dhua, Douglas Gray"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://media.eventhosts.cc/Conferences/ECCV2026/pdfs/11206.pdf"
tags: ["query:fin-mm-agent"]
score: 5.0
evidence: 训练多模态智能体自验证检索证据的强化学习框架
tldr: 推理智能体常依赖网络搜索等外部工具，但多模态智能体的可靠工具使用仍具挑战，需在文本与图像间整合噪声检索证据，且监督稀疏。本文提出SVRL，一种纯强化学习微调框架，训练多模态智能体在自身推理轨迹中验证并过滤检索证据。该方法减少对外部验证器的依赖，提升了工具增强多模态推理的可靠性。
source: ECCV-2026-Accepted-Program
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-b1ed1c733ec0d7d662e2bca7/fig-001.webp\", \"caption\": \"\", \"page\": 2, \"index\": 1, \"width\": 512, \"height\": 512}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-b1ed1c733ec0d7d662e2bca7/fig-002.webp\", \"caption\": \"\", \"page\": 2, \"index\": 2, \"width\": 838, \"height\": 640}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-b1ed1c733ec0d7d662e2bca7/fig-003.webp\", \"caption\": \"\", \"page\": 2, \"index\": 3, \"width\": 826, \"height\": 678}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-b1ed1c733ec0d7d662e2bca7/fig-004.webp\", \"caption\": \"\", \"page\": 2, \"index\": 4, \"width\": 960, \"height\": 960}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-b1ed1c733ec0d7d662e2bca7/fig-005.webp\", \"caption\": \"\", \"page\": 2, \"index\": 5, \"width\": 476, \"height\": 470}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-b1ed1c733ec0d7d662e2bca7/fig-006.webp\", \"caption\": \"\", \"page\": 7, \"index\": 6, \"width\": 3840, \"height\": 2160}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-b1ed1c733ec0d7d662e2bca7/fig-007.webp\", \"caption\": \"\", \"page\": 13, \"index\": 7, \"width\": 957, \"height\": 1116}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-b1ed1c733ec0d7d662e2bca7/fig-008.webp\", \"caption\": \"\", \"page\": 14, \"index\": 8, \"width\": 724, \"height\": 353}, {\"url\": \"assets/figures/eccv-2026-accepted-program/eccv-2026-b1ed1c733ec0d7d662e2bca7/fig-009.webp\", \"caption\": \"\", \"page\": 14, \"index\": 9, \"width\": 875, \"height\": 672}]"
motivation: 多模态智能体工具使用需整合噪声检索证据，监督稀疏且难验证。
method: 提出纯RL微调框架SVRL，在推理轨迹中自验证并过滤检索证据。
result: 减少对外部验证器的依赖，提升工具增强多模态推理可靠性。
conclusion: 为多模态推理智能体的自验证与可靠工具使用提供训练方案。
---

## Abstract
Reasoning agents increasingly rely on external tools such asweb search to answer complex queries. Reinforcement learning (RL) fine-tuning algorithms such as GRPO have improved long-form reasoningin text-only language models, particularly for coding and mathematics.Reliable tool use in multimodal agents, however, remains challengingbecause models must interpret text and images while integrating noisyretrieved evidence, often under sparse outcome-level supervision withoutexplicit verification signals. We present Self-Verification via Reinforce-ment Learning (SVRL), an RL-only finetuning framework that trainsmultimodal agents to verify and filter retrieved evidence within theirown reasoning traces, reducing reliance on external verifiers at infer-ence time. SVRL also introduces a search-aware penalty that discour-ages unnecessary tool calls and a query-diversity reward that encouragesdiverse, well-formed search queries, providing fine-grained feedback onwhen and what to search. Finetuning Qwen-2.5-VL-7B with SVRL ononly 5,000 visual question answering examples yields consistent gainsin multi-hop VQA generalization and tool efficiency across benchmarks.Overall, SVRL narrows the gap between compact agents and much largerproprietary models while requiring substantially lower training and in-ference cost.

---

## 论文详细总结（自动生成）

# 论文总结：Eliciting Self-Verification in Multimodal Reasoning Agents with Reinforcement Learning (SVRL)

## 1. 核心问题与研究动机

- **背景趋势**：推理智能体日益依赖网络搜索等外部工具来回答复杂问题；GRPO 等强化学习（RL）微调算法已在纯文本语言模型（代码、数学）的长程推理上取得显著进展。
- **核心挑战**：多模态智能体的可靠工具使用仍十分困难，原因在于：
  - 模型需同时理解文本与图像，并整合**带噪声的检索证据**；
  - 监督信号通常是**稀疏的结果级奖励**，缺乏显式的验证信号。
- **三类具体失败模式**（基于对 MMSearch-R1 在 FVQA 2,000 例上的分析）：
  1. **工具调用校准差**：需要搜索却未调用（>10%），无需搜索却调用（>30%）。
  2. **工具输出噪声大且缺乏过滤**：近 45% 检索结果不相关；即便返回了相关证据，仍有 >28% 的情况答错。
  3. **稀疏监督导致信用分配脆弱**：所有 rollout 共享相同奖励时，GRPO 组内方差坍缩，优势估计失效；19.5% 的文本搜索查询不相关。
- **研究目标**：以多跳视觉问答（VQA，如 InfoSeek、OK-VQA、FVQA）为具体场景，研究工具增强的多模态推理，并提出一种不依赖推理期外部验证器的自验证机制。

## 2. 方法论（SVRL）

- **核心思想**：提出 **Self-Verification via Reinforcement Learning (SVRL)**——一种**纯 RL 微调框架**，训练多模态智能体在自身推理轨迹中显式验证并过滤检索证据，将"何时搜索、搜什么、信什么"变为可学习的轨迹级信号。
- **基础设置**：
  - 将 VQA 建模为策略优化问题：策略 πθ 生成轨迹 τ = (s₁:ₜ, y)，每步 sₜ = (lₜ, aₜ, pₜ)，包含 `<reason>` 推理与工具动作（含参数）。
  - 基于 **GRPO** 优化，使用组内标准化优势与 PPO 裁剪目标，并加 KL 正则约束到参考策略。
  - 基础奖励形式：`r_base = (1-α)·r_acc·r_search + α·r_fmt`。

- **关键技术细节（三项贡献）**：

  **(1) 搜索校准（何时搜索）——search-aware 惩罚**
  - 用预训练模型作为"弱能力先验"：对每个 (I,q) 先做一次**无工具**前向推理，若答案正确则标记为 `search_free`。
  - 在 `search_free` 实例上调用搜索工具时，对轨迹降权：`r_aware = λ_sa (0.1) 若 search_free 且调用了搜索，否则 1`。
  - 替换掉基线中"一刀切"的搜索惩罚，避免抑制必要搜索。

  **(2) 查询多样性（搜什么）——query-count 因子**
  - 提示模型在一次推理步骤中提出 k 个候选查询，随机执行一个合法且唯一的查询。
  - 定义 `r_count = 1`（无文本搜索）或 `max(ε, k̂/k)`（有搜索，k̂ 为合法唯一查询数），乘性注入任务项，鼓励生成多样、具体的查询。

  **(3) 证据过滤——自验证（Self-Verification）**
  - 智能体对检索到的条目输出结构化的**二值有用性向量**（如 `<verify>0,1,0,1</verify>`）及简短理由。
  - 训练期使用外部验证器（GPT-5，可访问真值 y*）为查询和片段打标签，得到两个对齐因子：
    - `r_qalign`：智能体查询提议与验证器"哪些查询有用"标签的一致度；
    - `r_salign`：智能体片段自评分与验证器"哪些片段含答案支撑证据"标签的一致度。
  - 组合得到：`r_svrl = r_aware · r_count · r_qalign · r_salign`。
  - **最终奖励**：`r(τ) = (1-α)·r_acc(τ)·r_svrl(τ) + α·r_fmt(τ)`，**乘性门控**（仅当答案正确才给予细粒度信号）以防止奖励劫持。
  - **推理期丢弃外部验证器**，由智能体自行完成验证与过滤。

- **训练稳定性与效率**：
  - 采用 **Dr. GRPO** 移除更新中的标准差与长度归一化，缓解梯度尖峰与响应长度漂移。
  - 因 `r_svrl` 增加了组内奖励离散度，可使用更小的组大小 **G=4**（对比 MMSearch-R1 的 G=8），提升单节点吞吐。
  - 拒绝使用 LLM-judge 作为训练奖励（易导致冗长、模棱两可的回答），仅在评估时使用。

- **算法流程（Algorithm 1）**：① 自标注 search_free 标签 → ② 采样 rollout → ③ 解析答案/工具参数/自验证向量 → ④ 获取训练期验证器标签 → ⑤ 计算 r_svrl 与最终奖励 → ⑥ 用组优势 + Dr. GRPO 更新 θ。

## 3. 实验设计

- **训练数据**：FVQA（Factual VQA），5,000 条训练样本（混合直接回答与多跳问题，避免 RL 退化为"每题必搜"）。
- **评估数据集**：
  - **分布内**：FVQA-test（1,800 例）、InfoSeek（与 FVQA 同源同任务）。
  - **分布外（OOD）**：LiveVQA、MMSearch、SimpleVQA（查询风格与检索条件不同）。
- **Benchmark 与指标**：准确率 Acc（%）（GPT-5 LLM-judge 判定，与 MMSearch-R1 协议一致）与搜索率 SR（%）。
- **对比方法**：
  - **Direct Answer**：Qwen-2.5-VL-7B/32B/72B、GPT-4o（单次预测，SR=0）。
  - **RAG Workflow**：上述模型全部检索（SR=100%）。
  - **Adaptive Search**：MMSearch-R1++（ReAct 提示的复现基线）、SVRL-full-7B。
- **消融实验（表 1）**：MMSearch-R1、MMSearch-R1++、SVRL-query-align、SVRL-llm-judge、SVRL-search-aware、SVRL-ttv（测试时外部验证）、SVRL-self-verification、SVRL-full。
- **工具与实现**：Google Image Search 与 Google 文本搜索（第三方 API），DynamoDB 缓存检索结果；ReAct 风格系统提示；答案评判使用 GPT-5。

## 4. 资源与算力

- **GPU**：8 × A100 单节点。
- **框架**：PyTorch + Ray + veRL。
- **训练配置**：400 步训练，batch size 32，group size 4，多轮工具使用轨迹；训练曲线为 3 个随机种子的均值 ± 1 标准差。
- **未明确说明**：论文**未报告具体训练时长、总 GPU 小时数或能耗**；也未给出单次推理的延迟/成本量化数据（仅定性提及降低部署成本与延迟）。

## 5. 实验数量与充分性

- **实验规模**：
  - 表 1：2 个数据集（FVQA-test、InfoSeek）上的 8 种方法消融。
  - 表 2：5 个数据集 × 3 类范式（Direct / RAG / Adaptive）× 多个模型规模的横向对比。
  - 图 4：训练动态（准确率、工具使用率、梯度范数、响应长度）共 4 组曲线，3 个种子。
  - 图 5：工具使用分析（过度自信率、证据提取失败率、搜索精确率/召回率）共 4 组。
  - 图 6：测试时扩展（256 例 FVQA-test 子集，最多 15 路并行搜索 + 多数投票）。
  - 图 7：定性多跳案例（含正确与错误案例）。
- **充分性与公平性**：
  - **优点**：消融覆盖每个组件；同时评估分布内与分布外泛化；对比了同规模开源模型、更大规模开源模型（32B/72B）和 GPT-4o；多种子报告方差；采用与先前工作一致的评判协议，便于横向比较。
  - **局限**：测试时扩展实验仅在 256 例子集上进行，规模有限；SimpleVQA 上的增益较小，提示行为对工具参数（如查询语言）敏感；部分对比（如 RAG 基线）采用不同的 SR 设定，准确率-成本权衡的解读需谨慎。

## 6. 主要结论与发现

- **性能提升**：SVRL-full-7B 相比最强自适应搜索基线 MMSearch-R1++，在 FVQA-test 上约 **+8 分**、InfoSeek 上约 **+9 分**，同时**降低搜索率**，实现更好的准确率-成本权衡。
- **逼近大模型**：7B 规模下在 FVQA-test 上达到 **65.3% vs GPT-4o 66.0%**，显著缩小与专有大模型的差距。
- **消融结论**：
  - 搜索校准（search-aware）与自验证是主要增益来源；
  - 测试时外部验证（SVRL-ttv）带来大幅提升，证明**证据选择是主要失败模式**；
  - 自验证训练可**恢复大部分去噪收益**，且推理期无需外部验证器；
  - 单独使用 query-align 会导致模型"每题必搜"（SR 达 97.6%），加入 search-aware 后缓解。
- **行为变化**（图 5）：SVRL 降低搜索遗漏导致的过度自信失败（12.6%→2.7%），提升搜索精确率（89.9%→97.7%）与召回率（54.6%→70.8%），并降低证据提取失败率（30.1%→37.0% 的对比显示更善于利用已检索证据）。
- **测试时扩展**：SVRL 随搜索预算增加持续受益，而基线约在 5 次搜索后饱和，说明其查询多样性与证据过滤更可靠。
- **训练稳定性**：SVRL 相比基线梯度更稳定、响应长度更可控，且可用更小的 group size 完成训练。

## 7. 优点（亮点）

- **纯 RL 框架、推理期零外部验证器**：将验证能力内化到模型推理轨迹中，降低部署成本与延迟，适合资源受限场景。
- **乘性门控的奖励设计**：通过 `r_acc ·

`r_svrl` 的门控形式，只有答案正确时细粒度信号才生效，避免模型通过"刷格式分"或"刷验证分"而劫持奖励；这是多目标 RL 中较为稳健的做法。
- **对失败模式的诊断驱动设计**：三项组件（search-aware、query-count、self-verification）分别对应前文量化出的三类失败（工具调用校准差、检索噪声大、稀疏监督下信用分配难），方法论与实证分析高度闭环，说服力强。
- **训练效率优化**：引入 Dr. GRPO 去除标准差与长度归一化，配合更小的 group size（G=4）即可获得组内奖励离散度，单节点吞吐优于基线，工程可复现性较好。
- **推理期零外部验证器**：相比 SVRL-ttv 需要在测试时调用 GPT-5 做片段筛选，SVRL 把验证能力蒸馏进策略本身，部署时无额外 API 依赖，这是论文最核心的实用价值。
- **评估协议与先前工作对齐**：沿用 MMSearch-R1 的 LLM-judge 与 Acc/SR 双指标，便于与既有方法直接比较；同时报告分布内与分布外结果，泛化证据较完整。
- **行为层面分析细致**：图 5 对过度自信率、证据提取失败率、搜索精确率/召回率的分解，揭示了"准确率提升来自哪里"，比单纯报总分更有解释力。

## 8. 局限与不足

- **依赖训练期外部验证器（GPT-5 + 真值）**：虽然推理期不需要，但训练仍需可访问答案的外部强模型生成 `r_qalign` / `r_salign` 标签。这既带来成本，也可能引入教师模型的偏见；论文未量化该标注开销，也未讨论若验证器能力弱于策略时的退化情形。
- **奖励超参与乘性结构的敏感性**：`λ_sa=0.1`、`ε`、α 等均为经验设定，乘性门控虽然稳健，但任一因子接近 0 都会使整条轨迹失去梯度信号，论文缺少对超参的敏感性分析。
- **OOD 增益不均衡**：在 SimpleVQA 上提升有限，作者归因于查询语言/风格差异，但未给出针对性实验（如强制中文查询的消融），说明方法的跨域鲁棒性仍有边界。
- **测试时扩展实验规模偏小**：仅 256 例、最多 15 路搜索，且未报告延迟与 token 成本的量化曲线，"准确率-成本"的结论更多是定性趋势。
- **算力与效率信息缺失**：未报告总 GPU 小时、训练时长、推理延迟与 API 调用次数，复现与横向成本比较受限。
- **仅验证于 VQA 场景**：方法声称通用，但实验全部集中在多跳视觉问答，未在纯文本推理、代码或机器人工具使用等其他工具增强任务上验证，外推性有待检验。
- **基线复现差异**：MMSearch-R1++ 为作者复现，SR 设定与 RAG 基线不同，部分对比的公平性需要读者谨慎解读。

## 9. 启示与展望

- **"验证能力可被 RL 内化"**：论文最有力的证据是 self-verification 训练能恢复大部分测试时外部验证的收益，这为"用强验证器蒸馏弱策略"提供了一条轻量路径，可推广到其他需要证据筛选的检索增强任务。
- **奖励设计范式**：以 `r_acc` 作门、以任务分解因子作乘性细粒度信号的组合方式，为稀疏结果奖励下的信用分配提供了一种可行模板——不必设计复杂的逐步骤奖励，而是把"诊断出的失败模式"编码为可计算的因子。
- **失败模式驱动的评测视角**：将"何时搜、搜什么、信什么"拆为三个可量化维度并分别用 Acc/SR/精确率-召回率度量，比单一准确率更能定位瓶颈，值得同类工作借鉴。
- **后续方向**：(1) 用更弱的验证器或自洽性替代 GPT-5 降低训练成本；(2) 探索验证能力的跨任务迁移；(3) 引入延迟/成本感知的奖励项，做真正的效率-准确率帕累托优化；(4) 在更多模态与工具（如图像编辑、代码执行）上验证通用性。

## 10. 总体评价

SVRL 是一篇**问题诊断清晰、方法设计闭环、工程实现扎实**的工作。其核心贡献不在于提出全新的 RL 算法，而在于把多模态工具智能体的三类实证失败（搜索校准、查询多样性、证据过滤）逐一转化为可微调的奖励因子，并通过乘性门控与 Dr. GRPO 保证训练稳定，最终实现"训练时借力外部验证器、推理时完全自给"的目标。7B 模型逼近 GPT-4o、同时在更低的搜索率下取得更好准确率的结论具有较强的实践意义。主要短板在于对训练期外部验证器的依赖、超参敏感性分析不足、成本量化缺失以及实验场景相对单一。总体而言，论文为"如何用 RL 让多模态智能体学会自我验证"提供了一个有说服力的基线，也为后续在效率、通用性与低成本验证器方向上的研究留出了明确空间。

（完）
