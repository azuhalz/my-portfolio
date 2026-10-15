import { useState } from "react";

// Membagi daftar item menjadi beberapa halaman dengan ukuran halaman tetap.
export function usePagination<T>(items: T[], pageSize: number) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  // Halaman otomatis menyesuaikan jika jumlah item berkurang (misal setelah dihapus)
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pagedItems = items.slice(startIndex, startIndex + pageSize);

  return { pagedItems, startIndex, currentPage, totalPages, setPage };
}
