"use client";

import { useRef, useState } from "react";
import { FileText, Upload, Trash2 } from "lucide-react";

type PdfUploadFieldProps = {
  file: File | null;
  onChange: (file: File | null) => void;
  label?: string;
  maxSizeMB?: number;
};

export function PdfUploadField({
  file,
  onChange,
  label = "CV (PDF)",
  maxSizeMB = 10,
}: PdfUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    const isPdf =
      selectedFile.type === "application/pdf" ||
      selectedFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setError("Please select a PDF file.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must not exceed ${maxSizeMB}MB.`);
      event.target.value = "";
      return;
    }

    setError("");
    onChange(selectedFile);
  };

  const handleRemove = () => {
    onChange(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const formatFileSize = (size: number) => {
    return `${(size / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-text-secondary">{label}</span>

      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
          <FileText className="h-7 w-7 text-primary" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-text-primary">
            {file ? file.name : "No CV selected"}
          </p>

          <p className="text-xs text-text-secondary">
            {file
              ? formatFileSize(file.size)
              : `PDF format, maximum ${maxSizeMB}MB`}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload CV PDF"
            />

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-primary/60 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
            >
              <Upload size={14} />
              <span>{file ? "Change PDF" : "Upload PDF"}</span>
            </button>

            {file && (
              <button
                type="button"
                onClick={handleRemove}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-red-500/40 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
              >
                <Trash2 size={14} />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
