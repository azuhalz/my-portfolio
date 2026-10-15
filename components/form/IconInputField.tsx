import React, { useId } from "react";

export type IconInputFieldProps = {
  label: string;
  hideLabel?: boolean;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  iconPosition?: "left" | "right";
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  endAdornment?: React.ReactNode; // elemen di sisi kanan input, dipakai bersama ikon kiri
  id?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

export const ICON_POSITION_STYLES = {
  left: {
    icon: "absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/60 pointer-events-none flex items-center justify-center",
    input: "pl-10 pr-3.5",
  },
  right: {
    icon: "absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg border border-primary/40 bg-primary/10 text-primary pointer-events-none",
    input: "pl-3.5 pr-14",
  },
};

export function IconInputField({
  label,
  hideLabel = false,
  value,
  onChange,
  icon,
  iconPosition = "left",
  placeholder = "",
  type = "text",
  autoComplete,
  endAdornment,
  id,
  disabled = false,
  required = false,
  className = "",
}: IconInputFieldProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const positionStyles = ICON_POSITION_STYLES[iconPosition];
  const inputPadding = endAdornment ? "pl-10 pr-11" : positionStyles.input;

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

      <div className="relative">
        <span className={positionStyles.icon}>{icon}</span>
        <input
          id={inputId}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full rounded-lg border border-border bg-card ${inputPadding} py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        />
        {endAdornment && (
          <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center">
            {endAdornment}
          </span>
        )}
      </div>
    </div>
  );
}
