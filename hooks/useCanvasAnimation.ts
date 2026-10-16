import { useEffect, useRef } from "react";
import { readThemeColors } from "@/lib/canvas/theme";
import type { DrawFrame, PointerState } from "@/lib/canvas/types";

const MAX_PIXEL_RATIO = 2;
const STATIC_FRAME_TIME = 4000; // pose tetap saat pengguna memilih "reduce motion"

// Menjalankan animasi canvas: ukuran tajam di layar retina, mengikuti kursor,
// berhenti saat tidak terlihat, dan diam jika pengguna memilih "reduce motion".
export function useCanvasAnimation(draw: DrawFrame) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const colors = readThemeColors();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);

    const pointer: PointerState = {
      x: 0,
      y: 0,
      strength: 0,
      offsetX: 0,
      offsetY: 0,
    };
    const target = { x: 0, y: 0, active: false };
    let width = 0;
    let height = 0;
    let frameId = 0;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      draw(ctx, { width, height, time, pointer, colors });
    };

    const updatePointer = () => {
      const offsetX = target.active ? (target.x / width - 0.5) * 2 : 0;
      const offsetY = target.active ? (target.y / height - 0.5) * 2 : 0;

      pointer.strength += ((target.active ? 1 : 0) - pointer.strength) * 0.08;
      pointer.offsetX += (offsetX - pointer.offsetX) * 0.06;
      pointer.offsetY += (offsetY - pointer.offsetY) * 0.06;

      if (target.active) {
        pointer.x += (target.x - pointer.x) * 0.2;
        pointer.y += (target.y - pointer.y) * 0.2;
      }
    };

    const tick = (time: number) => {
      updatePointer();
      render(time);
      frameId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!frameId) frameId = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (reduceMotion) render(STATIC_FRAME_TIME);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    if (reduceMotion) {
      return () => resizeObserver.disconnect();
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    visibilityObserver.observe(canvas);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      if (isInside && !target.active) {
        pointer.x = x;
        pointer.y = y;
      }

      target.x = x;
      target.y = y;
      target.active = isInside;
    };

    const handlePointerLeave = () => {
      target.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handlePointerLeave,
      );
    };
  }, [draw]);

  return canvasRef;
}
