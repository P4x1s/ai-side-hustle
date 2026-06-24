"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  city: string;
  timePerDay: string;
  skills: string;
  capital: string;
  goal: string;
}

const questions = [
  {
    id: "city",
    question: "你在哪个城市/地区？",
    placeholder: "例如：北京、成都、河南县城",
    icon: "📍",
  },
  {
    id: "timePerDay",
    question: "每天有多少空闲时间？",
    options: [
      { value: "1小时以内", label: "1小时以内", icon: "⏰" },
      { value: "1-3小时", label: "1-3小时", icon: "🕐" },
      { value: "3-5小时", label: "3-5小时", icon: "⏳" },
      { value: "5小时以上", label: "5小时以上", icon: "🕗" },
    ],
    icon: "⏰",
  },
  {
    id: "skills",
    question: "你会用智能手机做什么？（可多选）",
    options: [
      { value: "发朋友圈、聊天", label: "发朋友圈、聊天", icon: "💬" },
      { value: "拍照、拍视频", label: "拍照、拍视频", icon: "📷" },
      { value: "网购、比价", label: "网购、比价", icon: "🛒" },
      { value: "基本办公（Word、Excel）", label: "基本办公", icon: "💻" },
      { value: "以上都不会", label: "以上都不会", icon: "😅" },
    ],
    multiple: true,
    icon: "📱",
  },
  {
    id: "capital",
    question: "有没有启动资金？",
    options: [
      { value: "没有", label: "没有，零成本", icon: "🆓" },
      { value: "1000以内", label: "1000元以内", icon: "💵" },
      { value: "1000-5000", label: "1000-5000元", icon: "💰" },
      { value: "5000以上", label: "5000元以上", icon: "🤑" },
    ],
    icon: "💰",
  },
  {
    id: "goal",
    question: "你希望月收入达到多少？",
    options: [
      { value: "1000-3000", label: "1000-3000元（补贴家用）", icon: "🏠" },
      { value: "3000-5000", label: "3000-5000元（基本收入）", icon: "💼" },
      { value: "5000-10000", label: "5000-10000元（不错了）", icon: "🎉" },
      { value: "10000以上", label: "10000元以上（多多益善）", icon: "🚀" },
    ],
    icon: "🎯",
  },
];

export default function DiagnosePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    city: "",
    timePerDay: "",
    skills: "",
    capital: "",
    goal: "",
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleSelect = (value: string) => {
    if (currentQuestion.multiple) {
      const newSkills = selectedSkills.includes(value)
        ? selectedSkills.filter((s) => s !== value)
        : [...selectedSkills, value];
      setSelectedSkills(newSkills);
      setFormData({ ...formData, [currentQuestion.id]: newSkills.join(", ") });
    } else {
      setFormData({ ...formData, [currentQuestion.id]: value });
      if (currentStep < questions.length - 1) {
        setTimeout(() => setCurrentStep(currentStep + 1), 300);
      }
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

  const handleSubmit = () => {
    const params = new URLSearchParams({
      city: formData.city,
      timePerDay: formData.timePerDay,
      skills: formData.skills,
      capital: formData.capital,
      goal: formData.goal,
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
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors ${
                currentStep === 0 ? "invisible" : ""
              }`}
            >
              <span>←</span>
              <span className="text-sm">返回</span>
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentQuestion.icon}</span>
              <span className="text-sm font-medium text-gray-500">
                {currentStep + 1} / {questions.length}
              </span>
            </div>
            
            <div className="w-16"></div>
          </div>
          
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Question */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{currentQuestion.icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
              {currentQuestion.question}
            </h2>
          </div>

          {currentQuestion.options ? (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = currentQuestion.multiple
                  ? selectedSkills.includes(option.value)
                  : formData[currentQuestion.id as keyof FormData] === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="flex-1 font-medium text-gray-700">
                        {option.label}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                value={formData[currentQuestion.id as keyof FormData]}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-emerald-500 bg-gray-50 focus:bg-white transition-all"
                autoFocus
              />
            </div>
          )}

          {currentQuestion.multiple && (
            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                已选择 {selectedSkills.length} 项
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-10">
          {isLastStep ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className={`w-full py-4 rounded-xl text-lg font-bold transition-all ${
                canProceed()
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              开始诊断 🚀
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`w-full py-4 rounded-xl text-lg font-bold transition-all ${
                canProceed()
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg"
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
