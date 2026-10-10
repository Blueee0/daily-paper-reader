---
title: "Trajectory2Task: Training Robust Tool-Calling Agents with Synthesized Yet Verifiable Data for Complex User Intents"
title_zh: Trajectory2Task：用可验证合成数据训练面向复杂用户意图的鲁棒工具调用智能体
authors: "Ziyi Wang, Yuxuan Lu, Yimeng Zhang, Pei Chen, Ziwei Dong, Jing Huang, Jiri Gesi, Xianfeng Tang, Chen Luo, Qun Liu, Yisi Sang, Hanqing Lu, Manling Li, Jin Lai, Dakuo Wang"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.acl-long.2037.pdf"
tags: ["query:fin-mm-agent"]
score: 5.0
evidence: 用可验证数据训练工具调用智能体
tldr: 工具调用智能体正被广泛部署于真实客户工作流，但多数研究聚焦于任务明确且固定的理想设定，忽略了用户请求模糊、随时间变化或政策上不可行等真实情形。本文提出Trajectory2Task，一个可验证的数据生成流水线，通过多轮探索合成覆盖模糊意图、变化意图与不可行意图的训练与评测数据。该方法为在复杂真实交互模式下训练鲁棒工具调用智能体提供了可扩展的数据基础，推动了工具使用智能体的实用化。
source: ACL-2026-Long
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long2037/fig-001.webp\", \"caption\": \"\", \"page\": 1, \"index\": 1, \"width\": 806, \"height\": 997}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long2037/fig-002.webp\", \"caption\": \"\", \"page\": 4, \"index\": 2, \"width\": 1719, \"height\": 735}]"
motivation: 现有工具调用智能体研究多限于任务明确固定的理想设定，缺乏真实复杂交互数据。
method: 提出可验证数据生成流水线，经多轮探索合成模糊、变化与不可行意图的轨迹数据。
result: 为复杂真实交互模式下的工具调用智能体提供可扩展的训练与评测数据。
conclusion: 推动工具使用智能体在真实客户工作流中的鲁棒性与实用化。
---

## Abstract
Tool-calling agents are increasingly deployed in real-world customer-facing workflows. Yet most studies on tool-calling agents focus on idealized settings with general, fixed, and well-specified tasks.In real-world applications, user requests are often (1) ambiguous, (2) changing over time, or (3) infeasible due to policy constraints, and training and evaluation data that cover these diverse, complex interaction patterns remain under-represented.To bridge the gap, we present Trajectory2Task a verifiable data generation pipeline for studying tool use at scale under three realistic user scenarios: ambiguous intent, changing intent, and infeasible intents.The pipeline first conducts multi-turn exploration to produce valid tool-call trajectories. It then converts these trajectories into user-facing tasks with controlled intent adaptations. This process yields verifiable task that support closed-loop evaluation and training. We benchmark several state-of-the-art LLMs on the generated complex user scenario tasks and observe frequent failures.Finally, using successful trajectories obtained from task rollouts, we fine-tune lightweight LLMs and find consistent improvements across all three conditions, along with better generalization to unseen tool-use domains, indicating stronger tool-calling ability.

---

## 论文详细总结（自动生成）

# Trajectory2Task 论文总结

## 1. 核心问题与整体含义

- **研究背景**：工具调用智能体已被用于客服等真实
