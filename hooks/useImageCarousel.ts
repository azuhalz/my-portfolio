"use client";

import { useState } from "react";

export function useImageCarousel(itemCount: number) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeIndex = Math.min(currentIndex, Math.max(itemCount - 1, 0));

  const isFirst = safeIndex === 0;
  const isLast = safeIndex >= itemCount - 1;

  const next = () => {
    setCurrentIndex(Math.min(safeIndex + 1, itemCount - 1));
  };

  const previous = () => {
    setCurrentIndex(Math.max(safeIndex - 1, 0));
  };

  const goTo = (index: number) => {
    if (!Number.isInteger(index)) return;

    setCurrentIndex(Math.max(0, Math.min(index, itemCount - 1)));
  };

  const getPositionClassName = (index: number) => {
    if (index === safeIndex) return "translate-x-0 opacity-100 z-10";
    if (index < safeIndex) return "-translate-x-full";
    return "translate-x-full";
  };

  return {
    currentIndex: safeIndex,
    isFirst,
    isLast,
    next,
    previous,
    goTo,
    getPositionClassName,
  };
}
