"use client";

import { Fragment, type ReactNode } from "react";
import { AddItemHeader } from "@/components/ui/AddItemHeader";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { usePagination } from "@/hooks/usePagination";

const ITEMS_PER_PAGE = 4;

type ItemListCardProps<T> = {
  items: T[];
  addLabel: string;
  onAdd?: () => void;
  getKey: (item: T) => string;
  renderItem: (item: T, order: number) => ReactNode;
};

// Card daftar item CMS: tombol Add, item, dan pagination (3 item per halaman).
export function ItemListCard<T>({
  items,
  addLabel,
  onAdd,
  getKey,
  renderItem,
}: ItemListCardProps<T>) {
  const { pagedItems, startIndex, currentPage, totalPages, setPage } =
    usePagination(items, ITEMS_PER_PAGE);

  return (
    <Card className="flex flex-col gap-5 p-5 bg-card/40 border-border">
      <AddItemHeader addLabel={addLabel} onAdd={onAdd} />

      <div className="flex flex-col gap-3">
        {pagedItems.map((item, index) => (
          <Fragment key={getKey(item)}>
            {renderItem(item, startIndex + index + 1)}
          </Fragment>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Card>
  );
}
