"use client";

import { useCanvasAnimation } from "@/hooks/useCanvasAnimation";
import { drawParticleGlobe } from "@/lib/canvas/particle-globe";
import type { DrawFrame } from "@/lib/canvas/types";
import { drawWaveLines } from "@/lib/canvas/wave-lines";

// Gelombang di latar, bola partikel di depannya.
const drawHeroScene: DrawFrame = (ctx, frame) => {
  drawWaveLines(ctx, frame);
  drawParticleGlobe(ctx, frame);
};

export function HeroBackdrop() {
  const canvasRef = useCanvasAnimation(drawHeroScene);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
