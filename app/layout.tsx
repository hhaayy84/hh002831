import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tile Fun - 快乐消消乐",
  description: "一款有趣的消除类小游戏",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="min-h-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-md mx-auto bg-[#f8f5ff] relative`}
      >
        {children}
      </body>
    </html>
  );
}