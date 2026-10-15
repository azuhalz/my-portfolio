import { Save } from "lucide-react";
import { Button } from "@/components/ui/Button";

type SaveChangesButtonProps = {
  onClick: () => void;
  className?: string;
};

export function SaveChangesButton({
  onClick,
  className = "",
}: SaveChangesButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="primary"
      className={`px-6 py-2.5 cursor-pointer ${className}`}
    >
      <Save size={18} />
      <span>Save Changes</span>
    </Button>
  );
}
