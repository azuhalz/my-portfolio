import { LucideIcon, Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  icon: LucideIcon;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  name?: string;
}

export function InputField({
  type,
  placeholder,
  icon: Icon,
  value,
  onChange,
  showPasswordToggle,
  showPassword,
  onTogglePassword,
  name,
}: InputFieldProps) {
  return (
    <span className="relative mt-2 block">
      <Icon
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/50"
        size={21}
      />
      <input
        type={showPasswordToggle && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="h-13 w-full rounded-lg border border-border bg-background/25 px-12 text-text-primary outline-none transition placeholder:text-text-secondary/35 focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      {showPasswordToggle && onTogglePassword && (
        <button
          type="button"
          onClick={onTogglePassword}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary/50 transition hover:text-primary"
        >
          {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
        </button>
      )}
    </span>
  );
}
