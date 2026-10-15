"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type DropdownProps = {
  trigger: (state: { isOpen: boolean; toggle: () => void }) => ReactNode;
  children: (actions: { close: () => void }) => ReactNode;
  panelClassName?: string;
};

// Panel pop-up di bawah trigger. Tertutup saat klik di luar atau menekan Escape.
export function Dropdown({
  trigger,
  children,
  panelClassName = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      {trigger({ isOpen, toggle: () => setIsOpen((prev) => !prev) })}

      {isOpen && (
        <div
          className={`absolute right-0 top-full z-50 mt-3 overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/50 ${panelClassName}`}
        >
          {children({ close: () => setIsOpen(false) })}
        </div>
      )}
    </div>
  );
}
