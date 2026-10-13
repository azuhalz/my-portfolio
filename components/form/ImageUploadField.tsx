"use client";

import React, { useRef, useId } from "react";
import Image from "next/image";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";

export type ImageUploadFieldProps = {
  label?: string;
  imageUrl: string;
  fileName?: string;
  onChange: (url: string, fileName?: string) => void;
  className?: string;
  accept?: string;
};

export function ImageUploadField({
  label = "Image",
  imageUrl,
  fileName = "profile-image.png",
  onChange,
  className = "",
  accept = "image/png, image/jpeg, image/webp",
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Buat URL sementara (object URL) untuk preview gambar lokal
    const temporaryUrl = URL.createObjectURL(file);
    onChange(temporaryUrl, file.name);
  };

  const handleRemoveImage = () => {
    onChange("", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <span className="text-sm font-medium text-text-secondary">{label}</span>
      )}

      {/* Kontainer Thumbnail dan Aksi */}
      <div className="flex items-center gap-4">
        {/* Kotak Thumbnail Preview */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-card flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Preview"
              fill
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <ImageIcon className="h-8 w-8 text-text-secondary/50" />
          )}
        </div>

        {/* Info File dan Tombol Aksi */}
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-sm font-medium text-text-primary truncate max-w-56">
              {imageUrl ? fileName : "No image selected"}
            </p>
            <p className="text-xs text-text-secondary">
              Recommended: PNG, JPG, or WebP (Max size: 5MB)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              id={inputId}
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
              aria-label={label}
            />

            <button
              type="button"
              onClick={handleOpenFileDialog}
              className="flex items-center gap-1.5 rounded-lg border border-primary/60 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors cursor-pointer"
            >
              <Upload size={14} />
              <span>Change Image</span>
            </button>

            {imageUrl && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="flex items-center gap-1.5 rounded-lg border border-red-500/40 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
