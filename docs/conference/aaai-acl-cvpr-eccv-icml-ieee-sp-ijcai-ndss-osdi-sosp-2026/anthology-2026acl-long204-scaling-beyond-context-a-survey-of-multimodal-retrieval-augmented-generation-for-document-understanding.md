---
title: "Scaling Beyond Context: A Survey of Multimodal Retrieval-Augmented Generation for Document Understanding"
title_zh: 超越上下文：面向文档理解的多模态检索增强生成综述
authors: "Sensen Gao, Shanshan Zhao, Xu Jiang, Lunhao Duan, Yong Xien Chng, Qing-Guo Chen, Weihua Luo, Kaifu Zhang, Jia-Wang Bian, Mingming Gong"
date: 2026
publication_date: 2026
publication_date_precision: year
publication_date_source: conference year only; exact release date unverified
publication_date_kind: unknown
pdf: "https://aclanthology.org/2026.acl-long.204.pdf"
tags: ["query:fin-mm-agent"]
score: 8.0
evidence: 面向文档理解的多模态RAG综述，涵盖文本、表格、图表与版面
tldr: 文档理解对金融分析等应用至关重要，但OCR加LLM的流水线丢失结构信息，原生多模态大模型又难以建模长上下文。论文系统综述面向文档理解的多模态检索增强生成（Multimodal RAG），主张对文本、表格、图表与版面进行整体检索与推理。该综述为金融文档智能等场景提供了统一架构视角与方法梳理。
source: ACL-2026-Long
selection_source: conference_retrieval
figures_json: "[{\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-001.webp\", \"caption\": \"\", \"page\": 1, \"index\": 1, \"width\": 611, \"height\": 696}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-002.webp\", \"caption\": \"\", \"page\": 1, \"index\": 2, \"width\": 611, \"height\": 647}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-003.webp\", \"caption\": \"\", \"page\": 1, \"index\": 3, \"width\": 614, \"height\": 675}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-004.webp\", \"caption\": \"\", \"page\": 1, \"index\": 4, \"width\": 5433, \"height\": 2173}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-005.webp\", \"caption\": \"\", \"page\": 5, \"index\": 5, \"width\": 1207, \"height\": 769}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-006.webp\", \"caption\": \"\", \"page\": 5, \"index\": 6, \"width\": 1210, \"height\": 772}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-007.webp\", \"caption\": \"\", \"page\": 5, \"index\": 7, \"width\": 417, \"height\": 566}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-008.webp\", \"caption\": \"\", \"page\": 5, \"index\": 8, \"width\": 1035, \"height\": 657}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-009.webp\", \"caption\": \"\", \"page\": 5, \"index\": 9, \"width\": 1025, \"height\": 647}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-010.webp\", \"caption\": \"\", \"page\": 5, \"index\": 10, \"width\": 609, \"height\": 662}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-011.webp\", \"caption\": \"\", \"page\": 5, \"index\": 11, \"width\": 1270, \"height\": 1170}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-012.webp\", \"caption\": \"\", \"page\": 5, \"index\": 12, \"width\": 466, \"height\": 494}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-013.webp\", \"caption\": \"\", \"page\": 5, \"index\": 13, \"width\": 427, \"height\": 567}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-014.webp\", \"caption\": \"\", \"page\": 7, \"index\": 14, \"width\": 461, \"height\": 562}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-015.webp\", \"caption\": \"\", \"page\": 7, \"index\": 15, \"width\": 455, \"height\": 585}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-016.webp\", \"caption\": \"\", \"page\": 7, \"index\": 16, \"width\": 431, \"height\": 577}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-017.webp\", \"caption\": \"\", \"page\": 7, \"index\": 17, \"width\": 434, \"height\": 590}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-018.webp\", \"caption\": \"\", \"page\": 7, \"index\": 18, \"width\": 445, \"height\": 577}, {\"url\": \"assets/figures/acl-2026-long/anthology-2026acl-long204/fig-019.webp\", \"caption\": \"\", \"page\": 7, \"index\": 19, \"width\": 447, \"height\": 571}]"
motivation: 文档理解对金融分析等至关重要，但OCR流水线丢失结构、原生多模态大模型难以建模上下文。
method: 系统综述面向文档理解的多模态检索增强生成，强调对文本、表格、图表与版面的整体检索推理。
result: 梳理了多模态RAG的范式、方法与挑战，指出其能实现跨模态的整体文档智能。
conclusion: 该综述为金融文档理解等应用提供了统一的多模态检索增强架构视角。
---

