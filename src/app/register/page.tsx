"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

type Step = 1 | 2 | 3;

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, user } = useAuth();
  const [step, setStep] = useState<Step>(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  if (user) {
    router.push("/dashboard");
    return null;
  }

  const handleSendCode = () => {
    if (!phone) {
      setError("请输入手机号");
      return;
    }
    setCodeSent(true);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleNextStep = () => {
    setError("");
    if (step === 1) {
      if (!phone || !code) {
        setError("请填写手机号和验证码");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!email || !password) {
        setError("请填写邮箱和密码");
        return;
      }
      if (password.length < 6) {
        setError("密码至少6位");
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    setError("");
    if (!nickname) {
      setError("请填写昵称");
      return;
    }
    if (!agreed) {
      setError("请同意用户协议");
      return;
    }

    setLoading(true);
    const result = await signUp(email, password);
    if (result.error) {
      setError(result.error);
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => router.push("/")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">$</span>
            </div>
            <span className="font-bold text-gray-900">钱途</span>
          </button>
          <div className="text-sm text-gray-500">
            已有账号？
            <a href="/login" className="text-amber-600 font-medium ml-1 hover:underline">
              去登录
            </a>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-3xl">$</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">注册钱途</h1>
            <p className="text-gray-500 mt-2">创建账号，开启副业之旅</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= s
                      ? "bg-amber-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > s ? "✓" : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-0.5 ${
                      step > s ? "bg-amber-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center text-sm text-gray-500 mb-6">
            {step === 1 && "验证手机号"}
            {step === 2 && "设置账号密码"}
            {step === 3 && "完善个人信息"}
          </div>

          {/* Step 1: Phone Verification */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">+86</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="手机号"
                  className="w-full pl-16 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="验证码"
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 pr-28"
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={countdown > 0}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 text-sm font-medium text-amber-600 hover:bg-amber-50 rounded-lg disabled:text-gray-400"
                >
                  {countdown > 0 ? `${countdown}s` : "获取验证码"}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Account Setup */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">邮箱</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="用于登录和找回密码"
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">密码</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="至少6位"
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        password.length >= i * 3
                          ? password.length >= 9
                            ? "bg-green-500"
                            : password.length >= 6
                            ? "bg-amber-500"
                            : "bg-red-500"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {password.length < 6 ? "弱" : password.length < 9 ? "中" : "强"}
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Profile */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">昵称</label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="给自己取个名字"
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="p-4 bg-amber-50 rounded-xl">
                <p className="text-sm text-amber-800">
                  💡 好的昵称能让你在社区中更容易被记住
                </p>
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="agree" className="text-sm text-gray-500">
                  我已阅读并同意{" "}
                  <a href="/privacy" className="text-amber-600 hover:underline">隐私政策</a>
                  和{" "}
                  <a href="/about" className="text-amber-600 hover:underline">用户协议</a>
                </label>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>
          )}

          {/* Buttons */}
          <div className="mt-6 space-y-3">
            {step < 3 ? (
              <button
                onClick={handleNextStep}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all"
              >
                下一步
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? "注册中..." : "完成注册"}
              </button>
            )}
            {step > 1 && (
              <button
                onClick={() => setStep((prev) => (prev - 1) as Step)}
                className="w-full py-3 text-gray-500 hover:text-gray-700 transition-colors"
              >
                上一步
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            注册即代表同意
            <a href="/privacy" className="text-amber-600 hover:underline">隐私政策</a>
            和
            <a href="/about" className="text-amber-600 hover:underline">用户协议</a>
          </div>
        </div>
      </div>
    </div>
  );
}
