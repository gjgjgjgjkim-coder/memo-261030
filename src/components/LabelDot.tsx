import type { MemoLabel } from "@/lib/memos";

type LabelDotProps = {
  color: MemoLabel;
  name: string;
  selected: boolean;
  onClick: () => void;
};

const dotStyle: Record<MemoLabel, string> = {
  blue: "bg-label-blue",
  green: "bg-label-green",
  orange: "bg-label-orange",
  pink: "bg-label-pink",
};

export function LabelDot({ color, name, selected, onClick }: LabelDotProps) {
  return (
    <button
      type="button"
      aria-label={name}
      aria-pressed={selected}
      onClick={onClick}
      className={`flex size-8 items-center justify-center rounded-full border-2 ${
        selected ? "border-primary" : "border-transparent"
      }`}
    >
      <span className={`size-5.5 rounded-full ${dotStyle[color]}`} />
    </button>
  );
}
