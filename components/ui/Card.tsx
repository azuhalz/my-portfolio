import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-card/30 border border-border rounded-xl p-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
