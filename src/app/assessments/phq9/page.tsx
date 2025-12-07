"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParticipant } from "../../providers/ParticipantProvider";
import {
  FOUR_POINT_FREQUENCY,
  PHQ9_QUESTIONS,
  getPhq9Severity,
} from "../questions";
import { persistReport } from "../reportClient";

export default function Phq9Page() {
  const router = useRouter();
  const { participant, saveReport } = useParticipant();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{
    total: number;
    severity: string;
    notes: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const answeredCount = useMemo(
    () => PHQ9_QUESTIONS.filter((question) => question.id in answers).length,
    [answers],
  );

  const totalScore = useMemo(
    () =>
      PHQ9_QUESTIONS.reduce(
        (sum, question) => sum + (answers[question.id] ?? 0),
        0,
      ),
    [answers],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!participant || isSubmitting) return;

    if (answeredCount !== PHQ9_QUESTIONS.length) {
      setError("请完成全部问题后提交");
      return;
    }

    setError(null);
    setSubmitError(null);
    setIsSubmitting(true);

    const severity = getPhq9Severity(totalScore);
    const notes =
      answers["phq9-q9"] && answers["phq9-q9"] >= 1
        ? "第 9 题出现轻度以上的自伤想法，请即时联系医生或紧急支持。"
        : "可结合 HR 或专业人员进一步解读。";

    try {
      setResult({ total: totalScore, severity, notes });
      saveReport({
        type: "phq9",
        title: "PHQ-9 报告",
        summary: `PHQ-9 总分 ${totalScore}（${severity}）`,
        data: {
          answers,
          totalScore,
          severity,
        },
      });

      await persistReport({
        type: "phq9",
        title: "PHQ-9 报告",
        summary: `PHQ-9 总分 ${totalScore}（${severity}）`,
        data: {
          answers,
          totalScore,
          severity,
        },
        participant,
      });

      router.push("/");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "保存至数据库失败，请稍后重试",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!participant) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#03142A] px-6 text-center text-[#FFFCCF]">
        <p className="text-xl font-semibold">请先返回填写身份信息</p>
        <button
          className="mt-6 rounded-full border border-[#FFFCCF] px-6 py-3 text-sm font-semibold"
          onClick={() => router.push("/")}
        >
          返回首页
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
      <main className="relative mx-auto flex max-w-4xl flex-col gap-8 px-6 pb-16 pt-12 sm:px-10">
        <Link
          href="/assessments"
          className="text-sm text-[#FFFCCF]/70 underline-offset-4 hover:text-[#FFFCCF] hover:underline"
        >
          ← 返回评估中心
        </Link>
        <header className="rounded-[32px] border border-[#FFFCCF]/10 bg-[#041B36]/80 p-8">
          <h1 className="text-3xl font-semibold">PHQ-9 抑郁量表</h1>
          <p className="mt-2 text-sm text-[#FFFCCF]/70">
            根据近两周体验选择最贴切的频率。提交后会自动保存本地报告。
          </p>
        </header>

        <form
          className="rounded-[32px] border border-[#FFFCCF]/10 bg-[#071F41]/70 p-6"
          onSubmit={handleSubmit}
        >
          <div className="mb-6 flex flex-wrap items-center justify-between text-sm text-[#FFFCCF]/70">
            <span>
              进度：{answeredCount}/{PHQ9_QUESTIONS.length}
            </span>
            <span>总分：{totalScore}</span>
          </div>
          <div className="space-y-6">
            {PHQ9_QUESTIONS.map((question) => (
              <fieldset
                key={question.id}
                className="rounded-2xl border border-[#FFFCCF]/10 bg-[#020E1F]/50 p-4"
              >
                <legend className="text-base font-medium text-[#FFFCCF]">
                  {question.prompt}
                </legend>
                {question.helper ? (
                  <p className="mt-1 text-xs text-[#FFFCCF]/60">
                    {question.helper}
                  </p>
                ) : null}
                <div className="mt-4 grid gap-3 md:grid-cols-4">
                  {FOUR_POINT_FREQUENCY.map((option) => (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer flex-col rounded-xl border px-3 py-2 text-sm transition ${answers[question.id] === option.value ? "border-[#FFFCCF] bg-[#FFFCCF]/10" : "border-[#FFFCCF]/20"}`}
                    >
                      <span className="font-semibold">{option.label}</span>
                      <span className="text-xs text-[#FFFCCF]/70">
                        {option.description}
                      </span>
                      <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        className="sr-only"
                        onChange={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [question.id]: option.value,
                          }))
                        }
                        checked={answers[question.id] === option.value}
                      />
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
          {error ? (
            <p className="mt-6 text-sm text-[#ffbaba]">{error}</p>
          ) : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-full bg-[#FFFCCF] px-6 py-3 text-base font-semibold text-[#03142A] transition hover:bg-[#F6F0B3] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "保存中..." : "生成并保存报告"}
          </button>
        </form>

        {submitError ? (
          <p className="text-sm text-[#ffbaba]">{submitError}</p>
        ) : null}

        {result ? (
          <section className="rounded-[32px] border border-[#FFFCCF]/10 bg-[#041B36]/70 p-6">
            <h2 className="text-2xl font-semibold">评估结果</h2>
            <div className="mt-4 flex flex-col gap-2 text-sm text-[#FFFCCF]">
              <p>总分：{result.total}</p>
              <p>严重程度：{result.severity}</p>
              <p className="text-[#FFFCCF]/80">{result.notes}</p>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
