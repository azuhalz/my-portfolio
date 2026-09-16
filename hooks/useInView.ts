"use client";

import { useEffect, useRef, useState } from "react";

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set to true when the element enters the viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: Stop observing once it's visible if we only want to animate once
          observer.unobserve(currentRef);
        }
      },
      options || { threshold: 0.1 },
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return { ref, isVisible };
}
