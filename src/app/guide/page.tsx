"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Message {
  role: "ai" | "user";
  content: string;
  timestamp: Date;
}

function GuideContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hustleName = searchParams.get("name") || "社区团购团长";
  const steps = JSON.parse(searchParams.get("steps") || "[]");

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      role: "ai",
      content: `你好！我是你的AI副业教练 🤖\n\n你选择了「${hustleName}」，我会手把手带你做。\n\n我们从第一步开始：\n\n**${steps[0] || "准备好开始了吗？"}**\n\n完成后回复"完成了"，我教你下一步。`,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [hustleName, steps]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response for MVP
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let aiResponse = "";

    if (
      input.includes("完成了") ||
      input.includes("好了") ||
      input.includes("OK") ||
      input.includes("ok")
    ) {
      const nextStep = currentStep + 1;
      if (nextStep < steps.length) {
        setCurrentStep(nextStep);
        aiResponse = `太棒了！👏\n\n我们进入下一步：\n\n**${steps[nextStep]}**\n\n完成后回复"完成了"。`;
      } else {
        aiResponse = `恭喜你！🎉 你已经完成了所有步骤！\n\n现在你可以开始赚钱了！\n\n记住：\n• 坚持每天做\n• 遇到问题随时问我\n• 有任何进展告诉我\n\n祝你早日实现目标！💰`;
      }
    } else if (input.includes("怎么做") || input.includes("详细")) {
      aiResponse = `好的，我来详细解释一下：\n\n这一步的关键是：\n1. 不要着急，慢慢来\n2. 按照提示一步步操作\n3. 遇到困难可以问我\n\n有什么具体问题吗？`;
    } else if (input.includes("问题") || input.includes("不会")) {
      aiResponse = `没问题，我来帮你：\n\n你可以把具体问题告诉我，比如：\n• "这个APP怎么下载？"\n• "注册时遇到问题了"\n• "不知道怎么操作"\n\n我会给你详细的解决方法。`;
    } else if (input.includes("赚了") || input.includes("收入")) {
      aiResponse = `太好了！💰\n\n有了收入就说明方向是对的！\n\n建议你：\n1. 记录每天的收入\n2. 总结什么方法最有效\n3. 把经验分享给更多人\n\n继续加油！`;
    } else {
      aiResponse = `收到！\n\n关于"${input.substring(0, 20)}..."：\n\n这是一个很好的问题。建议你：\n1. 先完成当前步骤\n2. 如果有具体操作问题，告诉我\n3. 我会给你详细的解决方案\n\n现在继续完成这一步吧！`;
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
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🤖</span>
            <div>
              <h1 className="font-bold">AI副业教练</h1>
              <p className="text-xs text-green-500">在线 · 随时为你服务</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b border-gray-200 p-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">进度</span>
            <span className="text-green-600 font-medium">
              {currentStep + 1} / {steps.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              } animate-fade-in`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === "user"
                    ? "bg-green-500 text-white rounded-br-md"
                    : "bg-white text-gray-800 rounded-bl-md card-shadow"
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {msg.content.split("**").map((part, i) =>
                    i % 2 === 1 ? (
                      <strong key={i} className="font-bold">
                        {part}
                      </strong>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </div>
                <div
                  className={`text-xs mt-2 ${
                    msg.role === "user" ? "text-green-100" : "text-gray-400"
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString("zh-CN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-md p-4 card-shadow">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Quick Replies */}
      <div className="bg-white border-t border-gray-200 p-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
            {["完成了", "怎么做？", "有问题", "赚到钱了"].map((reply) => (
              <button
                key={reply}
                onClick={() => {
                  setInput(reply);
                  setTimeout(() => handleSend(), 100);
                }}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 whitespace-nowrap"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="输入你的问题..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              input.trim() && !isLoading
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GuidePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-pulse-soft">🤖</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              AI教练准备中...
            </h2>
          </div>
        </div>
      }
    >
      <GuideContent />
    </Suspense>
  );
}
