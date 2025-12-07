"use client";

import type { ReportPayload } from "@/lib/assessments";

export async function persistReport(payload: ReportPayload) {
  const response = await fetch("/api/reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = "报告保存失败，请稍后重试";
    try {
      const data = (await response.json()) as { error?: string };
      if (data?.error) {
        message = data.error;
      }
    } catch (err) {
      console.error("Failed to parse error response", err);
    }
    throw new Error(message);
  }

  return (await response.json()) as { ok: boolean };
}