## Abstract
Document understanding is critical for applications from financial analysis to scientific discovery. Current approaches, whether OCR-based pipelines feeding Large Language Models (LLMs) or native Multimodal LLMs (MLLMs), face key limitations: the former loses structural detail, while the latter struggles with context modeling. Retrieval-Augmented Generation (RAG) helps ground models in external data, but documents’ multimodal nature, i.e., combining text, tables, charts, and layout, demands a more advanced paradigm: Multimodal RAG. This approach enables holistic retrieval and reasoning across all modalities, unlocking comprehensive document intelligence. Recognizing its importance, this paper presents a systematic survey of Multimodal RAG for document understanding. We propose a taxonomy based on domain, retrieval modality, and granularity, and review advances involving graph structures and agentic frameworks. We also summarize key datasets, benchmarks, and applications, and highlight open challenges in efficiency, fine-grained representation, and robustness, providing a roadmap for future progress in document AI.

---

## 论文详细总结（自动生成）

# 论文总结：《Scaling Beyond Context: A Survey of Multimodal Retrieval-Augmented Generation for Document Understanding》

## 1. 核心问题与整体含义

- **研究背景**：文档理解（Document Understanding）是金融分析、科学发现等应用的关键能力，需要机器自动解读、组织并推理海量非结构化/半结构化文档。
- **现有范式的两类瓶颈**：
  - **OCR + LLM 流水线**：依赖 OCR 抽取文本再喂给 LLM，丢失版面、表格、图表等结构细节，且 OCR 错误会向下游传播。
  - **原生多模态 LLM（MLLM）**：将文档表示为长图像序列，虽统一跨模态学习，但在数百至上千页的超长文档上面临上下文窗口限制，易产生检索不准与幻觉。
- **规模落差的核心矛盾**（论文的关键立论点）：如 Table 1 所示，现有多模态 RAG 基准需要约 **20M–200M 视觉 token**（按每页 ~1K 视觉 token 估算），远超现有 MLLM 常见的 **128K–1M** 上下文上限。
- **整体含义**：文档天然是多模态的（文本、表格、图表、版面共存），因此需要更高级的 **多模态 RAG** 范式——在所有模态上做整体检索与推理，从而实现"超越上下文"的文档智能。
- **综述定位与空白**：已有 RAG 综述、多模态 RAG 综述、文档理解综述各自存在，但**鲜有工作同时连接"多模态 RAG"与"文档理解"**。本文自称是**首个系统性连接二者的综述**。

## 2. 方法论：核心思想与关键技术细节

- **核心思想**：不训练新模型，而是构建一套**分类学（taxonomy）**来组织该领域方法，维度包括：领域（开/闭域）、检索模态、检索粒度、图结构增强、智能体增强。

- **形式化检索框架（第 2 节）**：
  - 文档池 $D=\{d_i\}$，每篇可含栅格图像与 OCR 文本 $T_i$；用模态编码器映射到共享嵌入空间。
  - **纯视觉检索**：$s_{img}(e_q, z_i)=\langle e^{text}_q, z^{img}_i\rangle$，取超过阈值 $\tau_{img}$ 或 Top-K。
  - **联合视觉–文本检索**两种策略：
    - **(a) 置信度加权分数融合**：$s_{conf}=\lambda_i s_{img}+(1-\lambda_i)s_{text}$，$\lambda_i\in[0,1]$ 表示图像置信度（如 OCR 质量校准）。
    - **(b) 模态结果并集**：分别按各模态阈值检索后取并集 $X_\cup = X_{img}\cup X_{text}$，可辅以 Borda、RRF 等排序融合。
  - **生成**：$r = G(q, X)$，即生成器以查询与检索上下文为条件产出答案。

- **分类学四大维度**：
  - **3.1 开域 vs 闭域**：开域从大规模文档库构建知识库（如 M3DocRAG、VDocRAG）；闭域针对单篇长文档只取最相关页面/帧（如 SV-RAG、FRAG、CREAM），以降低输入长度、缓解幻觉。
  - **3.2 检索模态**：图像模态（页面截图 → VLM 隐状态，效率高但细粒度文本弱）与图像+文本模态（融合 OCR/注释，语义更丰富但复杂度高）。
  - **3.3 检索粒度**：从**页面级**原子单元，演进到**元素级/区域级**（表格、图表、段落、layout block），并出现两阶段"先页后区"的细粒度定位（如 VRAG-RL、MG-RAG、mKG-RAG、PREMIR、MARA、RegionRAG、Snappy）。
  - **3.4 混合增强**：
    - **图结构 RAG**：节点为页面/文本片段/图像/表格/版面块，边编码语义、空间与上下文关系，检索转为子图选择（HM-RAG、mKG-RAG、MoLoRAG、RECON、LAD-RAG、LILaC）。
    - **智能体 RAG**：LLM 智能体主动分解查询、选择检索策略、多轮反思与验证、跨模态融合证据（ViDoRAG、HM-RAG、Patho-AgenticRAG、HEAR、SLEUTH）。

