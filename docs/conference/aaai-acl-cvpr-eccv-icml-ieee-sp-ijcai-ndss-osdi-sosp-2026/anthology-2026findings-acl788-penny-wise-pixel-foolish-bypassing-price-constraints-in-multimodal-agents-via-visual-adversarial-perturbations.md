---
title: "\"Penny Wise, Pixel Foolish\": Bypassing Price Constraints in Multimodal Agents via Visual Adversarial Perturbations"
title_zh: 省小钱失像素：通过视觉对抗扰动绕过多模态智能体的价格约束
authors: "Jiachen Qian, Zhaolu Kang"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.findings-acl.788.pdf"
tags: ["query:fin-mm-agent"]
score: 6.0
evidence: 执行金融交易的多模态移动智能体与视觉价格证据
tldr: 多模态大模型催生了智能体经济，移动智能体可自主执行高风险金融交易，但其对抗鲁棒性被严重忽视。本文揭示了一种系统性漏洞——视觉支配幻觉，即难以察觉的对抗视觉线索会作为超常刺激压制文本价格证据。作者提出PriceBlind白盒对抗攻击框架，在基于截图的限价场景中诱导智能体做出非理性经济决策。研究警示金融多模态智能体在安全与可靠性方面存在关键风险。
source: ACL-2026-Findings
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl788/fig-001.webp\", \"caption\": \"\", \"page\": 2, \"index\": 1, \"width\": 2528, \"height\": 1696}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl788/fig-002.webp\", \"caption\": \"\", \"page\": 4, \"index\": 2, \"width\": 2528, \"height\": 1696}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl788/fig-003.webp\", \"caption\": \"\", \"page\": 6, \"index\": 3, \"width\": 2528, \"height\": 1696}, {\"url\": \"assets/figures/acl-2026-findings/anthology-2026findings-acl788/fig-004.webp\", \"caption\": \"\", \"page\": 7, \"index\": 4, \"width\": 2528, \"height\": 1696}]"
motivation: 多模态移动智能体自主执行高风险金融交易，但其对抗鲁棒性被忽视，可能被视觉线索误导。
method: 揭示视觉支配幻觉现象，并提出PriceBlind白盒对抗攻击框架，用微小视觉扰动压制文本价格证据。
result: 实验表明不可察觉的视觉线索可使智能体忽略价格约束，做出非理性经济决策。
conclusion: 揭示了金融多模态智能体的安全漏洞，为鲁棒性与可信交易研究敲响警钟。
---

## Abstract
The rapid proliferation of Multimodal Large Language Models (MLLMs) has ushered in the era of the “Agentic Economy,” where Mobile Agents autonomously execute high-stakes financial transactions. While these agents demonstrate impressive operational capabilities, their adversarial robustness remains a glaring blind spot. In this paper, we identify a systemic vulnerability termed Visual Dominance Hallucination (VDH), where imperceptible adversarial visual cues can act as a “super-stimulus,” overriding textual price evidence in our evaluated screenshot-based price-constrained settings and forcing the agent into irrational economic decisions. We propose PriceBlind, a stealthy, white-box adversarial attack framework for controlled screenshot-based evaluation. Unlike prior works that rely on conspicuous artifacts like pop-ups, PriceBlind exploits the modality gap in CLIP-based encoders via a novel Semantic-Decoupling Loss. Rather than literally making a luxury item “look cheap,” this regularizer weakens the consistency between high-price text and visual value cues by aligning the image embedding with a low-cost/value-associated anchor region while preserving pixel-level fidelity. On our main E-ShopBench benchmark with clear price constraints, screenshot-based white-box evaluation yields ASRs around 80% on the evaluated agents. Under the evaluated single-turn coordinate-selection protocol in a simplified layout-aware setting, our Ensemble-DI-FGSM strategy also yields non-trivial black-box transfer, with ASR roughly 35–41% across GPT-4o, Gemini-1.5-Pro, and Claude-3.5-Sonnet. In the same screenshot-based setting, standard robust encoders reduce ASR only partially, while a Verify-then-Act stack with robust encoders lowers ASR to below 10% at some clean-accuracy cost.

---

## 论文详细总结（自动生成）

## 1. 核心问题与整体含义

- **背景**：多模态大模型推动“智能体经济”（Agentic Economy），移动智能体可基于截图自主操作 App，并执行高风险金融交易，如“买最便宜的咖啡机”。
- **核心问题**：现有 MLLM 移动智能体通常默认 UI 视觉信息与文本元数据一致，即“信任假设”。论文指出这一假设可被打破：微小、难以察觉的对抗视觉扰动可作为“超级刺激”，压制 OCR 读到的价格文本证据，诱导智能体购买高价目标商品。
- **关键概念**：作者将这一系统性漏洞称为 **Visual Dominance Hallucination, VDH（视觉支配幻觉）**。在聊天中幻觉只是困扰，在交易中幻觉可能造成实际经济损失。
- **整体含义**：论文并非单纯展示 jailbreak，而是聚焦“目标劫持”与金融决策操纵。恶意商户可能通过上传带扰动的商品图，操纵自主智能体选择高利润商品。论文因此警示多模态金融智能体的安全与可信部署风险。

