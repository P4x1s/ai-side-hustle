"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        router.push("/");
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">🔐</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">验证中...</h2>
        <p className="text-gray-500">正在完成登录</p>
      </div>
    </div>
  );
}
