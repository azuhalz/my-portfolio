"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export type TagInputFieldProps = {
  label: string;
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (index: number) => void;
  placeholder?: string;
  id?: string;
  className?: string;
};

/**
 * Input berbentuk tag/chip. Tekan Enter atau koma untuk menambah tag,
 * Backspace pada input kosong untuk menghapus tag terakhir.
 */
export function TagInputField({
  label,
  tags,
  onAdd,
  onRemove,
  placeholder = "Add item...",
  id,
  className = "",
}: TagInputFieldProps) {
  const [draft, setDraft] = useState("");
  const generatedId = useId();
  const inputId = id || generatedId;

  const commitDraft = () => {
    const tag = draft.trim();
    const isDuplicate = tags.some(
      (existing) => existing.toLowerCase() === tag.toLowerCase(),
    );

    if (tag && !isDuplicate) onAdd(tag);
    setDraft("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commitDraft();
    } else if (e.key === "Backspace" && !draft && tags.length > 0) {
      onRemove(tags.length - 1);
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-text-secondary"
      >
        {label}
      </label>

      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-2 transition-colors focus-within:border-primary">
        {tags.map((tag, index) => (
          <Badge key={tag} className="gap-1.5">
            {tag}
            <button
              type="button"
              onClick={() => onRemove(index)}
              aria-label={`Remove ${tag}`}
              className="cursor-pointer text-primary/70 transition-colors hover:text-primary"
            >
              <X size={12} />
            </button>
          </Badge>
        ))}

        <input
          id={inputId}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitDraft}
          placeholder={placeholder}
          className="min-w-32 flex-1 bg-transparent px-1 py-1 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none"
        />
      </div>
    </div>
  );
}
