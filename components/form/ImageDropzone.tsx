"use client";

import { useRef, type ChangeEvent } from "react";
import Image from "next/image";
import { CloudUpload, X } from "lucide-react";

export type ImageDropzoneProps = {
  label: string;
  ariaLabel?: string;
  hint?: string;
  imageUrl: string;
  onChange: (url: string) => void;
  accept?: string;
  className?: string; // atur ukuran (tinggi/lebar) dari luar
};

export function ImageDropzone({
  label,
  ariaLabel,
  hint,
  imageUrl,
  onChange,
  accept = "image/png, image/jpeg, image/webp",
  className = "",
}: ImageDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // URL sementara untuk preview lokal (belum upload ke server)
    onChange(URL.createObjectURL(file));
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        aria-label={ariaLabel ?? label}
        className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1.5 overflow-hidden rounded-lg border border-dashed border-primary/60 bg-primary/5 p-2 text-center text-primary transition-colors hover:bg-primary/10"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Uploaded image preview"
            fill
            sizes="240px"
            className="object-cover"
          />
        ) : (
          <>
            <CloudUpload size={24} />
            <span className="text-xs font-medium text-text-primary">
              {label}
            </span>
            {hint && (
              <span className="text-[10px] text-text-secondary">{hint}</span>
            )}
          </>
        )}
      </button>

      {imageUrl && (
        <button
          type="button"
          onClick={handleRemove}
          aria-label="Remove image"
          className="absolute right-1.5 top-1.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-background/80 text-text-primary transition-colors hover:text-red-400"
        >
          <X size={14} />
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
