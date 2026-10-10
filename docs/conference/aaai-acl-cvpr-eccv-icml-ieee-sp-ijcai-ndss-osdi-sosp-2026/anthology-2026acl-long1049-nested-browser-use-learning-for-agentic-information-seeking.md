---
title: Nested Browser-Use Learning for Agentic Information Seeking
title_zh: 面向智能体信息检索的嵌套浏览器使用学习
authors: "Baixuan Li, Jialong Wu, Wenbiao Yin, Kuan Li, Zhongwang Zhang, Huifeng Yin, Zhengwei Tao, Liwen Zhang, Pengjun Xie, Jingren Zhou, Yong Jiang, Wentao Zhang, Zhiqiang Gao"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.acl-long.1049.pdf"
tags: ["query:fin-mm-agent"]
score: 4.0
evidence: 智能体信息检索与更丰富的浏览器工具使用
tldr: 现有信息检索智能体的工具使用多局限于API片段检索与URL抓取，难以获取真实浏览带来的丰富信息。本文提出NestBrowse，以嵌套结构将交互控制与页面探索解耦，构建简洁完整的浏览器动作框架。该设计简化了智能体推理并支持有效浏览，为工具增强检索智能体提供了新范式。
source: ACL-2026-Long
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1049/fig-001.webp\", \"caption\": \"\", \"page\": 4, \"index\": 1, \"width\": 440, \"height\": 312}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1049/fig-002.webp\", \"caption\": \"\", \"page\": 4, \"index\": 2, \"width\": 439, \"height\": 308}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1049/fig-003.webp\", \"caption\": \"\", \"page\": 4, \"index\": 3, \"width\": 440, \"height\": 312}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1049/fig-004.webp\", \"caption\": \"\", \"page\": 4, \"index\": 4, \"width\": 607, \"height\": 412}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1049/fig-005.webp\", \"caption\": \"\", \"page\": 4, \"index\": 5, \"width\": 445, \"height\": 308}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1049/fig-006.webp\", \"caption\": \"\", \"page\": 4, \"index\": 6, \"width\": 531, \"height\": 360}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1049/fig-007.webp\", \"caption\": \"\", \"page\": 8, \"index\": 7, \"width\": 732, \"height\": 180}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1049/fig-008.webp\", \"caption\": \"\", \"page\": 8, \"index\": 8, \"width\": 1495, \"height\": 345}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1049/fig-009.webp\", \"caption\": \"\", \"page\": 8, \"index\": 9, \"width\": 1495, \"height\": 345}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1049/fig-010.webp\", \"caption\": \"\", \"page\": 8, \"index\": 10, \"width\": 732, \"height\": 277}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long1049/fig-011.webp\", \"caption\": \"\", \"page\": 8, \"index\": 11, \"width\": 1495, \"height\": 547}]"
motivation: 信息检索智能体工具使用局限于API检索与URL抓取，信息获取受限。
method: 提出嵌套浏览器使用框架，将交互控制与页面探索解耦。
result: 在简化推理的同时实现更丰富的真实浏览器交互。
conclusion: 为工具增强的信息检索智能体提供可扩展的浏览动作框架。
---

## Abstract
Information-seeking (IS) agents have achieved strong performance across a range of wide and deep search tasks, yet their tool use remains largely restricted to API-level snippet retrieval and URL-based page fetching, limiting access to the richer information available through real browsing. While full browser interaction could unlock deeper capabilities, its fine-grained control and verbose page content returns introduce substantial complexity for ReAct-style function-calling agents. To bridge this gap, we propose Nested Browser-Use Learning (NestBrowse), which introduces a minimal and complete browser-action framework that decouples interaction control from page exploration through a nested structure. This design simplifies agentic reasoning while enabling effective deep-web information acquisition. Empirical results on challenging deep IS benchmarks demonstrate that NestBrowse offers clear benefits in practice. Further in-depth analyses underscore its efficiency.

---

## 论文详细总结（自动生成）

### 1. 检索相关性
智能体信息检索与更丰富的浏览器工具使用。

### 2. 核心内容
现有信息检索智能体的工具使用多局限于API片段检索与URL抓取，难以获取真实浏览带来的丰富信息。本文提出NestBrowse，以嵌套结构将交互控制与页面探索解耦，构建简洁完整的浏览器动作框架。该设计简化了智能体推理并支持有效浏览，为工具增强检索智能体提供了新范式。

### 3. 对应检索需求
tool augmented agents that use external APIs and retrieval for financial tasks。

### 4. 来源与原文
- Source：ACL-2026-Long
- OpenReview：[https://aclanthology.org/2026.acl-long.1049/](https://aclanthology.org/2026.acl-long.1049/)
