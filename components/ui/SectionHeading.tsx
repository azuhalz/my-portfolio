import React from "react";

interface SectionHeadingProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  title,
  icon,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`flex items-center gap-3 mb-8 ${className}`}>
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-primary">
          {icon}
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
    </div>
  );
}
