"use client";

import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="关于我们" showBack={true} />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Company Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">关于钱途</h1>
          
          <div className="space-y-6 text-gray-600">
            <p>
              钱途是一个帮助普通人找到副业方向的工具。我们相信，每个人都有赚钱的潜力，只是需要找到适合自己的方向。
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

        {/* Company Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">公司信息</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-500 mb-1">公司名称</div>
              <div className="font-medium text-gray-900">北京钱途科技有限公司</div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-500 mb-1">成立时间</div>
              <div className="font-medium text-gray-900">2026年</div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-500 mb-1">公司地址</div>
              <div className="font-medium text-gray-900">北京市朝阳区建国路88号</div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-500 mb-1">联系电话</div>
              <div className="font-medium text-gray-900">400-888-8888</div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-500 mb-1">客服邮箱</div>
              <div className="font-medium text-gray-900">service@qiantu.app</div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-500 mb-1">工作时间</div>
              <div className="font-medium text-gray-900">周一至周五 9:00-18:00</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
