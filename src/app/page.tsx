"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full text-white text-sm mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              帮助你找到适合的副业方向
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              找不到副业方向？
              <br />
              <span className="text-amber-100">让AI帮你找到钱途</span>
            </h1>
            
            <p className="text-lg md:text-xl text-amber-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              回答几个简单问题，AI会根据你的情况推荐适合的副业方案，<br className="hidden md:block" />
              并手把手教你开始赚钱
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => router.push("/diagnose")}
                className="w-full sm:w-auto px-10 py-4 bg-white text-amber-600 text-lg font-bold rounded-xl hover:bg-amber-50 transition-all shadow-xl"
              >
                免费开始测试
              </button>
              <button
                onClick={() => router.push("/about")}
                className="w-full sm:w-auto px-10 py-4 bg-white/10 text-white text-lg font-medium rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                了解更多
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">20+</div>
              <div className="text-sm text-gray-500 mt-1">副业方案</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">5-6</div>
              <div className="text-sm text-gray-500 mt-1">步骤拆解</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">100%</div>
              <div className="text-sm text-gray-500 mt-1">免费使用</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">3分钟</div>
              <div className="text-sm text-gray-500 mt-1">出结果</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold text-sm">使用流程</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">三步找到你的副业</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "回答问题", desc: "花1分钟告诉我们你的情况", icon: "📝" },
              { num: "02", title: "获取推荐", desc: "AI为你推荐适合的副业", icon: "🎯" },
              { num: "03", title: "开始行动", desc: "跟着步骤一步步做", icon: "🚀" },
            ].map((item, i) => (
              <div key={i} className="relative p-8 bg-gray-50 rounded-2xl card-hover">
                <div className="text-5xl font-bold text-amber-100 mb-4">{item.num}</div>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you can find */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold text-sm">副业类型</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">你能找到什么</h2>
            <p className="text-gray-500 mt-2">20+种副业方案，总有一个适合你</p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: "🛒", title: "电商", count: "5种" },
              { icon: "📱", title: "内容创作", count: "6种" },
              { icon: "🛠️", title: "技能服务", count: "4种" },
              { icon: "🏠", title: "本地服务", count: "3种" },
              { icon: "📚", title: "教育培训", count: "3种" },
              { icon: "🎮", title: "其他", count: "3种" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 card-hover text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                <p className="text-xs text-amber-600 mt-1">{item.count}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => router.push("/diagnose")}
              className="px-6 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors"
            >
              查看全部副业 →
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold text-sm">常见问题</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">你可能想知道</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "这个工具免费吗？", a: "是的，完全免费。你不需要付费就能使用所有功能。" },
              { q: "推荐的副业真的能赚钱吗？", a: "我们推荐的都是实际可行的副业方向。但能否赚到钱取决于你的执行和努力。" },
              { q: "需要注册账号吗？", a: "不需要。你可以直接使用。注册账号可以保存你的进度。" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-500 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">准备好开始了吗？</h2>
          <p className="text-amber-100 text-lg mb-8">花1分钟时间，找到适合你的副业方向</p>
          <button
            onClick={() => router.push("/diagnose")}
            className="px-10 py-4 bg-white text-amber-600 text-lg font-bold rounded-xl hover:bg-amber-50 transition-all shadow-xl"
          >
            立即开始
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">$</span>
                </div>
                <span className="text-xl font-bold">钱途</span>
              </div>
              <p className="text-gray-400 text-sm">找到你的副业方向</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">产品</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/diagnose" className="hover:text-amber-400 transition-colors">开始测试</a></li>
                <li><a href="/about" className="hover:text-amber-400 transition-colors">关于我们</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">支持</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/contact" className="hover:text-amber-400 transition-colors">联系我们</a></li>
                <li><a href="/privacy" className="hover:text-amber-400 transition-colors">隐私政策</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">联系方式</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📞 400-888-8888</li>
                <li>📧 service@qiantu.app</li>
                <li>💬 微信公众号：钱途</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
              <div>© 2026 北京钱途科技有限公司 版权所有</div>
              <div className="flex gap-4">
                <span>京ICP备XXXXXXXX号</span>
                <span>京公网安备 110XXXXXXXXXXXXXX号</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
