"use client";

import { useState } from "react";
import { CmsPageContainer } from "@/app/cms/(dashboard)/_components/CmsPageContainer";
import { AddProjectView } from "./AddProjectView";
import { ProjectItems } from "./ProjectItems";
import { projectsData, type Project } from "@/lib/data/projects-data";
import { useDialog } from "@/hooks/useDialog";
import { createProjectFromForm } from "@/lib/utils/project-form";
import { moveItem } from "@/lib/utils/array";

export function ProjectsCmsPage() {
  const { confirmAdd, notifyAdded, confirmDelete } = useDialog();
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [isAdding, setIsAdding] = useState(false);

  const handleCreate = async (formData: Project) => {
    const newProject = createProjectFromForm(
      formData,
      projects.map((project) => project.slug),
    );

    if (!(await confirmAdd("project", newProject.title))) return;

    setProjects((prev) => [...prev, newProject]);
    setIsAdding(false);
    await notifyAdded("project");
  };

  const handleEdit = (project: Project) => {
    console.log("Edit project:", project);
  };

  const handleDelete = async (project: Project) => {
    if (await confirmDelete("project", project.title)) {
      setProjects((prev) => prev.filter((p) => p.slug !== project.slug));
    }
  };

  const handleReorder = (from: number, to: number) => {
    setProjects((prev) => moveItem(prev, from, to));
  };

  return (
    <CmsPageContainer size={isAdding ? "form" : "list"}>
      {isAdding ? (
        <AddProjectView
          onSubmit={handleCreate}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <ProjectItems
          projects={projects}
          onAdd={() => setIsAdding(true)}
          onReorder={handleReorder}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </CmsPageContainer>
  );
}
