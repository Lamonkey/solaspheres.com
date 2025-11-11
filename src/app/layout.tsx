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
  title: "SolaChat | 精神科医生与患者的 AI 平台",
  description:
    "SolaChat 提供临床级 AI 监测工具，并为患者打造可负担、可信赖的精神健康服务入口。",
  metadataBase: new URL("https://solachat.com"),
  openGraph: {
    title: "SolaChat | 精神科医生与患者的 AI 平台",
    description:
      "AI 临床副驾、群体健康监测以及安全的患者门户，助力新时代精神科护理。",
    url: "https://solachat.com",
    siteName: "SolaChat",
  },
  twitter: {
    card: "summary_large_image",
    title: "SolaChat | 精神科医生与患者的 AI 平台",
    description: "用智能工具和真实医生支持，让高质量精神健康照护触手可及。",
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
