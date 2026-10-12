import { Monitor } from "lucide-react";

export function LivePreview() {
  return (
    <div className="flex items-center gap-2">
      <Monitor size={18} className="text-primary" />
      <h2 className="text-base font-semibold text-text-primary">
        Live Preview
      </h2>
    </div>
  );
}
