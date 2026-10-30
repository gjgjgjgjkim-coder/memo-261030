type InputFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  ref?: React.Ref<HTMLInputElement>;
};

export function InputField({ label, value, placeholder, onChange, ref }: InputFieldProps) {
  return (
    <label className="flex flex-col gap-space-4 rounded-lg bg-surface-card px-space-20 py-space-16 ring-2 ring-transparent ring-inset focus-within:ring-primary">
      <span className="text-caption-sm text-text-muted">{label}</span>
      <input
        ref={ref}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-title-md text-text-primary outline-none placeholder:text-text-muted"
      />
    </label>
  );
}
