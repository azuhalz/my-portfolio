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
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
        size={21}
      />
      <input
        type={showPasswordToggle && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="h-13 w-full rounded-lg border border-white/15 bg-white/[0.025] px-12 text-white outline-none transition placeholder:text-white/35 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
      />
      {showPasswordToggle && onTogglePassword && (
        <button
          type="button"
          onClick={onTogglePassword}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 transition hover:text-violet-300"
        >
          {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
        </button>
      )}
    </span>
  );
}
