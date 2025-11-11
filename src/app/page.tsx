import Link from "next/link";

const psychiatristFeatures = [
  {
    title: "AI 临床副驾",
    description:
      "总结会话重点、提示用药考量，并依据诊断给出带有安全护栏的下一步建议。",
    badge: "精准 AI",
  },
  {
    title: "人群健康监测",
    description:
      "SolaChat 持续关注情绪走向、日记与生命体征，帮助精神科医生安全照护 3× 患者。",
    badge: "信号枢纽",
  },
  {
    title: "协同工作流",
    description:
      "共享关护计划、安全消息与自动化笔记流转，让处方医、治疗师与支持团队保持同步。",
    badge: "协作",
  },
];

const patientHighlights = [
  {
    title: "亲民问诊",
    description:
      "透明定价最低 85 美元起，并提供灵活会员方案，让优质精神科支持触手可及。",
  },
  {
    title: "随时在线的支持",
    description:
      "在问诊之间与 AI 伴侣打卡睡眠、情绪与触发点，选择性同步给你的主治医生。",
  },
  {
    title: "自主预约",
    description:
      "跨设备预约与改期，亦可申请续方。自动提醒减少爽约，让治疗计划稳定推进。",
  },
];

const workflow = [
  {
    title: "连接诊所",
    detail: "我们对接你的 EHR，导入团队模板，并配置合规防线。",
    duration: "Day 0",
  },
  {
    title: "训练副驾",
    detail: "结合临床数据与内部规范，定制 SolaChat AI，让输出符合你的照护标准。",
    duration: "Week 1",
  },
  {
    title: "上线患者门户",
    detail: "邀请患者、发布项目，并在两周内开放预约市场。",
    duration: "Week 2",
  },
];

