"use client";

import { useState } from "react";
import { AddExperienceView } from "./AddExperienceView";
import { ExperienceList } from "./ExperienceList";
import {
  experiencesData,
  type Experience,
  type ExperienceFormData,
} from "@/lib/data/experience-data";
import { formatExperiencePeriod } from "@/lib/utils/format-experience-period";

export function WorkExperienceCmsPage() {
  const [experiences, setExperiences] = useState<Experience[]>(experiencesData);
  const [isAdding, setIsAdding] = useState(false);

  const handleCreate = (formData: ExperienceFormData) => {
    if (formData.endDate && formData.endDate < formData.startDate) {
      alert("End Date tidak boleh lebih awal dari Start Date.");
      return;
    }

    const newExperience: Experience = {
      title: formData.title.trim(),
      company: formData.company.trim(),
      period: formatExperiencePeriod(formData.startDate, formData.endDate),
      points: formData.points.map((point) => point.trim()).filter(Boolean),
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
    <div className="p-6 md:p-8 max-w-5xl">
      {isAdding ? (
        <AddExperienceView
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
    </div>
  );
}
