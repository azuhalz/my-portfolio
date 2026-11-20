"use client";

import { useEffect, useState } from "react";
import { AddExperienceView } from "@/app/cms/(dashboard)/_components/AddExperienceView";
import { CmsPageContainer } from "@/app/cms/(dashboard)/_components/CmsPageContainer";
import { ExperienceList } from "./ExperienceList";
import {
  workExperienceFormLabels,
  type Experience,
} from "@/lib/data/experience-data";
import { useDialog } from "@/hooks/useDialog";
import { moveItem, trimNonEmpty } from "@/lib/utils/array";
import { apiRequest, ApiError } from "@/lib/api";

type ExperienceAPI = {
  id: number;
  type: string;
  title: string;
  organization: string;
  start_date: string;
  end_date: string | null;
  points: string[] | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

function mapExperience(experience: ExperienceAPI): Experience {
  return {
    id: experience.id,
    title: experience.title,
    organization: experience.organization,
    startDate: experience.start_date.slice(0, 7),
    endDate: experience.end_date ? experience.end_date.slice(0, 7) : "",
    points: experience.points ?? [],
  };
}

function mapExperiencePayload(formData: Experience) {
  return {
    type: "work",
    title: formData.title.trim(),
    organization: formData.organization.trim(),
    start_date: `${formData.startDate}-01T00:00:00Z`,
    end_date: formData.endDate ? `${formData.endDate}-01T00:00:00Z` : null,
    points: trimNonEmpty(formData.points),
  };
}

export function WorkExperienceCmsPage() {
  const {
    confirmAdd,
    notifyAdded,
    confirmDelete,
    confirmSave,
    notifySaved,
    notify,
  } = useDialog();

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingExperience, setEditingExperience] =
    useState<ExperienceAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const isFormOpen = isAdding || editingExperience !== null;

  useEffect(() => {
    async function loadExperiences() {
      try {
        const data = await apiRequest<ExperienceAPI[]>(
          "/api/experiences?type=work",
        );

        setExperiences((data ?? []).map(mapExperience));
      } catch (err) {
        setError(
          err instanceof ApiError
            ? err.message
            : "Unable to load work experiences. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadExperiences();
  }, []);

  const handleCreate = async (formData: Experience) => {
    const confirmed = await confirmAdd(
      "experience",
      `${formData.title}, ${formData.organization}`,
    );

    if (!confirmed) return;

    setFormError("");

    try {
      const createdExperience = await apiRequest<ExperienceAPI>(
        "/api/experiences",
        {
          method: "POST",
          body: mapExperiencePayload(formData),
        },
      );

      setExperiences((prev) => [...prev, mapExperience(createdExperience)]);

      setIsAdding(false);
      await notifyAdded("experience");
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : "Unable to create experience. Please try again.",
      );
    }
  };

  const handleEdit = async (experience: Experience) => {
    if (!experience.id) return;

    setFormError("");

    try {
      const data = await apiRequest<ExperienceAPI>(
        `/api/experiences/${experience.id}`,
      );

      setEditingExperience(data);
      setIsAdding(false);
    } catch (err) {
      await notify({
        tone: "danger",
        title: "Unable to load experience",
        description:
          err instanceof ApiError ? err.message : "Please try again.",
      });
    }
  };

  const handleUpdate = async (
    currentExperience: ExperienceAPI,
    formData: Experience,
  ) => {
    const confirmed = await confirmSave("experience");

    if (!confirmed) return;

    setFormError("");

    try {
      const updatedExperience = await apiRequest<ExperienceAPI>(
        `/api/experiences/${currentExperience.id}`,
        {
          method: "PUT",
          body: mapExperiencePayload(formData),
        },
      );

      setExperiences((prev) =>
        prev.map((experience) =>
          experience.id === updatedExperience.id
            ? mapExperience(updatedExperience)
            : experience,
        ),
      );

      setEditingExperience(null);
      await notifySaved("experience");
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : "Unable to update experience. Please try again.",
      );
    }
  };

  const handleReorder = async (from: number, to: number) => {
    const previousExperiences = experiences;
    const reorderedExperiences = moveItem(experiences, from, to);

    const ids = reorderedExperiences.map((experience) => experience.id);

    if (ids.some((id) => id === undefined)) {
      return;
    }

    setExperiences(reorderedExperiences);

    try {
      await apiRequest("/api/experiences/reorder", {
        method: "PUT",
        body: {
          type: "work",
          ids,
        },
      });
    } catch (err) {
      setExperiences(previousExperiences);

      await notify({
        tone: "danger",
        title: "Reorder failed",
        description:
          err instanceof ApiError
            ? err.message
            : "Unable to save experience order. Please try again.",
      });
    }
  };

  const handleDelete = async (experience: Experience) => {
    if (!experience.id) return;

    const confirmed = await confirmDelete(
      "experience",
      `${experience.title}, ${experience.organization}`,
    );

    if (!confirmed) return;

    try {
      await apiRequest(`/api/experiences/${experience.id}`, {
        method: "DELETE",
      });

      setExperiences((prev) =>
        prev.filter((item) => item.id !== experience.id),
      );

      await notify({
        tone: "success",
        title: "Experience deleted",
        description: `"${experience.title}" has been permanently deleted.`,
      });
    } catch (err) {
      await notify({
        tone: "danger",
        title: "Delete failed",
        description:
          err instanceof ApiError
            ? err.message
            : "Unable to delete experience. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingExperience(null);
    setFormError("");
  };

  if (loading) {
    return (
      <CmsPageContainer size="list">
        <p className="text-sm text-text-secondary">
          Loading work experiences...
        </p>
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

          <AddExperienceView
            key={editingExperience?.id ?? "new-experience"}
            labels={
              editingExperience
                ? {
                    ...workExperienceFormLabels,
                    heading: "Edit Experience",
                    submitLabel: "Save Changes",
                  }
                : workExperienceFormLabels
            }
            initialData={
              editingExperience ? mapExperience(editingExperience) : undefined
            }
            onSubmit={(formData) => {
              if (editingExperience) {
                return handleUpdate(editingExperience, formData);
              }

              return handleCreate(formData);
            }}
            onCancel={handleCancel}
          />
        </>
      ) : (
        <ExperienceList
          experiences={experiences}
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
