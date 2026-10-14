import type { Certification } from "@/lib/data/certifications-data";

const MONTH_YEAR_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

// "2024-03" -> "Mar 2024"
function formatMonthYear(value: string): string {
  const [year, month] = value.split("-").map(Number);
  return MONTH_YEAR_FORMATTER.format(new Date(year, month - 1, 1));
}

// Bulan berjalan dalam format "YYYY-MM" agar bisa dibandingkan sebagai string
function getCurrentMonthValue(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${now.getFullYear()}-${month}`;
}

/**
 * Teks tanggal sertifikasi:
 * - Ada masa berlaku  : "Issued Mar 2024 · Expires Mar 2027"
 * - Sudah lewat       : "Issued Mar 2023 · Expired Mar 2026"
 * - Tanpa masa berlaku: "Issued Mar 2024"
 */
export function formatCertificationDates({
  issuedDate,
  expiryDate,
}: Pick<Certification, "issuedDate" | "expiryDate">): string {
  const issued = `Issued ${formatMonthYear(issuedDate)}`;

  if (!expiryDate) return issued;

  const expiryLabel =
    expiryDate < getCurrentMonthValue() ? "Expired" : "Expires";

  return `${issued} · ${expiryLabel} ${formatMonthYear(expiryDate)}`;
}
