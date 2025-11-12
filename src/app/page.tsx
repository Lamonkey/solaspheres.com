import Link from "next/link";
import Image from "next/image";

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
              alt="SolaChat Logo"
              width={120}
              height={120}
              className="h-32 w-32 rounded-2xl object-contain sm:h-40 sm:w-40"
            />
            <h1 className="text-5xl font-semibold tracking-wide text-[#FFFCCF] sm:text-6xl lg:text-7xl">
              SolaChat
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
            <h2 className="mt-3 text-3xl font-semibold text-[#FFFCCF]">提供在线心理医生心理治疗服务</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#FFFCCF]/80">
              SolaChat 使用自有系统为患者提供在线心理治疗服务。通过我们的平台，患者可以与专业心理医生进行远程咨询，享受便捷、高效的心理治疗服务。
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
              SolaChat 为医院和学校等机构客户提供我们的系统服务。这些机构已有自己的医生团队，我们提供专业的系统平台，帮助他们更高效地管理患者和提供服务。
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
            <div className="mt-8 rounded-2xl border border-[#FFFCCF]/20 bg-[#FFFCCF]/10 p-6">
              <p className="text-sm text-[#FFFCCF]/80">想要了解我们的系统服务？</p>
              <p className="mt-1 text-lg font-semibold text-[#FFFCCF]">联系我们获取更多信息</p>
              <div className="mt-4">
                <Link
                  href="mailto:88therisingsun@gmail.com"
                  className="inline-flex items-center justify-center w-full rounded-full bg-[#FFFCCF] px-6 py-3 text-sm font-semibold text-[#03142A] transition hover:bg-[#F6F0B3]"
                >
                  发送邮件咨询
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-[#FFFCCF]/10 bg-gradient-to-r from-[#041B36] to-[#03142A] p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FFFCCF]/70">值得信赖的伙伴</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#FFFCCF]">与医生、合规专家和真实患者共同打造</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#FFFCCF]/80">
            无论是精品私营诊所还是多地点机构，SolaChat 通过 SOC 2 控制、HIPAA 合规基础设施与基于角色的审计，适配您的工作流。
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.3em] text-[#FFFCCF]/60">
            <span>HIPAA + SOC 2 Type II</span>
            <span>原生电子处方日志</span>
            <span>端到端加密消息</span>
          </div>
        </section>
      </main>
    </div>
  );
}
