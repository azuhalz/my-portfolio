"use client";

import { useEffect, useState } from "react";

export function MouseBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        background: `
          radial-gradient(
            300px circle at ${mousePos.x}px ${mousePos.y}px,
            rgba(168, 85, 247, 0.20),
            rgba(139, 92, 246, 0.10) 35%,
            rgba(99, 102, 241, 0.04) 55%,
            transparent 75%
          )
        `,
      }}
    />
  );
}
