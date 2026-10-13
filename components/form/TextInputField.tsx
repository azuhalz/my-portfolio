import { useId } from "react";

export type TextInputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

/**
 * Komponen input form reusable yang menyertakan label dan input teks.
 * Digunakan untuk konsistensi form di seluruh halaman CMS.
 */
export function TextInputField({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  id,
  disabled = false,
  required = false,
  className = "",
}: TextInputFieldProps) {
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

      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
}
