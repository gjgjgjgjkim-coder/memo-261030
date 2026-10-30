type ChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

export function Chip({ label, selected = false, onClick }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex h-9 shrink-0 items-center rounded-full px-space-16 text-label-md whitespace-nowrap ${
        selected
          ? "bg-primary text-text-on-primary"
          : "bg-surface-card text-text-secondary"
      }`}
    >
      {label}
    </button>
  );
}
