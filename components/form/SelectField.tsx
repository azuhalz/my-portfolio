import { useId } from "react";
import { ChevronDown } from "lucide-react";

export type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
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
        <select
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          className="w-full cursor-pointer appearance-none rounded-lg border border-border bg-card py-2.5 pl-3.5 pr-10 text-sm text-text-primary focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
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
