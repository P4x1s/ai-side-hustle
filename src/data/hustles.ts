export interface SideHustle {
  id: string;
  name: string;
  description: string;
  difficulty: "简单" | "中等" | "较难";
  potential: string;
  capital: string[];
  time: string[];
  skills: string[];
  steps: string[];
  tips: string;
  category: string;
}

export const sideHustles: SideHustle[] = [
  // ===== 零成本 / 时间少 =====
  {
    id: "xianyu",
    name: "闲鱼无货源卖货",
    description: "在闲鱼上卖货，不用囤货，赚差价",
    difficulty: "简单",
    potential: "月入1000-3000元",
    capital: ["没有", "1000以内"],
    time: ["1小时以内", "1-3小时"],
    skills: ["发朋友圈、聊天", "网购、比价"],
    steps: [
      "下载闲鱼APP，用手机号注册",
      "打开1688.com，搜索热门商品（手机壳、数据线、收纳盒）",
      "复制商品图片和描述，发布到闲鱼",
      "有人下单后，去1688下单填买家地址",
      "1688发货后，把快递单号填到闲鱼",
      "买家确认收货，你赚取差价",
    ],
    tips: "选择轻小件、不易碎的商品。每天上新3-5个商品，提高曝光率。",
    category: "电商",
  },
  {
    id: "tuangou",
    name: "社区团购团长",
    description: "帮小区邻居团购水果生鲜，每单赚佣金",
    difficulty: "简单",
    potential: "月入2000-5000元",
    capital: ["没有", "1000以内"],
    time: ["1-3小时", "3-5小时"],
    skills: ["发朋友圈、聊天"],
    steps: [
      "打开微信，搜索'美团优选'或'多多买菜'",
      "点击'成为团长'，按提示注册",
      "在小区业主群发布第一条团购信息",
      "收集邻居订单，汇总提交给平台",
      "到货后通知邻居取货",
      "完成交易，佣金到账",
    ],
    tips: "选择人多的小区，保持良好的服务态度，复购率会越来越高。",
    category: "社区",
  },
  {
    id: "paotui",
    name: "跑腿代办",
    description: "帮人排队、取送文件、办事",
    difficulty: "简单",
    potential: "月入2000-4000元",
    capital: ["没有"],
    time: ["3-5小时", "5小时以上"],
    skills: ["发朋友圈、聊天", "基本办公"],
    steps: [
      "下载UU跑腿或闪送APP",
      "完成注册和实名认证",
      "在熟悉区域接第一单",
      "按要求完成任务（取送/排队等）",
      "完成后确认收款",
      "积累好评，提高接单量",
    ],
    tips: "选择熟悉的区域接单，注意安全，保持礼貌。",
    category: "服务",
  },
  {
    id: "duanshipin",
    name: "短视频带货",
    description: "拍短视频推荐商品，赚佣金",
    difficulty: "中等",
    potential: "月入3000-10000元",
    capital: ["没有", "1000以内"],
    time: ["1-3小时", "3-5小时"],
    skills: ["拍照、拍视频", "发朋友圈、聊天"],
    steps: [
      "下载抖音APP，注册并完善资料",
      "发布10条日常视频，积累基础粉丝",
      "粉丝达到1000后，开通商品橱窗",
      "在选品中心选择佣金高的商品",
      "拍摄商品使用视频，挂上链接",
      "有人购买，你赚佣金",
    ],
    tips: "不需要露脸，拍产品使用过程就行。保持每天更新，积累粉丝。",
    category: "内容",
  },
  {
    id: "shougong",
    name: "手工制品售卖",
    description: "做手工艺品在网上卖",
    difficulty: "中等",
    potential: "月入1000-5000元",
    capital: ["1000以内", "1000-5000"],
    time: ["1-3小时", "3-5小时"],
    skills: ["拍照、拍视频"],
    steps: [
      "选择一种简单手工（编织/串珠等）",
      "购买基础材料（100元以内）",
      "制作3-5件成品",
      "拍照上传到闲鱼",
      "定价：材料费+时间（每小时20元）",
      "有订单后开始稳定制作",
    ],
    tips: "从简单的款式开始，逐步提高。在小红书分享制作过程可以引流。",
    category: "手工",
  },
  {
    id: "hongbei",
    name: "私房烘焙",
    description: "在家做蛋糕、饼干卖给邻居",
    difficulty: "中等",
    potential: "月入3000-8000元",
    capital: ["1000-5000", "5000以上"],
    time: ["3-5小时", "5小时以上"],
    skills: ["拍照、拍视频"],
    steps: [
      "购买基础工具（烤箱+模具约500元）",
      "学习制作简单的杯子蛋糕",
      "先做给朋友试吃，收集反馈",
      "在朋友圈发布，接受预订",
      "按订单制作，保证新鲜",
      "积累回头客，扩大口碑",
    ],
    tips: "先从简单的杯子蛋糕开始，保证食品安全，办个健康证。",
    category: "美食",
  },
  {
    id: "zimeiti",
    name: "本地自媒体",
    description: "拍本地生活内容，接广告赚钱",
    difficulty: "中等",
    potential: "月入2000-10000元",
    capital: ["没有", "1000以内"],
    time: ["1-3小时", "3-5小时"],
    skills: ["拍照、拍视频", "发朋友圈、聊天"],
    steps: [
      "确定内容方向（美食探店、生活vlog）",
      "每天发布1-2条短视频",
      "坚持30天，积累1000粉丝",
      "开通创作者收益",
      "联系本地商家谈合作",
      "发展粉丝社群",
    ],
    tips: "真实比精致更重要，坚持更新是关键。",
    category: "内容",
  },
  {
    id: "jiaoxue",
    name: "技能教学",
    description: "教别人你会的东西",
    difficulty: "中等",
    potential: "月入3000-10000元",
    capital: ["没有"],
    time: ["1-3小时", "3-5小时"],
    skills: ["基本办公"],
    steps: [
      "确定你要教什么（做饭/化妆/健身）",
      "录制3节免费试听课",
      "在小红书发布，吸引关注",
      "收集反馈，优化内容",
      "开设付费课程（99元起）",
      "建立学员社群，持续服务",
    ],
    tips: "先免费教几个人，积累口碑后再收费。",
    category: "教育",
  },
  {
    id: "dianping",
    name: "大众点评探店",
    description: "去店铺体验，写好评赚佣金",
    difficulty: "简单",
    potential: "月入500-2000元",
    capital: ["没有"],
    time: ["1-3小时"],
    skills: ["拍照、拍视频", "发朋友圈、聊天"],
    steps: [
      "下载大众点评APP，升级到V4以上",
      "加入本地探店群，获取商家信息",
      "去店铺体验，拍摄真实照片",
      "撰写详细好评（200字以上）",
      "提交给商家审核",
      "获得佣金或免费体验",
    ],
    tips: "保持真实，不要过度美化。积累好评等级，获得更多机会。",
    category: "内容",
  },
  {
    id: "dai xie",
    name: "代写文案",
    description: "帮商家写朋友圈文案、小红书笔记",
    difficulty: "中等",
    potential: "月入2000-5000元",
    capital: ["没有"],
    time: ["1-3小时", "3-5小时"],
    skills: ["基本办公"],
    steps: [
      "在闲鱼发布'代写文案'服务",
      "准备几篇样稿展示能力",
      "接单后了解客户需求",
      "撰写文案，反复修改",
      "交付作品，获得报酬",
      "积累口碑，发展长期客户",
    ],
    tips: "先低价接几单积累好评，后期可以提价。",
    category: "内容",
  },
  {
    id: "waimai",
    name: "外卖骑手",
    description: "送外卖，时间自由",
    difficulty: "简单",
    potential: "月入4000-8000元",
    capital: ["没有"],
    time: ["3-5小时", "5小时以上"],
    skills: ["发朋友圈、聊天"],
    steps: [
      "下载美团众包或蜂鸟众包",
      "完成注册和实名认证",
      "熟悉配送区域",
      "接单后按导航取餐送餐",
      "送达后确认完成",
      "积累好评，提高接单优先级",
    ],
    tips: "高峰期（11-13点、17-19点）单多，注意交通安全。",
    category: "服务",
  },
  {
    id: "pingjia",
    name: "淘宝评价师",
    description: "帮商家刷好评，赚佣金",
    difficulty: "简单",
    potential: "月入500-1500元",
    capital: ["没有"],
    time: ["1小时以内", "1-3小时"],
    skills: ["网购、比价"],
    steps: [
      "加入淘宝刷单QQ群/微信群",
      "选择合适的任务",
      "按要求下单、收货、写好评",
      "截图发给商家审核",
      "获得佣金（本金退还）",
      "积累信誉，获得更多任务",
    ],
    tips: "选择信誉好的商家，避免被骗。不要做违规操作。",
    category: "电商",
  },
  {
    id: "daili",
    name: "微商代理",
    description: "代理品牌产品，在朋友圈销售",
    difficulty: "中等",
    potential: "月入2000-10000元",
    capital: ["1000-5000"],
    time: ["1-3小时", "3-5小时"],
    skills: ["发朋友圈、聊天", "拍照、拍视频"],
    steps: [
      "选择靠谱的品牌和产品",
      "了解产品特点和价格",
      "在朋友圈发布产品信息",
      "解答客户咨询",
      "处理订单和售后",
      "发展代理，扩大团队",
    ],
    tips: "选择自己用过的好产品，真诚推荐比硬广更有效。",
    category: "电商",
  },
  {
    id: "sheji",
    name: "简单设计接单",
    description: "用Canva做简单设计，接单赚钱",
    difficulty: "中等",
    potential: "月入2000-5000元",
    capital: ["没有"],
    time: ["1-3小时", "3-5小时"],
    skills: ["基本办公"],
    steps: [
      "学习Canva基础操作",
      "制作几套设计模板",
      "在闲鱼发布设计服务",
      "接单后按客户需求修改",
      "交付作品，获得报酬",
      "积累作品集，提高报价",
    ],
    tips: "从简单的Logo、海报开始，逐步提高难度。",
    category: "设计",
  },
  {
    id: "fan yi",
    name: "简单翻译",
    description: "帮人翻译简单文档",
    difficulty: "中等",
    potential: "月入1000-3000元",
    capital: ["没有"],
    time: ["1-3小时", "3-5小时"],
    skills: ["基本办公"],
    steps: [
      "确认你的语言能力",
      "在闲鱼发布翻译服务",
      "接单后认真翻译",
      "检查语法和拼写",
      "交付翻译稿",
      "积累口碑，发展长期客户",
    ],
    tips: "从简单的短文开始，不要接超出能力的单子。",
    category: "教育",
  },
  {
    id: "paimai",
    name: "二手物品倒卖",
    description: "低价买入二手物品，高价卖出",
    difficulty: "中等",
    potential: "月入1000-5000元",
    capital: ["1000-5000"],
    time: ["1-3小时", "3-5小时"],
    skills: ["网购、比价"],
    steps: [
      "在闲鱼、转转寻找低价商品",
      "评估商品价值和转卖空间",
      "低价买入，清洁整理",
      "拍照上传到闲鱼",
      "定价合理，快速出手",
      "积累经验，提高眼光",
    ],
    tips: "选择自己熟悉的领域，电子产品、书籍比较好卖。",
    category: "电商",
  },
  {
    id: "dai pao",
    name: "游戏代练",
    description: "帮人打游戏升级",
    difficulty: "较难",
    potential: "月入2000-8000元",
    capital: ["没有"],
    time: ["3-5小时", "5小时以上"],
    skills: ["以上都不会"],
    steps: [
      "选择你擅长的游戏",
      "在游戏里展示技术",
      "在贴吧、QQ群接单",
      "按客户要求代练",
      "完成后收款",
      "积累口碑，提高价格",
    ],
    tips: "注意账号安全，不要用外挂。",
    category: "游戏",
  },
  {
    id: "xuexiao",
    name: "作业辅导",
    description: "帮小学生辅导作业",
    difficulty: "中等",
    potential: "月入2000-5000元",
    capital: ["没有"],
    time: ["1-3小时", "3-5小时"],
    skills: ["基本办公"],
    steps: [
      "确定辅导科目（数学/语文/英语）",
      "在小区业主群发布辅导信息",
      "了解学生情况，制定辅导计划",
      "每周固定时间辅导",
      "与家长保持沟通",
      "积累口碑，发展更多学生",
    ],
    tips: "耐心很重要，多鼓励孩子。可以几个人一起拼班。",
    category: "教育",
  },
  {
    id: "zhongjie",
    name: "信息中介",
    description: "连接供需双方，赚取中介费",
    difficulty: "中等",
    potential: "月入3000-10000元",
    capital: ["没有"],
    time: ["1-3小时", "3-5小时"],
    skills: ["发朋友圈、聊天"],
    steps: [
      "确定你熟悉的领域（租房/招聘/二手）",
      "收集供需信息",
      "在朋友圈和社群发布",
      "匹配供需双方",
      "促成交易，收取中介费",
      "建立信息网络，扩大资源",
    ],
    tips: "诚信第一，不要虚假信息。建立长期合作关系。",
    category: "服务",
  },
  {
    id: "zhubo",
    name: "直播带货",
    description: "开直播卖货",
    difficulty: "较难",
    potential: "月入5000-50000元",
    capital: ["1000-5000"],
    time: ["3-5小时", "5小时以上"],
    skills: ["拍照、拍视频", "发朋友圈、聊天"],
    steps: [
      "选择直播平台（抖音/快手）",
      "确定直播品类",
      "准备直播设备（手机+支架）",
      "每天固定时间开播",
      "与观众互动，介绍产品",
      "引导下单，处理售后",
    ],
    tips: "刚开始不要急着卖货，先积累粉丝。真实比套路更重要。",
    category: "内容",
  },
];

// 根据用户情况推荐副业
export function getRecommendations(user: {
  city: string;
  timePerDay: string;
  skills: string;
  capital: string;
  goal: string;
}): SideHustle[] {
  const scored = sideHustles.map((hustle) => {
    let score = 0;

    // 资金匹配
    if (hustle.capital.includes(user.capital)) score += 3;

    // 时间匹配
    if (hustle.time.includes(user.timePerDay)) score += 3;

    // 技能匹配
    const userSkills = user.skills.split(", ");
    userSkills.forEach((skill) => {
      if (hustle.skills.includes(skill)) score += 1;
    });

    // 收入目标匹配
    const goalNum = parseInt(user.goal) || 3000;
    const potentialNum = parseInt(hustle.potential.match(/\d+/)?.[0] || "2000");
    if (potentialNum >= goalNum * 0.5) score += 1;

    // 难度加分（简单更容易得高分）
    if (hustle.difficulty === "简单") score += 1;

    return { ...hustle, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3);
}
