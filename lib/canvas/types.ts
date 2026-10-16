export type ThemeColors = {
  primary: string; // "r, g, b" untuk dipakai di rgba(...)
  highlight: string; // versi lebih terang dari primary
};

export type PointerState = {
  x: number; // posisi kursor (piksel canvas) yang sudah diperhalus
  y: number;
  strength: number; // 0..1, naik saat kursor berada di atas canvas
  offsetX: number; // -1..1 relatif ke tengah canvas (diperhalus)
  offsetY: number;
};

export type FrameInfo = {
  width: number;
  height: number;
  time: number; // milidetik
  pointer: PointerState;
  colors: ThemeColors;
};

export type DrawFrame = (
  ctx: CanvasRenderingContext2D,
  frame: FrameInfo,
) => void;
