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
        <div className="flex items-center justify-between h-14">
          {/* Left: Back or Logo */}
          <div className="flex items-center gap-3">
            {showBack ? (
              <button
                onClick={() => router.back()}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ←
              </button>
            ) : null}
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-xl">💰</span>
              <span className="text-base font-bold text-gray-900 hidden sm:block">AI副业教练</span>
            </button>
          </div>

          {/* Center: Title */}
          {title && (
            <div className="absolute left-1/2 -translate-x-1/2">
              <span className="font-medium text-gray-900">{title}</span>
            </div>
          )}

          {/* Right: User or Actions */}
          <div className="flex items-center gap-3">
            {showUser && user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 hidden sm:block">{user.email}</span>
                <button
                  onClick={signOut}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  退出
                </button>
              </div>
            ) : showUser ? (
              <button
                onClick={() => router.push("/login")}
                className="px-4 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
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
