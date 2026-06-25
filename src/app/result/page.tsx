"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getRecommendations, SideHustle } from "@/data/hustles";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Header from "@/components/Header";

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
      <div className="min-h-screen bg-gray-50">
        <Header title="分析中" showBack={true} />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-3xl">🤖</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">正在分析...</h2>
            <p className="text-gray-500 text-sm">根据你的情况匹配副业方案</p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedHustle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title={selectedHustle.name} showBack={true} />
        <main className="max-w-2xl mx-auto px-4 py-6">
          {/* Steps */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="font-bold text-gray-900 mb-4">操作步骤</h2>
            <div className="space-y-4">
              {selectedHustle.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
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
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-xl">💡</span>
              <div>
                <div className="font-bold text-amber-900 text-sm mb-1">小贴士</div>
                <div className="text-amber-800 text-sm">{selectedHustle.tips}</div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <div className="text-xs text-gray-500 mb-1">难度</div>
              <span className={`text-sm font-medium ${
                selectedHustle.difficulty === "简单" ? "text-emerald-600" :
                selectedHustle.difficulty === "中等" ? "text-amber-600" : "text-red-600"
              }`}>
                {selectedHustle.difficulty}
              </span>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <div className="text-xs text-gray-500 mb-1">预期收入</div>
              <div className="text-sm font-medium text-emerald-600">{selectedHustle.potential}</div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              const params = new URLSearchParams({ name: selectedHustle.name });
              router.push(`/guide?${params.toString()}`);
            }}
            className="w-full py-4 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors"
          >
            开始执行 →
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="推荐结果" showBack={true} />
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="text-xs text-gray-500 mb-2">你的情况</div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600">📍 {formData.city}</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600">⏰ {formData.timePerDay}</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600">💰 {formData.capital}</span>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          {recommendations.map((hustle, index) => (
            <div
              key={hustle.id}
              onClick={() => handleSelect(hustle)}
              className="bg-white rounded-2xl p-5 shadow-sm cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{hustle.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{hustle.description}</p>
                  <div className="flex gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      hustle.difficulty === "简单" ? "bg-emerald-100 text-emerald-700" :
                      hustle.difficulty === "中等" ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {hustle.difficulty}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                      {hustle.potential}
                    </span>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold text-gray-900 mb-3">历史记录</h3>
            <div className="space-y-2">
              {history.slice(0, 3).map((hustle) => (
                <div
                  key={hustle.id}
                  onClick={() => handleSelect(hustle)}
                  className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-all flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{hustle.name}</div>
                    <div className="text-xs text-gray-500">{hustle.potential}</div>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => router.push("/diagnose")}
          className="w-full mt-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          重新测试
        </button>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <Header title="加载中" showBack={true} />
        <div className="flex items-center justify-center py-20">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-3xl">🤖</span>
          </div>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