- **训练损失（附录 C）**：主流为 **ColBERT 式 late-interaction 对比损失**——查询与文档用多 token 嵌入表示，用 MaxSim 晚交互计算相似度 $Sim(q,d)=\sum_t \max_m \langle h_{q,t}, h_{d,m}\rangle$，再以批内正负样本的对比目标（等价于 $\log(1+\exp(n_i-p_i))$）优化。

- **评测体系（附录 B）**：
  - **检索指标**：Top-K Accuracy、Recall@K、Precision@K、F1@K、MRR@K、nDCG@K。
  - **生成指标**三类：软匹配（BLEU、ROUGE、METEOR）、严格匹配（EM、ANLS、PNLS）、语义匹配（BERTScore、G-Acc）。

## 3. 实验设计：数据集、基准与对比

> 注意：本文是**综述**，本身不开展新实验，而是**汇编并对比**已有方法在各基准上的公开结果。

- **数据集与基准（Table 3、Table 6）**：
  - 通用文档理解数据集：DocVQA、InfoVQA、ChartQA、VisualMRC、TAT-DQA、ScienceQA、DUDE、SlideVQA、ArXivQA、MMLongBench-Doc、SPIQA、LongDocUrl 等。
  - 近期多模态 RAG 基准：ViDoRe、VisR-Bench、M3DocVQA、VisDoMBench、ViDoSeek、OpenDocVQA、UniDoc-Bench、BBox-DocVQA。
  - 规模覆盖：从单文档（DocVQA 约 1.2 万图）到开域大语料（OpenDocVQA 约 20.6 万查询 / 4.3 万图）。
- **对比方法**（Table 2，约 40+ 个方法）：DSE、ColPali、ColQwen2、VisRAG、CREAM、SV-RAG、M3DocRAG、VisDoMRAG、GME、ViDoRAG、HM-RAG、VDocRAG、FRAG、MG-RAG、VRAG-RL、Light-ColPali、MM-R5、SimpleDoc、MoLoRAG、RegionRAG、RECON、LAD-RAG、DREAM、MARA、SLEUTH 等。
- **主结果表（Table 4）**：在 **DocVQA、SlideVQA、InfoVQA、MMLongBench-Doc** 上分别汇总检索评测（Top-5、R@10、MRR@10、nDCG@5/10）与生成评测（EM、PNLS、ANLS、G-Acc）结果。
- **对比维度**（Table 2）：venue、backbone LLM/VLM、视觉编码器、是否训练、是否用 OCR、开/闭域、检索模态、检索粒度、是否用图、是否用智能体。

## 4. 资源与算力

- **论文未提及任何算力资源信息**：作为一篇综述，全文未报告 GPU 型号、数量、训练时长、参数量或显存占用。
- 唯一涉及"资源量级"的讨论是**间接的**：
  - Table 1 给出基准所需的视觉 token 规模（约 20M–200M）。
  - 多处提到效率问题：如 Light-ColPali 声称仅用约 **2.8% 原始内存**即可保留 **94% 以上**效果；DocPruner、HPC-ColPali 等以剪枝/量化降低存储与检索成本。
- **结论**：若需评估复现成本，本文无法提供直接的算力参考，需回到各原始方法论文。

## 5. 实验数量与充分性

- **本综述自身的"实验"= 文献调研 + 结果汇编**，非受控实验：
  - 汇总 **40+ 种方法**在 **4 个主要基准**上的检索与生成结果（Table 4）。
  - 整理 **2 类**数据集（通用文档理解 + 近期 RAG 基准，共 20+ 个）。
  - 归纳 **3 大类**评测指标与 **1 类**主流训练损失。
  - 附录 I 用两张表（Table 7、Table 8）逐条总结每个方法的核心贡献。
- **充分性与公平性评价**：
  - **优点**：覆盖面广、维度统一，Table 2 的横向对比有助于快速定位方法差异；对指标做了对齐与注释，尽量便于直接比较。
  - **不足**：
    - 不同方法使用的 backbone、视觉编码器、是否训练、OCR 与否均不同，**并非严格同条件对比**，表格数值的可比性有限。
    - 论文自身也承认：现有基准多为**单页/短文 VQA**，且**数据污染（data contamination）风险未被处理**，高分可能反映记忆而非推理。
    - 缺少对方法成本（延迟、token 消耗、显存）的系统量化对比，无法做真正的性价比评估。
  - 因此，作为**领域地图**是充分的，作为**性能排行榜**则需谨慎解读。

