import Link from "next/link";

type ProjectBreadcrumbProps = {
  title: string;
};

export function ProjectBreadcrumb({ title }: ProjectBreadcrumbProps) {
  return (
    <div className="flex gap-2 text-sm text-text-secondary mb-6">
      <Link href="/projects" className="hover:text-primary transition-colors">
        Portfolio
      </Link>
      <span>/</span>
      <span className="text-primary">{title}</span>
    </div>
  );
}
