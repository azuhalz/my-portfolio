import React, { useId } from "react";

export type TextAreaFieldProps = {
  label: string;
  hideLabel?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

export function TextAreaField({
  label,
  hideLabel = false,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  id,
  disabled = false,
  required = false,
  className = "",
}: TextAreaFieldProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={inputId}
        className={`text-sm font-medium text-text-secondary ${
          hideLabel ? "sr-only" : ""
        }`}
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      <textarea
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors resize-none leading-relaxed disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
}
