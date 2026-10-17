"use client";

import { CmsPageContainer } from "@/app/cms/(dashboard)/_components/CmsPageContainer";
import { MessageDetail } from "./MessageDetail";
import { MessageInbox } from "./MessageInbox";
import { MessageStats } from "./MessageStats";
import { useMessageInbox } from "@/hooks/useMessageInbox";
import { messagesData } from "@/lib/data/message-data";

export function MessagesCmsPage() {
  const inbox = useMessageInbox(messagesData);

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
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
