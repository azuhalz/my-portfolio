"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import {
  ProjectSearch,
  type ProjectSort,
} from "@/components/projects/ProjectSearch";
import { projectsData } from "@/lib/projects-data";

const categories = ["All", "Web", "Mobile"];

export default function AllProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<ProjectSort>("newest");

  const projects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projectsData
      .filter((project) => {
        const matchesCategory =
          activeCategory === "All" ||
          project.category === activeCategory ||
          (activeCategory === "Web" && project.type === "Web App") ||
          (activeCategory === "Mobile" && project.type === "Mobile App");
        const searchableProject = [
          project.title,
          project.overview,
          project.category,
          project.type,
          ...project.techStack,
        ]
          .join(" ")
          .toLowerCase();

        return matchesCategory && searchableProject.includes(normalizedQuery);
      })
      .sort((first, second) => {
        if (sort === "title") return first.title.localeCompare(second.title);

        const yearDifference = Number(second.timeline) - Number(first.timeline);
        return sort === "newest" ? yearDifference : -yearDifference;
      });
  }, [activeCategory, query, sort]);

  return (
    <section className="mx-auto w-full max-w-7xl md:py-16">
      <p className="text-sm font-medium text-primary">Portfolio</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-6xl">
        All <span className="text-primary">Projects</span>
      </h1>
      <p className="mt-3 max-w-xl text-text-secondary">
        A collection of my web, mobile, and backend projects.
      </p>

      <div className="mt-10 space-y-5">
        <ProjectSearch
          query={query}
          onQueryChange={setQuery}
          sort={sort}
          onSortChange={setSort}
        />
        <ProjectFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      <div className="mt-6 space-y-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))
        ) : (
          <div className="rounded-xl border border-border bg-card/30 px-6 py-12 text-center text-text-secondary">
            No projects match your search or filter.
          </div>
        )}
      </div>
    </section>
  );
}
