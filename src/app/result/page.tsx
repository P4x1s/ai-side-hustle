"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface SideHustle {
  name: string;
  description: string;
  difficulty: string;
  potential: string;
  steps: string[];
  tips: string;
  适合?: { capital: string[]; time: string[] };
}

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<SideHustle[]>([]);
  const [selectedHustle, setSelectedHustle] = useState<SideHustle | null>(null);

  const formData = {
    city: searchParams.get("city") || "",
    timePerDay: searchParams.get("timePerDay") || "",
    skills: searchParams.get("skills") || "",
    capital: searchParams.get("capital") || "",
    goal: searchParams.get("goal") || "",
  };

  useEffect(() => {
    generateRecommendations();
  }, []);

  const generateRecommendations = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 根据用户情况生成不同的推荐
    const allHustles: SideHustle[] = [
      // 适合零成本、时间少的
      {
        name: "闲鱼无货源卖货",
        description: "在闲鱼上卖货，不用囤货，赚差价",
        difficulty: "简单",
        potential: "月入1000-3000元",
        steps: [
          "下载闲鱼APP，注册账号",
          "在1688或拼多多找热门商品",
          "把商品信息搬运到闲鱼",
          "有人下单后，去上家下单发货",
          "赚取中间差价",
        ],
        tips: "选择轻小件商品，避免售后问题。保持每天上新，提高曝光率。",
       适合: { capital: ["没有", "1000以内"], time: ["1小时以内", "1-3小时"] },
      },
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
        适合: { capital: ["没有", "1000以内"], time: ["1-3小时", "3-5小时"] },
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
        适合: { capital: ["没有", "1000以内", "1000-5000"], time: ["1-3小时", "3-5小时"] },
      },
      {
        name: "跑腿代办",
        description: "帮人排队、取送文件、办事",
        difficulty: "简单",
        potential: "月入2000-4000元",
        steps: [
          "下载UU跑腿或闪送APP",
          "注册并完成实名认证",
          "接单后按要求完成任务",
          "完成后确认收款",
          "积累好评，提高接单量",
        ],
        tips: "选择熟悉的区域接单，注意安全，保持礼貌。",
        适合: { capital: ["没有"], time: ["3-5小时", "5小时以上"] },
      },
      {
        name: "手工制品售卖",
        description: "做手工艺品在网上卖",
        difficulty: "中等",
        potential: "月入1000-5000元",
        steps: [
          "学习一种简单手工（编织、串珠等）",
          "制作成品，拍照上传",
          "在闲鱼或淘宝开店",
          "定价要考虑材料成本和时间",
          "积累口碑，发展定制业务",
        ],
        tips: "从简单的款式开始，逐步提高。在小红书分享制作过程可以引流。",
        适合: { capital: ["1000以内", "1000-5000"], time: ["1-3小时", "3-5小时"] },
      },
      {
        name: "私房烘焙",
        description: "在家做蛋糕、饼干卖给邻居",
        difficulty: "中等",
        potential: "月入3000-8000元",
        steps: [
          "购买基础烘焙工具和材料",
          "学习几款简单的蛋糕、饼干",
          "在朋友圈和业主群宣传",
          "接受预订，按订单制作",
          "积累客户，发展回头客",
        ],
        tips: "先从简单的杯子蛋糕开始，保证食品安全，办个健康证。",
        适合: { capital: ["1000-5000", "5000以上"], time: ["3-5小时", "5小时以上"] },
      },
      {
        name: "本地自媒体",
        description: "拍本地生活内容，接广告赚钱",
        difficulty: "中等",
        potential: "月入2000-10000元",
        steps: [
          "确定内容方向（美食探店、生活vlog等）",
          "每天发布1-2条短视频",
          "积累1000粉丝后开通收益",
          "接本地商家广告",
          "发展粉丝社群",
        ],
        tips: "真实比精致更重要，坚持更新是关键。",
        适合: { capital: ["没有", "1000以内"], time: ["1-3小时", "3-5小时"] },
      },
      {
        name: "技能教学",
        description: "教别人你会的东西",
        difficulty: "中等",
        potential: "月入3000-10000元",
        steps: [
          "确定你会教什么（做饭、化妆、健身等）",
          "录制几节免费试听课",
          "在小红书或抖音发布",
          "开设付费课程",
          "建立学员社群",
        ],
        tips: "先免费教几个人，积累口碑后再收费。",
        适合: { capital: ["没有"], time: ["1-3小时", "3-5小时"] },
      },
    ];

    // 根据用户情况筛选和排序
    const scored = allHustles.map((hustle) => {
      let score = 0;
      if (hustle.适合.capital.includes(formData.capital)) score += 2;
      if (hustle.适合.time.includes(formData.timePerDay)) score += 2;
      if (formData.skills.includes("发朋友圈")) score += 1;
      if (formData.skills.includes("拍照")) score += 1;
      return { ...hustle, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const recommendations = scored.slice(0, 3).map(({ score, ...rest }) => rest);

    setRecommendations(recommendations);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse-soft">🤖</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            AI正在分析你的情况...
          </h2>
          <p className="text-gray-500">正在为你量身定制副业方案</p>
        </div>
      </div>
    );
  }

  if (selectedHustle) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-2xl mx-auto flex items-center gap-4">
            <button
              onClick={() => setSelectedHustle(null)}
              className="text-gray-500"
            >
              ← 返回
            </button>
            <h1 className="text-lg font-bold">{selectedHustle.name}</h1>
          </div>
        </header>

        {/* Steps */}
        <main className="max-w-2xl mx-auto p-6">
          <div className="bg-white rounded-2xl p-6 card-shadow mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">📋</div>
              <div>
                <div className="text-sm text-gray-500">操作步骤</div>
                <div className="text-lg font-bold">跟着做就行</div>
              </div>
            </div>

            <div className="space-y-4">
              {selectedHustle.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 p-3 bg-gray-50 rounded-xl">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <div className="font-bold text-green-800 mb-1">小贴士</div>
                <div className="text-green-700">{selectedHustle.tips}</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              const params = new URLSearchParams({
                name: selectedHustle.name,
                steps: JSON.stringify(selectedHustle.steps),
              });
              router.push(`/guide?${params.toString()}`);
            }}
            className="w-full mt-6 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors"
          >
            我要开始做！
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-lg font-bold">你的副业方案</h1>
          <p className="text-sm text-gray-500">基于你的情况，AI为你推荐</p>
        </div>
      </header>

      {/* User Info */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-2xl p-4 card-shadow mb-6">
          <div className="text-sm text-gray-500 mb-2">你的情况</div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              📍 {formData.city}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              ⏰ {formData.timePerDay}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              💰 {formData.capital}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              🎯 {formData.goal}
            </span>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          {recommendations.map((hustle, index) => (
            <div
              key={index}
              onClick={() => setSelectedHustle(hustle)}
              className="bg-white rounded-2xl p-6 card-shadow cursor-pointer hover:shadow-lg transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {hustle.name}
                  </h3>
                  <p className="text-gray-600 mt-1">{hustle.description}</p>
                </div>
                <span className="text-2xl">
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                </span>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">难度：</span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      hustle.difficulty === "简单"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {hustle.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">预期收入：</span>
                  <span className="text-green-600 font-medium">
                    {hustle.potential}
                  </span>
                </div>
              </div>

              <div className="text-green-500 font-medium flex items-center gap-2">
                查看详细步骤 →
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full mt-6 py-4 bg-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-300 transition-colors"
        >
          重新诊断
        </button>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-pulse-soft">🤖</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">加载中...</h2>
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
