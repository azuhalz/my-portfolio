"use client";

import { useMemo, useState, useEffect } from "react";
import { ProjectFilter } from "./_components/ProjectFilter";
import { ProjectSearch, type ProjectSort } from "./_components/ProjectSearch";
import { projectsData, type Project } from "@/lib/data/projects-data";
import { useInView } from "@/hooks/useInView";
import { ProjectCard } from "./_components/ProjectCard";

const categories = ["All", "Web", "Mobile"];

function AnimatedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { ref, isVisible } = useInView();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`transition-all duration-3000 ease-out ${
        isVisible
          ? "opacity-100 translate-x-0"
          : `opacity-0 ${isEven ? "-translate-x-12" : "translate-x-12"}`
      }`}
    >
      <ProjectCard project={project} />
    </div>
  );
}

export default function AllProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<ProjectSort>("newest");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const projects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projectsData
      .filter((project) => {
        const matchesCategory =
          activeCategory === "All" ||
          (activeCategory === "Web" && project.type === "Web App") ||
          (activeCategory === "Mobile" && project.type === "Mobile App");
        const searchableProject = [
          project.title,
          project.overview,
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
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-8 py-10 md:py-16">
      <div
        className={`transition-all duration-3000 ease-out ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
        }`}
      >
        <p className="text-sm font-medium text-primary">Portfolio</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-6xl">
          All <span className="text-primary">Projects</span>
        </h1>
        <p className="mt-3 max-w-xl text-text-secondary">
          A collection of my web, mobile, and backend projects.
        </p>
      </div>

      <div
        className={`mt-10 space-y-5 transition-all duration-3000 ease-out ${
          isMounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
        }`}
      >
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
          projects.map((project, index) => (
            <AnimatedProjectCard
              key={project.slug}
              project={project}
              index={index}
            />
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
