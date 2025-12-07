"use client";

import { FormEvent, KeyboardEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParticipant } from "../../providers/ParticipantProvider";
import type {
  Participant,
  ParticipantContextValue,
} from "../../providers/ParticipantProvider";
import { persistReport } from "../reportClient";

const COACH_STEPS = [
  {
    title: "能量取向",
    prompt:
      "最近一次项目中，您更倾向于独立完成还是频繁与团队同步？这对您的能量有何影响？",
  },
  {
    title: "信息获取",
    prompt:
      "当面对陌生任务时，您会依赖已有经验还是喜欢发散想象新的可能？",
  },
  {
    title: "决策方式",
    prompt: "做决定时，您更注重事实和逻辑，还是更关注对人的影响？",
  },
  {
    title: "生活节奏",
    prompt:
      "在快节奏工作周里，您是希望完全按照计划推进还是保留机动空间？",
  },
];

const COACH_OPENING =
  "您好，我是灵悟教练。我们将基于 MBTI 框架进行一次轻量对话，请根据实际体验作答。";

type Message = {
  id: string;
  sender: "coach" | "user";
  text: string;
};

function buildInitialMessages(name: string): Message[] {
  const displayName = name || "受邀者";
  return [
    {
      id: "coach-opening",
      sender: "coach",
      text: `${COACH_OPENING}\n（受邀人：${displayName}）`,
    },
    {
      id: "coach-step-0",
      sender: "coach",
      text: COACH_STEPS[0].prompt,
    },
  ];
}

export default function MbtiAssessmentPage() {
  const router = useRouter();
  const { participant, saveReport } = useParticipant();

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
      <main className="relative mx-auto flex max-w-5xl flex-col gap-8 px-6 pb-16 pt-12 sm:px-10">
        <Link
          href="/assessments"
          className="text-sm text-[#FFFCCF]/70 underline-offset-4 hover:text-[#FFFCCF] hover:underline"
        >
          ← 返回评估中心
        </Link>
        <header className="rounded-[32px] border border-[#FFFCCF]/10 bg-[#041B36]/80 p-8">
          <h1 className="text-3xl font-semibold">MBTI 对话评估</h1>
          <p className="mt-2 text-sm text-[#FFFCCF]/70">
            根据提示交流真实体验，全部完成后点击「生成报告」。对话记录不会上传，仅用于本地报告。
          </p>
        </header>
        <MbtiConversation
          key={`${participant.name}-${participant.inviter}`}
          participant={participant}
          saveReport={saveReport}
        />
      </main>
    </div>
  );
}

type MbtiConversationProps = {
  participant: Participant;
  saveReport: ParticipantContextValue["saveReport"];
};

function MbtiConversation({ participant, saveReport }: MbtiConversationProps) {
  const [messages, setMessages] = useState<Message[]>(() =>
    buildInitialMessages(participant.name),
  );
  const [askedIndex, setAskedIndex] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [reportSummary, setReportSummary] = useState<string | null>(null);
  const [hasSaved, setHasSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const canSend = input.trim().length > 0;
  const canGenerateReport = responses.length === COACH_STEPS.length;

  const appendMessage = () => {
    if (!canSend) return;
    const trimmed = input.trim();
    const newMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
    };

    setResponses((prev) => [...prev, trimmed]);
    setMessages((prev) => {
      const next = [...prev, newMessage];
      if (askedIndex < COACH_STEPS.length - 1) {
        const nextIndex = askedIndex + 1;
        const coachMessage: Message = {
          id: `coach-step-${nextIndex}-${Date.now()}`,
          sender: "coach",
          text: COACH_STEPS[nextIndex].prompt,
        };
        return [...next, coachMessage];
      }
      return next;
    });

    if (askedIndex < COACH_STEPS.length - 1) {
      setAskedIndex((prev) => prev + 1);
    }

    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    appendMessage();
  };

  const handleTextareaKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      appendMessage();
    }
  };

  const handleGenerateReport = async () => {
    if (isSaving || !canGenerateReport) return;
    setSubmitError(null);
    setIsSaving(true);

    try {
      const insight = COACH_STEPS.map((step, index) => {
        const answer = responses[index] ?? "";
        return `${step.title}：${answer}`;
      }).join("\n");

      const summary = `MBTI 对话结论：\n${insight}`;
      saveReport({
        type: "mbti",
        title: "MBTI 对话报告",
        summary,
        data: {
          responses,
          prompts: COACH_STEPS,
        },
      });

      await persistReport({
        type: "mbti",
        title: "MBTI 对话报告",
        summary,
        data: {
          responses,
          prompts: COACH_STEPS,
        },
        participant,
      });

      setReportSummary(summary);
      setHasSaved(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "上传数据库时出现错误",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <section className="rounded-[32px] border border-[#FFFCCF]/10 bg-[#071F41]/70 p-6">
        <div className="mb-4 flex items-center justify-between text-sm text-[#FFFCCF]/70">
          <span>剩余提问：{COACH_STEPS.length - responses.length}</span>
          <span>
            回合 {responses.length}/{COACH_STEPS.length}
          </span>
        </div>
        <div className="h-[360px] overflow-y-auto rounded-2xl bg-[#020E1F]/60 p-4">
          <div className="flex flex-col gap-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${message.sender === "coach" ? "self-start bg-[#102341] text-[#FFFCCF]" : "self-end bg-[#FFFCCF] text-[#03142A]"}`}
              >
                {message.text}
              </div>
            ))}
          </div>
        </div>
        <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
          <textarea
            className="min-h-[100px] rounded-2xl border border-[#FFFCCF]/20 bg-transparent px-4 py-3 text-sm text-[#FFFCCF] outline-none placeholder:text-[#FFFCCF]/40 focus:border-[#FFFCCF]"
            placeholder={`输入您的回复，${participant.name}`}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleTextareaKeyDown}
          />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={!canSend}
              className="rounded-full bg-[#FFFCCF] px-6 py-2 text-sm font-semibold text-[#03142A] transition hover:bg-[#F6F0B3] disabled:cursor-not-allowed disabled:opacity-40"
            >
              发送
            </button>
            <button
              type="button"
              disabled={!canGenerateReport || hasSaved || isSaving}
              onClick={handleGenerateReport}
              className="rounded-full border border-[#FFFCCF] px-6 py-2 text-sm font-semibold text-[#FFFCCF] transition hover:bg-[#FFFCCF]/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {hasSaved ? "报告已保存" : isSaving ? "保存中..." : "生成报告"}
            </button>
          </div>
        </form>
        {submitError ? (
          <p className="mt-2 text-sm text-[#ffbaba]">{submitError}</p>
        ) : null}
      </section>

      {reportSummary ? (
        <section className="rounded-[32px] border border-[#FFFCCF]/10 bg-[#041B36]/70 p-6">
          <h2 className="text-2xl font-semibold">报告摘要</h2>
          <pre className="mt-4 whitespace-pre-wrap text-sm text-[#FFFCCF]/90">
            {reportSummary}
          </pre>
        </section>
      ) : null}
    </>
  );
}
