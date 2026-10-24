"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ConfirmDialog, type DialogTone } from "@/components/ui/ConfirmDialog";

export type ConfirmOptions = {
  title: string;
  description: string;
  tone?: DialogTone;
  confirmLabel?: string;
  cancelLabel?: string;
};

export type NotifyOptions = {
  title: string;
  description: string;
  tone?: DialogTone;
  confirmLabel?: string;
};

export type DialogContextValue = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  notify: (options: NotifyOptions) => Promise<void>;
};

type ActiveDialog = {
  title: string;
  description: string;
  tone?: DialogTone;
  confirmLabel: string;
  cancelLabel?: string;
  resolve: (confirmed: boolean) => void;
};

export const DialogContext = createContext<DialogContextValue | null>(null);

// Satu dialog untuk seluruh CMS: halaman cukup memanggil `await confirm(...)`
// atau `await notify(...)` lewat useDialog(), tanpa menyimpan state modal sendiri.
export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<ActiveDialog | null>(null);
  const activeRef = useRef<ActiveDialog | null>(null);

  const open = useCallback((next: ActiveDialog) => {
    activeRef.current?.resolve(false); // dialog sebelumnya dianggap dibatalkan
    activeRef.current = next;
    setDialog(next);
  }, []);

  const close = useCallback((confirmed: boolean) => {
    const current = activeRef.current;
    activeRef.current = null;
    setDialog(null);
    current?.resolve(confirmed);
  }, []);

  const confirm = useCallback(
    (options: ConfirmOptions) =>
      new Promise<boolean>((resolve) => {
        open({
          ...options,
          confirmLabel: options.confirmLabel ?? "Confirm",
          cancelLabel: options.cancelLabel ?? "Cancel",
          resolve,
        });
      }),
    [open],
  );

  const notify = useCallback(
    (options: NotifyOptions) =>
      new Promise<void>((resolve) => {
        open({
          ...options,
          confirmLabel: options.confirmLabel ?? "OK",
          resolve: () => resolve(),
        });
      }),
    [open],
  );

  const value = useMemo(() => ({ confirm, notify }), [confirm, notify]);

  return (
    <DialogContext.Provider value={value}>
      {children}
      <ConfirmDialog
        isOpen={dialog !== null}
        tone={dialog?.tone}
        title={dialog?.title ?? ""}
        description={dialog?.description ?? ""}
        confirmLabel={dialog?.confirmLabel ?? ""}
        cancelLabel={dialog?.cancelLabel}
        onConfirm={() => close(true)}
        onCancel={() => close(false)}
      />
    </DialogContext.Provider>
  );
}
