"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface UserProfile {
  name: string;
  bio: string;
  avatar: string;
  location: string;
  goals: string[];
}

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useLocalStorage<UserProfile>("user-profile", {
    name: "",
    bio: "",
    avatar: "",
    location: "",
    goals: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addGoal = () => {
    setEditedProfile({
      ...editedProfile,
      goals: [...editedProfile.goals, ""],
    });
  };

  const updateGoal = (index: number, value: string) => {
    const newGoals = [...editedProfile.goals];
    newGoals[index] = value;
    setEditedProfile({ ...editedProfile, goals: newGoals });
  };

  const removeGoal = (index: number) => {
    setEditedProfile({
      ...editedProfile,
      goals: editedProfile.goals.filter((_, i) => i !== index),
    });
  };

  const avatars = ["👤", "👨", "👩", "🧑", "👴", "👵", "👦", "👧"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="个人资料" showBack={true} />

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Avatar Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-4xl">
                {profile.avatar || "👤"}
              </div>
              {isEditing && (
                <button
                  onClick={() => {
                    const currentIndex = avatars.indexOf(profile.avatar || "👤");
                    const nextIndex = (currentIndex + 1) % avatars.length;
                    setEditedProfile({ ...editedProfile, avatar: avatars[nextIndex] });
                  }}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-amber-600"
                >
                  ✏️
                </button>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  placeholder="你的名字"
                  className="w-full text-xl font-bold text-gray-900 border-b-2 border-amber-500 focus:outline-none pb-1"
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-900">
                  {profile.name || "未设置名称"}
                </h2>
              )}
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">基本信息</h3>
            <button
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                }
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isEditing
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : "text-amber-600 hover:bg-amber-50"
              }`}
            >
              {isEditing ? "保存" : "编辑"}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">所在地</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.location}
                  onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                  placeholder="例如：北京"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              ) : (
                <p className="text-gray-900">{profile.location || "未设置"}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">个人简介</label>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                  placeholder="介绍一下自己..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 h-24 resize-none"
                />
              ) : (
                <p className="text-gray-900">{profile.bio || "暂无简介"}</p>
              )}
            </div>
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">我的目标</h3>
            {isEditing && (
              <button
                onClick={addGoal}
                className="text-sm text-amber-600 hover:text-amber-700"
              >
                + 添加目标
              </button>
            )}
          </div>

          {profile.goals.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">还没有设定目标</p>
          ) : (
            <div className="space-y-3">
              {profile.goals.map((goal, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-amber-600">{index + 1}</span>
                  </div>
                  {isEditing ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={goal}
                        onChange={(e) => updateGoal(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="输入你的目标"
                      />
                      <button
                        onClick={() => removeGoal(index)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        删除
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-700 text-sm">{goal}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">账户信息</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">注册时间</span>
              <span className="text-gray-900">
                {new Date(user.created_at).toLocaleDateString("zh-CN")}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">用户ID</span>
              <span className="text-gray-900 font-mono text-xs">
                {user.id?.slice(0, 12)}...
              </span>
            </div>
          </div>
        </div>

        {/* Save Success Message */}
        {saved && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 px-6 py-3 bg-amber-500 text-white rounded-xl shadow-lg animate-slide-up">
            ✓ 保存成功
          </div>
        )}
      </div>
    </div>
  );
}
