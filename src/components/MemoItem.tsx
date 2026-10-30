import Link from "next/link";
import type { MemoLabel } from "@/lib/memos";
import { Icon } from "./Icon";
import { labelStyle } from "./labelStyle";

type MemoItemProps = {
  id: string;
  title: string;
  preview: string;
  date: string;
  label: MemoLabel;
};

export function MemoItem({ id, title, preview, date, label }: MemoItemProps) {
  return (
    <Link
      href={`/memos/${id}`}
      className="flex h-18 items-center gap-space-16 px-space-20 py-space-12"
    >
      <div
        className={`flex size-11 shrink-0 items-center justify-center rounded-sm ${labelStyle[label]}`}
      >
        <Icon name="note" className="size-5.5" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-space-4">
        <p className="text-title-md text-text-primary">{title}</p>
        <p className="truncate text-body-sm text-text-secondary">{preview}</p>
      </div>
      <p className="text-caption-sm whitespace-nowrap text-text-muted">{date}</p>
    </Link>
  );
}
