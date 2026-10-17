import { useState } from "react";
import type { ContactMessage } from "@/lib/data/message-data";
import { sortMessagesNewestFirst } from "@/lib/utils/message";

const NOTIFICATIONS_LIMIT = 4;

export function useMessageNotifications(initialMessages: ContactMessage[]) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);

  const inboxMessages = messages.filter((message) => !message.isArchived);
  const unreadCount = inboxMessages.filter((message) => !message.isRead).length;
  const recentMessages = sortMessagesNewestFirst(inboxMessages).slice(
    0,
    NOTIFICATIONS_LIMIT,
  );

  const markAllAsRead = () => {
    setMessages((prev) =>
      prev.map((message) => ({ ...message, isRead: true })),
    );
  };

  return { unreadCount, recentMessages, markAllAsRead };
}
