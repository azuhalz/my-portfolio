"use client";

import { useState } from "react";

/**
 * Logika slideshow/carousel gambar: index aktif, navigasi next/prev,
 * lompat ke index tertentu, dan class posisi untuk animasi geser.
 */
export function useImageCarousel(itemCount: number) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === itemCount - 1;

  const next = () => {
    if (!isLast) setCurrentIndex((prev) => prev + 1);
  };

  const previous = () => {
    if (!isFirst) setCurrentIndex((prev) => prev - 1);
  };

  const goTo = (index: number) => setCurrentIndex(index);

  const getPositionClassName = (index: number) => {
    if (index === currentIndex) return "translate-x-0 opacity-100 z-10";
    if (index < currentIndex) return "-translate-x-full";
    return "translate-x-full";
  };

  return {
    currentIndex,
    isFirst,
    isLast,
    next,
    previous,
    goTo,
    getPositionClassName,
  };
}
