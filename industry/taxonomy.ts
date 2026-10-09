// 这个行业的分类体系：类别、标签词表、公司（主体）名录，以及防止张冠李戴的身份词典。
// 模型按这里的词表打标签，主题页（topics.json）按标签归类，筛选栏按类别分组。
// 换行业时：类别的 key 会出现在网址里（/all?category=…），上线后就不要再改；标签和名录可以随时增减。
//
// 当前是「广告行业」的草稿：类别、标签和公司都还要站长本人确认，上线前定下类别的 key。

/**
 * 网页上的类别（筛选栏、卡片角标、RSS 分类订阅）。key 是网址和接口里的身份，上线后不要改。
 * section 是日报里的分节标题（几个类别可以共用一节，按这里的顺序排）；guide 告诉结构抽取模型这一类收什么、
 * 和相邻类别的边界在哪（总的归类原则写在 prompts/structure.md 里）。
 * commentary 标出评论类（教程、观点）：日报写过的事又有评论类的后续报道，只占一行快讯（报道它的信源够多时除外）。
 * 没归上类的资料在日报里放进第一个 key 为 industry 的类别所在的节（没有就放最后一节）。
 * feedLabel 是分类 RSS 标题里的名字（不写就用 label）。公开接口、RSS 和 MCP 里要把一类并进另一类发布，写在站点设置里（site/site.ts 的 PUBLIC_CATEGORIES）。
 */
export const CATEGORIES = [
  { key: "creative", label: "创意", feedLabel: "广告创意", section: "创意与作品", guide: "已上线的广告作品、品牌战役、短片、户外与互动创意，以及广告奖项的入围与获奖结果。重点是作品本身和它的创意做法；只讲投放预算或渠道归媒体，只讲代理商赢得客户归行业。" },
  { key: "media", label: "媒体", feedLabel: "媒体与平台", section: "媒体与平台", guide: "媒体与广告平台的变化：平台广告产品、广告格式、算法与政策调整、电视与流媒体广告、零售媒体、户外媒体、媒介采购与刊例价格。平台推出新广告产品归这里，不因为用了 AI 就归技术。" },
  { key: "adtech", label: "技术", feedLabel: "广告技术", section: "技术与数据", guide: "广告技术与数据：程序化交易、效果衡量与归因、隐私与身份标识、品牌安全、营销 AI 工具与自动化。以技术方案、数据能力或标准为核心；平台面向广告主的新广告产品归媒体。" },
  { key: "industry", label: "行业", feedLabel: "行业动态", section: "行业动态", guide: "已发生的公司经营事件：控股集团与代理商的财报、并购、重组、裁员，比稿与客户变动，人事任命，诉讼与监管处罚。新闻由当事人发帖、带有态度，也不因此变成观点。" },
  { key: "research", label: "报告", feedLabel: "数据与报告", section: "数据与报告", guide: "以数据为核心的行业研究：广告支出预测、市场份额、消费者调研、行业白皮书与排行榜。只是引用一两个数字来支持观点的文章归观点。" },
  { key: "case", label: "案例", feedLabel: "案例与方法", section: "案例与观点", guide: "读者可以借鉴的做法：战役复盘、案例拆解、投放与创意方法、工具用法讲解。重点是可复用的做法；单纯展示作品归创意，只有态度和预测而无做法归观点。", commentary: true },
  { key: "opinion", label: "观点", section: "案例与观点", guide: "重点是作者的解释、判断、主张、预测、评论或访谈观点。讨论市场不自动归行业，作者是知名创意人或高管不自动归观点。", commentary: true },
] as const satisfies ReadonlyArray<{ key: string; label: string; feedLabel?: string; section: string; guide: string; commentary?: true }>;

/**
 * 这个行业最受关注的一类发布（AI 行业是新模型）：日报报头的“N 个新模型”、改分类后修订已出的报告都按它数。
 * category 是类别，tag 是标签，两者都对上才算；unit 接在数字后面。
 * 没有这样一类的行业设成 null，报头就不显示这个数。
 * 广告行业草稿：数当天新上线的广告战役（站长可以改成 null，或换成别的一类）。
 */
export const RELEASE: { category: string; tag: string; unit: string } | null = { category: "creative", tag: "广告战役", unit: "个新战役" };

/** 周报月报的总述可以直接写、不必在报道里找到出处的行业通用词（小写）。站名会自动算在内。 */
export const PLAIN_TERMS: readonly string[] = ["ai", "cmo", "ceo", "ctv", "roi", "kpi", "dsp", "ssp", "kol", "ip"];

/**
 * 内容理解一步给每篇资料判的“内容类型”（写在 prompts/content-understanding.md 里，改了类型要同步改那份提示词）。
 * 评分提示词（prompts/selection-score.md）按类型给五个维度不同的权重。
 */
