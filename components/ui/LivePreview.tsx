import React from "react";
import { Monitor } from "lucide-react";
import { Card } from "@/components/ui/Card";

export type LivePreviewProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

export function LivePreview({
  children,
  title = "Live Preview",
  className = "",
}: LivePreviewProps) {
  return (
    <Card className={`flex flex-col p-4 sticky top-6 ${className}`}>
      <div className="flex items-center gap-2">
        <Monitor size={24} className="text-primary" />
        <h2 className="text-base font-semibold text-text-primary">{title}</h2>
      </div>

      <div className="relative mt-3 p-4 md:p-6 overflow-hidden">{children}</div>
    </Card>
  );
}
