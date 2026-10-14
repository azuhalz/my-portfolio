export function updateItemAt<T>(list: T[], index: number, value: T): T[] {
  return list.map((item, i) => (i === index ? value : item));
}

export function removeItemAt<T>(list: T[], index: number): T[] {
  return list.filter((_, i) => i !== index);
}
