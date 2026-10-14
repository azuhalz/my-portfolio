type PointListProps = {
  points: string[];
};

export function PointList({ points }: PointListProps) {
  return (
    <ul className="flex min-w-0 flex-1 list-disc flex-col gap-1.5 pl-4 text-sm leading-relaxed text-text-secondary marker:text-text-secondary/60">
      {points.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  );
}
