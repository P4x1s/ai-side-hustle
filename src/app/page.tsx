"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            不知道做什么副业？
            <br />
            <span className="text-emerald-100">让AI帮你找到方向</span>
          </h1>
          
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            回答几个简单问题，AI会根据你的情况推荐适合的副业方案，并手把手教你开始
          </p>
          
          <button
            onClick={() => router.push("/diagnose")}
            className="px-8 py-4 bg-white text-emerald-600 text-lg font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
          >
            开始免费测试
          </button>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">如何使用</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">回答问题</h3>
              <p className="text-gray-500 text-sm">花1分钟告诉我们你的情况</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">获取推荐</h3>
              <p className="text-gray-500 text-sm">AI为你推荐适合的副业</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">开始行动</h3>
              <p className="text-gray-500 text-sm">跟着步骤一步步做</p>
            </div>
          </div>
        </div>
      </section>

      {/* What you can find */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">你能找到什么</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🛒</span>
                <h3 className="font-bold text-gray-900">电商类副业</h3>
              </div>
              <p className="text-gray-500 text-sm">闲鱼卖货、社区团购、代购等</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📱</span>
                <h3 className="font-bold text-gray-900">内容创作</h3>
              </div>
              <p className="text-gray-500 text-sm">短视频、自媒体、直播等</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🛠️</span>
                <h3 className="font-bold text-gray-900">技能服务</h3>
              </div>
              <p className="text-gray-500 text-sm">设计、翻译、教学、跑腿等</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🏠</span>
                <h3 className="font-bold text-gray-900">本地服务</h3>
              </div>
              <p className="text-gray-500 text-sm">烘焙、手工、代办等</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">常见问题</h2>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">这个工具免费吗？</h3>
              <p className="text-gray-500 text-sm">是的，完全免费。你不需要付费就能使用所有功能。</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">推荐的副业真的能赚钱吗？</h3>
              <p className="text-gray-500 text-sm">我们推荐的都是实际可行的副业方向。但能否赚到钱取决于你的执行和努力。</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">需要注册账号吗？</h3>
              <p className="text-gray-500 text-sm">不需要。你可以直接使用。注册账号可以保存你的进度。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">准备好开始了吗？</h2>
          <p className="text-gray-500 mb-6">花1分钟时间，找到适合你的副业方向</p>
          <button
            onClick={() => router.push("/diagnose")}
            className="px-8 py-4 bg-emerald-500 text-white text-lg font-bold rounded-xl hover:bg-emerald-600 transition-colors"
          >
            开始测试
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">💰</span>
              <span className="font-bold">AI副业教练</span>
            </div>
            
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="/about" className="hover:text-white transition-colors">关于我们</a>
              <a href="/privacy" className="hover:text-white transition-colors">隐私政策</a>
              <a href="/contact" className="hover:text-white transition-colors">联系我们</a>
            </div>
            
            <div className="text-sm text-gray-500">
              © 2024 AI副业教练
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
