"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

interface FormData {
  city: string;
  cityType: string;
  age: string;
  education: string;
  currentStatus: string;
  timePerDay: string;
  weekend: string;
  skills: string;
  interests: string;
  experience: string;
  capital: string;
  riskLevel: string;
  goal: string;
  urgency: string;
}

const questions = [
  {
    id: "city",
    question: "你在哪个城市/地区？",
    placeholder: "例如：北京、成都、河南县城",
    icon: "📍",
  },
  {
    id: "cityType",
    question: "你所在的城市属于？",
    options: [
      { value: "一线城市", label: "一线城市（北上广深）", icon: "🏙️" },
      { value: "新一线城市", label: "新一线城市（杭州、成都等）", icon: "🌆" },
      { value: "二线城市", label: "二线城市", icon: "🌇" },
      { value: "三线及以下", label: "三线及以下城市/县城", icon: "🏘️" },
      { value: "农村", label: "农村/乡镇", icon: "🌾" },
    ],
    icon: "🏙️",
  },
  {
    id: "age",
    question: "你的年龄段？",
    options: [
      { value: "18-25", label: "18-25岁", icon: "👦" },
      { value: "26-35", label: "26-35岁", icon: "👨" },
      { value: "36-45", label: "36-45岁", icon: "👨‍🦱" },
      { value: "46-55", label: "46-55岁", icon: "👴" },
      { value: "55以上", label: "55岁以上", icon: "👵" },
    ],
    icon: "📅",
  },
  {
    id: "education",
    question: "你的学历？",
    options: [
      { value: "初中及以下", label: "初中及以下", icon: "📖" },
      { value: "高中/中专", label: "高中/中专", icon: "📚" },
      { value: "大专", label: "大专", icon: "🎓" },
      { value: "本科", label: "本科", icon: "🎓" },
      { value: "研究生及以上", label: "研究生及以上", icon: "🎓" },
    ],
    icon: "📚",
  },
  {
    id: "currentStatus",
    question: "你目前的状态？",
    options: [
      { value: "全职工作", label: "全职工作", icon: "💼" },
      { value: "兼职/临时工", label: "兼职/临时工", icon: "⏰" },
      { value: "自由职业", label: "自由职业", icon: "🗽" },
      { value: "待业/失业", label: "待业/失业", icon: "🔍" },
      { value: "学生", label: "学生", icon: "🎒" },
      { value: "全职妈妈/爸爸", label: "全职妈妈/爸爸", icon: "👶" },
      { value: "退休", label: "退休", icon: "🏖️" },
    ],
    icon: "💼",
  },
  {
    id: "timePerDay",
    question: "工作日每天有多少空闲时间？",
    options: [
      { value: "1小时以内", label: "1小时以内", icon: "⏰" },
      { value: "1-3小时", label: "1-3小时", icon: "🕐" },
      { value: "3-5小时", label: "3-5小时", icon: "⏳" },
      { value: "5小时以上", label: "5小时以上", icon: "🕗" },
      { value: "全天有空", label: "全天有空", icon: "🆓" },
    ],
    icon: "⏰",
  },
  {
    id: "weekend",
    question: "周末一般怎么安排？",
    options: [
      { value: "加班", label: "经常加班", icon: "📅" },
      { value: "休息", label: "在家休息", icon: "🛋️" },
      { value: "社交", label: "朋友聚会/社交", icon: "🍻" },
      { value: "学习", label: "学习/充电", icon: "📖" },
      { value: "副业", label: "已经做副业", icon: "💰" },
    ],
    icon: "📅",
  },
  {
    id: "skills",
    question: "你擅长什么？（可多选，最多选3项）",
    options: [
      { value: "写作/文案", label: "写作/文案", icon: "✍️" },
      { value: "设计/美工", label: "设计/美工", icon: "🎨" },
      { value: "视频/摄影", label: "视频/摄影", icon: "📷" },
      { value: "编程/技术", label: "编程/技术", icon: "💻" },
      { value: "销售/沟通", label: "销售/沟通", icon: "🗣️" },
      { value: "做饭/烘焙", label: "做饭/烘焙", icon: "🍳" },
      { value: "手工/手作", label: "手工/手作", icon: "🧶" },
      { value: "教学/培训", label: "教学/培训", icon: "👨‍🏫" },
      { value: "运动/健身", label: "运动/健身", icon: "💪" },
      { value: "以上都不会", label: "以上都不会", icon: "😅" },
    ],
    multiple: true,
    maxSelect: 3,
    icon: "💡",
  },
  {
    id: "interests",
    question: "你对什么领域感兴趣？（可多选，最多选3项）",
    options: [
      { value: "电商/购物", label: "电商/购物", icon: "🛒" },
      { value: "美食/餐饮", label: "美食/餐饮", icon: "🍜" },
      { value: "时尚/穿搭", label: "时尚/穿搭", icon: "👗" },
      { value: "科技/数码", label: "科技/数码", icon: "📱" },
      { value: "教育/知识", label: "教育/知识", icon: "📚" },
      { value: "健康/养生", label: "健康/养生", icon: "🏥" },
      { value: "亲子/教育", label: "亲子/教育", icon: "👶" },
      { value: "宠物/动物", label: "宠物/动物", icon: "🐶" },
      { value: "旅行/户外", label: "旅行/户外", icon: "✈️" },
      { value: "艺术/创意", label: "艺术/创意", icon: "🎭" },
    ],
    multiple: true,
    maxSelect: 3,
    icon: "❤️",
  },
  {
    id: "experience",
    question: "你之前做过副业吗？",
    options: [
      { value: "没做过", label: "完全没有经验", icon: "🆕" },
      { value: "尝试过但没坚持", label: "尝试过但没坚持下来", icon: "🔄" },
      { value: "做过一些", label: "做过一些，赚过小钱", icon: "💵" },
      { value: "有稳定副业", label: "有稳定的副业收入", icon: "💰" },
    ],
    icon: "📊",
  },
  {
    id: "capital",
    question: "你有多少启动资金？",
    options: [
      { value: "0", label: "零成本，不想投入", icon: "🆓" },
      { value: "500以内", label: "500元以内", icon: "💵" },
      { value: "500-2000", label: "500-2000元", icon: "💰" },
      { value: "2000-5000", label: "2000-5000元", icon: "💰" },
      { value: "5000-10000", label: "5000-10000元", icon: "🤑" },
      { value: "10000以上", label: "10000元以上", icon: "🤑" },
    ],
    icon: "💰",
  },
  {
    id: "riskLevel",
    question: "你能承受多大的风险？",
    options: [
      { value: "零风险", label: "零风险，不能亏钱", icon: "🛡️" },
      { value: "低风险", label: "低风险，亏一点能接受", icon: "📊" },
      { value: "中风险", label: "中等风险，能承受一定损失", icon: "📈" },
      { value: "高风险", label: "高风险，愿意搏一搏", icon: "🎰" },
    ],
    icon: "⚖️",
  },
  {
    id: "goal",
    question: "你希望月收入达到多少？",
    options: [
      { value: "1000-3000", label: "1000-3000元（零花钱）", icon: "☕" },
      { value: "3000-5000", label: "3000-5000元（补贴家用）", icon: "🏠" },
      { value: "5000-10000", label: "5000-10000元（不错了）", icon: "💼" },
      { value: "10000-20000", label: "10000-20000元（很理想）", icon: "🎉" },
      { value: "20000以上", label: "20000元以上（多多益善）", icon: "🚀" },
    ],
    icon: "🎯",
  },
  {
    id: "urgency",
    question: "你有多需要这笔收入？",
    options: [
      { value: "不急", label: "不急，慢慢来", icon: "🐢" },
      { value: "有点急", label: "有点急，希望尽快有收入", icon: "🚶" },
      { value: "比较急", label: "比较急，需要尽快赚钱", icon: "🏃" },
      { value: "非常急", label: "非常急，急需用钱", icon: "🆘" },
    ],
    icon: "⏰",
  },
];

