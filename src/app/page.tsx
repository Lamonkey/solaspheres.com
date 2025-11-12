"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function ContactForm() {
  const [contactMethod, setContactMethod] = useState("email");
  const [contactValue, setContactValue] = useState("");

  const getInputType = () => {
    switch (contactMethod) {
      case "phone":
        return "tel";
      case "email":
        return "email";
      case "wechat":
        return "text";
      default:
        return "text";
    }
  };

  const getPlaceholder = () => {
    switch (contactMethod) {
      case "phone":
        return "请输入手机号码";
      case "email":
        return "请输入邮箱地址";
      case "wechat":
        return "请输入微信号";
      default:
        return "";
    }
  };

  const getLabel = () => {
    switch (contactMethod) {
      case "phone":
        return "手机号码";
      case "email":
        return "邮箱";
      case "wechat":
        return "微信号";
      default:
        return "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ contactMethod, contactValue });
  };

  return (
    <div className="mt-8 rounded-2xl border border-[#FFFCCF]/20 bg-[#FFFCCF]/10 p-6">
      <h3 className="text-2xl font-semibold text-[#FFFCCF]">咨询</h3>
      <p className="mt-2 text-sm text-[#FFFCCF]/80">请留下您的联系方式，我们会联系您</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-[#FFFCCF]/70" htmlFor="contact-method">
            联系方式
          </label>
          <select
            id="contact-method"
            value={contactMethod}
            onChange={(e) => {
              setContactMethod(e.target.value);
              setContactValue("");
            }}
            className="mt-1 w-full rounded-2xl border border-[#FFFCCF]/20 bg-[#03142A] px-4 py-3 text-sm text-[#FFFCCF] focus:border-[#FFFCCF] focus:outline-none"
          >
            <option value="phone" className="text-[#03142A]">
              手机号码
            </option>
            <option value="email" className="text-[#03142A]">
              邮箱
            </option>
            <option value="wechat" className="text-[#03142A]">
              微信号
            </option>
          </select>
        </div>
        <div>
          <label className="text-sm text-[#FFFCCF]/70" htmlFor="contact-value">
            {getLabel()}
          </label>
          <input
            id="contact-value"
            name="contactValue"
            type={getInputType()}
            value={contactValue}
            onChange={(e) => setContactValue(e.target.value)}
            placeholder={getPlaceholder()}
            required
            className="mt-1 w-full rounded-2xl border border-[#FFFCCF]/20 bg-[#03142A] px-4 py-3 text-sm text-[#FFFCCF] placeholder:text-[#FFFCCF]/40 focus:border-[#FFFCCF] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-[#FFFCCF] px-6 py-3 text-sm font-semibold text-[#03142A] transition hover:bg-[#F6F0B3]"
        >
          提交
        </button>
      </form>
    </div>
  );
}

const psychiatristFeatures = [
  {
    title: "委托信息收集",
    description:
      "医生可委托 AI 与患者对话，自动收集所需信息。例如，AI 可与患者进行 CBT 进展更新对话，获取医生需要的问题答案，节省宝贵时间。",
    badge: "AI 助手",
  },
  {
    title: "智能患者报告",
    description:
      "生成包含推理过程的患者报告，帮助医生快速识别需要帮助的患者，并主动采取行动。报告包含详细的分析和理由，帮助医生做出明智的临床决策。",
    badge: "主动照护",
  },
  {
    title: "患者档案管理",
    description:
      "强大的患者档案管理工具，提供实用功能，帮助医生快速生成所需报告。集中管理患者信息，轻松访问历史记录，生成定制化报告。",
    badge: "档案管理",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03142A] text-[#FFFCCF]">
      <div
        className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-[#FFFCCF]/10 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#FFFCCF]/5 blur-[160px]"
        aria-hidden
      />
      <main className="relative mx-auto flex max-w-6xl flex-col gap-20 px-6 pb-24 pt-12 sm:px-10">
        <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden rounded-[32px] border border-[#FFFCCF]/10 bg-gradient-to-br from-[#03142A] via-[#071F41] to-[#03142A] p-12 sm:p-16">
          <div className="flex flex-col items-center gap-8">
            <Image
              src="/sola-icon.png"
              alt="灵悟咨询 Logo"
              width={120}
              height={120}
              className="h-32 w-32 rounded-2xl object-contain sm:h-40 sm:w-40"
            />
            <h1 className="text-5xl font-semibold tracking-wide text-[#FFFCCF] sm:text-6xl lg:text-7xl">
              灵悟咨询 v1.0
            </h1>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/patient"
                className="rounded-full bg-[#FFFCCF] px-10 py-4 text-center text-lg font-semibold text-[#03142A] transition hover:bg-[#F6F0B3]"
              >
                患者入口
              </Link>
              <Link
                href="/psychiatrist"
                className="rounded-full border-2 border-[#FFFCCF] bg-transparent px-10 py-4 text-center text-lg font-semibold text-[#FFFCCF] transition hover:bg-[#FFFCCF]/10"
              >
                医生入口
              </Link>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <div className="rounded-[28px] border border-[#FFFCCF]/10 bg-[#041B36]/80 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FFFCCF]/70">心理治疗服务</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#FFFCCF]">专业心理医生提供在线服务</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#FFFCCF]/80">
              灵悟咨询 使用自有系统为患者提供在线心理治疗服务。通过我们的平台，患者可以与专业心理医生进行远程咨询，享受便捷、高效的心理治疗服务。
            </p>
            <div className="mt-8 rounded-2xl border border-[#FFFCCF]/20 bg-[#FFFCCF]/10 p-6">
              <p className="text-lg font-semibold text-[#FFFCCF]">每次 300 元</p>
              <div className="mt-6">
                <Link
                  href="/patient"
                  className="inline-flex items-center justify-center w-full rounded-full bg-[#FFFCCF] px-6 py-3 text-sm font-semibold text-[#03142A] transition hover:bg-[#F6F0B3]"
                >
                  预约咨询
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#FFFCCF]/10 bg-gradient-to-b from-[#041B36] to-[#03142A] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FFFCCF]/70">企业客户服务</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#FFFCCF]">为医院和学校提供系统服务</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#FFFCCF]/80">
              灵悟咨询 为医院和学校等机构客户提供我们的系统服务。这些机构已有自己的医生团队，我们提供专业的系统平台，帮助他们更高效地管理患者和提供服务。
            </p>
            <div className="mt-8 space-y-5">
              {psychiatristFeatures.map((feature) => (
                <div key={feature.title} className="rounded-2xl border border-[#FFFCCF]/10 bg-[#03142A]/60 p-6">
                  <span className="inline-flex items-center rounded-full bg-[#FFFCCF]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFFCCF]/80">
                    {feature.badge}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-[#FFFCCF]">{feature.title}</h3>
                  <p className="mt-2 text-sm text-[#FFFCCF]/80">{feature.description}</p>
                </div>
              ))}
            </div>
            <ContactForm />
          </div>
        </section>

        <section className="rounded-[28px] border border-[#FFFCCF]/10 bg-gradient-to-r from-[#041B36] to-[#03142A] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FFFCCF]/70 text-center">合作伙伴</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#FFFCCF] text-center">值得信赖的机构选择我们</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#FFFCCF]/80 text-center">
            我们为各类机构提供专业的系统服务，帮助他们更高效地管理患者和提供心理治疗服务。
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#FFFCCF]/10 bg-[#03142A]/60 p-6 text-center">
              <div className="text-4xl mb-3">🏥</div>
              <h3 className="text-xl font-semibold text-[#FFFCCF]">医院</h3>
              <p className="mt-2 text-sm text-[#FFFCCF]/70">[医院名称占位符]</p>
            </div>
            <div className="rounded-2xl border border-[#FFFCCF]/10 bg-[#03142A]/60 p-6 text-center">
              <div className="text-4xl mb-3">🏫</div>
              <h3 className="text-xl font-semibold text-[#FFFCCF]">学校</h3>
              <p className="mt-2 text-sm text-[#FFFCCF]/70">[学校名称占位符]</p>
            </div>
            <div className="rounded-2xl border border-[#FFFCCF]/10 bg-[#03142A]/60 p-6 text-center sm:col-span-2 lg:col-span-1">
              <div className="text-4xl mb-3">🏛️</div>
              <h3 className="text-xl font-semibold text-[#FFFCCF]">政府机构</h3>
              <p className="mt-2 text-sm text-[#FFFCCF]/70">[政府机构名称占位符]</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-[#FFFCCF]/10 bg-[#03142A] px-6 py-12 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-[#FFFCCF]">联系方式</h3>
              <div className="mt-4 space-y-2 text-sm text-[#FFFCCF]/80">
                <p>
                  <span className="font-medium">邮箱：</span>
                  <Link href="mailto:help@sola.xin" className="underline-offset-4 hover:underline">
                    help@sola.xin
                  </Link>
                </p>
                <p>
                  <span className="font-medium">地址：</span>
                  <span className="text-[#FFFCCF]/60">[地址占位符]</span>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#FFFCCF]">法律信息</h3>
              <div className="mt-4 space-y-2 text-sm text-[#FFFCCF]/80">
                <p>
                  <Link href="/privacy" className="underline-offset-4 hover:underline">
                    隐私声明
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-[#FFFCCF]/10 pt-8 text-center text-sm text-[#FFFCCF]/60">
            <p>© {new Date().getFullYear()} 灵悟心愈. 保留所有权利。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
