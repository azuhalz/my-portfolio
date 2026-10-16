import type { ThemeColors } from "@/lib/canvas/types";

const FALLBACK_PRIMARY: [number, number, number] = [139, 92, 246];
const HIGHLIGHT_MIX = 0.8; // seberapa dekat highlight ke putih

// "#8b5cf6" atau "#85f" -> [139, 92, 246]
function parseHex(hex: string): [number, number, number] | null {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value;

  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;

  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

// Membaca warna primary dari CSS variable di globals.css agar tetap satu sumber.
export function readThemeColors(): ThemeColors {
  const cssValue = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-primary")
    .trim();
  const primary = parseHex(cssValue) ?? FALLBACK_PRIMARY;
  const highlight = primary.map((channel) =>
    Math.round(channel + (255 - channel) * HIGHLIGHT_MIX),
  );

  return {
    primary: primary.join(", "),
    highlight: highlight.join(", "),
  };
}
