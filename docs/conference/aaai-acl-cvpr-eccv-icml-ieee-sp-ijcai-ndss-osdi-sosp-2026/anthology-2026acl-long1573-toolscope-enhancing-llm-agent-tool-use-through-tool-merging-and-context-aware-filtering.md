---
title: "ToolScope: Enhancing LLM Agent Tool Use through Tool Merging and Context-Aware Filtering"
title_zh: ToolScope：通过工具合并与上下文感知过滤增强大模型智能体工具使用
authors: "Marianne Menglin Liu, Daniel Garcia, Fjona Parllaku, Vikas Upadhyay, Fahad Shah, Dan Roth"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.acl-long.1573.pdf"
tags: ["query:fin-mm-agent"]
score: 6.0
evidence: 通过工具合并与检索式筛选提升大模型智能体工具使用
tldr: 真实工具集常含大量名称描述重叠的冗余工具，造成歧义并降低选择准确率，同时受上下文长度限制。本文提出ToolScope，包含自动审计并修正工具合并的ToolScopeMerger，以及按查询排序筛选最相关工具的ToolScopeRetriever。在多款前沿与开源模型及工具集上评测表明，该方法在压缩工具集的同时不损失准确率。该工作为工具增强智能体（含金融任务）的工具管理提供了通用可迁移方案。
source: ACL-2026-Long
selection_source: conference_retrieval
motivation: 真实工具集存在名称描述重叠的冗余工具，加上上下文长度限制，导致智能体工具选择准确率下降。
method: 提出ToolScope，用带自动纠错的合并模块消除工具冗余，并用检索器为每个查询排序筛选最相关工具以压缩上下文。
result: 在多款先进模型和工具集上评测显示，工具集被有效压缩且准确率不下降。
conclusion: 该框架为工具增强智能体提供了可扩展的工具管理与检索筛选方案。
---

## Abstract
Large language model (LLM) agents rely on external tools to solve complex tasks, but real-world toolsets often contain redundant tools with overlapping names and descriptions, introducing ambiguity and reducing selection accuracy. LLMs also face strict input context limits, preventing efficient consideration of large toolsets. To address these challenges, we propose ToolScope, which includes: (1) ToolScopeMerger with Auto-Correction to automatically audit and fix tool merges, reducing redundancy, and (2) ToolScopeRetriever to rank and select only the most relevant tools for each query, compressing toolsets to fit within context limits without sacrificing accuracy. Evaluations on three state-of-the-art LLMs and three open-source tool-use benchmarks show gains of 8.38% to 38.6% in tool selection accuracy, demonstrating ToolScope’s effectiveness in enhancing LLM tool use.

---

## 论文详细总结（自动生成）

# ToolScope 论文中文总结

## 1. 核心问题与整体含义

- **研究背景**：LLM Agent 依赖外部工具完成复杂任务，工具学习通常包含任务规划、工具选择、工具调用和响应生成四个阶段。其中，工具选择是关键但薄弱环节。
- **核心问题**：
  - 真实工具集常包含大量**名称、描述、功能重叠的冗余工具**，造成语义歧义，降低检索与选择准确率。
  - LLM 输入上下文有限，难以在单次查询中有效考虑大量工具。
- **现有方法不足**：
  - 许多方法只改进单个工具文档，未解决工具集层面的语义重叠。
  - 处理工具重叠的方法多依赖人工合并，缺乏自动化、可扩展方案。
  - 混合检索对工具选择的影响研究有限。
  - 尚无工作将“自动工具合并”与“混合检索”结合，同时缓解工具重叠和上下文限制。
- **整体含义**：论文提出 **ToolScope**，由 **ToolScopeMerger** 和 **ToolScopeRetriever** 组成，目标是在压缩工具集、减少冗余的同时，提高 LLM Agent 的工具选择准确率。

## 2. 方法论

### 2.1 总体思想

- ToolScope 是两段式框架：
  - **ToolScopeMerger**：基于图结构自动合并语义重叠工具，并通过 Auto-Correction 自动审计和修正合并。
  - **ToolScopeRetriever**：面向查询进行排序和筛选，只保留 top-k 相关工具，降低上下文长度。
- 最终将筛选后的工具传给 LLM Agent 进行工具选择。

### 2.2 ToolScopeMerger：自动工具合并

- **S1 候选生成与工具索引**：
  - 工具集记为 \(T=\{t_1,\dots,t_n\}\)。
  - 用嵌入模型将工具描述 \(d_i\) 编码为向量 \(v_i=f(d_i)\)。
  - 对每个工具检索 top-k 余弦相似工具，形成候选集合。
  - 实现中使用 `thenlper/gte-large` 和 FAISS；相似度阈值设为 **0.82**。
- **S2 关系分类与图构建**：
  - 使用 LLM 二分类器 \(MC(t_a,t_b)\) 判断两个工具是否语义等价。
  - 若 \(MC=1\)，则在无向图 \(G=(T,E)\) 中连边。
  - 提取连通分量 \(C=\{C_1,\dots,C_a\}\)，每个分量代表一组可能重叠的工具。
- **S3 剪枝、自动纠错与更新**：
  - 对每个连通分量选一个代表工具，当前实现选择**函数名字符串长度最短**的工具。
  - 定义映射 \(\phi:T\to T'\)，将原工具映射到合并后的代表工具。
  - **Auto-Correction**：用 LLM 验证器 \(V(C_b)\) 审核合并簇；若无效，则拆分为更细子簇或移除不合格成员，即 \(V(C_b)=\{C'_1,\dots,C'_m\}\)。
  - 对最终簇，用 LLM 合成新的工具签名和描述 \(d^*=MD(C_b)\)。
  - 更新 benchmark：将原始 gold 工具标签按映射 \(\phi\) 重标记，保证合并后工具集仍可用于评估。

### 2.3 ToolScopeRetriever：上下文感知检索

- **单工具选择**：
  - 对查询 \(q\) 和候选工具 \(t\)，计算混合检索分数：
    \[
    s(q,t)=\alpha\cdot s_{\text{dense}}(q,t)+(1-\alpha)\cdot s_{\text{sparse}}(q,t)
    \]
  - 取 top-M 候选，再用 cross-encoder 对 \((q,t)\) 重排序，选择最高分工具。
  - 实现中最终采用 **dense-only，即 \(\alpha=1\)**，并对 top-50 候选重排序。
- **多工具选择**：
  - 对查询进行子查询分解。
  - 每个子查询分别执行混合检索与重排序。
  - 每个子查询的 top-1 工具直接保留。
  - 其余工具分数
