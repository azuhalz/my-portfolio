"use client";

import { useState } from "react";
import { CmsPageContainer } from "@/app/cms/(dashboard)/_components/CmsPageContainer";
import { AddEducationView } from "./AddEducationView";
import { EducationList } from "./EducationList";
import { educationsData, type Education } from "@/lib/data/education-data";

export function EducationCmsPage() {
  const [educations, setEducations] = useState<Education[]>(educationsData);
  const [isAdding, setIsAdding] = useState(false);

  const handleCreate = (formData: Education) => {
    const newEducation: Education = {
      institution: formData.institution.trim(),
      level: formData.level,
      fieldOfStudy: formData.fieldOfStudy.trim(),
      startYear: formData.startYear,
      endYear: formData.endYear,
      gpa: formData.gpa.trim(),
    };

    setEducations((prev) => [...prev, newEducation]);
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
