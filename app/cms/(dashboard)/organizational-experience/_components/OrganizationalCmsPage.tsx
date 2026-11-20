"use client";

import { useEffect, useState } from "react";
import { AddExperienceView } from "@/app/cms/(dashboard)/_components/AddExperienceView";
import { CmsPageContainer } from "@/app/cms/(dashboard)/_components/CmsPageContainer";
import { OrganizationList } from "./OrganizationList";
import { useDialog } from "@/hooks/useDialog";
import type { Experience } from "@/lib/data/experience-data";
import {
  organizationFormLabels,
  type Organization,
} from "@/lib/data/organizational-data";
import { moveItem, trimNonEmpty } from "@/lib/utils/array";
import { formatExperiencePeriod } from "@/lib/utils/format-experience-period";
import { apiRequest, ApiError } from "@/lib/api";

type OrganizationAPI = {
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

function mapOrganization(data: OrganizationAPI): Organization {
  const startDate = data.start_date.slice(0, 7);
  const endDate = data.end_date ? data.end_date.slice(0, 7) : "";

  return {
    id: data.id,
    role: data.title,
    organization: data.organization,
    startDate,
    endDate,
    period: formatExperiencePeriod(startDate, endDate),
    points: data.points ?? [],
  };
}

function mapOrganizationToExperience(
  organization: OrganizationAPI,
): Experience {
  return {
    id: organization.id,
    title: organization.title,
    organization: organization.organization,
    startDate: organization.start_date.slice(0, 7),
    endDate: organization.end_date ? organization.end_date.slice(0, 7) : "",
    points: organization.points ?? [],
  };
}

function mapOrganizationPayload(formData: Experience) {
  return {
    type: "organization",
    title: formData.title.trim(),
    organization: formData.organization.trim(),
    start_date: `${formData.startDate}-01T00:00:00Z`,
    end_date: formData.endDate ? `${formData.endDate}-01T00:00:00Z` : null,
    points: trimNonEmpty(formData.points),
  };
}

export function OrganizationalCmsPage() {
  const {
    confirmAdd,
    notifyAdded,
    confirmDelete,
    confirmSave,
    notifySaved,
    notify,
  } = useDialog();

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingOrganization, setEditingOrganization] =
    useState<OrganizationAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const isFormOpen = isAdding || editingOrganization !== null;

  useEffect(() => {
    async function loadOrganizations() {
      try {
        const data = await apiRequest<OrganizationAPI[]>(
          "/api/experiences?type=organization",
        );

        setOrganizations((data ?? []).map(mapOrganization));
      } catch (err) {
        setError(
          err instanceof ApiError
            ? err.message
            : "Unable to load organizational experiences. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrganizations();
  }, []);

  const handleCreate = async (formData: Experience) => {
    const confirmed = await confirmAdd(
      "organizational experience",
      `${formData.title}, ${formData.organization}`,
    );

    if (!confirmed) return;

    setFormError("");

    try {
      const createdOrganization = await apiRequest<OrganizationAPI>(
        "/api/experiences",
        {
          method: "POST",
          body: mapOrganizationPayload(formData),
        },
      );

      setOrganizations((prev) => [
        ...prev,
        mapOrganization(createdOrganization),
      ]);

      setIsAdding(false);
      await notifyAdded("organizational experience");
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : "Unable to create organizational experience. Please try again.",
      );
    }
  };

  const handleEdit = async (organization: Organization) => {
    if (!organization.id) return;

    setFormError("");

    try {
      const data = await apiRequest<OrganizationAPI>(
        `/api/experiences/${organization.id}`,
      );

      setEditingOrganization(data);
      setIsAdding(false);
    } catch (err) {
      await notify({
        tone: "danger",
        title: "Unable to load organizational experience",
        description:
          err instanceof ApiError ? err.message : "Please try again.",
      });
    }
  };

  const handleUpdate = async (
    currentOrganization: OrganizationAPI,
    formData: Experience,
  ) => {
    const confirmed = await confirmSave("organizational experience");

    if (!confirmed) return;

    setFormError("");

    try {
      const updatedOrganization = await apiRequest<OrganizationAPI>(
        `/api/experiences/${currentOrganization.id}`,
        {
          method: "PUT",
          body: mapOrganizationPayload(formData),
        },
      );

      setOrganizations((prev) =>
        prev.map((organization) =>
          organization.id === updatedOrganization.id
            ? mapOrganization(updatedOrganization)
            : organization,
        ),
      );

      setEditingOrganization(null);
      await notifySaved("organizational experience");
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : "Unable to update organizational experience. Please try again.",
      );
    }
  };

  const handleDelete = async (organization: Organization) => {
    if (!organization.id) return;

    const confirmed = await confirmDelete(
      "organizational experience",
      `${organization.role}, ${organization.organization}`,
    );

    if (!confirmed) return;

    try {
      await apiRequest(`/api/experiences/${organization.id}`, {
        method: "DELETE",
      });

      setOrganizations((prev) =>
        prev.filter((item) => item.id !== organization.id),
      );

      await notify({
        tone: "success",
        title: "Organizational experience deleted",
        description: `"${organization.role}" has been permanently deleted.`,
      });
    } catch (err) {
      await notify({
        tone: "danger",
        title: "Delete failed",
        description:
          err instanceof ApiError
            ? err.message
            : "Unable to delete organizational experience. Please try again.",
      });
    }
  };

  const handleReorder = async (from: number, to: number) => {
    const previousOrganizations = organizations;
    const reorderedOrganizations = moveItem(organizations, from, to);

    const ids = reorderedOrganizations.map((organization) => organization.id);

    if (ids.some((id) => id === undefined)) {
      return;
    }

    setOrganizations(reorderedOrganizations);

    try {
      await apiRequest("/api/experiences/reorder", {
        method: "PUT",
        body: {
          type: "organization",
          ids,
        },
      });
    } catch (err) {
      setOrganizations(previousOrganizations);

      await notify({
        tone: "danger",
        title: "Reorder failed",
        description:
          err instanceof ApiError
            ? err.message
            : "Unable to save organizational experience order. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingOrganization(null);
    setFormError("");
  };

  if (loading) {
    return (
      <CmsPageContainer size="list">
        <p className="text-sm text-text-secondary">
          Loading organizational experiences...
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
            key={editingOrganization?.id ?? "new-organization"}
            labels={
              editingOrganization
                ? {
                    ...organizationFormLabels,
                    heading: "Edit Organizational Experience",
                    submitLabel: "Save Changes",
                  }
                : organizationFormLabels
            }
            initialData={
              editingOrganization
                ? mapOrganizationToExperience(editingOrganization)
                : undefined
            }
            onSubmit={(formData) => {
              if (editingOrganization) {
                return handleUpdate(editingOrganization, formData);
              }

              return handleCreate(formData);
            }}
            onCancel={handleCancel}
          />
        </>
      ) : (
        <OrganizationList
          organizations={organizations}
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
