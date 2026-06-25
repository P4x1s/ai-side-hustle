"use client";

import Header from "@/components/Header";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="隐私政策" showBack={true} />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">隐私政策</h1>
          
          <div className="space-y-6 text-gray-600 text-sm">
            <p>最后更新：2024年1月1日</p>
            
            <h2 className="text-lg font-bold text-gray-900">1. 信息收集</h2>
            <p>我们收集以下信息：</p>
            <ul className="list-disc list-inside space-y-1">
              <li>你在诊断过程中提供的信息（城市、时间、技能等）</li>
              <li>注册账号时提供的邮箱</li>
              <li>使用过程中的操作记录</li>
            </ul>
            
            <h2 className="text-lg font-bold text-gray-900">2. 信息使用</h2>
            <p>我们使用收集的信息用于：</p>
            <ul className="list-disc list-inside space-y-1">
              <li>为你提供副业推荐</li>
              <li>改善产品体验</li>
              <li>保存你的使用进度</li>
            </ul>
            
            <h2 className="text-lg font-bold text-gray-900">3. 信息存储</h2>
            <p>
              你的数据存储在本地浏览器中（localStorage）。如果你注册了账号，数据会同步到云端。
            </p>
            
            <h2 className="text-lg font-bold text-gray-900">4. 信息分享</h2>
            <p>
              我们不会将你的个人信息出售或分享给第三方。
            </p>
            
            <h2 className="text-lg font-bold text-gray-900">5. 联系我们</h2>
            <p>
              如果你对本隐私政策有任何疑问，请联系我们。
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
