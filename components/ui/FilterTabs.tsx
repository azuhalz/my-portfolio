export type FilterTabOption<T extends string> = {
  value: T;
  label: string;
  count?: number;
};

type FilterTabsProps<T extends string> = {
  options: FilterTabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
};

export function FilterTabs<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: FilterTabsProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex overflow-hidden rounded-lg border border-border bg-card/40"
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={`flex cursor-pointer items-center gap-2 px-3.5 py-2 text-sm transition-colors ${
              isActive
                ? "bg-primary/20 text-text-primary ring-1 ring-inset ring-primary/60"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {option.label}
            {option.count !== undefined && (
              <span className="flex min-w-5 items-center justify-center rounded-full bg-primary/30 px-1.5 text-[11px] font-medium text-primary">
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
