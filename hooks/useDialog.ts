import { useContext } from "react";
import { DialogContext } from "@/components/ui/DialogProvider";

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("useDialog harus dipakai di dalam DialogProvider");
  }

  const { confirm, notify } = context;

  // "Delete project?" + nama item; hanya true jika pengguna menekan Delete
  const confirmDelete = (itemType: string, itemName: string) =>
    confirm({
      tone: "danger",
      title: `Delete ${itemType}?`,
      description: `"${itemName}" will be permanently removed. This action cannot be undone.`,
      confirmLabel: "Delete",
    });

  // Konfirmasi simpan perubahan untuk satu section, contoh: "Hero section"
  const confirmSave = (subject: string) =>
    confirm({
      title: "Save changes?",
      description: `Your changes to the ${subject} will be saved.`,
      confirmLabel: "Save Changes",
    });

  const notifySaved = (subject: string) =>
    notify({
      tone: "success",
      title: "Changes saved",
      description: `The ${subject} has been updated.`,
    });

  return { confirm, notify, confirmDelete, confirmSave, notifySaved };
}
