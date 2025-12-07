import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://sola.xin";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "灵悟心域",
  alternateName: ["灵悟咨询"],
  url: SITE_URL,
  sameAs: ["https://www.sola.xin/"],
  logo: `${SITE_URL}/sola-icon.png`,
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "灵悟咨询 在线心理治疗",
      provider: { "@type": "Organization", name: "灵悟心域" },
    },
  },
};

export const metadata: Metadata = {
  title: "灵悟心域 · 灵悟咨询 | 在线心理治疗服务",
  description:
    "灵悟心域旗下产品 灵悟咨询 使用自研系统为患者与机构提供在线心理治疗服务，助力专业心理医生远程诊疗。",
  metadataBase: new URL(SITE_URL),
  keywords: ["灵悟心域", "灵悟咨询", "在线心理咨询", "心理治疗"],
  openGraph: {
    title: "灵悟心域 · 灵悟咨询 | 在线心理治疗服务",
    description:
      "灵悟咨询 是灵悟心域推出的在线心理治疗服务，为个人与机构提供可信赖的专业心理支持。",
    url: SITE_URL,
    siteName: "灵悟心域 · 灵悟咨询",
  },
  twitter: {
    card: "summary_large_image",
    title: "灵悟心域 · 灵悟咨询 | 在线心理治疗服务",
    description: "灵悟心域推出的 灵悟咨询 提供高质量的在线心理治疗服务。",
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
        <Providers>{children}</Providers>
        <Script id="organization-schema" type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </Script>
      </body>
    </html>
  );
}
