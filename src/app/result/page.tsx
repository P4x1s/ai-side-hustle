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
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const recs = getRecommendations(formData);
    setRecommendations(recs);
    setLoading(false);
  };

  const handleSelect = (hustle: SideHustle) => {
    setSelectedHustle(hustle);
    if (!history.find((h) => h.id === hustle.id)) {
      setHistory([...history, hustle]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-7xl mb-6">🤖</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">AI正在分析...</h2>
          <p className="text-gray-500">正在为你量身定制副业方案</p>
          <div className="mt-8 flex justify-center gap-1">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      </div>
    );
  }

  if (selectedHustle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-100">
          <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
            <button
              onClick={() => setSelectedHustle(null)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              ←
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-800">{selectedHustle.name}</h1>
              <p className="text-sm text-gray-500">跟着步骤做，轻松赚钱</p>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-6 py-8">
          {/* Steps */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
                <span className="text-3xl">📋</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">操作步骤</div>
                <div className="text-xl font-bold text-gray-800">跟着做就行</div>
              </div>
            </div>

            <div className="space-y-4">
              {selectedHustle.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 p-4 bg-gray-50 rounded-xl text-gray-700 leading-relaxed">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <div className="font-bold text-emerald-800 mb-2">小贴士</div>
                <div className="text-emerald-700 leading-relaxed">{selectedHustle.tips}</div>
              </div>
            </div>
          </div>

          {/* Difficulty & Potential */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
              <div className="text-sm text-gray-500 mb-1">难度</div>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                selectedHustle.difficulty === "简单" ? "bg-emerald-100 text-emerald-700" :
                selectedHustle.difficulty === "中等" ? "bg-amber-100 text-amber-700" :
                "bg-red-100 text-red-700"
              }`}>
                {selectedHustle.difficulty}
              </span>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
              <div className="text-sm text-gray-500 mb-1">预期收入</div>
              <div className="text-emerald-600 font-bold">{selectedHustle.potential}</div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              const params = new URLSearchParams({
                name: selectedHustle.name,
              });
              router.push(`/guide?${params.toString()}`);
            }}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-lg font-bold hover:shadow-lg transition-all"
          >
            我要开始做！ 🚀
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <h1 className="text-xl font-bold text-gray-800">你的副业方案</h1>
          <p className="text-sm text-gray-500">基于你的情况，AI为你推荐</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-6">
        {/* User Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="text-sm text-gray-500 mb-3">你的情况</div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">📍 {formData.city}</span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">⏰ {formData.timePerDay}</span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">💰 {formData.capital}</span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">🎯 {formData.goal}</span>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          {recommendations.map((hustle, index) => (
            <div
              key={hustle.id}
              onClick={() => handleSelect(hustle)}
              className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">{hustle.name}</h3>
                  </div>
                  <p className="text-gray-600 ml-12">{hustle.description}</p>
                </div>
              </div>

              <div className="flex gap-3 mb-4 ml-12">
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  hustle.difficulty === "简单" ? "bg-emerald-100 text-emerald-700" :
                  hustle.difficulty === "中等" ? "bg-amber-100 text-amber-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {hustle.difficulty}
                </span>
                <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700">
                  {hustle.potential}
                </span>
              </div>

              <div className="ml-12 text-emerald-500 font-medium flex items-center gap-2">
                查看详细步骤 →
              </div>
            </div>
          ))}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📚 历史推荐</h3>
            <div className="space-y-3">
              {history.slice(0, 5).map((hustle) => (
                <div
                  key={hustle.id}
                  onClick={() => handleSelect(hustle)}
                  className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-800">{hustle.name}</div>
                      <div className="text-sm text-gray-500">{hustle.potential}</div>
                    </div>
                    <span className="text-emerald-500 text-xl">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reset */}
        <button
          onClick={() => router.push("/")}
          className="w-full mt-8 py-4 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
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
            <div className="text-7xl mb-6">🤖</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">加载中...</h2>
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
