"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useParticipant } from "../providers/ParticipantProvider";

const ASSESSMENT_CONFIG = [
  {
    slug: "mbti",
    title: "MBTI 对话",
    summary: "基于聊天的自我探索，最终生成个性洞察报告。",
    badge: "对话式",
  },
  {
    slug: "phq9",
    title: "PHQ-9 抑郁量表",
    summary: "九个条目，评估近两周情绪变化并计算严重度。",
    badge: "标准量表",
  },
  {
    slug: "gad7",
    title: "GAD-7 焦虑量表",
    summary: "七个条目，快速筛查广泛性焦虑程度。",
    badge: "标准量表",
  },
] as const;

export default function AssessmentsHub() {
  const router = useRouter();
  const { participant, reports } = useParticipant();

  const participantReports = useMemo(() => {
    if (!participant) {
      return [];
    }
    return reports.filter(
      (report) =>
        report.participant.name === participant.name &&
        report.participant.inviter === participant.inviter,
    );
  }, [participant, reports]);

  if (!participant) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#03142A] px-6 text-center text-[#FFFCCF]">
        <p className="text-xl font-semibold">请先填写身份信息</p>
        <p className="mt-2 text-sm text-[#FFFCCF]/70">
          我们需要知道您的姓名与邀请人才能分配对应的评估任务。
        </p>
        <button
          className="mt-6 rounded-full border border-[#FFFCCF] px-6 py-3 text-sm font-semibold"
          onClick={() => router.push("/")}
        >
          返回填写
        </button>
      </div>
    );
  }

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
      <main className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 pt-12 sm:px-10">
        <header className="rounded-[32px] border border-[#FFFCCF]/10 bg-[#041B36]/80 p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-[#FFFCCF]/60">
            评估中心
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-[#FFFCCF]">
                欢迎，{participant.name}
              </h1>
              <p className="mt-2 text-sm text-[#FFFCCF]/70">
                邀请人：{participant.inviter} · 请选择需要完成的评估。
              </p>
            </div>
            <button
              className="rounded-full border border-[#FFFCCF]/30 px-5 py-2 text-sm text-[#FFFCCF]/80"
              onClick={() =>
                router.push(`/?inviter=${encodeURIComponent(participant.inviter)}`)
              }
            >
              修改信息
            </button>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {ASSESSMENT_CONFIG.map((assessment) => (
            <Link
              key={assessment.slug}
              href={`/assessments/${assessment.slug}`}
              className="flex flex-col rounded-[28px] border border-[#FFFCCF]/10 bg-[#071F41]/80 p-6 transition hover:border-[#FFFCCF]/40"
            >
              <span className="self-start rounded-full bg-[#FFFCCF]/10 px-3 py-1 text-xs text-[#FFFCCF]/80">
                {assessment.badge}
              </span>
              <h2 className="mt-6 text-2xl font-semibold">{assessment.title}</h2>
              <p className="mt-2 text-sm text-[#FFFCCF]/70">{assessment.summary}</p>
              <span className="mt-6 text-sm font-semibold text-[#FFFCCF]">开始 →</span>
            </Link>
          ))}
        </section>

        {participantReports.length ? (
          <section className="rounded-[32px] border border-[#FFFCCF]/10 bg-[#041B36]/70 p-8">
            <h2 className="text-2xl font-semibold text-[#FFFCCF]">保存的报告</h2>
            <p className="mt-2 text-sm text-[#FFFCCF]/70">
              数据仅保存在本地浏览器，可随时导出或复制发送给 HR。
            </p>
            <div className="mt-6 space-y-4">
              {participantReports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-2xl border border-[#FFFCCF]/10 bg-[#020E1F]/60 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#FFFCCF]/60">
                    <span>{report.title}</span>
                    <span>
                      {new Date(report.completedAt).toLocaleString("zh-CN", {
                        hour12: false,
                      })}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-[#FFFCCF]">{report.summary}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
