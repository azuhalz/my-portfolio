// "mailto:a@b.com" -> "a@b.com"; "https://github.com/azuhalz" -> "github.com/azuhalz"
export function getSocialDisplayValue(url: string): string {
  return url
    .replace(/^mailto:/i, "")
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/$/, "");
}
