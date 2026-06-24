import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI副业教练 - 不上班也能赚到钱",
  description: "告诉AI你的情况，它帮你找到能赚钱的路子，手把手带你做。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
