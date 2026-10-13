"use client";

import { useState } from "react";
import { ProjectItems } from "./ProjectItems";
import { projectsData, type Project } from "@/lib/data/projects-data";

export function ProjectCmsPage() {
  const [projects, setProjects] = useState<Project[]>(projectsData);

  const handleEdit = (project: Project) => {
    console.log("Edit project:", project);
  };

  const handleDelete = (project: Project) => {
    if (confirm(`Apakah Anda yakin ingin menghapus "${project.title}"?`)) {
      setProjects((prev) => prev.filter((p) => p.slug !== project.slug));
    }
  };

  const handleAdd = () => {
    console.log("Add project clicked");
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <ProjectItems
        projects={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
    </div>
  );
}
