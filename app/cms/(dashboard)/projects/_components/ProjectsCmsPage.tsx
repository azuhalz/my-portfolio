"use client";

import { useState } from "react";
import { AddProjectView } from "./AddProjectView";
import { ProjectItems } from "./ProjectItems";
import { projectsData, type Project } from "@/lib/data/projects-data";
import type { ProjectFormData } from "@/lib/data/project-form-data";
import { createProjectFromForm } from "@/lib/utils/project-form";

export function ProjectsCmsPage() {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [isAdding, setIsAdding] = useState(false);

  const handleCreate = (formData: ProjectFormData) => {
    const newProject = createProjectFromForm(
      formData,
      projects.map((project) => project.slug),
    );

    setProjects((prev) => [...prev, newProject]);
    setIsAdding(false);
  };

  const handleEdit = (project: Project) => {
    console.log("Edit project:", project);
  };

  const handleDelete = (project: Project) => {
    if (confirm(`Apakah Anda yakin ingin menghapus "${project.title}"?`)) {
      setProjects((prev) => prev.filter((p) => p.slug !== project.slug));
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      {isAdding ? (
        <AddProjectView
          onSubmit={handleCreate}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <ProjectItems
          projects={projects}
          onAdd={() => setIsAdding(true)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