const stats = [
  { label: "每位精神科医生可管理患者数", value: "3×" },
  { label: "记录时间节省", value: "14 小时" },
  { label: "平均问诊费用", value: "$85" },
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
        <section className="relative overflow-hidden rounded-[32px] border border-[#FFFCCF]/10 bg-gradient-to-br from-[#03142A] via-[#071F41] to-[#03142A] p-8 sm:p-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#FFFCCF]/40 bg-[#FFFCCF]/5 text-xs font-semibold tracking-widest text-[#FFFCCF]/70">
                LOGO
              </div>
              <span className="text-xl font-semibold tracking-wide">SolaChat</span>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-[#FFFCCF]/70">
              <span>AI 门户</span>
              <span>临床安全</span>
              <span>预约管理</span>
            </div>
          </div>

          <div className="mt-10 text-center sm:text-left">
            <p className="inline-flex items-center rounded-full border border-[#FFFCCF]/20 px-4 py-1 text-xs uppercase tracking-[0.2em] text-[#FFFCCF]/80">
              AI 赋能 · 精神健康照护
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              让精神科医生在保持人情温度的同时服务更多患者。
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#FFFCCF]/80">
              SolaChat 将临床级 AI 副驾与亲民患者门户整合，提供全面监测、智能记录与真实医生团队，让循证治疗更高效、更可负担。
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#book"
                className="rounded-full bg-[#FFFCCF] px-8 py-3 text-center text-base font-semibold text-[#03142A] transition hover:bg-[#F6F0B3]"
              >
                预约实时演示
              </Link>
              <Link
                href="#patients"
                className="rounded-full border border-[#FFFCCF]/40 px-8 py-3 text-center text-base font-semibold text-[#FFFCCF] transition hover:border-[#FFFCCF] hover:bg-[#FFFCCF]/5"
              >
                体验患者门户
              </Link>
            </div>
            <dl className="mt-12 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[#FFFCCF]/10 bg-[#FFFCCF]/5 p-5 text-left">
                  <dt className="text-xs uppercase tracking-[0.2em] text-[#FFFCCF]/70">
                    {stat.label}
                  </dt>
                  <dd className="mt-3 text-3xl font-semibold text-[#FFFCCF]">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] border border-[#FFFCCF]/10 bg-[#041B36]/80 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FFFCCF]/70">面向精神科医生</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#FFFCCF]">主动、合规照护的一体化控制台。</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#FFFCCF]/80">
              所有 AI 工具均由执业医生共创，帮助你提前预警临床风险，守护团队效率。
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
          </div>

          <div className="rounded-[28px] border border-[#FFFCCF]/10 bg-gradient-to-b from-[#041B36] to-[#03142A] p-8" id="patients">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FFFCCF]/70">面向患者</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#FFFCCF]">真实精神科医生 + 问诊间隙的智能陪伴。</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#FFFCCF]/80">
              以清晰定价、灵活排班与引导式签到，让你与照护团队保持连接。
            </p>
            <div className="mt-8 space-y-5">
              {patientHighlights.map((highlight) => (
                <div key={highlight.title} className="rounded-2xl border border-[#FFFCCF]/10 bg-[#FFFCCF]/5 p-6">
                  <h3 className="text-xl font-semibold text-[#FFFCCF]">{highlight.title}</h3>
                  <p className="mt-2 text-sm text-[#FFFCCF]/80">{highlight.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-[#FFFCCF]/20 bg-[#FFFCCF]/10 p-6">
              <p className="text-sm text-[#FFFCCF]/80">想在一周内安排问诊？</p>
              <p className="mt-1 text-lg font-semibold text-[#FFFCCF]">2 分钟内与关护团队连线。</p>
              <div className="mt-4 flex flex-col gap-3 text-sm font-semibold">
                <Link href="mailto:care@solachat.com" className="text-[#FFFCCF] underline-offset-4 hover:underline">
                  care@solachat.com
                </Link>
                <Link href="tel:+18885551234" className="text-[#FFFCCF] underline-offset-4 hover:underline">
                  +1 (888) 555-1234
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-[#FFFCCF]/10 bg-[#041B36]/80 p-8" id="book">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FFFCCF]/70">上线计划</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#FFFCCF]">数周落地，而非数月。</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#FFFCCF]/80">
                入驻团队与临床负责人并肩，配置流程、同意书与计费设置，首日即合规。
              </p>
              <div className="mt-8 space-y-4">
                {workflow.map((step) => (
                  <div key={step.title} className="flex gap-4 rounded-2xl border border-[#FFFCCF]/10 bg-[#03142A]/60 p-4">
                    <div className="text-sm font-semibold text-[#FFFCCF]/70">{step.duration}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#FFFCCF]">{step.title}</h3>
                      <p className="text-sm text-[#FFFCCF]/80">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-[#FFFCCF]/10 bg-[#FFFCCF]/5 p-6">
              <h3 className="text-2xl font-semibold text-[#FFFCCF]">预约演示</h3>
              <p className="mt-2 text-sm text-[#FFFCCF]/80">告诉我们诊所规模与目标，我们将在 1 个工作日内回复。</p>
              <form className="mt-6 space-y-4">
                <div>
                  <label className="text-sm text-[#FFFCCF]/70" htmlFor="name">
                    姓名
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="张医生"
                    className="mt-1 w-full rounded-2xl border border-[#FFFCCF]/20 bg-[#03142A] px-4 py-3 text-sm text-[#FFFCCF] placeholder:text-[#FFFCCF]/40 focus:border-[#FFFCCF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#FFFCCF]/70" htmlFor="email">
                    工作邮箱
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@practice.com"
                    className="mt-1 w-full rounded-2xl border border-[#FFFCCF]/20 bg-[#03142A] px-4 py-3 text-sm text-[#FFFCCF] placeholder:text-[#FFFCCF]/40 focus:border-[#FFFCCF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#FFFCCF]/70" htmlFor="size">
                    当前服务患者数
                  </label>
                  <select
                    id="size"
                    name="size"
                    className="mt-1 w-full rounded-2xl border border-[#FFFCCF]/20 bg-[#03142A] px-4 py-3 text-sm text-[#FFFCCF] focus:border-[#FFFCCF] focus:outline-none"
                    defaultValue="250-750"
                  >
                    <option value="0-100" className="text-[#03142A]">
                      0 – 100 位患者
                    </option>
                    <option value="100-250" className="text-[#03142A]">
                      100 – 250 位患者
                    </option>
                    <option value="250-750" className="text-[#03142A]">
                      250 – 750 位患者
                    </option>
                    <option value="750+" className="text-[#03142A]">
                      750+ 位患者
                    </option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-[#FFFCCF]/70" htmlFor="message">
                    成功的样子是什么？
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="扩展混合诊疗，同时保持用药安全复核..."
                    className="mt-1 w-full rounded-2xl border border-[#FFFCCF]/20 bg-[#03142A] px-4 py-3 text-sm text-[#FFFCCF] placeholder:text-[#FFFCCF]/40 focus:border-[#FFFCCF] focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  className="w-full rounded-full bg-[#FFFCCF] px-6 py-3 text-sm font-semibold text-[#03142A] transition hover:bg-[#F6F0B3]"
                >
                  发送申请
                </button>
                <p className="text-center text-xs text-[#FFFCCF]/60">关护专家会在 24 小时内安排你的演示。</p>
              </form>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-[#FFFCCF]/10 bg-gradient-to-r from-[#041B36] to-[#03142A] p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FFFCCF]/70">值得信赖的伙伴</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#FFFCCF]">与精神科医生、合规专家和真实患者共同打造。</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#FFFCCF]/80">
            无论是精品私营诊所还是多地点机构，SolaChat 通过 SOC 2 控制、HIPAA 合规基础设施与基于角色的审计，适配你的工作流。
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
