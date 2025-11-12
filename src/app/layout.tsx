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
  title: "灵悟咨询 | 在线心理治疗服务",
  description:
    "灵悟咨询 使用自有系统为患者提供在线心理治疗服务。通过我们的平台，患者可以与专业心理医生进行远程咨询，享受便捷、高效的心理治疗服务。",
  metadataBase: new URL("https://solachat.com"),
  openGraph: {
    title: "灵悟咨询 | 在线心理治疗服务",
    description:
      "灵悟咨询 提供在线心理医生心理治疗服务，每次 300 元，价格透明，让优质心理治疗服务触手可及。",
    url: "https://solachat.com",
    siteName: "灵悟咨询",
  },
  twitter: {
    card: "summary_large_image",
    title: "灵悟咨询 | 在线心理治疗服务",
    description: "灵悟咨询 提供在线心理医生心理治疗服务，每次 300 元，价格透明。",
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
