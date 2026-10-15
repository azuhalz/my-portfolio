import type { ContactMessage } from "@/lib/data/contact-data";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const SHORT_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

// "2025-05-24T22:21:00" -> "May 24, 2025"
export function formatMessageDate(value: string): string {
  return DATE_FORMATTER.format(new Date(value));
}

// "2025-05-24T22:21:00" -> "May 24"
export function formatMessageShortDate(value: string): string {
  return SHORT_DATE_FORMATTER.format(new Date(value));
}

// "2025-05-24T22:21:00" -> "10:21 PM"
export function formatMessageTime(value: string): string {
  return TIME_FORMATTER.format(new Date(value));
}

// "2025-05-24T22:21:00" -> "May 24, 2025 at 10:21 PM"
export function formatMessageDateTime(value: string): string {
  return `${formatMessageDate(value)} at ${formatMessageTime(value)}`;
}

// Ringkasan satu baris dari isi pesan (dipotong lewat CSS sesuai lebar tampilan)
export function getMessagePreview(message: ContactMessage): string {
  return message.message.replace(/\s+/g, " ").trim();
}

export function sortMessagesNewestFirst(
  messages: ContactMessage[],
): ContactMessage[] {
  return [...messages].sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
}

const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

// "2m ago", "3h ago", "2d ago"; lewat dari 7 hari tampil sebagai tanggal singkat ("May 24")
export function formatRelativeTime(
  value: string,
  now: Date = new Date(),
): string {
  const elapsed = now.getTime() - new Date(value).getTime();

  if (elapsed < MINUTE_MS) return "Just now";
  if (elapsed < HOUR_MS) return `${Math.floor(elapsed / MINUTE_MS)}m ago`;
  if (elapsed < DAY_MS) return `${Math.floor(elapsed / HOUR_MS)}h ago`;
  if (elapsed < 7 * DAY_MS) return `${Math.floor(elapsed / DAY_MS)}d ago`;

  return formatMessageShortDate(value);
}
