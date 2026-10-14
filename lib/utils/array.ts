export function updateItemAt<T>(list: T[], index: number, value: T): T[] {
  return list.map((item, i) => (i === index ? value : item));
}

export function removeItemAt<T>(list: T[], index: number): T[] {
  return list.filter((_, i) => i !== index);
}

// Trim setiap item lalu buang yang kosong (dipakai saat menyimpan poin/list dari form)
export function trimNonEmpty(list: string[]): string[] {
  return list.map((item) => item.trim()).filter(Boolean);
}
