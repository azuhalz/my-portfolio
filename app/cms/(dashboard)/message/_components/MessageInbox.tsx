import { Search } from "lucide-react";
import { IconInputField } from "@/components/form/IconInputField";
import { Card } from "@/components/ui/Card";
import { FilterTabs, type FilterTabOption } from "@/components/ui/FilterTabs";
import { Pagination } from "@/components/ui/Pagination";
import { MessageListItem } from "./MessageListItem";
import type { MessageFilter, MessageInboxState } from "@/hooks/useMessageInbox";

type MessageInboxProps = {
  inbox: MessageInboxState;
};

export function MessageInbox({ inbox }: MessageInboxProps) {
  const filterOptions: FilterTabOption<MessageFilter>[] = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread", count: inbox.unreadCount || undefined },
    { value: "read", label: "Read" },
  ];

  return (
    <Card className="flex flex-col gap-4 p-4 bg-card/40">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-semibold text-text-primary">Inbox</h2>
        <IconInputField
          className="min-w-40 flex-1"
          label="Search messages"
          hideLabel
          icon={<Search size={16} />}
          value={inbox.query}
          onChange={inbox.changeQuery}
          placeholder="Search messages..."
        />
        <FilterTabs
          ariaLabel="Filter messages"
          options={filterOptions}
          value={inbox.filter}
          onChange={inbox.changeFilter}
        />
      </div>

      {inbox.pagedMessages.length > 0 ? (
        <ul className="flex flex-col gap-1">
          {inbox.pagedMessages.map((message) => (
            <li key={message.id}>
              <MessageListItem
                message={message}
                isSelected={message.id === inbox.selectedMessage?.id}
                onSelect={inbox.selectMessage}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-10 text-center text-sm text-text-secondary">
          No messages found.
        </p>
      )}

      <Pagination
        currentPage={inbox.currentPage}
        totalPages={inbox.totalPages}
        onPageChange={inbox.setPage}
      />
    </Card>
  );
}
