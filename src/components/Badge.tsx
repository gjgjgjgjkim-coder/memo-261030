import type { MemoLabel } from "@/lib/memos";
import { labelStyle } from "./labelStyle";

type BadgeProps = {
  label: string;
  color: MemoLabel;
};

export function Badge({ label, color }: BadgeProps) {
  return (
    <span
      className={`flex h-6.5 items-center rounded-full px-space-8 text-caption-sm whitespace-nowrap ${labelStyle[color]}`}
    >
      {label}
    </span>
  );
}
