import React from "react";
import { Card } from "./Card";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export function InfoCard({ icon, title, value }: InfoCardProps) {
  return (
    <Card className="flex items-center gap-4">
      {/* Container untuk Ikon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/8 text-primary border border-primary/20">
        {icon}
      </div>

      {/* Container untuk Teks */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-primary">{title}</span>
        <span className="text-base font-semibold text-text-primary">
          {value}
        </span>
      </div>
    </Card>
  );
}
