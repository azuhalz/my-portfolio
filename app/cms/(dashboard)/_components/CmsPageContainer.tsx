import type { ReactNode } from "react";

const SIZE_STYLES = {
  list: "max-w-5xl", // daftar item & form lebar (Hero, About)
  form: "max-w-3xl", // form tambah/edit item (Project, Experience, Education)
};

type CmsPageContainerProps = {
  size?: keyof typeof SIZE_STYLES;
  children: ReactNode;
};

export function CmsPageContainer({
  size = "list",
  children,
}: CmsPageContainerProps) {
  return (
    <div className={`mx-auto p-6 md:p-8 ${SIZE_STYLES[size]}`}>{children}</div>
  );
}
