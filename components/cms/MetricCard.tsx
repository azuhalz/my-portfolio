interface MetricCardProps {
  label: string;
  value: string;
}

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card/80 p-2.5">
      <p className="text-[9px] text-text-secondary/40">{label}</p>
      <p className="mt-1 text-lg font-medium text-text-primary/85">{value}</p>
      <div className="mt-2 h-4 w-full bg-[linear-gradient(135deg,transparent_40%,rgba(139,92,246,.85)_41%,transparent_43%,transparent_58%,rgba(139,92,246,.85)_59%,transparent_61%)]" />
    </div>
  );
}