export const ITEM_TYPES = ["campaign_launch", "platform_update", "award_result", "industry_event", "research_report", "opinion_analysis", "case_study"] as const;

// ── 标签词表 ────────────────────────────────────────────────────────────────────────────

/** 每篇资料的第一个标签必须是这些“分类标签”之一。 */
export const CATEGORY_TAGS = [
  "广告战役", "创意作品", "奖项/评选", "平台/广告产品", "媒介/投放", "广告技术", "数据/报告", "比稿/客户变动", "公司/财报", "并购/投资", "人事变动",
  "政策/监管", "案例/方法", "观点/趋势", "非广告/无关", "其他",
] as const;

/** 可选的主题标签。 */
export const TOPIC_TAGS = [
  "AI营销", "AIGC创意", "社交媒体", "短视频", "达人/KOL", "零售媒体", "电商广告", "CTV/流媒体", "户外广告", "搜索广告", "程序化", "效果衡量",
  "隐私/数据", "品牌安全", "体育营销", "出海营销",
] as const;

/** 可选的实体标签（公司、机构、平台）。 */
export const ENTITY_TAGS = ["WPP", "阳狮", "宏盟", "电通", "哈瓦斯", "Google", "Meta", "Amazon", "TikTok", "戛纳狮子"] as const;

/** 模型常写的近义词，统一成词表里的写法。 */
export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  战役: "广告战役", campaign: "广告战役", 营销战役: "广告战役", 广告片: "创意作品", 短片: "创意作品", 作品: "创意作品", 创意: "创意作品",
  奖项: "奖项/评选", 获奖: "奖项/评选", 评选: "奖项/评选", 榜单: "奖项/评选",
  平台更新: "平台/广告产品", 广告产品: "平台/广告产品", 产品更新: "平台/广告产品",
  媒介: "媒介/投放", 投放: "媒介/投放", 媒介采购: "媒介/投放", 广告技术: "广告技术", adtech: "广告技术", 技术: "广告技术",
  报告: "数据/报告", 数据: "数据/报告", 研究: "数据/报告", 调研: "数据/报告", 预测: "数据/报告",
  比稿: "比稿/客户变动", 客户变动: "比稿/客户变动", 赢得客户: "比稿/客户变动", 丢失客户: "比稿/客户变动",
  财报: "公司/财报", 业绩: "公司/财报", 公司动态: "公司/财报", 行业动态: "公司/财报", 裁员: "公司/财报", 重组: "公司/财报",
  并购: "并购/投资", 收购: "并购/投资", 融资: "并购/投资", 投资: "并购/投资",
  人事: "人事变动", 任命: "人事变动", 离职: "人事变动",
  政策: "政策/监管", 监管: "政策/监管", 法规: "政策/监管", 处罚: "政策/监管",
  案例: "案例/方法", 复盘: "案例/方法", 方法: "案例/方法", 教程: "案例/方法", 拆解: "案例/方法",
  观点: "观点/趋势", 趋势: "观点/趋势", 评论: "观点/趋势", 访谈: "观点/趋势",
  "AI 营销": "AI营销", 生成式AI: "AIGC创意", AIGC: "AIGC创意", 网红营销: "达人/KOL", KOL: "达人/KOL", 达人: "达人/KOL", 红人: "达人/KOL",
  CTV: "CTV/流媒体", 流媒体: "CTV/流媒体", 联网电视: "CTV/流媒体", 户外: "户外广告", OOH: "户外广告", 归因: "效果衡量", 衡量: "效果衡量",
  隐私: "隐私/数据", 第一方数据: "隐私/数据", 出海: "出海营销",
  无关: "非广告/无关",
};

// ── 公司与主体 ──────────────────────────────────────────────────────────────────────────

/**
 * 公司主题：id → 显示名、卡片上显示的标签（null 表示只用 entity:<id> 归类）、别名。
 * aliases 给结构抽取模型看；otherNames 是公司自己的其他称呼（官方账号名、子品牌），
 * 把事实的主体对到发布方时也认它们。
 */
