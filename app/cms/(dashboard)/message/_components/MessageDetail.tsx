import { MailOpen } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { MessageActions } from "./MessageActions";
import type { ContactMessage } from "@/lib/data/contact-data";
import { formatMessageDateTime } from "@/lib/utils/message";

type MessageDetailProps = {
  message: ContactMessage | null;
  onToggleRead: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
};

export function MessageDetail({
  message,
  onToggleRead,
  onArchive,
  onDelete,
}: MessageDetailProps) {
  if (!message) {
    return (
      <Card className="flex min-h-80 flex-col items-center justify-center gap-3 p-5 bg-card/40 text-center text-text-secondary">
        <MailOpen size={32} className="text-primary/60" />
        <p className="text-sm">Select a message to read</p>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-4 p-5 bg-card/40">
      <header className="flex items-center gap-3 border-b border-border pb-4">
        <Avatar name={message.name} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-text-primary">
            {message.name}
          </p>
          <p className="truncate text-xs text-text-secondary">
            {message.email}
          </p>
        </div>
        <p className="text-xs text-text-secondary">
          {formatMessageDateTime(message.receivedAt)}
        </p>
        <Badge variant={message.isRead ? "outline" : "default"}>
          {message.isRead ? "Read" : "Unread"}
        </Badge>
      </header>

      <div className="whitespace-pre-line rounded-xl border border-border bg-card/40 p-5 text-sm leading-relaxed text-text-primary">
        {message.message}
      </div>

      <MessageActions
        isRead={message.isRead}
        onToggleRead={() => onToggleRead(message.id)}
        onArchive={() => onArchive(message.id)}
        onDelete={() => onDelete(message.id)}
      />
    </Card>
  );
}
