import type { DrawFrame } from "@/lib/canvas/types";

const ROWS = 18;
const COLS = 56;
const SIDE_FADE = 0.1; // bagian lebar di tepi kiri/kanan yang memudar
const TEXT_FADE_START = 0.15; // garis makin terang setelah melewati area teks
const TEXT_FADE_RANGE = 0.3;
const POINTER_RADIUS_SQ = 5000; // 2 * (50px)^2, jangkauan gembungan di sekitar kursor
const BOTTOM_FADE_START = 0.88;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

// Garis gelombang berperspektif di bagian bawah hero; menggembung di dekat kursor.
export const drawWaveLines: DrawFrame = (
  ctx,
  { width, height, time, pointer, colors },
) => {
  for (let row = 0; row < ROWS; row++) {
    const depth = row / (ROWS - 1); // 0 = jauh, 1 = dekat
    const baseline = height * 0.5 + Math.pow(depth, 1.5) * height * 0.44;
    const amplitude = 3 + depth * 13;
    let prevX = 0;
    let prevY = 0;

    for (let col = 0; col <= COLS; col++) {
      const x = -10 + (col * (width + 20)) / COLS;
      let y =
        baseline +
        Math.sin(col * 0.22 + time * 0.001 + row * 0.55) * amplitude +
        Math.sin(col * 0.09 - time * 0.0007 + row * 0.9) * amplitude * 0.7;

      const dx = x - pointer.x;
      const dy = baseline - pointer.y;
      y -=
        Math.exp(-(dx * dx + dy * dy) / POINTER_RADIUS_SQ) *
        (14 + depth * 12) *
        pointer.strength;

      if (col > 0) {
        const textFade = clamp01(
          (x - width * TEXT_FADE_START) / (width * TEXT_FADE_RANGE),
        );
        const sideFade = clamp01(Math.min(x, width - x) / (width * SIDE_FADE));
        const alpha =
          (0.14 + depth * 0.5) * (0.35 + 0.65 * textFade) * sideFade;

        ctx.strokeStyle = `rgba(${colors.primary}, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 0.8 + depth * 1.3;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      prevX = x;
      prevY = y;
    }
  }

  // Pudarkan bagian bawah agar garis tidak terpotong tegas di tepi section
  const top = height * BOTTOM_FADE_START;
  const mask = ctx.createLinearGradient(0, top, 0, height);
  mask.addColorStop(0, "rgba(0, 0, 0, 0)");
  mask.addColorStop(1, "rgba(0, 0, 0, 1)");

  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = mask;
  ctx.fillRect(0, top, width, height - top);
  ctx.restore();
};
