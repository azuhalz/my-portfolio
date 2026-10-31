"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  role?: "dialog" | "alertdialog";
  labelledBy: string;
  describedBy?: string;
  children: ReactNode;
};

// Dasar semua modal: overlay gelap + panel di tengah. Tertutup lewat klik di luar
// panel atau tombol Escape, dan fokus dikembalikan ke elemen sebelumnya saat ditutup.
export function Modal({ isOpen, ...props }: ModalProps) {
  if (!isOpen) return null;

  return <ModalContent {...props} />;
}

function ModalContent({
  onClose,
  role = "dialog",
  labelledBy,
  describedBy,
  children,
}: Omit<ModalProps, "isOpen">) {
  // Dibaca sebelum isi modal dipasang (autoFocus pada tombol memindahkan fokus),
  // supaya fokus bisa dikembalikan ke elemen pemicu saat modal ditutup
  const [previouslyFocused] = useState(
    () => document.activeElement as HTMLElement | null,
  );
  // Disimpan di ref agar efek di bawah tidak berulang setiap render
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [previouslyFocused]);

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-dialog-fade motion-reduce:animate-none"
      />
      <div
        role={role}
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        className="relative w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl shadow-black/60 animate-dialog-in motion-reduce:animate-none"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
