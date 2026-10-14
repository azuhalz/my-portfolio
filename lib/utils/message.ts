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
