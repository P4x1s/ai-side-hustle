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
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                </svg>
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
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-amber-700">{user.email?.charAt(0).toUpperCase()}</span>
                </div>
                <button
                  onClick={signOut}
                  className="text-sm text-gray-500 hover:text-gray-700 hidden sm:block"
                >
                  退出
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
