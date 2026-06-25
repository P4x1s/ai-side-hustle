"use client";

import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="关于我们" showBack={true} />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">关于 AI副业教练</h1>
          
          <div className="space-y-6 text-gray-600">
            <p>
              AI副业教练是一个帮助普通人找到副业方向的工具。我们相信，每个人都有赚钱的潜力，只是需要找到适合自己的方向。
            </p>
            
            <h2 className="text-lg font-bold text-gray-900 pt-4">我们的目标</h2>
            <p>
              帮助那些想要增加收入但不知道从哪里开始的人，找到适合自己的副业方向，并提供具体的行动指南。
            </p>
            
            <h2 className="text-lg font-bold text-gray-900 pt-4">我们能提供什么</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>基于你的情况推荐适合的副业方向</li>
              <li>提供具体的操作步骤</li>
              <li>AI教练解答你的疑问</li>
            </ul>
            
            <h2 className="text-lg font-bold text-gray-900 pt-4">我们不能保证什么</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>我们不能保证你一定能赚到钱</li>
              <li>我们不能保证推荐的副业适合所有人</li>
              <li>我们不能替代专业的财务或职业咨询</li>
            </ul>
            
            <p className="pt-4 text-sm text-gray-500">
              本工具仅供参考，具体决策请根据个人情况谨慎判断。
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
