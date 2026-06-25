"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { sideHustles } from "@/data/hustles";
import Header from "@/components/Header";

export default function HustleDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id") || "";
  const hustle = sideHustles.find((h) => h.id === id);

  if (!hustle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="副业详情" showBack={true} />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">未找到该副业</h2>
            <button
              onClick={() => router.push("/")}
              className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    );
  }

  const difficultyColor = {
    "简单": "bg-green-100 text-green-700",
    "中等": "bg-amber-100 text-amber-700",
    "较难": "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={hustle.name} showBack={true} />

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl">
              💰
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{hustle.name}</h1>
              <p className="text-gray-600">{hustle.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-xs text-gray-500 mb-1">难度</div>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${difficultyColor[hustle.difficulty]}`}>
                {hustle.difficulty}
              </span>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-xs text-gray-500 mb-1">预期收入</div>
              <div className="text-sm font-bold text-amber-600">{hustle.potential}</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-xs text-gray-500 mb-1">分类</div>
              <div className="text-sm font-medium text-gray-700">{hustle.category}</div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="font-bold text-gray-900 mb-4">📋 要求条件</h2>
          <div className="space-y-3">
            {hustle.capital.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-xl">💰</span>
                <div>
                  <div className="text-sm text-gray-500">启动资金</div>
                  <div className="text-sm font-medium text-gray-900">{hustle.capital.join(" 或 ")}</div>
                </div>
              </div>
            )}
            {hustle.time.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-xl">⏰</span>
                <div>
                  <div className="text-sm text-gray-500">时间投入</div>
                  <div className="text-sm font-medium text-gray-900">{hustle.time.join(" 或 ")}</div>
                </div>
              </div>
            )}
            {hustle.skills.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-xl">💡</span>
                <div>
                  <div className="text-sm text-gray-500">所需技能</div>
                  <div className="text-sm font-medium text-gray-900">{hustle.skills.join("、")}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="font-bold text-gray-900 mb-4">📝 操作步骤</h2>
          <div className="space-y-4">
            {hustle.steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 p-3 bg-gray-50 rounded-lg text-gray-700 text-sm">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">小贴士</h3>
              <p className="text-amber-800 text-sm">{hustle.tips}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => router.push(`/guide?name=${hustle.name}`)}
            className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
          >
            开始执行 →
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `钱途推荐：${hustle.name}`,
                  text: `${hustle.description}，预期${hustle.potential}`,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("链接已复制");
              }
            }}
            className="px-6 py-4 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
          >
            分享
          </button>
        </div>
      </div>
    </div>
  );
}
