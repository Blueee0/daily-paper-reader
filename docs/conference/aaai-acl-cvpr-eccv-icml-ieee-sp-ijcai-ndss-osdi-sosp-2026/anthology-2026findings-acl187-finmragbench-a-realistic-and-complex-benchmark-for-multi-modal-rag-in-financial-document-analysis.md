---
title: "FinMRAGBench: A Realistic and Complex Benchmark for Multi-Modal RAG in Financial Document Analysis"
title_zh: FinMRAGBench：面向金融文档分析的现实复杂多模态RAG基准
authors: "Shouqing Yang, Qi Zhang, Yuhang Yang, Ruikang Xu, Yuwei Hou, Zhulin Jia, Lirong Gao, Haobo Wang, Jinglei Chen, Jiexiang Wang, Sheng Guo, Bo Zheng, Gang Chen"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.findings-acl.187.pdf"
tags: ["query:fin-mm-agent"]
score: 10.0
evidence: 面向金融文档分析的多模态RAG基准与智能体
tldr: 现有基准无法刻画跨文档检索、多页证据整合等真实金融分析场景。本文提出FinMRAGBench，基于大规模真实年报构建887条专家校验问答，覆盖五类金融分析任务，并要求跨页跨文档证据整合。同时提出FinMRAGAgent智能体。该基准为金融多模态检索增强与文档理解评测提供了更贴近现实的平台。
source: ACL-2026-Findings
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl187/fig-001.webp\", \"caption\": \"\", \"page\": 1, \"index\": 1, \"width\": 512, \"height\": 512}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl187/fig-002.webp\", \"caption\": \"\", \"page\": 4, \"index\": 2, \"width\": 550, \"height\": 781}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl187/fig-003.webp\", \"caption\": \"\", \"page\": 4, \"index\": 3, \"width\": 549, \"height\": 635}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl187/fig-004.webp\", \"caption\": \"\", \"page\": 4, \"index\": 4, \"width\": 619, \"height\": 588}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl187/fig-005.webp\", \"caption\": \"\", \"page\": 4, \"index\": 5, \"width\": 512, \"height\": 512}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl187/fig-006.webp\", \"caption\": \"\", \"page\": 4, \"index\": 6, \"width\": 486, \"height\": 342}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl187/fig-007.webp\", \"caption\": \"\", \"page\": 4, \"index\": 7, \"width\": 394, \"height\": 559}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl187/fig-008.webp\", \"caption\": \"\", \"page\": 4, \"index\": 8, \"width\": 1184, \"height\": 668}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl187/fig-009.webp\", \"caption\": \"\", \"page\": 4, \"index\": 9, \"width\": 561, \"height\": 794}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl187/fig-010.webp\", \"caption\": \"\", \"page\": 5, \"index\": 10, \"width\": 512, \"height\": 512}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl187/fig-011.webp\", \"caption\": \"\", \"page\": 5, \"index\": 11, \"width\": 512, \"height\": 512}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl187/fig-012.webp\", \"caption\": \"\", \"page\": 29, \"index\": 12, \"width\": 576, \"height\": 370}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl187/fig-013.webp\", \"caption\": \"\", \"page\": 30, \"index\": 13, \"width\": 1000, \"height\": 600}]"
motivation: 现有基准难以反映跨文档检索与多页证据整合的真实金融分析。
method: 基于真实年报构建多模态RAG基准，并训练FinMRAGAgent智能体。
result: 数据集含887条专家校验问答，覆盖五类金融分析任务。
conclusion: 为金融多模态文档分析与RAG提供现实且复杂的评测基准。
---

## Abstract
Retrieval-augmented generation (RAG) has become a widely adopted paradigm for realistic financial analysis over financial documents. However, existing benchmarks fail to capture realistic financial analysis settings that involve cross-document retrieval, multi-page evidence integration, and diverse analytical tasks. To address this gap, we introduce FinMRAGBench , a comprehensive multi-modal financial RAG benchmark in which most questions require retrieving evidence scattered across multiple pages and documents, constructed from large-scale real-world annual reports and comprising 887 expert-verified QA pairs spanning five representative financial analysis tasks. Moreover, we introduce FinMRAGAgent , an agent trained on high-quality agentic trajectories following the reasoning-and-acting (ReAct) paradigm, capable of dynamic tool invocation and multi-step financial analysis. Our extensive experiments show that current multi-modal RAG systems still struggle with incomplete retrieval and complex financial reasoning. In contrast, FinMRAGAgent achieves the strongest overall performance across all models, demonstrating that our structured reasoning approach significantly enhances multi-modal RAG in realistic financial scenarios. The code and data are available at https://github.com/sqyangit/FinMRAGBench.

