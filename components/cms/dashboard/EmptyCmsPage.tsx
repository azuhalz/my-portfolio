type EmptyCmsPageProps = {
  title: string;
};

export function EmptyCmsPage({ title }: EmptyCmsPageProps) {
  return <section aria-label={`${title} content`} className="min-h-[calc(100vh-5.25rem)]" />;
}
