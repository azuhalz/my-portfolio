"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type DragEvent,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  getNextOverIndex,
  getRowOffsets,
  getSlotOrder,
} from "@/lib/utils/sortable";

type MoveMethod = "drag" | "keyboard";

type SortableListProps<T> = {
  items: T[];
  getKey: (item: T) => string;
  // slot = posisi tampil saat ini (berubah selagi drag), dipakai untuk nomor urut
  renderItem: (item: T, index: number, slot: number) => ReactNode;
  // from/to = index di dalam items; untuk keyboard, to bisa -1 atau items.length
  onMove: (from: number, to: number, method: MoveMethod) => void;
};

type DragState = {
  dragIndex: number;
  overIndex: number; // slot tujuan sementara selama drag
  heights: number[];
  gap: number;
};

type SortableRowProps = {
  children: ReactNode;
  isDragging: boolean;
  isAnimated: boolean;
  offsetY: number;
  onDragStart: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  onKeyboardMove: (direction: -1 | 1) => void;
};

const isFromHandle = (target: EventTarget) =>
  Boolean((target as HTMLElement).closest("[data-drag-handle]"));

function SortableRow({
  children,
  isDragging,
  isAnimated,
  offsetY,
  onDragStart,
  onDragOver,
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

  const style: CSSProperties | undefined = offsetY
    ? { transform: `translateY(${offsetY}px)` }
    : undefined;

  return (
    <div
      draggable={isArmed}
      style={style}
      onPointerDown={handlePointerDown}
      onPointerUp={() => setIsArmed(false)}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={() => {
        setIsArmed(false);
        onDragEnd();
      }}
      onKeyDown={handleKeyDown}
      className={`rounded-xl ${
        isAnimated ? "transition-transform duration-50 ease-out" : ""
      } ${isDragging ? "opacity-0" : ""}`}
    >
      {children}
    </div>
  );
}

// Daftar yang urutannya bisa diubah. Selagi drag, baris lain langsung bergeser
// (hanya tampilan) menunjukkan urutan barunya; urutan data baru berubah saat dilepas.
// Alternatif keyboard: panah atas/bawah saat pegangan (data-drag-handle) fokus.
export function SortableList<T>({
  items,
  getKey,
  renderItem,
  onMove,
}: SortableListProps<T>) {
  const [dragState, setDragState] = useState<DragState | null>(null);
  const startTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Urutan tampil sementara selama drag (berisi index asli tiap baris)
  const slotOrder = dragState
    ? getSlotOrder(items.length, dragState.dragIndex, dragState.overIndex)
    : null;
  const getSlot = (index: number) =>
    slotOrder ? slotOrder.indexOf(index) : index;

  const resetDrag = () => {
    if (startTimerRef.current) clearTimeout(startTimerRef.current);
    startTimerRef.current = null;
    setDragState(null);
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>, index: number) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", ""); // Firefox butuh data agar drag mulai

    // Ukuran baris dicatat sebelum ada yang bergeser
    const list = event.currentTarget.parentElement as HTMLElement;
    const heights = Array.from(list.children).map(
      (row) => (row as HTMLElement).offsetHeight,
    );
    const gap = parseFloat(getComputedStyle(list).rowGap) || 0;

    // Ditunda sebentar supaya gambar drag diambil browser sebelum baris diredupkan
    startTimerRef.current = setTimeout(() => {
      setDragState({ dragIndex: index, overIndex: index, heights, gap });
    }, 0);
  };

  const handleRowDragOver = (
    event: DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    event.preventDefault(); // izinkan drop
    event.dataTransfer.dropEffect = "move";
    if (!dragState) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const nextOverIndex = getNextOverIndex(
      getSlot(index),
      dragState.overIndex,
      event.clientY,
      rect.top,
      rect.height,
    );

    if (nextOverIndex !== dragState.overIndex) {
      setDragState({ ...dragState, overIndex: nextOverIndex });
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (dragState && dragState.dragIndex !== dragState.overIndex) {
      onMove(dragState.dragIndex, dragState.overIndex, "drag");
    }
    resetDrag();
  };

  const offsets = dragState
    ? getRowOffsets(
        dragState.heights,
        dragState.gap,
        dragState.dragIndex,
        dragState.overIndex,
      )
    : [];

  return (
    <div
      className="flex flex-col gap-3"
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      {items.map((item, index) => (
        <SortableRow
          key={getKey(item)}
          isDragging={dragState?.dragIndex === index}
          isAnimated={dragState !== null}
          offsetY={offsets[index] ?? 0}
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={(event) => handleRowDragOver(event, index)}
          onDragEnd={resetDrag}
          onKeyboardMove={(direction) =>
            onMove(index, index + direction, "keyboard")
          }
        >
          {renderItem(item, index, getSlot(index))}
        </SortableRow>
      ))}
    </div>
  );
}
