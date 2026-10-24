"use client";

import { useState } from "react";
import { AddExperienceView } from "@/app/cms/(dashboard)/_components/AddExperienceView";
import { CmsPageContainer } from "@/app/cms/(dashboard)/_components/CmsPageContainer";
import { OrganizationList } from "./OrganizationList";
import { useDialog } from "@/hooks/useDialog";
import type { Experience } from "@/lib/data/experience-data";
import {
  organizationFormLabels,
  organizationsData,
  type Organization,
} from "@/lib/data/organizational-data";
import { trimNonEmpty } from "@/lib/utils/array";
import { formatExperiencePeriod } from "@/lib/utils/format-experience-period";

export function OrganizationalCmsPage() {
  const { confirmDelete } = useDialog();
  const [organizations, setOrganizations] =
    useState<Organization[]>(organizationsData);
  const [isAdding, setIsAdding] = useState(false);

  const handleCreate = (formData: Experience) => {
    const newOrganization: Organization = {
      role: formData.title.trim(),
      organization: formData.company.trim(),
      period: formatExperiencePeriod(formData.startDate, formData.endDate),
      points: trimNonEmpty(formData.points),
    };

    setOrganizations((prev) => [...prev, newOrganization]);
    setIsAdding(false);
  };

  const handleEdit = (organization: Organization) => {
    console.log("Edit organizational experience:", organization);
  };

  const handleDelete = async (organization: Organization) => {
    if (
      await confirmDelete(
        "organizational experience",
        `${organization.role}, ${organization.organization}`,
      )
    ) {
      setOrganizations((prev) => prev.filter((item) => item !== organization));
    }
  };

  return (
    <CmsPageContainer size={isAdding ? "form" : "list"}>
      {isAdding ? (
        <AddExperienceView
          labels={organizationFormLabels}
          onSubmit={handleCreate}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <OrganizationList
          organizations={organizations}
          onAdd={() => setIsAdding(true)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </CmsPageContainer>
  );
}
