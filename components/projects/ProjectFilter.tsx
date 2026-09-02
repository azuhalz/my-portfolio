type ProjectFilterProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export function ProjectFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Project categories">
      {categories.map((category) => {
        const isActive = category === activeCategory;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            aria-pressed={isActive}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              isActive
                ? "border-primary bg-primary text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]"
                : "border-primary/65 text-text-secondary hover:bg-primary/15 hover:text-white"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
