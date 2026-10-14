export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // hapus aksen: "Fillé" -> "Fille"
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Slug dijamin unik terhadap slug yang sudah ada: "billo", "billo-2", ...
export function createUniqueSlug(
  text: string,
  existingSlugs: string[],
  fallback = "item",
): string {
  const baseSlug = slugify(text) || fallback;
  let slug = baseSlug;
  let counter = 2;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return slug;
}
