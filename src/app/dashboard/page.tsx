"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { useUserStorage } from "@/hooks/useUserStorage";
import { SideHustle, sideHustles } from "@/data/hustles";

interface UserProgress {
  hustleId: string;
  currentStep: number;
  completed: boolean;
  startDate?: string;
  completedDate?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [history] = useUserStorage<SideHustle[]>("hustle-history", []);
  const [progress] = useUserStorage<Record<string, UserProgress>>("hustle-progress", {});
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "achievements" | "settings">("overview");

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  // Stats
  const completedHustles = Object.values(progress).filter((p) => p.completed).length;
  const totalSteps = Object.values(progress).reduce((acc, p) => acc + p.currentStep, 0);
  const inProgress = Object.entries(progress).filter(([_, p]) => !p.completed && p.currentStep > 0);

  // Achievements
  const achievements: Achievement[] = [
    { id: "first", title: "初次诊断", description: "完成第一次诊断", icon: "🎯", unlocked: history.length > 0 },
    { id: "step", title: "迈出第一步", description: "开始执行方案", icon: "👣", unlocked: totalSteps > 0 },
    { id: "3steps", title: "三步走", description: "完成3个步骤", icon: "🚶", unlocked: totalSteps >= 3 },
    { id: "10steps", title: "十步达人", description: "完成10个步骤", icon: "🏃", unlocked: totalSteps >= 10 },
    { id: "complete", title: "首个完成", description: "完成第一个方案", icon: "🏆", unlocked: completedHustles > 0 },
    { id: "multi", title: "多元探索", description: "尝试3个方案", icon: "🔍", unlocked: history.length >= 3 },
  ];
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="个人中心" showBack={true} />

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* User Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white">
              {user.email?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">{user.email?.split("@")[0]}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/profile")}
                className="px-4 py-2 text-sm text-amber-600 border border-amber-200 rounded-lg hover:bg-amber-50"
              >
                编辑资料
              </button>
              <button
                onClick={signOut}
                className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                退出
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
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
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: history.length, label: "诊断次数", icon: "🎯" },
                { value: completedHustles, label: "完成方案", icon: "🏆" },
                { value: totalSteps, label: "完成步骤", icon: "✅" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-amber-600">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {inProgress.length > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">进行中的方案</h3>
                <div className="space-y-3">
                  {inProgress.slice(0, 3).map(([hustleId, p]) => {
                    const hustle = sideHustles.find((h) => h.id === hustleId);
                    const progressPercent = Math.round((p.currentStep / (hustle?.steps.length || 6)) * 100);
                    return (
                      <div key={hustleId} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-xl">
                          🔥
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{hustle?.name || hustleId}</div>
                          <div className="text-sm text-gray-500">第 {p.currentStep} 步 · {progressPercent}%</div>
                          <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-500 rounded-full"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => router.push(`/guide?name=${hustle?.name}`)}
                          className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600"
                        >
                          继续
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => router.push("/diagnose")}
                className="p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl text-left hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-2">🎯</div>
                <div className="font-bold">新的诊断</div>
                <div className="text-sm text-amber-100">找到新的副业方向</div>
              </button>
              <button
                onClick={() => router.push("/profile")}
                className="p-6 bg-white border border-gray-200 rounded-2xl text-left hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2">👤</div>
                <div className="font-bold text-gray-900">编辑资料</div>
                <div className="text-sm text-gray-500">完善个人信息</div>
              </button>
            </div>
          </div>
        )}

        {/* History */}
        {activeTab === "history" && (
          <div className="space-y-4">
            {history.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="font-bold text-gray-900 mb-2">暂无历史记录</h3>
                <p className="text-gray-500 text-sm mb-4">完成诊断后，历史记录会显示在这里</p>
                <button
                  onClick={() => router.push("/diagnose")}
                  className="px-6 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600"
                >
                  开始诊断
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((hustle) => {
                  const p = progress[hustle.id];
                  const percent = p ? Math.round((p.currentStep / (hustle.steps?.length || 6)) * 100) : 0;
                  return (
                    <div key={hustle.id} className="bg-white rounded-xl p-5 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                          💰
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-900">{hustle.name}</h4>
                            {p?.completed && (
                              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">已完成</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mb-3">{hustle.description}</p>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-gray-500">进度</span>
                                <span className="text-amber-600 font-medium">{percent}%</span>
                              </div>
                              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${percent}%` }} />
                              </div>
                            </div>
                            <button
                              onClick={() => router.push(`/guide?name=${hustle.name}`)}
                              className="px-4 py-2 text-sm font-medium text-amber-600 hover:bg-amber-50 rounded-lg"
                            >
                              {p?.completed ? "查看" : "继续"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Achievements */}
        {activeTab === "achievements" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">成就进度</h3>
                <span className="text-sm text-amber-600 font-bold">{unlockedCount}/{achievements.length}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all"
                  style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {achievements.map((a) => (
                <div
                  key={a.id}
                  className={`bg-white rounded-xl p-5 shadow-sm text-center ${!a.unlocked ? "opacity-40" : ""}`}
                >
                  <div className="text-4xl mb-3">{a.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-1">{a.title}</h4>
                  <p className="text-xs text-gray-500">{a.description}</p>
                  {a.unlocked && (
                    <span className="inline-block mt-2 text-xs px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
                      已解锁
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === "settings" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">账号信息</h3>
              <div className="space-y-1">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">邮箱</span>
                  <span className="text-gray-900">{user.email}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">注册时间</span>
                  <span className="text-gray-900">{new Date(user.created_at).toLocaleDateString("zh-CN")}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-500">用户ID</span>
                  <span className="text-gray-900 font-mono text-xs">{user.id?.slice(0, 12)}...</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">数据管理</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    const data = { history, progress, exportDate: new Date().toISOString() };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `qiantu-backup-${new Date().toISOString().split("T")[0]}.json`;
                    a.click();
                  }}
                  className="w-full p-4 text-left bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-3"
                >
                  <span className="text-xl">📥</span>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">导出数据</div>
                    <div className="text-xs text-gray-500">下载你的所有数据</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    if (confirm("确定要清除所有数据吗？此操作不可恢复。")) {
                      // Clear user-specific data
                      if (user) {
                        localStorage.removeItem(`user_${user.id}_hustle-history`);
                        localStorage.removeItem(`user_${user.id}_hustle-progress`);
                        localStorage.removeItem(`user_${user.id}_user-profile`);
                      }
                      window.location.reload();
                    }
                  }}
                  className="w-full p-4 text-left bg-red-50 rounded-xl hover:bg-red-100 transition-colors flex items-center gap-3"
                >
                  <span className="text-xl">🗑️</span>
                  <div>
                    <div className="font-medium text-red-600 text-sm">清除所有数据</div>
                    <div className="text-xs text-red-400">此操作不可恢复</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
