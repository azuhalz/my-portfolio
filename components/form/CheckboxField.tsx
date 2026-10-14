import { useId } from "react";
import { Info } from "lucide-react";

export type CheckboxFieldProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: string; // tampil sebagai tooltip pada ikon info
  id?: string;
  disabled?: boolean;
  className?: string;
};

export function CheckboxField({
  label,
  checked,
  onChange,
  hint,
  id,
  disabled = false,
  className = "",
}: CheckboxFieldProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="size-4 cursor-pointer rounded accent-primary disabled:cursor-not-allowed disabled:opacity-50"
      />
      <label
        htmlFor={inputId}
        className="cursor-pointer text-sm text-text-secondary"
      >
        {label}
      </label>
      {hint && (
        <span
          role="img"
          title={hint}
          aria-label={hint}
          className="text-text-secondary/60"
        >
          <Info size={16} />
        </span>
      )}
    </div>
  );
}
