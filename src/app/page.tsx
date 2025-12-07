"use client";

import { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useParticipant } from "./providers/ParticipantProvider";

type IntakeFormProps = {
  defaultName: string;
  defaultInviter: string;
  onSubmit: (name: string, inviter: string) => void;
};

function IntakeForm({ defaultName, defaultInviter, onSubmit }: IntakeFormProps) {
  const [name, setName] = useState(defaultName);
  const [inviter, setInviter] = useState(defaultInviter);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedInviter = inviter.trim();

    if (!trimmedName || !trimmedInviter) {
      setError("请填写姓名和邀请人后继续");
      return;
    }

    setError(null);
    onSubmit(trimmedName, trimmedInviter);
  };

  return (
    <div className="flex flex-1 flex-col justify-center rounded-3xl border border-[#FFFCCF]/10 bg-[#020E1F]/80 p-6 sm:p-8">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <label className="text-sm font-medium text-[#FFFCCF]/80">
          您的姓名
          <input
            type="text"
            className="mt-2 w-full rounded-2xl border border-[#FFFCCF]/20 bg-transparent px-4 py-3 text-base text-[#FFFCCF] outline-none placeholder:text-[#FFFCCF]/40 focus:border-[#FFFCCF]"
            placeholder="如：张敏"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label className="text-sm font-medium text-[#FFFCCF]/80">
          邀请您完成评估的人（ID 或姓名）
          <input
            type="text"
            className="mt-2 w-full rounded-2xl border border-[#FFFCCF]/20 bg-transparent px-4 py-3 text-base text-[#FFFCCF] outline-none placeholder:text-[#FFFCCF]/40 focus:border-[#FFFCCF]"
            placeholder="如：HR-382 或 李倩"
            value={inviter}
            onChange={(event) => setInviter(event.target.value)}
            required
          />
        </label>
        {error ? (
          <p className="text-sm text-[#ddb2b2]" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          className="mt-2 rounded-full bg-[#FFFCCF] px-6 py-3 text-base font-semibold text-[#03142A] transition hover:bg-[#F6F0B3]"
        >
          进入评估中心
        </button>
        <p className="text-xs text-[#FFFCCF]/60">
          如果 HR 分享的链接中包含邀请人 ID，我们会自动为您填充。
        </p>
      </form>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviterFromQuery = searchParams.get("inviter") ?? "";
  const { participant, setParticipant, reports } = useParticipant();

  const defaultName = participant?.name ?? "";
  const defaultInviter = participant?.inviter ?? inviterFromQuery;

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

  const handleSubmit = (name: string, inviter: string) => {
    setParticipant({ name, inviter });
    router.push("/assessments");
  };

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
      <main className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 pt-12 sm:px-10">
        <section className="relative flex flex-col gap-10 overflow-hidden rounded-[32px] border border-[#FFFCCF]/10 bg-gradient-to-br from-[#03142A] via-[#071F41] to-[#03142A] p-8 sm:flex-row sm:p-16">
          <div className="flex flex-1 flex-col justify-center gap-6">
            <Image
              src="/sola-icon.png"
              alt="灵悟咨询 Logo"
              width={96}
              height={96}
              className="h-24 w-24 rounded-2xl object-contain"
            />
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#FFFCCF]/60">
                企业心理评估工作台
              </p>
              <h1 className="mt-4 text-4xl font-semibold text-[#FFFCCF] sm:text-5xl">
                进入评估 · MBTI / PHQ-9 / GAD-7
              </h1>
              <p className="mt-4 text-[#FFFCCF]/80">
                请填写您的姓名以及邀请您完成评估的 HR 或团队负责人。
                我们会基于该信息匹配定制会话与表单，完成后自动生成报告并保存。
              </p>
            </div>
          </div>
          <IntakeForm
            key={`${defaultName}-${defaultInviter}`}
            defaultName={defaultName}
            defaultInviter={defaultInviter}
            onSubmit={handleSubmit}
          />
        </section>

        {participantReports.length > 0 ? (
          <section className="rounded-[32px] border border-[#FFFCCF]/10 bg-[#041B36]/70 p-8">
            <h2 className="text-2xl font-semibold text-[#FFFCCF]">
              最近完成的报告
            </h2>
            <p className="mt-2 text-sm text-[#FFFCCF]/70">
              我们会在本地为您保存报告摘要，方便随时回看或提交 HR。
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {participantReports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-2xl border border-[#FFFCCF]/10 bg-[#020E1F]/60 p-4"
                >
                  <div className="flex items-center justify-between text-sm text-[#FFFCCF]/60">
                    <span>{report.title}</span>
                    <span>
                      {new Date(report.completedAt).toLocaleString("zh-CN", {
                        hour12: false,
                      })}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-[#FFFCCF]">
                    {report.summary}
                  </p>
                </div>
              ))}
            </div>
            <button
              className="mt-6 text-sm font-semibold text-[#FFFCCF] underline-offset-4 hover:underline"
              onClick={() => router.push("/assessments")}
            >
              前往评估中心 →
            </button>
          </section>
        ) : null}
      </main>

      <footer className="relative border-t border-[#FFFCCF]/10 bg-[#03142A] px-6 py-12 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8">
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
