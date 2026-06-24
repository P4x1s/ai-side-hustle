"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Message {
  role: "ai" | "user";
  content: string;
  timestamp: Date;
}

const hustleSteps: Record<string, string[]> = {
  "闲鱼无货源卖货": [
    "下载闲鱼APP，用手机号注册账号",
    "打开1688.com，搜索热门商品（如手机壳、数据线）",
    "复制商品图片和描述，发布到闲鱼",
    "有人下单后，去1688下单，填写买家地址",
    "1688发货后，把快递单号填到闲鱼",
    "买家确认收货，你赚取差价",
  ],
  "社区团购团长": [
    "打开微信，搜索'美团优选'或'多多买菜'",
    "点击'成为团长'，按提示注册",
    "在小区业主群发布第一条团购信息",
    "收集邻居订单，汇总提交给平台",
    "到货后通知邻居取货",
    "完成交易，佣金到账",
  ],
  "短视频带货": [
    "下载抖音APP，注册并完善资料",
    "发布10条日常视频，积累基础粉丝",
    "粉丝达到1000后，开通商品橱窗",
    "在选品中心选择佣金高的商品",
    "拍摄商品使用视频，挂上链接",
    "有人购买，你赚佣金",
  ],
  "跑腿代办": [
    "下载UU跑腿或闪送APP",
    "完成注册和实名认证",
    "在熟悉区域接第一单",
    "按要求完成任务（取送/排队等）",
    "完成后确认收款",
    "积累好评，提高接单量",
  ],
  "手工制品售卖": [
    "选择一种简单手工（编织/串珠等）",
    "购买基础材料（100元以内）",
    "制作3-5件成品",
    "拍照上传到闲鱼",
    "定价：材料费+时间（每小时20元）",
    "有订单后开始稳定制作",
  ],
  "私房烘焙": [
    "购买基础工具（烤箱+模具约500元）",
    "学习制作简单的杯子蛋糕",
    "先做给朋友试吃，收集反馈",
    "在朋友圈发布，接受预订",
    "按订单制作，保证新鲜",
    "积累回头客，扩大口碑",
  ],
  "本地自媒体": [
    "确定内容方向（美食/生活/探店）",
    "每天发布1-2条短视频",
    "坚持30天，积累1000粉丝",
    "开通创作者收益",
    "联系本地商家谈合作",
    "发展粉丝社群",
  ],
  "技能教学": [
    "确定你要教什么（做饭/化妆/健身）",
    "录制3节免费试听课",
    "在小红书发布，吸引关注",
    "收集反馈，优化内容",
    "开设付费课程（99元起）",
    "建立学员社群，持续服务",
  ],
};

function GuideContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hustleName = searchParams.get("name") || "社区团购团长";
  const steps = hustleSteps[hustleName] || hustleSteps["社区团购团长"];

  useEffect(() => {
    const welcomeMessage: Message = {
      role: "ai",
      content: `你好！我是你的AI副业教练 🤖\n\n你选择了「${hustleName}」，我会手把手带你做。\n\n我们从第一步开始：\n\n**第1步：${steps[0]}**\n\n完成后点击"完成了"，我教你下一步。`,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [hustleName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      aiResponse = `收到！\n\n当前进度：第${currentStep + 1}步 / 共${steps.length}步\n\n当前任务：**${steps[currentStep]}**\n\n完成后点"就行了"，我教你下一步。`;
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
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <h1 className="font-bold">AI副业教练</h1>
            <p className="text-xs text-green-500">在线 · 随时为你服务</p>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b border-gray-200 p-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">📍 {hustleName}</span>
            <span className="text-green-600 font-bold">
              {currentStep + 1} / {steps.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
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
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 ${
                  msg.role === "user"
                    ? "bg-green-500 text-white rounded-br-md"
                    : "bg-white text-gray-800 rounded-bl-md card-shadow"
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {msg.content.split("**").map((part, i) =>
                    i % 2 === 1 ? (
                      <strong key={i} className="font-bold">{part}</strong>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </div>
                <div className={`text-xs mt-2 ${msg.role === "user" ? "text-green-100" : "text-gray-400"}`}>
                  {msg.timestamp.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-md p-4 card-shadow">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
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
          <div className="flex gap-2 overflow-x-auto">
            {["完成了", "怎么做？", "有问题", "赚到钱了"].map((reply) => (
              <button
                key={reply}
                onClick={() => handleSend(reply)}
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
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className={`px-6 py-3 rounded-full font-medium ${
              input.trim() && !isLoading
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-200 text-gray-400"
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
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-6xl mb-4 animate-pulse-soft">🤖</div></div>}>
      <GuideContent />
    </Suspense>
  );
}
