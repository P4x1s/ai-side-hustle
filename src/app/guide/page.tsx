"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { sideHustles } from "@/data/hustles";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Message {
  role: "ai" | "user";
  content: string;
  timestamp: Date;
}

interface UserProgress {
  hustleId: string;
  currentStep: number;
  completed: boolean;
}

function GuideContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useLocalStorage<Record<string, UserProgress>>("hustle-progress", {});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hustleName = searchParams.get("name") || "社区团购团长";
  const hustle = sideHustles.find((h) => h.name === hustleName) || sideHustles[0];
  const steps = hustle.steps;

  useEffect(() => {
    const savedProgress = progress[hustle.id];
    if (savedProgress && !savedProgress.completed) {
      setCurrentStep(savedProgress.currentStep);
      const welcomeMessage: Message = {
        role: "ai",
        content: `欢迎回来！你正在做「${hustleName}」\n\n上次做到第${savedProgress.currentStep + 1}步：\n\n**${steps[savedProgress.currentStep]}**\n\n继续加油！完成后点"完成了"。`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    } else {
      const welcomeMessage: Message = {
        role: "ai",
        content: `你好！我是你的副业教练 🤖\n\n你选择了「${hustleName}」，我会手把手带你做。\n\n我们从第一步开始：\n\n**第1步：${steps[0]}**\n\n完成后点击"完成了"，我教你下一步。`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [hustleName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setProgress((prev) => ({
      ...prev,
      [hustle.id]: {
        hustleId: hustle.id,
        currentStep,
        completed: currentStep >= steps.length - 1,
      },
    }));
  }, [currentStep, hustle.id, steps.length]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    let aiResponse = "";

    if (text.includes("完成了") || text.includes("好了") || text.includes("OK")) {
      const nextStep = currentStep + 1;
      if (nextStep < steps.length) {
        setCurrentStep(nextStep);
        aiResponse = `太棒了！👏 第${currentStep + 1}步完成！\n\n下一步（第${nextStep + 1}步）：\n\n**${steps[nextStep]}**\n\n完成后继续点"完成了"。`;
      } else {
        aiResponse = `🎉 恭喜你！所有步骤都完成了！\n\n你现在可以开始赚钱了！\n\n记住：\n• 坚持每天做一点\n• 遇到问题随时问我\n• 赚到钱了告诉我\n\n祝你早日实现目标！💰`;
      }
    } else if (text.includes("怎么做") || text.includes("详细") || text.includes("不会")) {
      aiResponse = `关于这一步，我来帮你：\n\n**${steps[currentStep]}**\n\n具体操作：\n1. 不要着急，慢慢来\n2. 按照提示一步步操作\n3. 遇到困难截图发给我\n\n有什么具体问题吗？`;
    } else if (text.includes("赚了") || text.includes("收入")) {
      aiResponse = `太好了！💰 有了收入说明方向对了！\n\n建议：\n1. 记录每天赚了多少\n2. 总结什么方法最有效\n3. 继续坚持\n\n下一步：${currentStep + 1 < steps.length ? steps[currentStep + 1] : "你已经完成所有步骤了！"}`;
    } else {
      aiResponse = `收到！\n\n当前进度：第${currentStep + 1}步 / 共${steps.length}步\n\n当前任务：**${steps[currentStep]}**\n\n完成后点"完成了"，我教你下一步。`;
    }

    const aiMessage: Message = {
      role: "ai",
      content: aiResponse,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900">副业教练</h1>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-xs text-emerald-600">在线</span>
                </div>
              </div>
            </div>
            <div className="text-sm font-semibold text-amber-600">
              {currentStep + 1} / {steps.length}
            </div>
          </div>
          
          <div className="mt-3">
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
            >
              {msg.role === "ai" && (
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                  <span className="text-sm">🤖</span>
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-amber-500 text-white rounded-br-md"
                    : "bg-white text-gray-800 rounded-bl-md shadow-sm"
                }`}
              >
                <div className="whitespace-pre-wrap">
                  {msg.content.split("**").map((part, i) =>
                    i % 2 === 1 ? (
                      <strong key={i} className="font-bold">{part}</strong>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </div>
                <div className={`text-xs mt-2 ${msg.role === "user" ? "text-amber-100" : "text-gray-400"}`}>
                  {msg.timestamp.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center mr-2 flex-shrink-0">
                <span className="text-sm">🤖</span>
              </div>
              <div className="bg-white rounded-2xl rounded-bl-md p-4 shadow-sm">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Quick Replies */}
      <div className="bg-white border-t border-gray-100 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["完成了", "怎么做？", "有问题", "赚到钱了"].map((reply) => (
              <button
                key={reply}
                onClick={() => handleSend(reply)}
                className="px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-600 hover:bg-amber-100 hover:text-amber-600 transition-colors whitespace-nowrap"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 p-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="输入你的问题..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              input.trim() && !isLoading
                ? "bg-amber-500 text-white hover:bg-amber-600"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GuidePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center py-20">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center animate-pulse">
            <span className="text-3xl">🤖</span>
          </div>
        </div>
      </div>
    }>
      <GuideContent />
    </Suspense>
  );
}
