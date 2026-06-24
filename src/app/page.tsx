"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero min-h-[70vh] flex flex-col items-center justify-center relative px-6 text-center">
        {/* Floating decorations */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float" style={{ animationDelay: '0s' }}>💰</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🚀</div>
        <div className="absolute bottom-20 left-20 text-4xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>✨</div>
        <div className="absolute bottom-40 right-10 text-5xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>🎯</div>
        
        <div className="relative z-10">
          <div className="mb-8 emoji-bounce">
            <span className="text-8xl md:text-9xl">🚀</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            不上班
            <br />
            <span className="text-green-200">也能赚到钱</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-green-100 mb-10 max-w-lg mx-auto leading-relaxed">
            告诉AI你的情况
            <br />
            它帮你找到能赚钱的路子
            <br />
            <span className="text-white font-medium">手把手带你做</span>
          </p>
          
          <button
            onClick={() => router.push("/diagnose")}
            className="bg-white text-green-600 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-green-50 transition-all duration-300 shadow-strong hover:shadow-glow transform hover:-translate-y-1"
          >
            开始诊断 →
          </button>
          
          <p className="text-green-200 text-sm mt-8 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            完全免费 · 无需登录 · 3分钟出结果
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">为什么选择我们？</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center animate-fade-in stagger-1">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-100 flex items-center justify-center">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">精准匹配</h3>
              <p className="text-gray-600">根据你的情况（时间、资金、技能）推荐最适合的副业</p>
            </div>
            
            <div className="card text-center animate-fade-in stagger-2">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-100 flex items-center justify-center">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">傻瓜式操作</h3>
              <p className="text-gray-600">每个副业都拆成5-6个简单步骤，跟着做就行</p>
            </div>
            
            <div className="card text-center animate-fade-in stagger-3">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-yellow-100 flex items-center justify-center">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">AI教练陪伴</h3>
              <p className="text-gray-600">遇到问题随时问，AI教练手把手带你做</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">3步开始赚钱</h2>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6 card animate-slide-in stagger-1">
              <div className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">告诉AI你的情况</h3>
                <p className="text-gray-600">花1分钟回答5个简单问题</p>
              </div>
              <span className="text-4xl ml-auto opacity-50">📝</span>
            </div>
            
            <div className="flex items-center gap-6 card animate-slide-in stagger-2">
              <div className="w-14 h-14 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">获取专属方案</h3>
                <p className="text-gray-600">AI为你推荐3个最适合的副业</p>
              </div>
              <span className="text-4xl ml-auto opacity-50">✨</span>
            </div>
            
            <div className="flex items-center gap-6 card animate-slide-in stagger-3">
              <div className="w-14 h-14 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">跟着AI做</h3>
                <p className="text-gray-600">AI教练手把手带你，一步步赚钱</p>
              </div>
              <span className="text-4xl ml-auto opacity-50">💰</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">他们已经在赚钱了</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card animate-fade-in stagger-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                  <span className="text-xl">👩</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800">小李</div>
                  <div className="text-sm text-gray-500">全职妈妈</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">"以前在家带孩子没收入，现在做社区团购，每个月多赚3000多！"</p>
              <div className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
            </div>
            
            <div className="card animate-fade-in stagger-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xl">👨</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800">王哥</div>
                  <div className="text-sm text-gray-500">待业青年</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">"失业后很迷茫，用这个找到了闲鱼卖货的方法，现在月入5000+！"</p>
              <div className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
            </div>
            
            <div className="card animate-fade-in stagger-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-xl">👩</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800">张姐</div>
                  <div className="text-sm text-gray-500">小县城居民</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">"在小县城也能做自媒体，现在接本地广告，收入比上班还高！"</p>
              <div className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 gradient-hero text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">准备好开始赚钱了吗？</h2>
          <p className="text-green-100 text-lg mb-8">只需要1分钟，让AI帮你找到最适合的副业</p>
          <button
            onClick={() => router.push("/diagnose")}
            className="bg-white text-green-600 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-green-50 transition-all duration-300 shadow-strong hover:shadow-glow transform hover:-translate-y-1"
          >
            立即开始 →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">© 2024 AI副业教练 · 不上班也能赚到钱</p>
      </footer>
    </div>
  );
}
