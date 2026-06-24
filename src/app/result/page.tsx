"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getRecommendations, SideHustle } from "@/data/hustles";
import { useLocalStorage } from "@/hooks/useLocalStorage";

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<SideHustle[]>([]);
  const [selectedHustle, setSelectedHustle] = useState<SideHustle | null>(null);
  const [history, setHistory] = useLocalStorage<SideHustle[]>("hustle-history", []);

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
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const recs = getRecommendations(formData);
    setRecommendations(recs);
    setLoading(false);
  };

  const handleSelect = (hustle: SideHustle) => {
    setSelectedHustle(hustle);
    // 保存到历史记录
    if (!history.find((h) => h.id === hustle.id)) {
      setHistory([...history, hustle]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-6xl mb-4 animate-pulse-soft">🤖</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">AI正在分析...</h2>
          <p className="text-gray-500">正在为你量身定制副业方案</p>
        </div>
      </div>
    );
  }

  if (selectedHustle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-2xl mx-auto flex items-center gap-4">
            <button onClick={() => setSelectedHustle(null)} className="text-gray-500 hover:text-gray-700">
              ← 返回
            </button>
            <h1 className="text-lg font-bold">{selectedHustle.name}</h1>
          </div>
        </header>

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
                <div key={index} className="flex gap-4 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 p-3 bg-gray-50 rounded-xl">{step}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 border border-green-200 mb-6">
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
              });
              router.push(`/guide?${params.toString()}`);
            }}
            className="w-full py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors"
          >
            我要开始做！
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-lg font-bold">你的副业方案</h1>
          <p className="text-sm text-gray-500">基于你的情况，AI为你推荐</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-2xl p-4 card-shadow mb-6">
          <div className="text-sm text-gray-500 mb-2">你的情况</div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">📍 {formData.city}</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">⏰ {formData.timePerDay}</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">💰 {formData.capital}</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">🎯 {formData.goal}</span>
          </div>
        </div>

        <div className="space-y-4">
          {recommendations.map((hustle, index) => (
            <div
              key={hustle.id}
              onClick={() => handleSelect(hustle)}
              className="bg-white rounded-2xl p-6 card-shadow cursor-pointer hover:shadow-lg transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{hustle.name}</h3>
                  <p className="text-gray-600 mt-1">{hustle.description}</p>
                </div>
                <span className="text-2xl">{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</span>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">难度：</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    hustle.difficulty === "简单" ? "bg-green-100 text-green-700" :
                    hustle.difficulty === "中等" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {hustle.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">预期收入：</span>
                  <span className="text-green-600 font-medium">{hustle.potential}</span>
                </div>
              </div>

              <div className="text-green-500 font-medium">查看详细步骤 →</div>
            </div>
          ))}
        </div>

        {history.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📚 历史推荐</h3>
            <div className="space-y-2">
              {history.slice(0, 5).map((hustle) => (
                <div
                  key={hustle.id}
                  onClick={() => handleSelect(hustle)}
                  className="bg-white rounded-xl p-4 card-shadow cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{hustle.name}</div>
                      <div className="text-sm text-gray-500">{hustle.potential}</div>
                    </div>
                    <span className="text-green-500">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-6xl mb-4 animate-pulse-soft">🤖</div></div>}>
      <ResultContent />
    </Suspense>
  );
}
