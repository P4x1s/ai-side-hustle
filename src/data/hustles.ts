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
  // ===== 新增副业 =====
  {
    id: "douyin",
    name: "抖音中视频计划",
    description: "拍摄1分钟以上视频，按播放量赚收益",
    difficulty: "中等",
    potential: "月入2000-20000元",
    capital: ["没有", "1000以内"],
    time: ["1-3小时", "3-5小时"],
    skills: ["拍照、拍视频"],
    steps: [
      "下载抖音APP，注册账号",
      "开通中视频计划（需发布3个1分钟以上原创视频）",
      "选择你擅长的领域（美食、生活、知识等）",
      "每天发布1-2个1分钟以上的视频",
      "视频播放量达到1万即可获得收益",
      "持续更新，积累粉丝，收益会越来越高",
    ],
    tips: "视频要原创，不要搬运。前3秒要吸引人，内容要有价值。",
    category: "内容",
  },
  {
    id: "xiaohongshu",
    name: "小红书种草笔记",
    description: "写种草笔记，接品牌推广赚钱",
    difficulty: "中等",
    potential: "月入1000-10000元",
    capital: ["没有", "1000以内"],
    time: ["1-3小时", "3-5小时"],
    skills: ["拍照、拍视频", "写作/文案"],
    steps: [
      "下载小红书APP，注册账号",
      "确定你的领域（美妆、穿搭、美食、家居等）",
      "每周发布3-5篇高质量笔记",
      "粉丝达到1000后，开通蒲公英平台",
      "在蒲公英接品牌推广任务",
      "按照品牌要求写种草笔记，获得推广费",
    ],
    tips: "图片要精美，文案要真实。不要过度营销，保持真实感。",
    category: "内容",
  },
  {
    id: "baijiahao",
    name: "百家号图文创作",
    description: "在百度百家号写文章，按阅读量赚收益",
    difficulty: "简单",
    potential: "月入500-5000元",
    capital: ["没有"],
    time: ["1-3小时"],
    skills: ["写作/文案"],
    steps: [
      "注册百家号账号",
      "选择你擅长的领域",
      "每天发布1-2篇原创文章",
      "文章质量越高，推荐量越大",
      "阅读量达到一定标准后开通收益",
      "持续输出优质内容，收益稳定增长",
    ],
    tips: "标题要吸引人，内容要有价值。坚持原创，不要抄袭。",
    category: "内容",
  },
  {
    id: "waimai",
    name: "外卖骑手兼职",
    description: "利用空闲时间送外卖，时间自由",
    difficulty: "简单",
    potential: "月入3000-8000元",
    capital: ["没有"],
    time: ["3-5小时", "5小时以上"],
    skills: [],
    steps: [
      "下载美团众包或蜂鸟众包APP",
      "完成注册和实名认证",
      "熟悉配送区域的地图",
      "选择高峰期接单（11-13点、17-19点）",
      "按照导航取餐送餐",
      "送达后确认完成，等待结算",
    ],
    tips: "高峰期单多，注意交通安全。熟悉区域后效率会提高很多。",
    category: "服务",
  },
  {
    id: "dianping",
    name: "大众点评霸王餐",
    description: "免费吃喝，写好评赚佣金",
    difficulty: "简单",
    potential: "月入500-2000元",
    capital: ["没有"],
    time: ["1-3小时"],
    skills: ["拍照、拍视频", "写作/文案"],
    steps: [
      "下载大众点评APP，升级到V4以上",
      "加入本地探店群，获取商家信息",
      "申请霸王餐活动",
      "去店铺体验，拍摄真实照片",
      "撰写详细好评（200字以上）",
      "提交给商家审核，获得免费体验或佣金",
    ],
    tips: "保持真实，不要过度美化。积累好评等级，获得更多机会。",
    category: "体验",
  },
  {
    id: "shougong",
    name: "手工DIY售卖",
    description: "制作手工艺品，在网上卖",
    difficulty: "中等",
    potential: "月入1000-5000元",
    capital: ["500以内", "500-2000"],
    time: ["1-3小时", "3-5小时"],
    skills: ["手工/手作"],
    steps: [
      "选择一种手工（编织、串珠、钩针等）",
      "购买基础材料（100-300元）",
      "学习制作简单款式",
      "制作3-5件成品",
      "拍照上传到闲鱼或小红书",
      "有订单后开始稳定制作",
    ],
    tips: "从简单的款式开始，在小红书分享制作过程可以引流。",
    category: "手工",
  },
  {
    id: "hongbei",
    name: "私房烘焙",
    description: "在家做蛋糕、饼干卖给邻居",
    difficulty: "中等",
    potential: "月入3000-10000元",
    capital: ["1000-5000"],
    time: ["3-5小时", "5小时以上"],
    skills: ["做饭/烘焙", "拍照、拍视频"],
    steps: [
      "购买基础工具（烤箱+模具约500元）",
      "学习制作简单的杯子蛋糕、饼干",
      "先做给朋友试吃，收集反馈",
      "在朋友圈和小红书发布",
      "接受预订，按订单制作",
      "积累回头客，扩大口碑",
    ],
    tips: "先从简单的款式开始，保证食品安全，办个健康证。",
    category: "美食",
  },
  {
    id: "jiaoxue",
    name: "线上教学/培训",
    description: "在网上教别人你擅长的东西",
    difficulty: "中等",
    potential: "月入3000-20000元",
    capital: ["没有"],
    time: ["1-3小时", "3-5小时"],
    skills: ["教学/培训"],
    steps: [
      "确定你要教什么（英语、编程、健身等）",
      "录制3-5节免费试听课",
      "在小红书、抖音发布引流",
      "建立付费课程（知识星球、小鹅通等）",
      "定期更新内容，保持活跃",
      "建立学员社群，提高复购率",
    ],
    tips: "先免费教几个人，积累口碑后再收费。内容要有干货。",
    category: "教育",
  },
  {
    id: "duanzi",
    name: "文案代写",
    description: "帮别人写文案、演讲稿、总结等",
    difficulty: "中等",
    potential: "月入2000-8000元",
    capital: ["没有"],
    time: ["1-3小时", "3-5小时"],
    skills: ["写作/文案"],
    steps: [
      "在闲鱼、淘宝发布代写服务",
      "准备几篇样稿展示能力",
      "接单后了解客户需求",
      "撰写文案，反复修改",
      "交付作品，获得报酬",
      "积累口碑，发展长期客户",
    ],
    tips: "先低价接几单积累好评，后期可以提价。保持专业和耐心。",
    category: "服务",
  },
  {
    id: "pinduoduo",
    name: "拼多多无货源店群",
    description: "开拼多多店铺，不用囤货",
    difficulty: "中等",
    potential: "月入2000-10000元",
    capital: ["1000-5000"],
    time: ["3-5小时", "5小时以上"],
    skills: ["网购、比价"],
    steps: [
      "注册拼多多店铺（需要营业执照）",
      "在1688或淘宝找热门商品",
      "批量上架到自己的店铺",
      "有人下单后，去上家下单发货",
      "处理售后问题",
      "持续优化商品和运营",
    ],
    tips: "需要营业执照，可以找代办。注意平台规则，避免违规。",
    category: "电商",
  },
  {
    id: "zhubo",
    name: "直播带货",
    description: "开直播卖货，赚佣金",
    difficulty: "较难",
    potential: "月入5000-50000元",
    capital: ["1000-5000"],
    time: ["3-5小时", "5小时以上"],
    skills: ["销售/沟通", "拍照、拍视频"],
    steps: [
      "选择直播平台（抖音、快手等）",
      "确定直播品类（服装、美妆、食品等）",
      "准备直播设备（手机+支架+灯光）",
      "每天固定时间开播（建议2-4小时）",
      "与观众互动，介绍产品",
      "引导下单，处理售后",
    ],
    tips: "刚开始不要急着卖货，先积累粉丝。真实比套路更重要。",
    category: "内容",
  },
  {
    id: "zhongjie",
    name: "信息中介",
    description: "连接供需双方，赚取中介费",
    difficulty: "中等",
    potential: "月入3000-20000元",
    capital: ["没有"],
    time: ["1-3小时", "3-5小时"],
    skills: ["销售/沟通"],
    steps: [
      "确定你熟悉的领域（租房、招聘、二手等）",
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
    id: "jianshu",
    name: "简书/公众号写作",
    description: "写文章赚打赏和广告收益",
    difficulty: "中等",
    potential: "月入500-5000元",
    capital: ["没有"],
    time: ["1-3小时", "3-5小时"],
    skills: ["写作/文案"],
    steps: [
      "注册简书或公众号账号",
      "确定写作领域（职场、情感、生活等）",
      "每周发布2-3篇原创文章",
      "文章质量越高，阅读量越大",
      "开通打赏和广告收益",
      "持续输出，积累读者",
    ],
    tips: "坚持原创，保持更新频率。找到自己的写作风格。",
    category: "内容",
  },
  {
    id: "baodian",
    name: "本地跑腿/代办",
    description: "帮人排队、取送文件、办事",
    difficulty: "简单",
    potential: "月入2000-6000元",
    capital: ["没有"],
    time: ["3-5小时", "5小时以上"],
    skills: [],
    steps: [
      "在朋友圈发布跑腿服务",
      "说明你能提供的服务（排队、取送、代办等）",
      "定价合理（参考市场价）",
      "接单后按时完成",
      "积累口碑，发展回头客",
      "建立自己的服务群",
    ],
    tips: "选择你熟悉的区域，保证服务质量。时间观念很重要。",
    category: "服务",
  },
  {
    id: "zhuanye",
    name: "专业技能接单",
    description: "利用你的专业技能接私活",
    difficulty: "较难",
    potential: "月入5000-30000元",
    capital: ["没有"],
    time: ["3-5小时", "5小时以上"],
    skills: ["编程/技术", "设计/美工"],
    steps: [
      "确定你的专业技能（设计、开发、翻译等）",
      "在猪八戒、一品威客等平台注册",
      "准备作品集，展示能力",
      "竞标项目，报价合理",
      "按时交付，积累好评",
      "发展长期客户，提高复购率",
    ],
    tips: "专业技能是最有价值的副业方向。持续学习，保持竞争力。",
    category: "专业",
  },
];

