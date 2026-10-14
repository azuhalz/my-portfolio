const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", { month: "long" });

// Mengubah "YYYY-MM" menjadi { year, monthName } (contoh: "2025-03" -> 2025, "March")
function parseMonthValue(value: string) {
  const [year, month] = value.split("-").map(Number);
  return {
    year,
    monthName: MONTH_FORMATTER.format(new Date(year, month - 1, 1)),
  };
}

/**
 * Format periode sesuai data yang sudah ada:
 * - Tahun sama   : "March – December 2025"
 * - Beda tahun   : "December 2024 – March 2025"
 * - Tanpa akhir  : "March 2025 – Present"
 */
export function formatExperiencePeriod(
  startDate: string,
  endDate: string,
): string {
  if (!startDate) return "";

  const start = parseMonthValue(startDate);

  if (!endDate) return `${start.monthName} ${start.year} – Present`;

  const end = parseMonthValue(endDate);

  return start.year === end.year
    ? `${start.monthName} – ${end.monthName} ${end.year}`
    : `${start.monthName} ${start.year} – ${end.monthName} ${end.year}`;
}
