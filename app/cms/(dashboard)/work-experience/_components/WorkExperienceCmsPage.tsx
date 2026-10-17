"use client";

import { useState } from "react";
import { AddExperienceView } from "@/app/cms/(dashboard)/_components/AddExperienceView";
import { CmsPageContainer } from "@/app/cms/(dashboard)/_components/CmsPageContainer";
import { ExperienceList } from "./ExperienceList";
import {
  experiencesData,
  workExperienceFormLabels,
  type Experience,
} from "@/lib/data/experience-data";
import { trimNonEmpty } from "@/lib/utils/array";

export function WorkExperienceCmsPage() {
  const [experiences, setExperiences] = useState<Experience[]>(experiencesData);
  const [isAdding, setIsAdding] = useState(false);

  const handleCreate = (formData: Experience) => {
    const newExperience: Experience = {
      title: formData.title.trim(),
      company: formData.company.trim(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      points: trimNonEmpty(formData.points),
    };

    setExperiences((prev) => [...prev, newExperience]);
    setIsAdding(false);
  };

  const handleEdit = (experience: Experience) => {
    console.log("Edit experience:", experience);
  };

  const handleDelete = (experience: Experience) => {
    if (
      confirm(
        `Apakah Anda yakin ingin menghapus "${experience.title}, ${experience.company}"?`,
      )
    ) {
      setExperiences((prev) => prev.filter((item) => item !== experience));
    }
  };

  return (
    <CmsPageContainer size={isAdding ? "form" : "list"}>
      {isAdding ? (
        <AddExperienceView
          labels={workExperienceFormLabels}
          onSubmit={handleCreate}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <ExperienceList
          experiences={experiences}
          onAdd={() => setIsAdding(true)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </CmsPageContainer>
  );
}