// 根据用户情况推荐副业（增强版匹配算法）
export function getRecommendations(user: {
  city: string;
  cityType: string;
  age: string;
  education: string;
  currentStatus: string;
  timePerDay: string;
  weekend: string;
  skills: string;
  interests: string;
  experience: string;
  capital: string;
  riskLevel: string;
  goal: string;
  urgency: string;
}): SideHustle[] {
  const scored = sideHustles.map((hustle) => {
    let score = 0;

    // 1. 资金匹配（权重3）
    if (hustle.capital.includes(user.capital)) score += 3;

    // 2. 时间匹配（权重3）
    if (hustle.time.includes(user.timePerDay)) score += 3;

    // 3. 技能匹配（权重2）
    const userSkills = user.skills.split(", ").filter(Boolean);
    userSkills.forEach((skill) => {
      if (hustle.skills.some(s => skill.includes(s) || s.includes(skill))) score += 2;
    });

    // 4. 兴趣匹配（权重2）
    const userInterests = user.interests.split(", ").filter(Boolean);
    if (hustle.category && userInterests.some(i => hustle.category.includes(i) || i.includes(hustle.category))) {
      score += 2;
    }

    // 5. 收入目标匹配（权重2）
    const goalNum = parseInt(user.goal?.split("-")[0]) || 3000;
    const potentialMatch = hustle.potential.match(/(\d+)-(\d+)/);
    if (potentialMatch) {
      const minPotential = parseInt(potentialMatch[1]);
      const maxPotential = parseInt(potentialMatch[2]);
      if (goalNum >= minPotential && goalNum <= maxPotential) {
        score += 3; // 完美匹配
      } else if (goalNum <= maxPotential) {
        score += 1; // 可能达到
      }
    }

    // 6. 难度匹配（根据经验调整）
    if (user.experience === "没做过") {
      if (hustle.difficulty === "简单") score += 2;
    } else if (user.experience === "有稳定副业") {
      if (hustle.difficulty === "较难") score += 2;
    } else {
      if (hustle.difficulty === "中等") score += 1;
    }

    // 7. 城市类型匹配
    if (user.cityType === "农村" || user.cityType === "三线及以下") {
      // 小城市/农村更适合本地服务
      if (hustle.category === "服务" || hustle.category === "本地") score += 2;
    }

    // 8. 当前状态匹配
    if (user.currentStatus === "全职妈妈/爸爸") {
      // 在家能做的副业更适合
      if (hustle.time.includes("1-3小时") || hustle.time.includes("1小时以内")) score += 1;
    }

    // 9. 紧急程度匹配
    if (user.urgency === "非常急" || user.urgency === "比较急") {
      // 简单、快速上手的副业更适合
      if (hustle.difficulty === "简单") score += 1;
    }

    // 10. 风险承受匹配
    if (user.riskLevel === "零风险") {
      if (hustle.capital.includes("没有")) score += 2;
    }

    return { ...hustle, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5); // 返回前5个推荐
}
