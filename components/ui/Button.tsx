import React from "react";
import Link from "next/link";

// Gabungkan atribut bawaan Button dan Anchor (Link)
type ButtonAsButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

type ButtonAsLink = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

type ButtonProps = (ButtonAsButton | ButtonAsLink) & {
  variant?: "primary" | "outline" | "disabled";
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300";

  const variants = {
    primary:
      "bg-primary cursor-pointer hover:bg-primary-hover text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]",
    outline:
      "border border-primary text-white hover:bg-primary/30 cursor-pointer",
    disabled: "text-text-secondary border border-border",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    // Cast props ke AnchorHTMLAttributes agar TypeScript tidak komplain
    return (
      <Link
        href={href}
        className={combinedClassName}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClassName}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
