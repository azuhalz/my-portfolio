import { useId, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { ICON_POSITION_STYLES } from "@/components/form/IconInputField";

export type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string; // opsi kosong yang tidak bisa dipilih ulang
  icon?: ReactNode;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  icon,
  id,
  disabled = false,
  required = false,
  className = "",
}: SelectFieldProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-text-secondary"
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      <div className="relative">
        {icon && <span className={ICON_POSITION_STYLES.left.icon}>{icon}</span>}
        <select
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          className={`w-full cursor-pointer appearance-none rounded-lg border border-border bg-card py-2.5 pr-10 text-sm focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            icon ? "pl-10" : "pl-3.5"
          } ${value ? "text-text-primary" : "text-text-secondary/50"}`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
        />
      </div>
    </div>
  );
}