---

## 论文详细总结（自动生成）

# FinMRAGBench 论文中文总结

## 1. 核心问题与研究动机

- **背景**：检索增强生成（RAG）已成为金融文档分析的主流范式，可缓解幻觉并融合外部知识；金融年报本身篇幅长、信息密度高，且同时包含**文本、表格、图表**等异构模态，检索准确性直接关系到投资决策、合规与风控。
- **核心问题**：现有金融 RAG 基准无法刻画真实分析场景，具体缺陷包括：
  - **仅文本检索**：如 FinAgentBench、OmniEval 忽略图表等关键视觉信息。
  - **Oracle 设定**：如 FinChart-Bench、FinMME 直接给定上下文，绕过了端到端检索评测。
  - **单页/邻页证据**：如 FinRAGBench-V 虽兼顾多模态与检索，但多数问题只需单页或相邻页证据。
  - **任务类型狭窄**：多集中于数值计算与二分类事实核验，未覆盖金融分析师的完整工作流。
- **整体含义**：作者提出 **FinMRAGBench**（现实、复杂的多模态金融 RAG 基准）与 **FinMRAGAgent**（基于 ReAct 范式、经高质量智能体轨迹训练的智能体），旨在推动真实跨文档、多页、多模态金融分析能力的评测与提升。

## 2. 方法论

### 2.1 FinMRAGBench 基准构建

- **真实语料**：取自 SEC EDGAR 的公开年报，723 份文件、96,549 页，覆盖 127 家上市公司、10 个 GICS 行业、近五年；每页附带结构化元数据（industry / company / filing year），支持层级检索与过滤。
- **五大任务族（16 个细分子类）**：
  - 可解释事实核验（FV，17.5%）：数值核验 / 文本核验，输出 Supported / Refuted / Insufficient + 解释。
  - 数值推理（NR，24.0%）：多跳推理、计算、比较、排序。
  - 表格生成（TG，20.6%）：指标计算、信息抽取，输出 Markdown 表。
  - 图表生成（CG，20.5%）：饼图/柱状图/折线图/散点图等，输出可执行 Python 代码。
  - 知识密集型推理（KR，17.4%）：文本/表格/图表/混合证据的长文分析。
- **证据引导式 QA 生成流程**：
  1. 金融专家依据真实分析实践（时序分析、同业横截面对比、比率分析、共同比结构分析、长期趋势、预算-实际差异、盈利-现金流联动）跨文档、跨非邻接页挑选证据片段；
  2. 用 GPT-4o + 任务专用提示生成候选问答；
  3. 人工按**相关性、完整性、可行性、清晰性、上下文独立性**五准则审核，并做**往返一致性验证**（问题确实依赖该证据、证据足以回答）；
  4. 答案由 GPT-4o 初生成后，经至少两名金融专家校验，多阶段协议 + 互标注一致性统计。
- **难度工程化设计**：文档结构/语义高度相似、跨页跨文档检索（88.73% 需多非邻接页，75.20% 需跨文档）、多模态对齐、多步推理（专家轨迹平均 7.49 个交互步）。
- **规模**：最终得到 **887 条专家校验问答**，每条标注证据页。

### 2.2 FinMRAGAgent

- **智能体轨迹（ReAct 式）**：轨迹表示为 τ = {(t_j, a_j, o_j)}_{j=1}^{L}，其中 t_j 为内部推理，a_j ∈ {search, python, answer} 为动作，o_j 为环境观测；交互协议含 `<think>`、`<search>`、`<python>`、`<answer>` 四类结构步。
- **轨迹质量过滤三准则**：①最终答案正确性；②逐步推理一致性（工具调用与观测需与推理上下文对齐）；③复杂度感知筛选（保留推理链更长、显式调用工具的轨迹）。共构造约 **6K 条**高质量训练轨迹。
- **训练目标（SFT）**：以多模态图像 I、问题 q 与交互历史为条件，逐 token 最大化目标序列对数似然：
  - max_θ Σ_i Σ_j log p_θ(y_j^(i) | I^(i), q^(i), t_(<j)^(i), a_(<j)^(i), o_(<j)^(i))。
