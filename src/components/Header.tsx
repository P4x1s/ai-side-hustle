"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showUser?: boolean;
}

export default function Header({ title, showBack = false, showUser = true }: HeaderProps) {
  const router = useRouter();
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Back or Logo */}
          <div className="flex items-center gap-3">
            {showBack ? (
              <button
                onClick={() => router.back()}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            ) : null}
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">$</span>
              </div>
              <span className="text-xl font-bold text-gray-900">钱途</span>
            </button>
          </div>

          {/* Center: Title */}
          {title && (
            <div className="absolute left-1/2 -translate-x-1/2">
              <span className="font-semibold text-gray-900">{title}</span>
            </div>
          )}

          {/* Right: User or Actions */}
          <div className="flex items-center gap-3">
            {showUser && user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors"
                >
                  <span className="text-sm font-medium text-amber-700">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </button>
              </div>
            ) : showUser ? (
              <button
                onClick={() => router.push("/login")}
                className="px-5 py-2 text-sm font-medium text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              >
                登录
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
