"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      {/* Header */}
      <header className="p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <span className="text-white font-bold text-lg">AI副业教练</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-8xl">🚀</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            不上班
            <br />
            也能赚到钱
          </h1>

          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            告诉AI你的情况
            <br />
            它帮你找到能赚钱的路子
            <br />
            手把手带你做
          </p>

          <button
            onClick={() => router.push("/diagnose")}
            className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-green-50 transition-colors card-shadow"
          >
            开始诊断 →
          </button>

          <p className="text-green-200 text-sm mt-6">
            完全免费 · 无需登录 · 3分钟出结果
          </p>
        </div>
      </main>

      {/* Features */}
      <footer className="bg-white/10 backdrop-blur-sm p-8">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-white font-medium">精准匹配</div>
            <div className="text-green-200 text-sm">根据你的情况推荐</div>
          </div>
          <div>
            <div className="text-3xl mb-2">📱</div>
            <div className="text-white font-medium">傻瓜式操作</div>
            <div className="text-green-200 text-sm">每一步都拆好了</div>
          </div>
          <div>
            <div className="text-3xl mb-2">💸</div>
            <div className="text-white font-medium">真正能赚钱</div>
            <div className="text-green-200 text-sm">不是画大饼</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
