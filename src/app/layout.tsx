import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Feedback from "@/components/Feedback";

export const metadata: Metadata = {
  title: "钱途 - 找到你的副业方向",
  description: "不知道做什么副业？让AI帮你找到方向，手把手教你开始",
  keywords: "副业,赚钱,兼职,赚钱方法,副业推荐",
  openGraph: {
    title: "钱途 - 找到你的副业方向",
    description: "不知道做什么副业？让AI帮你找到方向，手把手教你开始",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className="min-h-screen">
        <AuthProvider>
          {children}
          <Feedback />
        </AuthProvider>
      </body>
    </html>
  );
}
