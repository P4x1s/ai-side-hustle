"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              已帮助 10,000+ 人找到副业方向
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              不上班
              <br />
              <span className="text-emerald-100">也能赚到钱</span>
            </h1>
            
            <p className="text-lg md:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              告诉AI你的情况，它帮你找到能赚钱的路子，手把手带你做
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => router.push("/diagnose")}
                className="w-full sm:w-auto px-8 py-4 bg-white text-emerald-600 text-lg font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg"
              >
                免费开始测试 →
              </button>
              <button
                onClick={() => router.push("/login")}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-400/20 text-white text-lg font-medium rounded-xl hover:bg-emerald-400/30 transition-colors"
              >
                登录查看进度
              </button>
            </div>
            
            <p className="text-emerald-200 text-sm mt-6">
              完全免费 · 无需登录 · 3分钟出结果
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">20+</div>
              <div className="text-sm text-gray-500 mt-1">副业方案</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">10,000+</div>
              <div className="text-sm text-gray-500 mt-1">用户使用</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">85%</div>
              <div className="text-sm text-gray-500 mt-1">满意度</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">3分钟</div>
              <div className="text-sm text-gray-500 mt-1">出结果</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">为什么选择我们？</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">我们用AI技术，帮你找到最适合的副业方向</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">精准匹配</h3>
              <p className="text-gray-500 leading-relaxed">根据你的时间、资金、技能，推荐最适合的副业方案</p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">傻瓜式操作</h3>
              <p className="text-gray-500 leading-relaxed">每个副业都拆成5-6个简单步骤，跟着做就行</p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI教练陪伴</h3>
              <p className="text-gray-500 leading-relaxed">遇到问题随时问，AI教练手把手带你做</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3步开始赚钱</h2>
            <p className="text-gray-500">简单三步，开启你的副业之路</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white p-6 rounded-2xl shadow-sm h-full">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">1</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">告诉AI你的情况</h3>
                <p className="text-gray-500">花1分钟回答5个简单问题</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-6 rounded-2xl shadow-sm h-full">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">2</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">获取专属方案</h3>
                <p className="text-gray-500">AI为你推荐3个最适合的副业</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-6 rounded-2xl shadow-sm h-full">
                <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">3</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">跟着AI做</h3>
                <p className="text-gray-500">AI教练手把手带你，一步步赚钱</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">用户评价</h2>
            <p className="text-gray-500">看看其他用户怎么说</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">👩</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">小李</div>
                  <div className="text-sm text-gray-500">全职妈妈</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"以前在家带孩子没收入，现在做社区团购，每个月多赚3000多！"</p>
              <div className="flex items-center gap-1 text-amber-400">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">👨</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">王哥</div>
                  <div className="text-sm text-gray-500">待业青年</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"失业后很迷茫，用这个找到了闲鱼卖货的方法，现在月入5000+！"</p>
              <div className="flex items-center gap-1 text-amber-400">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">👩</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">张姐</div>
                  <div className="text-sm text-gray-500">小县城居民</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"在小县城也能做自媒体，现在接本地广告，收入比上班还高！"</p>
              <div className="flex items-center gap-1 text-amber-400">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-500 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">准备好开始赚钱了吗？</h2>
          <p className="text-emerald-100 text-lg mb-8">只需要1分钟，让AI帮你找到最适合的副业</p>
          <button
            onClick={() => router.push("/diagnose")}
            className="px-10 py-4 bg-white text-emerald-600 text-lg font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg"
          >
            立即开始 →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">💰</span>
                <span className="text-lg font-bold">AI副业教练</span>
              </div>
              <p className="text-gray-400 text-sm">帮你找到能赚钱的路子</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">产品</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">功能介绍</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">使用流程</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">用户评价</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">支持</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">帮助中心</a></li>
                <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">关注我们</h4>
              <div className="flex gap-4">
                <span className="text-2xl cursor-pointer hover:opacity-80">📱</span>
                <span className="text-2xl cursor-pointer hover:opacity-80">💬</span>
                <span className="text-2xl cursor-pointer hover:opacity-80">📧</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2024 AI副业教练 · 不上班也能赚到钱
          </div>
        </div>
      </footer>
    </div>
  );
}
