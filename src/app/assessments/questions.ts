export type LikertOption = {
  value: number;
  label: string;
  description: string;
};

export type ScaleQuestion = {
  id: string;
  prompt: string;
  helper?: string;
};

export const FOUR_POINT_FREQUENCY: LikertOption[] = [
  { value: 0, label: "0 分", description: "完全没有" },
  { value: 1, label: "1 分", description: "几天" },
  { value: 2, label: "2 分", description: "超过一半天数" },
  { value: 3, label: "3 分", description: "几乎每天" },
];

export const PHQ9_QUESTIONS: ScaleQuestion[] = [
  {
    id: "phq9-q1",
    prompt: "在过去两周，对做事情提不起兴趣或没有乐趣",
  },
  {
    id: "phq9-q2",
    prompt: "感到心情低落、沮丧或绝望",
  },
  {
    id: "phq9-q3",
    prompt: "入睡困难、睡不安稳或睡得太多",
  },
  {
    id: "phq9-q4",
    prompt: "感到疲倦或缺乏精力",
  },
  {
    id: "phq9-q5",
    prompt: "食欲不振或吃得太多",
  },
  {
    id: "phq9-q6",
    prompt: "觉得自己很糟糕、失败，或让家人失望",
  },
  {
    id: "phq9-q7",
    prompt: "难以集中注意力（例如看报或看电视）",
  },
  {
    id: "phq9-q8",
    prompt: "行动或说话迟缓，或相反地坐立不安",
  },
  {
    id: "phq9-q9",
    prompt: "有自残或认为活着没有意义的念头",
    helper: "如有，请尽快联系专业人士或紧急援助。",
  },
];

export const GAD7_QUESTIONS: ScaleQuestion[] = [
  {
    id: "gad7-q1",
    prompt: "感到紧张、焦虑或心情不安",
  },
  {
    id: "gad7-q2",
    prompt: "无法停止或控制担忧",
  },
  {
    id: "gad7-q3",
    prompt: "对各种事情过度担心",
  },
  {
    id: "gad7-q4",
    prompt: "难以放松",
  },
  {
    id: "gad7-q5",
    prompt: "坐立不安，难以静坐",
  },
  {
    id: "gad7-q6",
    prompt: "容易烦躁或急躁",
  },
  {
    id: "gad7-q7",
    prompt: "感到担心会发生可怕的事情",
  },
];

export function getPhq9Severity(total: number) {
  if (total <= 4) return "最轻微";
  if (total <= 9) return "轻度";
  if (total <= 14) return "中度";
  if (total <= 19) return "中重度";
  return "重度";
}

export function getGad7Severity(total: number) {
  if (total <= 4) return "最轻微";
  if (total <= 9) return "轻度";
  if (total <= 14) return "中度";
  return "重度";
}
