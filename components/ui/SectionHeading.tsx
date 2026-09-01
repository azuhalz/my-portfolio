import React from "react";

interface SectionHeadingProps {
  title: string;
  icon?: React.ReactNode;
}

export function SectionHeading({ title, icon }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-3 mb-2">
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          {icon}
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
    </div>
  );
}
