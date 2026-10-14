import { useState } from "react";
import type { ContactMessage } from "@/lib/data/contact-data";
import { sortMessagesNewestFirst } from "@/lib/utils/message";

export const MESSAGES_PER_PAGE = 6;

export type MessageFilter = "all" | "unread" | "read";

export type MessageInboxState = ReturnType<typeof useMessageInbox>;

function matchesFilter(message: ContactMessage, filter: MessageFilter) {
  if (filter === "unread") return !message.isRead;
  if (filter === "read") return message.isRead;
  return true;
}

function matchesQuery(message: ContactMessage, query: string) {
  const keyword = query.trim().toLowerCase();
  if (!keyword) return true;

  return [message.name, message.email, message.subject ?? "", message.message]
    .join(" ")
    .toLowerCase()
    .includes(keyword);
}

export function useMessageInbox(initialMessages: ContactMessage[]) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [filter, setFilter] = useState<MessageFilter>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(
    sortMessagesNewestFirst(initialMessages)[0]?.id ?? null,
  );

  // Pesan yang diarsipkan tidak tampil di inbox
  const inboxMessages = sortMessagesNewestFirst(
    messages.filter((message) => !message.isArchived),
  );
  const unreadCount = inboxMessages.filter((message) => !message.isRead).length;

  const filteredMessages = inboxMessages.filter(
    (message) => matchesFilter(message, filter) && matchesQuery(message, query),
  );
  const totalPages = Math.max(
    1,
    Math.ceil(filteredMessages.length / MESSAGES_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);
  const pagedMessages = filteredMessages.slice(
    (currentPage - 1) * MESSAGES_PER_PAGE,
    currentPage * MESSAGES_PER_PAGE,
  );

  const selectedMessage =
    inboxMessages.find((message) => message.id === selectedId) ?? null;

  const updateMessage = (id: string, changes: Partial<ContactMessage>) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, ...changes } : message,
      ),
    );
  };

  const changeFilter = (nextFilter: MessageFilter) => {
    setFilter(nextFilter);
    setPage(1);
  };

  const changeQuery = (nextQuery: string) => {
    setQuery(nextQuery);
    setPage(1);
  };

  const toggleRead = (id: string) => {
    const target = messages.find((message) => message.id === id);
    if (target) updateMessage(id, { isRead: !target.isRead });
  };

  const archiveMessage = (id: string) => {
    updateMessage(id, { isArchived: true });
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  return {
    messages,
    pagedMessages,
    selectedMessage,
    unreadCount,
    filter,
    query,
    currentPage,
    totalPages,
    changeFilter,
    changeQuery,
    setPage,
    selectMessage: setSelectedId,
    toggleRead,
    archiveMessage,
    deleteMessage,
  };
}
