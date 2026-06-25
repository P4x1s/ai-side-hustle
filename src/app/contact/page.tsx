"use client";

import Header from "@/components/Header";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="联系我们" showBack={true} />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Contact Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">联系我们</h1>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">📞</span>
              </div>
              <div>
                <div className="font-bold text-gray-900">客服电话</div>
                <div className="text-gray-600">400-888-8888</div>
                <div className="text-sm text-gray-500">周一至周五 9:00-18:00</div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">📧</span>
              </div>
              <div>
                <div className="font-bold text-gray-900">客服邮箱</div>
                <div className="text-gray-600">service@qiantu.app</div>
                <div className="text-sm text-gray-500">24小时内回复</div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">💬</span>
              </div>
              <div>
                <div className="font-bold text-gray-900">微信公众号</div>
                <div className="text-gray-600">搜索"钱途"</div>
                <div className="text-sm text-gray-500">关注获取最新资讯</div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">🚨</span>
              </div>
              <div>
                <div className="font-bold text-gray-900">举报热线</div>
                <div className="text-gray-600">400-888-8888 转 2</div>
                <div className="text-sm text-gray-500">违法不良信息举报</div>
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">公司地址</h2>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="font-medium text-gray-900">北京钱途科技有限公司</div>
            <div className="text-gray-600 mt-1">北京市朝阳区建国路88号</div>
          </div>
        </div>
      </main>
    </div>
  );
}
