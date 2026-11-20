"use client";

import { useEffect, useState } from "react";
import { CmsPageContainer } from "@/app/cms/(dashboard)/_components/CmsPageContainer";
import { AddProjectView } from "./AddProjectView";
import { ProjectItems } from "./ProjectItems";
import { type Project } from "@/lib/data/projects-data";
import { useDialog } from "@/hooks/useDialog";
import { moveItem } from "@/lib/utils/array";
import { apiRequest, ApiError } from "@/lib/api";

interface ProjectAPI {
  id: number;
  slug: string;
  title: string;
  type: string;
  role: string | null;
  timeline: string;
  overview: string;
  tech_stack: string[] | null;
  learnings: string[] | null;
  images:
    | {
        id: number;
        image_url: string;
        sort_order: number;
      }[]
    | null;
  live_demo_url: string | null;
  github_url: string | null;
}

function mapProject(project: ProjectAPI): Project {
  return {
    slug: project.slug,
    title: project.title,
    type: project.type,
    role: project.role ?? "",
    timeline: project.timeline,
    overview: project.overview,
    techStack: project.tech_stack ?? [],
    learnings: project.learnings ?? [],
    image: project.images?.map((image) => image.image_url) ?? [],
    liveDemoLink: project.live_demo_url ?? "",
    githubLink: project.github_url ?? "",
  };
}

export function ProjectsCmsPage() {
  const { confirmAdd, notifyAdded, confirmDelete } = useDialog();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await apiRequest<ProjectAPI[]>("/api/projects");
        setProjects((data ?? []).map(mapProject));
      } catch {
        setError("Unable to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const handleCreate = async (
    formData: Project,
    imageFiles: Record<number, File>,
  ) => {
    const confirmed = await confirmAdd("project", formData.title);

    if (!confirmed) return;

    setFormError("");

    try {
      const createdProject = await apiRequest<ProjectAPI>("/api/projects", {
        method: "POST",
        body: {
          title: formData.title.trim(),
          type: formData.type,
          role: formData.role || null,
          timeline: formData.timeline.trim(),
          overview: formData.overview.trim(),
          tech_stack: formData.techStack,
          learnings: formData.learnings.filter((item) => item.trim() !== ""),
          live_demo_url: formData.liveDemoLink || null,
          github_url: formData.githubLink || null,
        },
      });

      const uploadedImages = Object.entries(imageFiles).sort(
        ([a], [b]) => Number(a) - Number(b),
      );

      for (const [index, file] of uploadedImages) {
        const imageFormData = new FormData();
        imageFormData.append("image", file);
        imageFormData.append("sort_order", index);

        await apiRequest(`/api/projects/${createdProject.slug}/images`, {
          method: "POST",
          body: imageFormData,
        });
      }

      const updatedProject = await apiRequest<ProjectAPI>(
        `/api/projects/${createdProject.slug}`,
      );

      setProjects((prev) => [...prev, mapProject(updatedProject)]);
      setIsAdding(false);
      await notifyAdded("project");
    } catch (err) {
      if (err instanceof ApiError) {
        setFormError(err.message);
      } else {
        setFormError(
          "Unable to create project or upload images. Please try again.",
        );
      }
    }
  };

  const handleEdit = (project: Project) => {
    console.log("Edit project:", project);
  };

  const handleDelete = async (project: Project) => {
    if (await confirmDelete("project", project.title)) {
      setProjects((prev) => prev.filter((item) => item.slug !== project.slug));
    }
  };

  const handleReorder = (from: number, to: number) => {
    setProjects((prev) => moveItem(prev, from, to));
  };

  if (loading) {
    return (
      <CmsPageContainer size="list">
        <p className="text-sm text-text-secondary">Loading projects...</p>
      </CmsPageContainer>
    );
  }

  if (error) {
    return (
      <CmsPageContainer size="list">
        <p className="text-sm text-red-400">{error}</p>
      </CmsPageContainer>
    );
  }

  return (
    <CmsPageContainer size={isAdding ? "form" : "list"}>
      {isAdding ? (
        <>
          {formError && (
            <p className="mb-4 text-sm text-red-400">{formError}</p>
          )}

          <AddProjectView
            onSubmit={handleCreate}
            onCancel={() => {
              setIsAdding(false);
              setFormError("");
            }}
          />
        </>
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
