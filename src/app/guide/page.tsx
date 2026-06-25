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
        const tips = [
          "加油！每完成一步，你就离目标更近了。",
          "做得好！保持这个节奏，很快就能看到成果。",
          "太棒了！继续加油，你已经在正确的道路上了。",
          "很好！记住，坚持是成功的关键。",
        ];
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        aiResponse = `太棒了！👏 第${currentStep + 1}步完成！\n\n${randomTip}\n\n下一步（第${nextStep + 1}步）：\n\n**${steps[nextStep]}**\n\n完成后继续点"完成了"。`;
      } else {
        aiResponse = `🎉 恭喜你！所有步骤都完成了！\n\n你已经迈出了最重要的一步。现在：\n\n1️⃣ **开始执行** - 按照学到的方法去做\n2️⃣ **记录数据** - 记录每天的收入和支出\n3️⃣ **持续优化** - 根据反馈调整策略\n\n记住：\n• 坚持每天做一点，积少成多\n• 遇到问题随时问我\n• 赚到钱了一定要告诉我！\n\n祝你早日实现目标！💰`;
      }
    } else if (text.includes("怎么做") || text.includes("详细") || text.includes("不会")) {
      const stepDetails: Record<string, string> = {
        "闲鱼": "打开闲鱼APP -> 点击'发布' -> 选择'卖闲置' -> 拍照或从相册选择商品图片 -> 填写商品描述和价格 -> 选择包邮 -> 发布",
        "美团": "打开微信 -> 搜索'美团优选' -> 点击'成为团长' -> 填写个人信息和小区地址 -> 等待审核（通常1-2天） -> 审核通过后开始推广",
        "抖音": "打开抖音APP -> 点击'+'发布视频 -> 选择相册中的视频 -> 添加标题和话题标签 -> 点击发布",
        "小红书": "打开小红书APP -> 点击'+'发布笔记 -> 选择图片或视频 -> 撰写标题和正文 -> 添加话题标签 -> 发布",
      };
      
      let detail = "";
      for (const [key, value] of Object.entries(stepDetails)) {
        if (steps[currentStep]?.includes(key)) {
          detail = value;
          break;
        }
      }
      
      aiResponse = `关于这一步，我来详细帮你：\n\n**${steps[currentStep]}**\n\n${detail || "具体操作：\n1. 不要着急，慢慢来\n2. 按照提示一步步操作\n3. 遇到困难随时问我\n\n你可以告诉我具体哪里不会，我帮你解决。"}`;
    } else if (text.includes("赚了") || text.includes("收入") || text.includes("钱")) {
      aiResponse = `太好了！💰 有了收入说明方向对了！\n\n接下来建议：\n\n1️⃣ **记录数据**\n   - 今天赚了多少？\n   - 成本是多少？\n   - 净利润是多少？\n\n2️⃣ **分析优化**\n   - 什么方法效果最好？\n   - 什么时间段收入最高？\n   - 如何提高效率？\n\n3️⃣ **扩大规模**\n   - 能否增加投入？\n   - 能否拓展渠道？\n   - 能否开发新产品？\n\n4️⃣ **建立习惯**\n   - 每天固定时间做\n   - 保持稳定的输出\n   - 不要三天打鱼两天晒网\n\n你现在赚了多少？我帮你分析下一步怎么做。`;
    } else if (text.includes("多久") || text.includes("时间")) {
      aiResponse = `关于时间，给你一些参考：\n\n**起步期（1-2周）**\n• 熟悉流程，学习方法\n• 这个阶段可能还没收入\n• 重要的是打好基础\n\n**成长期（1-3个月）**\n• 开始有稳定收入\n• 逐步优化方法\n• 收入可能在1000-3000元\n\n**稳定期（3-6个月）**\n• 收入稳定增长\n• 建立了客户群\n• 月收入可能达到3000-5000元\n\n**爆发期（6个月以上）**\n• 收入大幅提升\n• 可能拓展多个渠道\n• 月收入可能达到5000-10000元\n\n记住：每个人的情况不同，关键是坚持。`;
    } else if (text.includes("坚持") || text.includes("放弃") || text.includes("难")) {
      aiResponse = `我理解你的感受。坚持确实不容易，但请记住：\n\n💪 **你不是一个人**\n很多人在开始时都会遇到困难，这是正常的。\n\n🎯 **设定小目标**\n不要想着一步登天，先设定小目标：\n• 今天赚到第一块钱\n• 本周完成5单\n• 本月收入达到1000元\n\n📊 **记录进步**\n每天记录你的进步，哪怕是小小的进步。\n回头看看，你会发现自己已经走了很远。\n\n🤝 **寻求支持**\n遇到困难可以问我，我会帮你解决。\n也可以找志同道合的朋友一起做。\n\n你现在遇到什么具体困难？告诉我，我帮你分析。`;
    } else {
      const responses = [
        `收到！我来帮你。\n\n当前进度：第${currentStep + 1}步 / 共${steps.length}步\n\n当前任务：**${steps[currentStep]}**\n\n有什么具体问题吗？我可以：\n• 详细解释这一步怎么做\n• 帮你解决遇到的困难\n• 给你更多的建议和技巧`,
        `好的，我来帮你。\n\n你现在在做：**${steps[currentStep]}**\n\n如果遇到困难，可以告诉我具体哪里不会。\n如果完成了，点"完成了"进入下一步。\n\n我会全程陪伴你，直到你成功！`,
        `明白了。\n\n当前进度：${currentStep + 1}/${steps.length}\n\n**${steps[currentStep]}**\n\n有什么我可以帮你的吗？`,
      ];
      aiResponse = responses[Math.floor(Math.random() * responses.length)];
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
