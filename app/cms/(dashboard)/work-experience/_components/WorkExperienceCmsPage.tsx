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
import { useDialog } from "@/hooks/useDialog";
import { moveItem, trimNonEmpty } from "@/lib/utils/array";

export function WorkExperienceCmsPage() {
  const { confirmAdd, notifyAdded, confirmDelete } = useDialog();
  const [experiences, setExperiences] = useState<Experience[]>(experiencesData);
  const [isAdding, setIsAdding] = useState(false);

  const handleCreate = async (formData: Experience) => {
    const newExperience: Experience = {
      title: formData.title.trim(),
      company: formData.company.trim(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      points: trimNonEmpty(formData.points),
    };

    if (
      !(await confirmAdd(
        "experience",
        `${newExperience.title}, ${newExperience.company}`,
      ))
    ) {
      return;
    }

    setExperiences((prev) => [...prev, newExperience]);
    setIsAdding(false);
    await notifyAdded("experience");
  };

  const handleReorder = (from: number, to: number) => {
    setExperiences((prev) => moveItem(prev, from, to));
  };

  const handleEdit = (experience: Experience) => {
    console.log("Edit experience:", experience);
  };

  const handleDelete = async (experience: Experience) => {
    if (
      await confirmDelete(
        "experience",
        `${experience.title}, ${experience.company}`,
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
          onReorder={handleReorder}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </CmsPageContainer>
  );
}
