import { moveItem } from "@/lib/utils/array";

// Urutan tampilan (berisi index asli) saat baris dragIndex dipindah sementara
// ke slot overIndex. Contoh: 3 baris, drag 0 ke slot 2 -> [1, 2, 0]
export function getSlotOrder(
  count: number,
  dragIndex: number,
  overIndex: number,
): number[] {
  const identity = Array.from({ length: count }, (_, index) => index);
  return moveItem(identity, dragIndex, overIndex);
}

// Pergeseran vertikal (px) tiap baris agar tampilan sudah seperti urutan baru
// selagi drag berlangsung. Baris yang dilewati bergeser setinggi baris yang di-drag,
// sedangkan baris yang di-drag berpindah ke slot tujuannya.
export function getRowOffsets(
  heights: number[],
  gap: number,
  dragIndex: number,
  overIndex: number,
): number[] {
  const offsets = heights.map(() => 0);
  if (dragIndex === overIndex) return offsets;

  const dragSize = heights[dragIndex] + gap;

  if (dragIndex < overIndex) {
    for (let index = dragIndex + 1; index <= overIndex; index++) {
      offsets[index] = -dragSize;
      offsets[dragIndex] += heights[index] + gap;
    }
  } else {
    for (let index = overIndex; index < dragIndex; index++) {
      offsets[index] = dragSize;
      offsets[dragIndex] -= heights[index] + gap;
    }
  }

  return offsets;
}

// Slot tujuan baru ketika kursor berada di atas sebuah baris. Slot hanya berubah
// setelah kursor melewati titik tengah baris itu, supaya baris yang tingginya
// berbeda tidak saling bertukar bolak-balik (berkedip).
export function getNextOverIndex(
  rowSlot: number,
  overIndex: number,
  pointerY: number,
  rowTop: number,
  rowHeight: number,
): number {
  if (rowSlot === overIndex) return overIndex;

  const middle = rowTop + rowHeight / 2;
  const hasPassedMiddle =
    rowSlot > overIndex ? pointerY > middle : pointerY < middle;

  return hasPassedMiddle ? rowSlot : overIndex;
}
