const SIZE_STYLES = {
  md: "size-9 text-xs",
  lg: "size-11 text-sm",
};

type AvatarProps = {
  name: string;
  size?: keyof typeof SIZE_STYLES;
  className?: string;
};

// "John Doe" -> "JD"
function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export function Avatar({ name, size = "md", className = "" }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-primary/20 font-medium text-primary ${SIZE_STYLES[size]} ${className}`}
    >
      {getInitials(name)}
    </span>
  );
}
