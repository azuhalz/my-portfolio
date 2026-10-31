"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AddItemHeader } from "@/components/ui/AddItemHeader";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { SortableList } from "@/components/ui/SortableList";
import { usePagination } from "@/hooks/usePagination";

const ITEMS_PER_PAGE = 4;

type ItemListCardProps<T> = {
  items: T[];
  addLabel: string;
  onAdd?: () => void;
  onReorder: (from: number, to: number) => void; // index pada seluruh daftar
  getKey: (item: T) => string;
  renderItem: (item: T, order: number) => ReactNode;
};

// Card daftar item CMS: tombol Add, item yang bisa diurutkan ulang, dan pagination.
export function ItemListCard<T>({
  items,
  addLabel,
  onAdd,
  onReorder,
  getKey,
  renderItem,
}: ItemListCardProps<T>) {
  const { pagedItems, startIndex, currentPage, totalPages, setPage } =
    usePagination(items, ITEMS_PER_PAGE);
  const listRef = useRef<HTMLDivElement>(null);
  const pendingFocusRef = useRef<number | null>(null);

  // Setelah dipindah dengan keyboard, fokus kembali ke pegangan item yang sama
  useEffect(() => {
    if (pendingFocusRef.current === null) return;

    const handles =
      listRef.current?.querySelectorAll<HTMLElement>("[data-drag-handle]");
    handles?.[pendingFocusRef.current - startIndex]?.focus();
    pendingFocusRef.current = null;
  });

  const handleMove = (
    from: number,
    to: number,
    method: "drag" | "keyboard",
  ) => {
    const globalFrom = startIndex + from;
    const globalTo = startIndex + to;
    if (globalTo < 0 || globalTo >= items.length) return;

    onReorder(globalFrom, globalTo);

    // Panah di ujung halaman memindahkan item ke halaman sebelah; tampilan mengikuti
    if (method === "keyboard") {
      setPage(Math.floor(globalTo / ITEMS_PER_PAGE) + 1);
      pendingFocusRef.current = globalTo;
    }
  };

  return (
    <Card className="flex flex-col gap-5 p-5 bg-card/40 border-border">
      <AddItemHeader addLabel={addLabel} onAdd={onAdd} />

      <div ref={listRef}>
        <SortableList
          items={pagedItems}
          getKey={getKey}
          renderItem={(item, _index, slot) =>
            renderItem(item, startIndex + slot + 1)
          }
          onMove={handleMove}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Card>
  );
}
