"use client";

import { useState } from "react";
import { CmsPageContainer } from "@/app/cms/(dashboard)/_components/CmsPageContainer";
import { AddEducationView } from "./AddEducationView";
import { EducationList } from "./EducationList";
import {
  educationsData,
  type Education,
  type EducationFormData,
} from "@/lib/data/education-data";
import { createEducationFromForm } from "@/lib/utils/education-form";

export function EducationCmsPage() {
  const [educations, setEducations] = useState<Education[]>(educationsData);
  const [isAdding, setIsAdding] = useState(false);

  const handleCreate = (formData: EducationFormData) => {
    if (
      !formData.isCurrentlyStudying &&
      Number(formData.endYear) < Number(formData.startYear)
    ) {
      alert("End Year tidak boleh lebih awal dari Start Year.");
      return;
    }

    setEducations((prev) => [...prev, createEducationFromForm(formData)]);
    setIsAdding(false);
  };

  const handleEdit = (education: Education) => {
    console.log("Edit education:", education);
  };

  const handleDelete = (education: Education) => {
    if (
      confirm(`Apakah Anda yakin ingin menghapus "${education.institution}"?`)
    ) {
      setEducations((prev) => prev.filter((item) => item !== education));
    }
  };

  return (
    <CmsPageContainer size={isAdding ? "form" : "list"}>
      {isAdding ? (
        <AddEducationView
          onSubmit={handleCreate}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <EducationList
          educations={educations}
          onAdd={() => setIsAdding(true)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </CmsPageContainer>
  );
}