## 2. 方法论：PriceBlind 框架

- **核心思想**：提出 **PriceBlind**，一种 stealthy、白盒/灰盒对抗攻击框架，用于受控截图式评测。它不添加弹窗等显眼元素，而是仅扰动目标商品图像像素，使图像嵌入向“低价/价值关联”区域靠拢，从而削弱高价文本与视觉价值线索之间的一致性。
- **威胁模型**：
  - 攻击者目标：让智能体点击高价目标商品，即使其不满足用户价格约束。
  - 攻击者能力：商户可控制自己上传的商品图片，但不能改平台 UI 或竞争对手图片。
  - 额外假设：优化坐标 token 时假设可访问评测截图、稳定 UI 模板或布局目标位置；因此是受控 benchmark 威胁模型，强于纯离线商户上传。
  - 知识设定：白盒访问开源代理模型，但受害部署模型视为黑盒 API，属“灰盒”设定。
- **问题形式化**：
  - 目标区域为高价商品 `v_target`，扰动后截图为 `S_t(v_target + δ)`。
  - 攻击目标：使智能体执行 `Click(v_target)`，约束为 `||δ||∞ < ε`，通常 `ε = 8/255`。
- **关键损失**：
  - **Action-Targeted Loss `L_action`**：最小化目标点击动作 token 的负对数似然，确保模型生成指向目标商品的坐标 token。
  - **Semantic-Decoupling Regularizer `L_dec`**：构造 500 个低价商品视觉锚点库，计算每个代理编码器的低价质心 `ē_cheap`。损失最小化对抗商品嵌入与低价质心的余弦距离，同时用 `β` 项保持与原图嵌入的部分关系，形成“语义伪装”。
  - 总损失：`δ* = argmin_δ (L_action + λ L_dec)`。
- **算法流程：Ensemble-DI-FGSM**：
  - 对多个开源代理模型 `{Qwen-VL, LLaVA-1.6}` 进行集成攻击。
  - 初始化扰动 `δ_0`，计算低价锚点质心。
  - 迭代中形成扰动截图，使用 DI 变换增强迁移性，计算 `L_action` 与 `L_dec`。
  - 动量累积梯度，按符号更新扰动并裁剪到 `ε` 内。
  - 关键超参：`ε=8/255`，迭代 `N=50`，动量 `μ=0.9`，步长 `α=1/255`，`λ=1.5`，`β=0.5`，DI 概率 `p=0.5`。
- **机制解释**：
  - 论文给出启发式 cross-attention 分析：扰动视觉 key 可提高视觉注意力权重，条件近似为 `q·Δv > √d log(w_t^0/w_v^0)`。
  - 注意力分析显示，PriceBlind 使视觉 token 注意力从 `0.32` 升至 `0.58`，价格文本注意力从 `0.28` 降至 `0.11`，说明模型从价格文本转向被操纵视觉特征。

## 3. 实验设计

- **数据集 / Benchmark**：
  - 主 benchmark 为 **E-ShopBench**，共 200 个对抗场景，来自 Amazon 80、eBay 60、Taobao 60。
  - 每场景包含一个高价目标商品和一个低价干扰商品。
  - 类别：电子产品、家居、时尚、配饰各 50。
  - 价格：低价 10–50 美元，高价 200–2000 美元。
  - 布局：列表 40%、网格 40%、详情页 20%。
- **受害者模型**：
  - 白盒：Mobile-Agent-v2（Qwen-VL-Chat）、AppAgent（LLaVA-1.6-Vicuna-7B）。
  - 黑盒：GPT-4o、Gemini-1.5-Pro、Claude-3.5-Sonnet。
- **对比基线**：
  - clean、Random Noise、Typographic（“Best Deal”覆盖层）、Adv. Pop-up。
  - 攻击方法比较：MI-FGSM、DI-FGSM、SSA、X-Transfer、AdvDiffVLM、Pop-up Attack。
- **指标**：
  - ASR（Attack Success Rate）。
  - LPIPS（感知相似度）。
  - 统计报告多为描述性百分比，部分 token 级测量用 mean±std，未强调置信区间或显著性检验。
- **主要实验组**：
  - 白盒攻击性能：Mobile-Agent-v2 上 PriceBlind 达 82% ASR，AppAgent 上 79%，clean 约 4%。
  - 黑盒迁移：单代理 Qwen 对 GPT
