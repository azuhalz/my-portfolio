"use client";

import { useEffect, useState } from "react";

type PaginationOptions = {
  mobileCount?: number;
  desktopCount?: number;
  breakpoint?: number;
};

/**
 * Membagi `items` menjadi beberapa halaman, dengan jumlah item per
 * halaman yang otomatis menyesuaikan lebar layar (mobile vs desktop).
 */
export function useResponsivePagination<T>(
  items: T[],
  { mobileCount = 1, desktopCount = 3, breakpoint = 768 }: PaginationOptions = {},
) {
  const [activePage, setActivePage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(desktopCount);

  // Deteksi layar: di bawah breakpoint pakai mobileCount, selebihnya desktopCount.
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(
        window.innerWidth < breakpoint ? mobileCount : desktopCount,
      );
      setActivePage(0); // Reset ke halaman 1 tiap kali ukuran layar berubah
    };

    handleResize(); // Jalankan sekali saat web dimuat
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileCount, desktopCount, breakpoint]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const pages = Array.from({ length: totalPages }, (_, pageIndex) =>
    items.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage),
  );

  const goToNextPage = () => {
    setActivePage((page) => Math.min(page + 1, totalPages - 1));
  };

  const goToPreviousPage = () => {
    setActivePage((page) => Math.max(page - 1, 0));
  };

  return {
    activePage,
    totalPages,
    pages,
    goToNextPage,
    goToPreviousPage,
    showNavigation: totalPages > 1,
  };
}
