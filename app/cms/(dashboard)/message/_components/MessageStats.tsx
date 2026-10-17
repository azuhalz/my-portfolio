import { CalendarDays, CircleCheck, CircleDot, Mail } from "lucide-react";
import { DashboardMetricCard } from "@/app/cms/(dashboard)/_components/DashboardMetricCard";
import type { DashboardMetric } from "@/lib/data/cms-dashboard-data";
import type { ContactMessage } from "@/lib/data/message-data";
import {
  formatMessageDate,
  formatMessageTime,
  sortMessagesNewestFirst,
} from "@/lib/utils/message";

type MessageStatsProps = {
  messages: ContactMessage[];
};

function getMessageStats(messages: ContactMessage[]): DashboardMetric[] {
  const inboxMessages = messages.filter((message) => !message.isArchived);
  const unreadCount = inboxMessages.filter((message) => !message.isRead).length;
  const lastMessage = sortMessagesNewestFirst(messages)[0];

  return [
    {
      label: "Total Messages",
      value: String(messages.length),
      icon: Mail,
      caption: "All time",
    },
    {
      label: "Unread",
      value: String(unreadCount),
      icon: CircleDot,
      caption: "Needs your attention",
    },
    {
      label: "Read",
      value: String(inboxMessages.length - unreadCount),
      icon: CircleCheck,
      caption: "Messages read",
    },
    {
      label: "Last Message",
      value: lastMessage ? formatMessageDate(lastMessage.receivedAt) : "-",
      icon: CalendarDays,
      detail: lastMessage
        ? formatMessageTime(lastMessage.receivedAt)
        : undefined,
    },
  ];
}

export function MessageStats({ messages }: MessageStatsProps) {
  return (
    <section className="grid grid-cols-4 gap-4" aria-label="Message summary">
      {getMessageStats(messages).map((metric) => (
        <DashboardMetricCard
          key={metric.label}
          {...metric}
          className="min-h-0!"
        />
      ))}
    </section>
  );
}
