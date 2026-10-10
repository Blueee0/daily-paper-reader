---
title: What Factors Affect LLMs and RLLMs in Financial Question Answering?
title_zh: 哪些因素影响LLM与RLLM在金融问答中的表现？
authors: "Peng Wang, Xuesi Hu, Jiageng Wu, Yuntao Zou, Qiancheng Zhang, Dagang Li"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.findings-acl.752.pdf"
tags: ["query:fin-mm-agent"]
score: 5.0
evidence: 基于LLM与推理LLM的金融问答
tldr: 推理大模型通过长思维链提升复杂问题表现，但尚缺乏对金融领域中何种方法能充分释放其能力的系统探究。作者使用五个LLM与四个RLLM，评估提示方法、智能体框架和多语言对齐方法对金融问答任务的影响。研究发现当前提示方法与智能体框架仍存局限，为金融问答系统的构建提供了实证指引。
source: ACL-2026-Findings
selection_source: conference_retrieval
motivation: 缺乏系统研究探讨何种方法能充分释放LLM与RLLM在金融领域的问答能力。
method: 使用五个LLM和四个RLLM，评估提示方法、智能体框架与多语言对齐对金融问答的影响。
result: 发现当前提示方法与智能体框架存在明显局限，难以完全发挥模型金融推理潜力。
conclusion: 为金融问答任务中模型与方法的选型提供系统性实证参考。
---

## Abstract
Recently, large language models (LLMs) and reasoning large language models (RLLMs) have gained considerable attention from many researchers. RLLMs enhance the reasoning capabilities of LLMs through Long Chain-of-Thought (Long CoT) processes, significantly improving the performance of LLMs in addressing complex problems. However, there are few works that systematically explore what methods can fully unlock the performance of LLMs and RLLMs within the financial domain. To investigate the impact of various methods on LLMs and RLLMs, we utilize five LLMs and four RLLMs to assess the effects of prompting methods, agentic frameworks, and multilingual alignment methods on financial question-answering tasks. Our research findings indicate: (1) Current prompting methods and agent frameworks enhance the performance of LLMs in financial question answering by simulating Long CoT; (2) RLLMs possess inherent Long CoT capabilities, which limits the effectiveness of conventional methods in further enhancing their performance; (3) Current advanced multilingual alignment methods primarily improve the multilingual performance of LLMs by extending the reasoning length, which yields minimal benefits for RLLMs. Additionally, we discuss strategies for enhancing the performance of LLMs and RLLMs in financial question answering, which may serve as a inspiration for future improvements. We hope that this study can serve as an important reference for LLMs and RLLMs in the field of financial question answering.

---

## 论文详细总结（自动生成）

# 论文总结：What Factors Affect LLMs and RLLMs in Financial Question Answering?

## 1. 核心问题与整体含义

- **研究动机**：LLM 已被广泛用于金融问答，RLLM 通过 Long Chain-of-Thought（Long CoT）显著增强复杂推理能力；但现有工作多关注“如何提升金融问答性能”，较少系统探究**哪些因素真正影响 LLM 与 RLLM 在金融问答中的表现**。
- **核心问题**：论文围绕三个维度展开：
  1. 提示方法对 LLM/RLLM 的影响；
  2. 智能体框架对 LLM/RLLM 的影响；
  3. 多语言对齐方法能否提升 LLM/RLLM 的多语言金融问答能力。
- **整体含义**：作者提出，当前许多方法对 LLM 有效，本质上是在**模拟 Long CoT、延长推理链**；而 RLLM 已具备内在 Long CoT 能力，因此传统提示与智能体方法对其增益有限。该研究为金融问答中模型与方法选型提供系统性实证参考。

## 2. 方法论：核心思想与关键技术细节

- **核心思想**：在统一金融问答任务下，比较不同方法对 LLM 与 RLLM 的影响，并将效果差异主要归因于是否能够激发或延长 Long CoT。
- **任务定义**：
  - 选择题：\(A_{choice}=Model_{choice}(Q,O,C)\)，其中 \(Q\) 为问题，\(O\) 为选项，\(C\) 为上下文。
  - 开放题：\(A_{open}=Model_{open}(Q,C)\)。
- **提示方法**：
  - **Direct**：直接输入问题，不加额外思维提示。
  - **Zero-shot CoT**：使用 “let’s think step by step” 激发逐步推理。
  - **Plan-and-Solve**：先理解问题并制定计划，再逐步执行，强调两阶段分解。
- **智能体框架**：
  - **Self-Refine**：同一模型对输出进行反馈与迭代修正；为节省成本仅使用一轮迭代。
  - **S3 Agent**：从表面表达、语义信息、情感表达三个视角设置智能体，作者针对金融问答做了轻微修改但保留三核心组件。
- **多语言对齐方法**：
  - **Direct**：英文提示 + 本地语言问题，直接评估多语言能力。
  - **Translate-en**：将本地语言问题与上下文翻译成英文。
  - **Cross-lingual Prompting（CLP）**：两阶段多语言对齐，包括跨语言对齐提示与任务特定求解提示。
- **评估方式**：开放题由 GPT-4o-mini 基于正确答案进行评判；所有模型因计算约束仅单次运行。

## 3. 实验设计：数据集、Benchmark 与对比方法

- **数据集 / Benchmark**：
  - 主实验使用 **FAMMA** 的 **Basic Txt** 子集，将多模态金融问答数据经 OCR 转为文本；包含英语、中文、法语，最终评估 1,945 条数据。
  - 附加实验使用 **FAMMA-LivePro**，包含 103 道由资深金融从业者原创的问题，用于小规模验证。
- **模型设置**：
  - 5 个 LLM：Meta-Llama-3.1-8B-Instruct、GPT-4o-mini、Gemini-1.5-flash、Qwen-2.5-32B、DeepSeek-V3。
  - 4 个 RLLM：DeepSeek-R1-Distill-Qwen-32B、GPT-OSS-20B、Qwen-3-14B（thinking mode）、O4-mini。
  - 另分析 Qwen-3-4B/8B/14B 在 thinking 与 non-thinking 模式下的表现。
- **对比方法**：共 7 种代表性方法：
  - Direct、Zero-shot CoT、Plan-and-Solve、Self-Refine、S3 Agent、Translate-en、CLP。
- **评价维度**：
  - 表 1：按 Arithmetic / Non-Arithmetic，Easy / Medium / Hard，Overall 汇报。
  - 表 2：按中文、法语及总体汇报多语言表现。
  - 表 4：CLP 下不同源语言到不同目标语言的组合效果。
  - 附加分析：输出 token 消耗、推理成本、错误类型、Qwen-3 规模与 thinking 模式。

## 4. 资源与算力

- 论文**未明确说明**使用的 GPU 型号、数量、训练时长或总计算量。
- 研究以推理评估为主，未涉及模型训练或微调。
- 文中提到因“computational constraints”所有模型仅单次运行。
- 成本分析基于输出 token 消耗与 API 价格：
  - 表 3 统计不同方法的平均输出 token。
  - 表 7 按 OpenAI、OpenRouter、DeepInfra 等输出价格估算预算。
- 因此，若关注硬件算力或可复现能耗，论文提供的信息不足。

##