## 6. 主要结论与发现

- **多模态 RAG 是文档理解的可行主流路径**：能在不扩展模型上下文长度的前提下，支撑数百至上千页文档与视频的理解。
- **方法演进呈现两条清晰趋势**：
  - **粒度由粗到细**：页面级 → 元素级/区域级（表格、图表、版面块）。
  - **架构由扁平到结构化**：从单一向量检索 → 图结构索引 + 智能体协同。
- **关键张力（Critical Analysis）**：
  - **"免 OCR"与"基于 OCR"的悖论**：免 OCR 保留版面但易在密集数字/精确字符串上幻觉；OCR 精度高但丢失版面语义。**尚无统一表示同时兼顾两者**。
  - **基准饱和与有效性存疑**：DocVQA/InfoVQA 已趋饱和，但真实 RAG 挑战是"千页大海捞针"，两者错位。
  - **复杂度–性能权衡失衡**：图索引与智能体往往只带来 1–2% 提升，却显著增加延迟与算力开销，且少有成本–收益分析。
- **应用面**：金融（MultiFinRAG、FinRAGBench-V）、科学文献（HiPerRAG、CollEX）、社会科学调查（Eurobarometer 多模态框架）均已落地。
- **开放挑战**：效率（视觉 token 压缩、剪枝、量化）、细粒度表示、训练范式（MaxSim 忽略分布式语义对齐）、可扩展细粒度评测协议、以及**安全与鲁棒性**（跨模态对抗攻击、知识投毒、来源可验证性）。
- **工业部署**：开源生态（RAGFlow ~70.3k stars、LlamaIndex ~46k、LightRAG ~26.6k、RAG-Anything ~11.3k、AutoRAG ~4.5k、RAGLite ~1.1k）已显著降低落地门槛。

## 7. 优点（亮点）

- **首创性定位明确**：首个显式连接"多模态 RAG"与"文档理解"的综述，填补两类综述之间的空白。
- **分类学多维且可操作**：开/闭域 × 检索模态 × 检索粒度 × 图/智能体增强，四维正交，便于定位新方法。
- **形式化清晰**：第 2 节给出检索与生成的统一符号体系（含置信度融合与并集两式），把工程直觉提升为可比较的数学表述。
- **评测与训练的系统梳理**：附录 B 把指标分为软匹配/严格匹配/语义匹配三类并给出公式；附录 C 给出 ColBERT 式损失与 MaxSim 的推导，实用性强。
- **批判性视角难得**：不回避领域内的"免 OCR vs OCR"悖论、基准污染与复杂度–性能失衡，比一般罗列式综述更有洞见。
- **工程落地视角**：附录 F 与 Table 5 汇总开源框架的 star 数与特性，对产业读者价值高。
- **可维护性承诺**：声明将持续更新并配套开源仓库跟踪领域进展。

## 8. 不足与局限

- **无原创实验与算力数据**：作为综述不提供新结果，也未报告任何 GPU/训练成本，读者难以据此估算复现开销。
- **结果可比性受限**：Table 4 中方法在 backbone、编码器、训练状态、OCR 使用上差异巨大，数值并非同条件对比，存在"苹果比橘子"风险。
- **数据污染与基准饱和未解决**：论文自身承认公共基准可能已进入训练集，高分可能是记忆；且现有基准多为单页 VQA，与真实千页开域检索场景错位。
- **粒度评测方法缺失**：现有 Recall@K 等把页面当原子单元，无法评估"定位到某个具体表格/图表"的能力，论文虽提出层次化指标与视觉 grounding 评分的设想，但**未给出具体方案或验证**。
- **部署与社会技术层面讨论偏浅**：作者自述对用户中心评测、系统集成、部署可扩展性以及数据质量、标注一致性、跨域迁移等分析仍属初步。
- **安全与鲁棒性分析偏定性**：虽指出跨模态攻击面、知识投毒、来源溯源等问题，但缺乏系统性的攻击–防御实验证据。
- **时效性压力**：领域更新极快，新数据集/模型/评测协议持续涌现，静态综述易过时（作者以"定期更新"作为缓解）。
- **应用限制**：高风险的金融、医疗、法律场景中，幻觉、偏见继承与不可验证生成仍是主要落地障碍。

（完）
