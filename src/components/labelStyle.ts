import type { MemoLabel } from "@/lib/memos";

// 색 라벨별 배경(soft)과 글자·아이콘 색
export const labelStyle: Record<MemoLabel, string> = {
  blue: "bg-label-blue-soft text-label-blue",
  green: "bg-label-green-soft text-label-green",
  orange: "bg-label-orange-soft text-label-orange",
  pink: "bg-label-pink-soft text-label-pink",
};
