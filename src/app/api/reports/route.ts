import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { ReportPayload, AssessmentType } from "@/lib/assessments";
import { Prisma } from "@/generated/prisma/client";

function isAssessmentType(value: string): value is AssessmentType {
  return value === "mbti" || value === "phq9" || value === "gad7";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ReportPayload;

    if (!payload || !isAssessmentType(payload.type)) {
      return NextResponse.json(
        { error: "无效的评估类型" },
        { status: 400 },
      );
    }

    const participantName = payload.participant?.name?.trim();
    const inviter = payload.participant?.inviter?.trim();

    if (!participantName || !inviter) {
      return NextResponse.json({ error: "缺少参与者信息" }, { status: 400 });
    }

    if (!payload.summary?.trim() || !payload.title?.trim()) {
      return NextResponse.json({ error: "报告内容不完整" }, { status: 400 });
    }

    await prisma.assessmentReport.create({
      data: {
        type: payload.type,
        title: payload.title,
        participantName,
        inviter,
        summary: payload.summary,
        data: payload.data as Prisma.InputJsonValue,
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to save report", error);
    return NextResponse.json(
      { error: "保存报告时发生错误" },
      { status: 500 },
    );
  }
}
