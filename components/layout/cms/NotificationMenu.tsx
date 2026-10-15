"use client";

import { Bell } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import { NotificationPanel } from "./NotificationPanel";
import { useMessageNotifications } from "@/hooks/useMessageNotifications";
import { messagesData } from "@/lib/data/contact-data";

export function NotificationMenu() {
  const { unreadCount, recentMessages, markAllAsRead } =
    useMessageNotifications(messagesData);

  return (
    <Dropdown
      panelClassName="w-88"
      trigger={({ isOpen, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          aria-label="Notifications"
          aria-expanded={isOpen}
          aria-haspopup="true"
          className={`relative rounded-lg p-2 transition hover:text-primary ${
            isOpen ? "text-primary" : "text-text-secondary"
          }`}
        >
          <Bell size={22} />
          {unreadCount > 0 && (
            <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </button>
      )}
    >
      {({ close }) => (
        <NotificationPanel
          unreadCount={unreadCount}
          messages={recentMessages}
          onMarkAllAsRead={markAllAsRead}
          onNavigate={close}
        />
      )}
    </Dropdown>
  );
}
