export type FormatName = "bold" | "h2" | "h3" | "list";

export type FormatState = Record<FormatName, boolean>;

type EditorToolbarProps = {
  active: FormatState;
  onFormat: (name: FormatName) => void;
};

const buttons: { name: FormatName; label: string }[] = [
  { name: "bold", label: "B" },
  { name: "h2", label: "제목" },
  { name: "h3", label: "소제목" },
  { name: "list", label: "목록" },
];

export function EditorToolbar({ active, onFormat }: EditorToolbarProps) {
  return (
    <div className="flex h-13 items-center gap-space-4 px-space-12">
      {buttons.map(({ name, label }) => (
        <button
          key={name}
          type="button"
          aria-pressed={active[name]}
          // 누르는 동안 글에서 커서가 빠져나가지 않게 한다.
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onFormat(name)}
          className={`flex h-9 items-center justify-center rounded-sm px-space-12 text-label-md whitespace-nowrap ${
            active[name]
              ? "bg-label-blue-soft text-primary"
              : "text-text-secondary"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