export default function DiagnosePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    city: "",
    cityType: "",
    age: "",
    education: "",
    currentStatus: "",
    timePerDay: "",
    weekend: "",
    skills: "",
    interests: "",
    experience: "",
    capital: "",
    riskLevel: "",
    goal: "",
    urgency: "",
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [currentMultiField, setCurrentMultiField] = useState<string>("");

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  // Reset selectedSkills when switching to a new multiple-choice question
  const resetMultiSelection = () => {
    if (currentQuestion.multiple && currentQuestion.id !== currentMultiField) {
      setSelectedSkills([]);
      setCurrentMultiField(currentQuestion.id);
      setFormData({ ...formData, [currentQuestion.id]: "" });
    }
  };

  const handleSelect = (value: string) => {
    if (currentQuestion.multiple) {
      const maxSelect = currentQuestion.maxSelect || 99;
      let newSelected: string[];
      
      if (selectedSkills.includes(value)) {
        newSelected = selectedSkills.filter((s) => s !== value);
      } else if (selectedSkills.length < maxSelect) {
        newSelected = [...selectedSkills, value];
      } else {
        return; // Already at max
      }
      
      setSelectedSkills(newSelected);
      setFormData({ ...formData, [currentQuestion.id]: newSelected.join(", ") });
    } else {
      setFormData({ ...formData, [currentQuestion.id]: value });
      // Don't auto-advance, let user click "next"
    }
  };

  const handleTextChange = (value: string) => {
    setFormData({ ...formData, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Reset multi-selection when step changes
  useEffect(() => {
    const q = questions[currentStep];
    if (q.multiple) {
      // Restore saved values if any
      const saved = formData[q.id as keyof FormData];
      if (saved) {
        setSelectedSkills(saved.split(", ").filter(Boolean));
      } else {
        setSelectedSkills([]);
      }
      setCurrentMultiField(q.id);
    }
  }, [currentStep]);

  const handleSubmit = () => {
    const params = new URLSearchParams({
      city: formData.city,
      cityType: formData.cityType,
      age: formData.age,
      education: formData.education,
      currentStatus: formData.currentStatus,
      timePerDay: formData.timePerDay,
      weekend: formData.weekend,
      skills: formData.skills,
      interests: formData.interests,
      experience: formData.experience,
      capital: formData.capital,
      riskLevel: formData.riskLevel,
      goal: formData.goal,
      urgency: formData.urgency,
    });
    router.push(`/result?${params.toString()}`);
  };

  const canProceed = () => {
    if (currentQuestion.multiple) {
      return selectedSkills.length > 0;
    }
    return formData[currentQuestion.id as keyof FormData] !== "";
  };

  const isLastStep = currentStep === questions.length - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="深度诊断" showBack={true} />

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500">
              {currentStep === 0 ? "准备开始" : `第 ${currentStep} 题`}
            </span>
            <span className="text-sm font-semibold text-amber-600">
              {currentStep + 1} / {questions.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="animate-slide-up">
          <div className="text-center mb-10">
            <div className="w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-2xl flex items-center justify-center">
              <span className="text-4xl">{currentQuestion.icon}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {currentQuestion.question}
            </h2>
            {currentQuestion.multiple && currentQuestion.maxSelect && (
              <p className="text-sm text-gray-500 mt-2">
                最多选择 {currentQuestion.maxSelect} 项
              </p>
            )}
          </div>

          {currentQuestion.options ? (
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = currentQuestion.multiple
                  ? selectedSkills.includes(option.value)
                  : formData[currentQuestion.id as keyof FormData] === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? "border-amber-500 bg-amber-50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{option.icon}</span>
                      <span className="text-sm font-medium text-gray-700 flex-1">
                        {option.label}
                      </span>
                      {isSelected && (
                        <span className="text-amber-500">✓</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <input
              type="text"
              value={formData[currentQuestion.id as keyof FormData]}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="w-full p-5 border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-amber-500 bg-white transition-all"
              autoFocus
            />
          )}

          {currentQuestion.multiple && (
            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                已选择 {selectedSkills.length} 项
              </span>
            </div>
          )}
        </div>

        <div className="mt-10 flex gap-4">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="px-6 py-4 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              上一步
            </button>
          )}
          {isLastStep ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className={`flex-1 py-4 rounded-xl text-lg font-bold transition-all ${
                canProceed()
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              开始诊断 🚀
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex-1 py-4 rounded-xl text-lg font-bold transition-all ${
                canProceed()
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              下一步 →
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
