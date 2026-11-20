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
  const {
    confirmAdd,
    notifyAdded,
    confirmDelete,
    confirmSave,
    notifySaved,
    notify,
  } = useDialog();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const isFormOpen = isAdding || editingProject !== null;

  const fetchProjects = async () => {
    const data = await apiRequest<ProjectAPI[]>("/api/projects");
    setProjects((data ?? []).map(mapProject));
  };

  useEffect(() => {
    async function loadProjects() {
      try {
        await fetchProjects();
      } catch {
        setError("Unable to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const uploadImages = async (
    slug: string,
    imageFiles: Record<number, File>,
  ) => {
    const uploadedImages = Object.entries(imageFiles).sort(
      ([a], [b]) => Number(a) - Number(b),
    );

    for (const [index, file] of uploadedImages) {
      const imageFormData = new FormData();
      imageFormData.append("image", file);
      imageFormData.append("sort_order", index);

      await apiRequest(`/api/projects/${slug}/images`, {
        method: "POST",
        body: imageFormData,
      });
    }
  };

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

      await uploadImages(createdProject.slug, imageFiles);

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

  const handleEdit = async (project: Project) => {
    setFormError("");

    try {
      const data = await apiRequest<ProjectAPI>(
        `/api/projects/${project.slug}`,
      );

      setEditingProject(data);
      setIsAdding(false);
    } catch {
      setFormError("Unable to load project details. Please try again.");
    }
  };

  const handleUpdate = async (
    currentProject: ProjectAPI,
    formData: Project,
    imageFiles: Record<number, File>,
    removedImageIds: number[],
  ) => {
    const confirmed = await confirmSave("project");

    if (!confirmed) return;

    setFormError("");

    try {
      const updatedProject = await apiRequest<ProjectAPI>(
        `/api/projects/${currentProject.slug}`,
        {
          method: "PUT",
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
        },
      );

      // Hapus gambar lama yang diganti atau dihilangkan.
      for (const imageId of removedImageIds) {
        await apiRequest(
          `/api/projects/${updatedProject.slug}/images/${imageId}`,
          { method: "DELETE" },
        );
      }

      // Upload gambar baru.
      await uploadImages(updatedProject.slug, imageFiles);

      // Ambil data terbaru beserta metadata gambarnya.
      const refreshedProject = await apiRequest<ProjectAPI>(
        `/api/projects/${updatedProject.slug}`,
      );

      setProjects((prev) =>
        prev.map((project) =>
          project.slug === currentProject.slug
            ? mapProject(refreshedProject)
            : project,
        ),
      );

      setEditingProject(null);
      await notifySaved("project");
    } catch (err) {
      if (err instanceof ApiError) {
        setFormError(err.message);
      } else {
        setFormError(
          "Unable to update project or upload images. Please try again.",
        );
      }
    }
  };

  const handleDelete = async (project: Project) => {
    const confirmed = await confirmDelete("project", project.title);

    if (!confirmed) return;

    try {
      await apiRequest(`/api/projects/${project.slug}`, {
        method: "DELETE",
      });

      setProjects((prev) => prev.filter((item) => item.slug !== project.slug));

      await notify({
        tone: "success",
        title: "Project deleted",
        description: `"${project.title}" has been permanently deleted.`,
      });
    } catch (err) {
      await notify({
        tone: "danger",
        title: "Delete failed",
        description:
          err instanceof ApiError
            ? err.message
            : "Unable to delete project. Please try again.",
      });
    }
  };

  const handleReorder = (from: number, to: number) => {
    setProjects((prev) => moveItem(prev, from, to));
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingProject(null);
    setFormError("");
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
    <CmsPageContainer size={isFormOpen ? "form" : "list"}>
      {isFormOpen ? (
        <>
          {formError && (
            <p className="mb-4 text-sm text-red-400">{formError}</p>
          )}

          <AddProjectView
            key={editingProject?.slug ?? "new-project"}
            initialData={
              editingProject ? mapProject(editingProject) : undefined
            }
            initialImageIds={
              editingProject?.images?.map((image) => image.id) ?? []
            }
            onSubmit={(formData, imageFiles, removedImageIds) => {
              if (editingProject) {
                return handleUpdate(
                  editingProject,
                  formData,
                  imageFiles,
                  removedImageIds,
                );
              }

              return handleCreate(formData, imageFiles);
            }}
            onCancel={handleCancel}
          />
        </>
      ) : (
        <ProjectItems
          projects={projects}
          onAdd={() => {
            setFormError("");
            setIsAdding(true);
          }}
          onReorder={handleReorder}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </CmsPageContainer>
  );
}