- **推理过程**：维护压缩的推理状态 s_j = φ(I, q, t_≤j, a_<j, o_<j)；按策略选动作 a_j = argmax_{a∈A} π_θ(a|s_j)；执行动作后由环境返回观测并更新状态 s_{j+1} = φ_upd(s_j, a_j, o_j)；直到选择 `answer` 终止。
- **粗到细检索（C2F）**：
  - 粗阶段用元数据约束缩小空间：P_coarse(q) = { p | m(p) ∈ M(q) }；
  - 多模态检索器（如 ColQwen2）编码查询与页面取 top-k；
  - 细阶段用查询感知相关性打分器 S_fine(p, q) = f_φ(p, q) 重排并筛选最相关页面送入生成。
- **Algorithm 1** 给出完整推理流程：交替进行推理生成、动作预测、检索/计算、证据集增量更新，直至输出答案。

## 3. 实验设计

- **数据集/场景**：FinMRAGBench（887 QA，五任务、跨页跨文档、多模态），检索语料 96,549 页。
- **检索器对比（3 个）**：ColPali、VisRAG-Ret、ColQwen2（另加本文 C2F 增强版）。
- **生成器对比（15 个多模态大模型）**：
  - 开源：Qwen2.5-VL-7B/32B/72B、Qwen3-VL-4B/8B/32B、MiniCPM-V-4.5、InternVL3.5-8B/38B；
  - 闭源：GPT-4o、GPT-5.1、Gemini-2.5-Flash、Gemini-2.5-Pro、Claude-3.5-Sonnet、Claude-4.5-Sonnet。
- **高级 RAG 基线**：Vanilla RAG、ReAct 式 IRCOT、多智能体视觉文档 RAG 的 ViDoRAG（用 GPT-5.1）、以及 FinMRAGAgent。
- **指标**：
  - 检索：Recall@10；
  - 生成：FV/KR 用 LLM 评判分 LJS + 高质量率 HQR；NR 用 F1 + LJS/HQR；TG 用 RMS Precision/Recall（基于匈牙利算法对齐 + 相对误差）；CG 用代码可执行率 ECR 与 PASS@1。
- **附加受控实验**：Oracle（给金标证据页）作为上界、Direct Generation（无检索，仅参数知识）作为数据泄漏 sanity check、检索策略对比、模型规模对比（8B vs 32B）、推理时延对比、人机一致性分析。

## 4. 资源与算力

- **推理部署**：开源模型使用 **vLLM 在 8 张 NVIDIA A100 GPU** 上部署；闭源模型走官方 API；生成温度设为 0，最大生成 token 8,196。
- **训练**：使用 **LLaMA-Factory** 对 Qwen3-VL-8B-Instruct 做全量 SFT；最大图像分辨率 262,144 像素；cosine 退火调度，初始学习率 1e-5，训练 **3 个 epoch**，约 6K 轨迹；32B 版本用 **LoRA SFT**。
- **效率测量**：单张 A100 GPU 上测每样本平均推理时延（Vanilla 5.19s、IRCOT 22.54s、FinMRAGAgent 12.92s）。
- **未明确说明**：论文未给出总 GPU 小时数、训练墙钟时长、具体显存占用等细粒度算力开销，仅给出硬件型号与训练超参。

## 5. 实验数量与充分性

- **实验组数概览**：
  - 主实验：15 个生成模型 × 5 任务 + 3 个高级 RAG 方法（表 2）；
  - 检索：4 种检索配置 × 5 任务（表 3）+ 4 种检索策略 × 5 任务（表 7）；
  - 消融：粗到细检索的 HR / HR+PS 两阶段（表 4）；
  - 工具使用消融：有/无 SFT（表 5）；
  - 受控设置：Oracle 与 Direct Generation（表 6，含 GPT-5.1、GPT-4o、Qwen3-VL-8B、Qwen3-VL-8B-Thinking、Qwen2.5-VL-7B）；
  - 模型规模：8B 全量 SFT vs 32B LoRA SFT（表 8）；
  - 效率：3 种方法（表 9）；
  - 可靠性：互标注一致性（50 样本，Cohen's κ=0.6269）、人机一致性（50 样本，二次加权 κ=0.9112，表 12）；
  - 案例研究：检索偏差、工具使用效率、五类任务示例（图 9–16）。
- **充分性评价**：
  - **较充分**：覆盖检索/生成/端到端多
