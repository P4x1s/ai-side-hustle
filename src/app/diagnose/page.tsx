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
      { value: "1小时以内", label: "1小时以内" },
      { value: "1-3小时", label: "1-3小时" },
      { value: "3-5小时", label: "3-5小时" },
      { value: "5小时以上", label: "5小时以上" },
    ],
    icon: "⏰",
  },
  {
    id: "skills",
    question: "你会用智能手机做什么？（可多选）",
    options: [
      { value: "发朋友圈、聊天", label: "发朋友圈、聊天" },
      { value: "拍照、拍视频", label: "拍照、拍视频" },
      { value: "网购、比价", label: "网购、比价" },
      { value: "基本办公（Word、Excel）", label: "基本办公" },
      { value: "以上都不会", label: "以上都不会" },
    ],
    multiple: true,
    icon: "📱",
  },
  {
    id: "capital",
    question: "有没有启动资金？",
    options: [
      { value: "没有", label: "没有，零成本" },
      { value: "1000以内", label: "1000元以内" },
      { value: "1000-5000", label: "1000-5000元" },
      { value: "5000以上", label: "5000元以上" },
    ],
    icon: "💰",
  },
  {
    id: "goal",
    question: "你希望月收入达到多少？",
    options: [
      { value: "1000-3000", label: "1000-3000元（补贴家用）" },
      { value: "3000-5000", label: "3000-5000元（基本收入）" },
      { value: "5000-10000", label: "5000-10000元（不错了）" },
      { value: "10000以上", label: "10000元以上（多多益善）" },
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
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleBack}
              className={`text-gray-500 ${currentStep === 0 ? "invisible" : ""}`}
            >
              ← 返回
            </button>
            <span className="text-sm text-gray-500">
              {currentStep + 1} / {questions.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Question */}
      <main className="max-w-2xl mx-auto p-6">
        <div className="animate-fade-in">
          <div className="text-5xl mb-6">{currentQuestion.icon}</div>

          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            {currentQuestion.question}
          </h2>

          {currentQuestion.options ? (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = currentQuestion.multiple
                  ? selectedSkills.includes(option.value)
                  : formData[currentQuestion.id as keyof FormData] === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? "border-green-500 bg-green-500"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="w-3 h-3 text-white"
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
                      <span>{option.label}</span>
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
              className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none text-lg"
            />
          )}

          {currentQuestion.multiple && (
            <p className="text-sm text-gray-500 mt-4">
              已选择 {selectedSkills.length} 项
            </p>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-4">
          {isLastStep ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className={`flex-1 py-4 rounded-xl text-lg font-bold transition-colors ${
                canProceed()
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              开始诊断 🚀
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex-1 py-4 rounded-xl text-lg font-bold transition-colors ${
                canProceed()
                  ? "bg-green-500 text-white hover:bg-green-600"
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
