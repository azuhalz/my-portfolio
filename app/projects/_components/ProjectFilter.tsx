import { Button } from "@/components/ui/Button";

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
          <Button
            key={category}
            variant={isActive ? "primary" : "outline"}
            onClick={() => onCategoryChange(category)}
            aria-pressed={isActive}
            className="px-4! py-1! text-sm transition-colors duration-300"
          >
            {category}
          </Button>
        );
      })}
    </div>
  );
}
