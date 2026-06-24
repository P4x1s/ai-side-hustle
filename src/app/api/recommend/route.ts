import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { city, timePerDay, skills, capital, goal } = body;

    // For MVP, we'll use mock data
    // In production, this would call OpenAI API
    const recommendations = [
      {
        name: "社区团购团长",
        description: "帮小区邻居团购水果生鲜，每单赚佣金",
        difficulty: "简单",
        potential: "月入2000-5000元",
        steps: [
          "打开微信，搜索'美团优选'或'多多买菜'",
          "点击'成为团长'，按提示注册",
          "在小区业主群发布团购信息",
          "收集订单，汇总给平台",
          "通知邻居取货，完成交易",
        ],
        tips: "选择人多的小区，保持良好的服务态度，复购率会越来越高。",
      },
      {
        name: "闲鱼无货源卖货",
        description: "在闲鱼上卖货，不用囤货，赚差价",
        difficulty: "中等",
        potential: "月入1000-3000元",
        steps: [
          "下载闲鱼APP，注册账号",
          "在1688或拼多多找热门商品",
          "把商品信息搬运到闲鱼",
          "有人下单后，去上家下单发货",
          "赚取中间差价",
        ],
        tips: "选择轻小件商品，避免售后问题。保持每天上新，提高曝光率。",
      },
      {
        name: "短视频带货",
        description: "拍短视频推荐商品，赚佣金",
        difficulty: "中等",
        potential: "月入3000-10000元",
        steps: [
          "下载抖音APP，注册账号",
          "开通商品橱窗功能",
          "选择适合的商品（日用品、零食等）",
          "拍摄简单的使用视频",
          "挂上商品链接，有人购买赚佣金",
        ],
        tips: "不需要露脸，拍产品使用过程就行。保持每天更新，积累粉丝。",
      },
    ];

    return NextResponse.json({ recommendations });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
