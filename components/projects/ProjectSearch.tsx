import { ArrowDownUp, Search } from "lucide-react";

export type ProjectSort = "newest" | "oldest" | "title";

type ProjectSearchProps = {
  query: string;
  onQueryChange: (query: string) => void;
  sort: ProjectSort;
  onSortChange: (sort: ProjectSort) => void;
};

export function ProjectSearch({
  query,
  onQueryChange,
  sort,
  onSortChange,
}: ProjectSearchProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <label className="flex w-full items-center gap-3 rounded-lg border border-border bg-card/45 px-4 py-3 text-text-secondary md:max-w-xl">
        <Search size={18} aria-hidden="true" />
        <span className="sr-only">Search projects</span>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search projects by name or tech..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-text-secondary"
        />
      </label>

      <label className="flex items-center gap-3 rounded-lg border border-border bg-card/45 px-4 py-3 text-sm text-text-secondary">
        <ArrowDownUp size={16} aria-hidden="true" />
        <span className="sr-only">Sort projects</span>
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as ProjectSort)}
          className="cursor-pointer bg-transparent text-white outline-none"
        >
          <option value="newest" className="bg-card text-white">
            Sort by: Newest
          </option>
          <option value="oldest" className="bg-card text-white">
            Sort by: Oldest
          </option>
          <option value="title" className="bg-card text-white">
            Sort by: A–Z
          </option>
        </select>
      </label>
    </div>
  );
}
