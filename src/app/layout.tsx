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
  title: "SolaChat 1.0 | AI 辅助信息收集与智能患者报告",
  description:
    "SolaChat 1.0 让医生可以委托 AI 与患者对话收集信息（如 CBT 进展更新），并自动生成带有推理过程的患者报告，帮助医生主动识别需要帮助的患者。",
  metadataBase: new URL("https://solachat.com"),
  openGraph: {
    title: "SolaChat 1.0 | AI 辅助信息收集与智能患者报告",
    description:
      "委托 AI 收集患者信息，智能报告助您主动照护。让医生更高效地识别需要帮助的患者并采取行动。",
    url: "https://solachat.com",
    siteName: "SolaChat 1.0",
  },
  twitter: {
    card: "summary_large_image",
    title: "SolaChat 1.0 | AI 辅助信息收集与智能患者报告",
    description: "委托 AI 与患者对话收集信息，生成智能报告，帮助医生主动照护患者。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
