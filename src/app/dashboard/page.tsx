"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SideHustle } from "@/data/hustles";

interface UserProgress {
  hustleId: string;
  currentStep: number;
  completed: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [history] = useLocalStorage<SideHustle[]>("hustle-history", []);
  const [progress] = useLocalStorage<Record<string, UserProgress>>("hustle-progress", {} as Record<string, UserProgress>);
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "achievements" | "settings">("overview");

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  // Calculate stats
  const completedHustles = Object.values(progress).filter((p) => p.completed).length;
  const totalSteps = Object.values(progress).reduce((acc, p) => acc + p.currentStep, 0);
  const inProgressHustles = Object.values(progress).filter((p) => !p.completed && p.currentStep > 0).length;

  // Calculate achievements
  const achievements: Achievement[] = [
    {
      id: "first-diagnosis",
      title: "初次诊断",
      description: "完成第一次副业诊断",
      icon: "🎯",
      unlocked: history.length > 0,
      date: history[0]?.id ? "已解锁" : undefined,
    },
    {
      id: "first-step",
      title: "迈出第一步",
      description: "开始执行第一个副业方案",
      icon: "👣",
      unlocked: totalSteps > 0,
    },
    {
      id: "three-steps",
      title: "三步走",
      description: "累计完成3个步骤",
      icon: "🚶",
      unlocked: totalSteps >= 3,
    },
    {
      id: "ten-steps",
      title: "十步达人",
      description: "累计完成10个步骤",
      icon: "🏃",
      unlocked: totalSteps >= 10,
    },
    {
      id: "first-complete",
      title: "首个完成",
      description: "完成第一个副业方案的所有步骤",
      icon: "🏆",
      unlocked: completedHustles > 0,
    },
    {
      id: "multi-explorer",
      title: "多元探索",
      description: "尝试3个不同的副业方案",
      icon: "🔍",
      unlocked: history.length >= 3,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="个人中心" showBack={true} />

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* User Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user.email?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">{user.email?.split("@")[0]}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">
                  {unlockedCount} 个成就
                </span>
              </div>
            </div>
            <button
              onClick={signOut}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg"
            >
              退出
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: "overview", label: "概览", icon: "📊" },
            { id: "history", label: "历史", icon: "📚" },
            { id: "achievements", label: "成就", icon: "🏆" },
            { id: "settings", label: "设置", icon: "⚙️" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-amber-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-amber-600">{history.length}</div>
                <div className="text-sm text-gray-500">诊断次数</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-amber-600">{completedHustles}</div>
                <div className="text-sm text-gray-500">完成方案</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-amber-600">{totalSteps}</div>
                <div className="text-sm text-gray-500">完成步骤</div>
              </div>
            </div>

            {/* In Progress */}
            {inProgressHustles > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">进行中的方案</h3>
                <div className="space-y-3">
                  {Object.entries(progress)
                    .filter(([_, p]) => !p.completed && p.currentStep > 0)
                    .slice(0, 3)
                    .map(([hustleId, p]) => (
                      <div key={hustleId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">🔥</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">进行中...</div>
                          <div className="text-xs text-gray-500">第 {p.currentStep} 步</div>
                        </div>
                        <button
                          onClick={() => router.push("/guide?name=" + hustleId)}
                          className="text-xs text-amber-600 hover:text-amber-700"
                        >
                          继续 →
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">快速操作</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => router.push("/diagnose")}
                  className="p-4 bg-amber-50 rounded-xl text-amber-700 hover:bg-amber-100 transition-colors text-left"
                >
                  <div className="text-xl mb-1">🎯</div>
                  <div className="font-medium text-sm">新的诊断</div>
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="p-4 bg-gray-50 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="text-xl mb-1">🏠</div>
                  <div className="font-medium text-sm">返回首页</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="space-y-4">
            {history.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="font-bold text-gray-900 mb-2">暂无历史记录</h3>
                <p className="text-gray-500 text-sm mb-4">完成诊断后，你的历史记录会显示在这里</p>
                <button
                  onClick={() => router.push("/diagnose")}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600"
                >
                  开始诊断
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((hustle) => {
                  const hustleProgress = progress[hustle.id];
                  const progressPercent = hustleProgress
                    ? Math.round((hustleProgress.currentStep / (hustle.steps?.length || 6)) * 100)
                    : 0;

                  return (
                    <div
                      key={hustle.id}
                      className="bg-white rounded-xl p-4 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">💰</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{hustle.name}</h4>
                          <p className="text-xs text-gray-500">{hustle.potential}</p>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-gray-500">进度</span>
                              <span className="text-amber-600 font-medium">{progressPercent}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-500 rounded-full"
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => router.push(`/guide?name=${hustle.name}`)}
                          className="text-xs text-amber-600 hover:text-amber-700"
                        >
                          {hustleProgress?.completed ? "查看" : "继续"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">成就墙</h3>
                <span className="text-sm text-amber-600 font-medium">
                  {unlockedCount} / {achievements.length}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all"
                  style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`bg-white rounded-xl p-4 shadow-sm ${
                    !achievement.unlocked ? "opacity-50" : ""
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h4 className="font-bold text-gray-900 text-sm">{achievement.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
                  {achievement.unlocked && (
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">
                      已解锁
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">账号信息</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">邮箱</span>
                  <span className="text-sm text-gray-900">{user.email}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">注册时间</span>
                  <span className="text-sm text-gray-900">
                    {new Date(user.created_at).toLocaleDateString("zh-CN")}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-gray-600">用户ID</span>
                  <span className="text-sm text-gray-900 font-mono text-xs">
                    {user.id?.slice(0, 8)}...
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">数据管理</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    const data = {
                      history,
                      progress,
                      exportDate: new Date().toISOString(),
                    };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `qiantu-backup-${new Date().toISOString().split("T")[0]}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="w-full p-3 text-left text-sm text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  📥 导出数据
                </button>
                <button
                  onClick={() => {
                    if (confirm("确定要清除所有数据吗？此操作不可恢复。")) {
                      localStorage.removeItem("hustle-history");
                      localStorage.removeItem("hustle-progress");
                      window.location.reload();
                    }
                  }}
                  className="w-full p-3 text-left text-sm text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                >
                  🗑️ 清除所有数据
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">关于</h3>
              <div className="space-y-2 text-sm text-gray-500">
                <p>钱途 v1.0.0</p>
                <p>© 2026 北京钱途科技有限公司</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
