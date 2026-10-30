export type MemoLabel = "blue" | "green" | "orange" | "pink";

export const categories = ["업무", "개인", "아이디어"];

// 글 속 일부만 굵게 쓰려면 { b: "..." }
export type Segment = string | { b: string };

export type Block =
  | { type: "h2" | "h3"; text: string }
  | { type: "p"; text: Segment[] }
  | { type: "list"; items: string[] };

export type Memo = {
  id: string;
  title: string;
  preview: string;
  date: string;
  createdAt: string;
  label: MemoLabel;
  category: string;
  pinned: boolean;
  inHome: boolean;
  body: Block[];
};

function segmentText(segments: Segment[]) {
  return segments.map((s) => (typeof s === "string" ? s : s.b)).join("");
}

export function blockText(block: Block) {
  if (block.type === "p") return segmentText(block.text);
  if (block.type === "list") return block.items.join(", ");
  return block.text;
}

// Supabase memos 표의 한 행
export type MemoRow = {
  id: string;
  title: string;
  body: Block[];
  category: string;
  label: MemoLabel;
  pinned: boolean;
  in_home: boolean;
  created_at: string;
};

const KST_OFFSET = 9 * 3_600_000;

function dayLabel(createdAt: number) {
  const kstDay = (t: number) => Math.floor((t + KST_OFFSET) / 86_400_000);
  const days = kstDay(Date.now()) - kstDay(createdAt);
  if (days <= 0) return "오늘";
  if (days === 1) return "어제";
  return new Date(createdAt).toLocaleDateString("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "long",
    day: "numeric",
  });
}

export function toMemo(row: MemoRow): Memo {
  const lead = row.body.find((b) => b.type !== "h2" && b.type !== "h3") ?? row.body[0];
  const createdAt = new Date(row.created_at).getTime();
  return {
    id: row.id,
    title: row.title,
    preview: lead ? blockText(lead) : "",
    date: dayLabel(createdAt),
    createdAt: new Date(createdAt).toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }),
    label: row.label,
    category: row.category,
    pinned: row.pinned,
    inHome: row.in_home,
    body: row.body,
  };
}
