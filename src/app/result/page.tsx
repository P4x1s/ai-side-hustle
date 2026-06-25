"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getRecommendations, SideHustle, sideHustles } from "@/data/hustles";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Header from "@/components/Header";

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<SideHustle[]>([]);
  const [allHustles, setAllHustles] = useState<SideHustle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("推荐");
  const [history, setHistory] = useLocalStorage<SideHustle[]>("hustle-history", []);

  const formData = {
    city: searchParams.get("city") || "",
    cityType: searchParams.get("cityType") || "",
    age: searchParams.get("age") || "",
    education: searchParams.get("education") || "",
    currentStatus: searchParams.get("currentStatus") || "",
    timePerDay: searchParams.get("timePerDay") || "",
    weekend: searchParams.get("weekend") || "",
    skills: searchParams.get("skills") || "",
    interests: searchParams.get("interests") || "",
    experience: searchParams.get("experience") || "",
    capital: searchParams.get("capital") || "",
    riskLevel: searchParams.get("riskLevel") || "",
    goal: searchParams.get("goal") || "",
    urgency: searchParams.get("urgency") || "",
  };

  const categories = ["推荐", ...new Set(sideHustles.map((h) => h.category))];

  useEffect(() => {
    generateRecommendations();
  }, []);

  const generateRecommendations = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const recs = getRecommendations(formData);
    setRecommendations(recs);
    setAllHustles(sideHustles);
    setLoading(false);
  };

  const getFilteredHustles = (): SideHustle[] => {
    if (selectedCategory === "推荐") return recommendations;
    return allHustles.filter((h) => h.category === selectedCategory);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="分析中" showBack={true} />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-2xl flex items-center justify-center animate-pulse">
              <span className="text-3xl">🤖</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">正在分析...</h2>
            <p className="text-gray-500 text-sm">根据你的情况匹配副业方案</p>
          </div>
        </div>
      </div>
    );
  }

  const filteredHustles = getFilteredHustles();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="推荐结果" showBack={true} />

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* User Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="text-xs text-gray-500 mb-2">你的情况</div>
          <div className="flex flex-wrap gap-2 text-sm">
            {formData.city && <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600">📍 {formData.city}</span>}
            {formData.timePerDay && <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600">⏰ {formData.timePerDay}</span>}
            {formData.capital && <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600">💰 {formData.capital}</span>}
            {formData.goal && <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600">🎯 {formData.goal}</span>}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-amber-500 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          {filteredHustles.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-bold text-gray-900 mb-2">暂无推荐</h3>
              <p className="text-gray-500 text-sm">该分类下暂无副业方案</p>
            </div>
          ) : (
            filteredHustles.map((hustle, index) => (
              <div
                key={hustle.id}
                onClick={() => router.push(`/hustle?id=${hustle.id}`)}
                className="bg-white rounded-2xl p-5 shadow-sm cursor-pointer card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">
                      {selectedCategory === "推荐" && index < 3
                        ? index === 0
                          ? "🥇"
                          : index === 1
                          ? "🥈"
                          : "🥉"
                        : "💰"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{hustle.name}</h3>
                      {selectedCategory === "推荐" && index < 3 && (
                        <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">
                          推荐
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{hustle.description}</p>
                    <div className="flex gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        hustle.difficulty === "简单" ? "bg-green-100 text-green-700" :
                        hustle.difficulty === "中等" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {hustle.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                        {hustle.potential}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {hustle.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* History */}
        {history.length > 0 && selectedCategory === "推荐" && (
          <div className="mt-8">
            <h3 className="font-bold text-gray-900 mb-3">历史记录</h3>
            <div className="space-y-2">
              {history.slice(0, 3).map((hustle) => (
                <div
                  key={hustle.id}
                  onClick={() => router.push(`/hustle?id=${hustle.id}`)}
                  className="bg-white rounded-xl p-4 shadow-sm cursor-pointer card-hover flex items-center justify-between"
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
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center animate-pulse">
            <span className="text-3xl">🤖</span>
          </div>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
