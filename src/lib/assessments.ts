export type AssessmentType = "mbti" | "phq9" | "gad7";

export type ParticipantInfo = {
  name: string;
  inviter: string;
};

export type ReportPayload = {
  type: AssessmentType;
  title: string;
  summary: string;
  data: Record<string, unknown>;
  participant: ParticipantInfo;
};
