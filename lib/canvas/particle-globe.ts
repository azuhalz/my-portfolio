import type { DrawFrame } from "@/lib/canvas/types";

const POINT_COUNT = 420;
const GOLDEN_ANGLE = 2.399963;
const PHOTO_WIDTH = 384; // lebar foto hero di desktop (md:w-96)
const TEXT_WIDTH = 360; // perkiraan lebar teks hero di desktop
const SIDE_MARGIN = 24; // jarak aman antara bola dengan teks dan foto
const MIN_RADIUS = 60; // lebih kecil dari ini bola tidak ditampilkan
const MAX_RADIUS = 120;
const REPEL_RADIUS = 80;
const REPEL_FORCE = 42;

// Titik tersebar merata di permukaan bola (spiral Fibonacci)
const POINTS: [number, number, number][] = Array.from(
  { length: POINT_COUNT },
  (_, index) => {
    const y = 1 - (2 * (index + 0.5)) / POINT_COUNT;
    const ring = Math.sqrt(1 - y * y);
    const angle = index * GOLDEN_ANGLE;
    return [ring * Math.cos(angle), y, ring * Math.sin(angle)];
  },
);

// Bola partikel di tengah hero; titik menjauh dari kursor.
export const drawParticleGlobe: DrawFrame = (
  ctx,
  { width, height, time, pointer, colors },
) => {
  // Bola selalu di tengah hero (= tengah halaman); ukurannya menyesuaikan
  // sisa ruang di kiri (teks) dan kanan (foto)
  const centerX = width / 2;
  const sideRoom = width / 2 - Math.max(TEXT_WIDTH, PHOTO_WIDTH) - SIDE_MARGIN;
  const radius = Math.min(MAX_RADIUS, sideRoom, height * 0.27);
  if (radius < MIN_RADIUS) return;

  const centerY = height * 0.5;
  const yaw = time * 0.0004 + pointer.offsetX * 0.7;
  const pitch = 0.25 + pointer.offsetY * 0.45;

  for (const [px, py, pz] of POINTS) {
    const x1 = px * Math.cos(yaw) + pz * Math.sin(yaw);
    const z1 = -px * Math.sin(yaw) + pz * Math.cos(yaw);
    const y2 = py * Math.cos(pitch) - z1 * Math.sin(pitch);
    const z2 = py * Math.sin(pitch) + z1 * Math.cos(pitch);

    let screenX = centerX + x1 * radius;
    let screenY = centerY + y2 * radius;
    const depth = (z2 + 1) / 2; // 0 = belakang, 1 = depan
    let isNearPointer = false;

    if (pointer.strength > 0.01) {
      const dx = screenX - pointer.x;
      const dy = screenY - pointer.y;
      const distance = Math.hypot(dx, dy);

      if (distance > 0 && distance < REPEL_RADIUS) {
        const push = (REPEL_RADIUS - distance) / REPEL_RADIUS;
        const shift = push * push * REPEL_FORCE * pointer.strength;
        screenX += (dx / distance) * shift;
        screenY += (dy / distance) * shift;
        isNearPointer = true;
      }
    }

    ctx.fillStyle = isNearPointer
      ? `rgba(${colors.highlight}, ${(0.35 + 0.6 * depth).toFixed(2)})`
      : `rgba(${colors.primary}, ${(0.15 + 0.75 * depth).toFixed(2)})`;
    ctx.beginPath();
    ctx.arc(screenX, screenY, 0.8 + 1.8 * depth, 0, Math.PI * 2);
    ctx.fill();
  }
};
