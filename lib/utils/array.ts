export function updateItemAt<T>(list: T[], index: number, value: T): T[] {
  return list.map((item, i) => (i === index ? value : item));
}

export function removeItemAt<T>(list: T[], index: number): T[] {
  return list.filter((_, i) => i !== index);
}

// Memindahkan satu item ke posisi lain: [A, B, C] + (0 -> 2) = [B, C, A]
export function moveItem<T>(list: T[], from: number, to: number): T[] {
  const next = [...list];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

// Trim setiap item lalu buang yang kosong (dipakai saat menyimpan poin/list dari form)
export function trimNonEmpty(list: string[]): string[] {
  return list.map((item) => item.trim()).filter(Boolean);
}
