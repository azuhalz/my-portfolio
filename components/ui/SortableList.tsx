"use client";

import {
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

type MoveMethod = "drag" | "keyboard";

type SortableListProps<T> = {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T, index: number) => ReactNode;
  // from/to = index di dalam items; untuk keyboard, to bisa -1 atau items.length
  onMove: (from: number, to: number, method: MoveMethod) => void;
};

type SortableRowProps = {
  children: ReactNode;
  isDragging: boolean;
  isDropTarget: boolean;
  onDragStart: () => void;
  onDragOver: () => void;
  onDrop: () => void;
  onDragEnd: () => void;
  onKeyboardMove: (direction: -1 | 1) => void;
};

const isFromHandle = (target: EventTarget) =>
  Boolean((target as HTMLElement).closest("[data-drag-handle]"));

function SortableRow({
  children,
  isDragging,
  isDropTarget,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onKeyboardMove,
}: SortableRowProps) {
  // Baris hanya bisa di-drag setelah pegangan ditekan, jadi teks di dalam
  // baris tetap bisa diseleksi seperti biasa
  const [isArmed, setIsArmed] = useState(false);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setIsArmed(isFromHandle(event.target));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isFromHandle(event.target)) return;
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;

    event.preventDefault();
    onKeyboardMove(event.key === "ArrowUp" ? -1 : 1);
  };

  return (
    <div
      draggable={isArmed}
      onPointerDown={handlePointerDown}
      onPointerUp={() => setIsArmed(false)}
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", ""); // Firefox butuh data agar drag mulai
        onDragStart();
      }}
      onDragOver={(event) => {
        event.preventDefault(); // izinkan drop di baris ini
        event.dataTransfer.dropEffect = "move";
        onDragOver();
      }}
      onDrop={(event) => {
        event.preventDefault();
        onDrop();
      }}
      onDragEnd={() => {
        setIsArmed(false);
        onDragEnd();
      }}
      onKeyDown={handleKeyDown}
      className={`rounded-xl transition ${isDragging ? "opacity-40" : ""} ${
        isDropTarget ? "ring-2 ring-primary/60" : ""
      }`}
    >
      {children}
    </div>
  );
}

// Daftar yang urutannya bisa diubah: drag lewat pegangan (data-drag-handle),
// atau panah atas/bawah saat pegangan sedang fokus.
export function SortableList<T>({
  items,
  getKey,
  renderItem,
  onMove,
}: SortableListProps<T>) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const resetDrag = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <SortableRow
          key={getKey(item)}
          isDragging={dragIndex === index}
          isDropTarget={
            dragIndex !== null && overIndex === index && dragIndex !== index
          }
          onDragStart={() => setDragIndex(index)}
          onDragOver={() => setOverIndex(index)}
          onDrop={() => {
            if (dragIndex !== null && dragIndex !== index) {
              onMove(dragIndex, index, "drag");
            }
            resetDrag();
          }}
          onDragEnd={resetDrag}
          onKeyboardMove={(direction) =>
            onMove(index, index + direction, "keyboard")
          }
        >
          {renderItem(item, index)}
        </SortableRow>
      ))}
    </div>
  );
}
