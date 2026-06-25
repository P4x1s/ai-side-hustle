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
        content: `你好！我是你的副业教练 🤖\n\n你选择了「${hustleName}」，这是一个${hustle.difficulty}难度、预期${hustle.potential}的副业方向。\n\n我会手把手带你做，每一步都会详细指导。\n\n我们从第一步开始：\n\n**第1步：${steps[0]}**\n\n完成后点击"完成了"，我教你下一步。\n\n有任何问题随时问我！`,
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

    await new Promise((resolve) => setTimeout(resolve, 1000));

    let aiResponse = "";

    if (text.includes("完成了") || text.includes("好了") || text.includes("OK") || text.includes("ok")) {
      const nextStep = currentStep + 1;
      if (nextStep < steps.length) {
        setCurrentStep(nextStep);
        const encouragements = [
          "太棒了！👏 你做得很好！",
          "厉害！继续保持这个节奏！",
          "做得好！每一步都是进步！",
          "完美！你已经掌握了这一步！",
          "优秀！离成功又近了一步！",
        ];
        const tips = [
          "小提示：如果遇到困难，随时可以问我。",
          "记住：坚持是成功的关键。",
          "做得不错！下一步会更有挑战性。",
          "继续保持，你已经在正确的道路上了。",
          "太好了！你的执行力很强！",
        ];
        const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        aiResponse = `${randomEncouragement}\n\n第${currentStep + 1}步完成！\n\n${randomTip}\n\n下一步（第${nextStep + 1}步）：\n\n**${steps[nextStep]}**\n\n完成后继续点"完成了"。`;
      } else {
        aiResponse = `🎉🎉🎉 恭喜你！所有步骤都完成了！\n\n你真的太棒了！能够坚持完成所有步骤，说明你是一个有执行力的人。\n\n接下来的建议：\n\n1️⃣ **立即行动** - 不要等，今天就开始做\n2️⃣ **记录数据** - 记录每天的收入和支出\n3️⃣ **持续优化** - 根据反馈调整策略\n4️⃣ **扩大规模** - 做得好就加大投入\n\n记住：\n• 坚持每天做一点，积少成多\n• 遇到问题随时问我\n• 赚到钱了一定要告诉我！\n\n祝你早日实现目标！💪💰`;
      }
    } else if (text.includes("怎么做") || text.includes("详细") || text.includes("不会") || text.includes("具体")) {
      const stepTips: Record<string, string> = {
        "闲鱼": "闲鱼操作指南：\n\n1️⃣ 打开闲鱼APP\n2️⃣ 点击底部'+'按钮\n3️⃣ 选择'卖闲置'\n4️⃣ 拍照或从相册选择图片\n5️⃣ 填写商品名称和描述\n6️⃣ 设置价格（建议比1688贵30-50%）\n7️⃣ 选择包邮\n8️⃣ 点击发布\n\n小技巧：\n• 标题要包含关键词（如'全新'、'包邮'）\n• 图片要清晰，最好有实物图\n• 描述要详细，包括尺寸、材质等",
        "美团": "美团优选团长注册指南：\n\n1️⃣ 打开微信\n2️⃣ 搜索'美团优选'\n3️⃣ 点击'成为团长'\n4️⃣ 填写手机号，获取验证码\n5️⃣ 填写个人信息和小区地址\n6️⃣ 上传身份证照片\n7️⃣ 等待审核（通常1-2天）\n8️⃣ 审核通过后开始推广\n\n小技巧：\n• 在小区业主群发布第一条团购信息\n• 选择水果、蔬菜等高频消费品\n• 保持良好的服务态度",
        "抖音": "抖音中视频计划指南：\n\n1️⃣ 打开抖音APP\n2️⃣ 点击底部'+'按钮\n3️⃣ 选择相册中的视频（1分钟以上）\n4️⃣ 添加标题和话题标签\n5️⃣ 点击发布\n\n小技巧：\n• 前3秒要吸引人\n• 内容要有价值或有趣\n• 保持每天更新\n• 多参与热门话题",
        "小红书": "小红书种草笔记指南：\n\n1️⃣ 打开小红书APP\n2️⃣ 点击底部'+'按钮\n3️⃣ 选择图片（建议3-9张）\n4️⃣ 撰写标题（20字以内）\n5️⃣ 撰写正文（200字以上）\n6️⃣ 添加话题标签\n7️⃣ 点击发布\n\n小技巧：\n• 图片要精美，光线好\n• 文案要真实，不要过度营销\n• 选择合适的发布时间（晚上7-9点）\n• 多与粉丝互动",
      };
      
      let detail = "";
      for (const [key, value] of Object.entries(stepTips)) {
        if (steps[currentStep]?.includes(key)) {
          detail = value;
          break;
        }
      }
      
      if (detail) {
        aiResponse = `好的，我来详细教你这一步：\n\n${detail}`;
      } else {
        aiResponse = `关于「${steps[currentStep]}」，我来详细解释：\n\n**具体操作：**\n1. 不要着急，慢慢来\n2. 按照提示一步步操作\n3. 遇到困难随时问我\n\n**常见问题：**\n• 如果找不到入口，可以截图发给我\n• 如果注册遇到问题，告诉我具体错误\n• 如果不确定怎么做，我可以给你更详细的指导\n\n你现在具体哪里不会？告诉我，我帮你解决。`;
      }
    } else if (text.includes("赚了") || text.includes("收入") || text.includes("钱") || text.includes("收益")) {
      aiResponse = `太好了！💰 有了收入说明方向对了！\n\n接下来建议你这样做：\n\n📊 **记录数据**\n• 今天赚了多少？\n• 成本是多少？\n• 净利润是多少？\n• 工作了多长时间？\n\n🔍 **分析优化**\n• 什么方法效果最好？\n• 什么时间段收入最高？\n• 如何提高效率？\n• 客户有什么反馈？\n\n📈 **扩大规模**\n• 能否增加投入？\n• 能否拓展渠道？\n• 能否开发新产品？\n• 能否提高单价？\n\n📅 **建立习惯**\n• 每天固定时间做\n• 保持稳定的输出\n• 不要三天打鱼两天晒网\n\n你现在赚了多少？我帮你分析下一步怎么做。`;
    } else if (text.includes("多久") || text.includes("时间") || text.includes("周期")) {
      aiResponse = `关于时间，给你一些参考：\n\n⏱️ **起步期（1-2周）**\n• 熟悉流程，学习方法\n• 这个阶段可能还没收入\n• 重要的是打好基础\n• 预期：0-500元\n\n📈 **成长期（1-3个月）**\n• 开始有稳定收入\n• 逐步优化方法\n• 建立了第一批客户\n• 预期：1000-3000元/月\n\n💪 **稳定期（3-6个月）**\n• 收入稳定增长\n• 有了稳定的客户群\n• 方法已经成熟\n• 预期：3000-5000元/月\n\n🚀 **爆发期（6个月以上）**\n• 收入大幅提升\n• 可能拓展多个渠道\n• 建立了品牌效应\n• 预期：5000-10000元/月\n\n记住：每个人的情况不同，关键是坚持。有些人可能更快，有些人可能更慢，但只要坚持，就一定能成功！`;
    } else if (text.includes("坚持") || text.includes("放弃") || text.includes("难") || text.includes("不想")) {
      aiResponse = `我理解你的感受。坚持确实不容易，但请记住：\n\n💪 **你不是一个人**\n很多人在开始时都会遇到困难，这是正常的。\n\n🎯 **设定小目标**\n不要想着一步登天，先设定小目标：\n• 今天赚到第一块钱\n• 本周完成5单\n• 本月收入达到1000元\n\n📊 **记录进步**\n每天记录你的进步，哪怕是小小的进步。\n回头看看，你会发现自己已经走了很远。\n\n🤝 **寻求支持**\n遇到困难可以问我，我会帮你解决。\n也可以找志同道合的朋友一起做。\n\n🎯 **想想初心**\n你为什么开始做这个副业？\n是为了给家人更好的生活？还是为了实现自己的梦想？\n\n现在遇到什么具体困难？告诉我，我帮你分析。`;
    } else if (text.includes("怕") || text.includes("担心") || text.includes("风险")) {
      aiResponse = `担心是很正常的，但过度担心会影响行动。\n\n🛡️ **降低风险的方法**\n• 从最小的成本开始\n• 不要一次性投入太多\n• 先测试市场反应\n• 保持充足的资金储备\n\n📊 **理性分析**\n• 最坏的情况是什么？\n• 能承受吗？\n• 有什么补救措施？\n• 成功的概率有多大？\n\n🎯 **渐进式投入**\n• 第一周：只投入时间\n• 第二周：投入少量资金\n• 第三周：根据效果调整\n• 一个月后：决定是否扩大\n\n记住：不行动才是最大的风险。试试看， worst case 也就是浪费一点时间。`;
    } else if (text.includes("客户") || text.includes("客户") || text.includes("销售") || text.includes("推广")) {
      aiResponse = `获客是副业成功的关键！这里给你一些实用的获客方法：\n\n📱 **线上渠道**\n• 朋友圈：每天发1-2条，不要刷屏\n• 小红书：发布相关内容，吸引精准客户\n• 抖音：拍短视频，展示产品或服务\n• 微信群：加入相关群组，提供价值\n\n🤝 **线下渠道**\n• 朋友推荐：最靠谱的获客方式\n• 社区活动：参与本地活动，认识新朋友\n• 口碑传播：服务好每个客户，让他们帮你推荐\n\n💡 **获客技巧**\n• 提供免费试用或体验\n• 给老客户推荐奖励\n• 收集客户好评和案例\n• 定期维护客户关系\n\n你现在有多少客户？是怎么获客的？`;
    } else {
      const responses = [
        `好的，我来帮你。\n\n当前进度：第${currentStep + 1}步 / 共${steps.length}步\n\n当前任务：**${steps[currentStep]}**\n\n有什么具体问题吗？我可以：\n• 详细解释这一步怎么做\n• 帮你解决遇到的困难\n• 给你更多的建议和技巧\n• 分享其他人的成功经验`,
        `收到！我来帮你。\n\n你现在在做：**${steps[currentStep]}**\n\n如果遇到困难，可以告诉我具体哪里不会。\n如果完成了，点"完成了"进入下一步。\n\n我会全程陪伴你，直到你成功！`,
        `明白了。\n\n当前进度：${currentStep + 1}/${steps.length}\n\n**${steps[currentStep]}**\n\n有什么我可以帮你的吗？\n\n你可以问我：\n• 这一步具体怎么做？\n• 遇到问题怎么解决？\n• 有什么技巧和经验？\n• 什么时候能赚到钱？`,
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
              <a href="/" className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">$</span>
                </div>
              </a>
              <div>
                <h1 className="font-bold text-gray-900">副业教练</h1>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-xs text-emerald-600">在线</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm font-semibold text-amber-600">
                {currentStep + 1} / {steps.length}
              </div>
              <a href="/" className="text-sm text-gray-500 hover:text-gray-700">
                首页
              </a>
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

      {/* Hustle Info */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">💰</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 text-sm">{hustleName}</div>
              <div className="text-xs text-gray-500">{hustle.potential} · {hustle.difficulty}</div>
            </div>
            <div className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
              {currentStep + 1 <= steps.length ? `第${currentStep + 1}步` : '已完成'}
            </div>
          </div>
        </div>
      </div>

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
            {["完成了", "怎么做？", "遇到问题了", "赚到钱了", "想放弃了"].map((reply) => (
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between text-xs text-gray-400">
          <span>© 2026 钱途</span>
          <div className="flex gap-4">
            <a href="/about" className="hover:text-gray-600">关于我们</a>
            <a href="/contact" className="hover:text-gray-600">联系我们</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function GuidePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-2xl flex items-center justify-center animate-pulse">
            <span className="text-3xl">🤖</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">加载中...</h2>
        </div>
      </div>
    }>
      <GuideContent />
    </Suspense>
  );
}
