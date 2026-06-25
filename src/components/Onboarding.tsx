"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Onboarding() {
  const router = useRouter();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useLocalStorage("has-seen-onboarding", false);
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!hasSeenOnboarding) {
      setShow(true);
    }
  }, [hasSeenOnboarding]);

  const steps = [
    {
      icon: "🎯",
      title: "找到你的副业方向",
      description: "回答几个简单问题，AI会根据你的情况推荐适合的副业方案",
    },
    {
      icon: "📋",
      title: "获取详细步骤",
      description: "每个副业都拆分成5-6个简单步骤，跟着做就行",
    },
    {
      icon: "🤖",
      title: "AI教练陪伴",
      description: "遇到问题随时问，AI教练手把手带你做",
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setHasSeenOnboarding(true);
      setShow(false);
    }
  };

  const handleSkip = () => {
    setHasSeenOnboarding(true);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden">
        {/* Progress */}
        <div className="flex gap-1 p-4 pb-0">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-amber-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="text-6xl mb-6">{steps[step].icon}</div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {steps[step].title}
          </h2>
          <p className="text-gray-500 text-sm">
            {steps[step].description}
          </p>
        </div>

        {/* Actions */}
        <div className="p-4 space-y-3">
          <button
            onClick={handleNext}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
          >
            {step < steps.length - 1 ? "下一步" : "开始使用"}
          </button>
          <button
            onClick={handleSkip}
            className="w-full py-3 text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            跳过
          </button>
        </div>
      </div>
    </div>
  );
}
