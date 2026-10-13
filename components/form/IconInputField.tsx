import React, { useId } from "react";

export type IconInputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  placeholder?: string;
  type?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

export function IconInputField({
  label,
  value,
  onChange,
  icon,
  placeholder = "",
  type = "text",
  id,
  disabled = false,
  required = false,
  className = "",
}: IconInputFieldProps) {
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
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/60 pointer-events-none flex items-center justify-center">
          {icon}
        </span>
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="w-full rounded-lg border border-border bg-card pl-10 pr-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
