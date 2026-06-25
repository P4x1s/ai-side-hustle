"use client";

import Header from "@/components/Header";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="联系我们" showBack={true} />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">联系我们</h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="font-bold text-gray-900 mb-2">反馈问题</h2>
              <p className="text-gray-500 text-sm">
                如果你在使用过程中遇到问题，或者有任何建议，欢迎联系我们。
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-2">邮箱</h3>
              <p className="text-gray-600">contact@qiantu.app</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-2">微信</h3>
              <p className="text-gray-600">请在公众号搜索"钱途"</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-2">工作时间</h3>
              <p className="text-gray-600">周一至周五 9:00-18:00</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
