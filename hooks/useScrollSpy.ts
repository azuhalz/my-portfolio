"use client";

import { useEffect, useState } from "react";

type ScrollSpyLink = {
  id: string;
};

/**
 * Melacak section mana yang sedang aktif berdasarkan posisi scroll,
 * lalu mengembalikan id dari link yang seharusnya di-highlight.
 *
 * Pass `disabled: true` untuk menonaktifkan listener (misalnya saat
 * berada di halaman yang tidak memiliki section, seperti /projects).
 */
export function useScrollSpy(links: ScrollSpyLink[], disabled = false) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (disabled) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition < 100) {
        setActiveId(links[0]?.id ?? "");
        return;
      }

      if (
        window.innerHeight + Math.round(scrollPosition) >=
        document.documentElement.scrollHeight - 50
      ) {
        setActiveId(links[links.length - 1]?.id ?? "");
        return;
      }

      for (const link of links) {
        const element = document.getElementById(link.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveId(link.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links, disabled]);

  return [activeId, setActiveId] as const;
}
