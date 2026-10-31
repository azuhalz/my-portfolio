"use client";

import { CmsPageContainer } from "@/app/cms/(dashboard)/_components/CmsPageContainer";
import { MessageDetail } from "./MessageDetail";
import { MessageInbox } from "./MessageInbox";
import { MessageStats } from "./MessageStats";
import { useDialog } from "@/hooks/useDialog";
import { useMessageInbox } from "@/hooks/useMessageInbox";
import { messagesData } from "@/lib/data/message-data";

export function MessagesCmsPage() {
  const inbox = useMessageInbox(messagesData);
  const { confirmDelete } = useDialog();

  const handleDelete = async (id: string) => {
    const message = inbox.messages.find((item) => item.id === id);
    if (!message) return;

    if (await confirmDelete("message", `Message from ${message.name}`)) {
      inbox.deleteMessage(id);
    }
  };

  return (
    <CmsPageContainer size="wide">
      <div className="flex flex-col gap-4">
        <MessageStats messages={inbox.messages} />

        <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-start gap-4">
          <MessageInbox inbox={inbox} />
          <MessageDetail
            message={inbox.selectedMessage}
            onToggleRead={inbox.toggleRead}
            onArchive={inbox.archiveMessage}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </CmsPageContainer>
  );
}