export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[]; otherNames?: string[] }> = {
  wpp: { name: "WPP", displayTag: "WPP", aliases: ["WPP", "群邑", "GroupM", "WPP Media", "奥美", "Ogilvy"], otherNames: ["VML", "Grey", "精信", "Mindshare", "尚扬", "EssenceMediacom", "Wavemaker"] },
  publicis: { name: "阳狮集团", displayTag: "阳狮", aliases: ["阳狮", "Publicis", "Publicis Groupe"], otherNames: ["Leo Burnett", "李奥贝纳", "Saatchi & Saatchi", "盛世长城", "Starcom", "实力传播", "Zenith", "Epsilon", "Sapient"] },
  omnicom: { name: "宏盟集团", displayTag: "宏盟", aliases: ["宏盟", "Omnicom", "Interpublic", "IPG"], otherNames: ["BBDO", "TBWA", "DDB", "OMD", "McCann", "麦肯", "FCB", "Omnicom Media"] },
  dentsu: { name: "电通", displayTag: "电通", aliases: ["电通", "Dentsu", "dentsu"], otherNames: ["Carat", "凯络", "iProspect", "Dentsu Creative"] },
  havas: { name: "哈瓦斯", displayTag: "哈瓦斯", aliases: ["哈瓦斯", "Havas"], otherNames: ["Havas Media", "Havas Creative"] },
  google: { name: "Google", displayTag: "Google", aliases: ["Google", "谷歌", "YouTube"], otherNames: ["Google Ads", "Google Marketing Platform", "YouTube Ads"] },
  meta: { name: "Meta", displayTag: "Meta", aliases: ["Meta", "Facebook", "Instagram"], otherNames: ["Meta Ads", "Advantage+", "WhatsApp"] },
  amazon: { name: "Amazon Ads", displayTag: "Amazon", aliases: ["Amazon", "亚马逊", "Amazon Ads"], otherNames: ["Prime Video Ads", "Amazon DSP"] },
  tiktok: { name: "TikTok / 字节跳动", displayTag: "TikTok", aliases: ["TikTok", "字节跳动", "巨量引擎", "抖音"], otherNames: ["TikTok for Business", "TikTok Shop", "ByteDance"] },
  alibaba: { name: "阿里妈妈", displayTag: null, aliases: ["阿里妈妈", "阿里巴巴", "淘宝", "天猫"], otherNames: ["Alimama", "Alibaba"] },
  tencent: { name: "腾讯广告", displayTag: null, aliases: ["腾讯广告", "腾讯", "微信广告"], otherNames: ["Tencent Ads", "Tencent"] },
  "the-trade-desk": { name: "The Trade Desk", displayTag: null, aliases: ["The Trade Desk", "TTD"], otherNames: ["Kokai"] },
  "cannes-lions": { name: "戛纳国际创意节", displayTag: "戛纳狮子", aliases: ["戛纳国际创意节", "戛纳狮子", "Cannes Lions"], otherNames: ["LIONS"] },
};

/**
 * 身份词典：摘要和标题里出现的公司，必须在原文里也出现过，否则退回原标题、丢掉摘要（防止模型张冠李戴）。
 * 行业没有这个问题时可以留空数组。
 */
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "wpp", name: "WPP", patterns: [/\bWPP\b|群邑|\bGroupM\b|奥美|\bOgilvy\b/i] },
  { id: "publicis", name: "阳狮集团", patterns: [/阳狮|\bPublicis\b|李奥贝纳|\bLeo Burnett\b/i] },
  { id: "omnicom", name: "宏盟集团", patterns: [/宏盟|\bOmnicom\b|\bInterpublic\b|\bIPG\b/i] },
  { id: "dentsu", name: "电通", patterns: [/电通|\bdentsu\b/i] },
  { id: "havas", name: "哈瓦斯", patterns: [/哈瓦斯|\bHavas\b/i] },
  { id: "google", name: "Google / YouTube", patterns: [/google|谷歌|youtube/i] },
  { id: "meta", name: "Meta", patterns: [/\bMeta\b/, /facebook|instagram/i] },
  { id: "amazon", name: "Amazon", patterns: [/amazon|亚马逊/i] },
  { id: "tiktok", name: "TikTok / 字节跳动", patterns: [/tiktok|字节跳动|bytedance|巨量引擎|抖音/i] },
  { id: "alibaba", name: "阿里妈妈", patterns: [/阿里妈妈|阿里巴巴|alibaba|alimama/i] },
  { id: "tencent", name: "腾讯广告", patterns: [/腾讯|tencent/i] },
  { id: "the-trade-desk", name: "The Trade Desk", patterns: [/the trade desk/i] },
  { id: "cannes-lions", name: "戛纳国际创意节", patterns: [/戛纳|cannes lions/i] },
];

/** 这些域名上的文章，发布方就是对应的公司（托管平台不算）。 */
export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  { entityId: "wpp", domains: ["wpp.com"] },
  { entityId: "publicis", domains: ["publicisgroupe.com"] },
  { entityId: "omnicom", domains: ["omnicomgroup.com"] },
  { entityId: "dentsu", domains: ["dentsu.com"] },
  { entityId: "havas", domains: ["havas.com"] },
  { entityId: "cannes-lions", domains: ["canneslions.com"] },
];

/** 原文里的这些写法也算提到了对应公司。 */
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [];
