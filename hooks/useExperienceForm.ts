import { useState } from "react";
import { emptyExperience, type Experience } from "@/lib/data/experience-data";
import { removeItemAt, updateItemAt } from "@/lib/utils/array";

export type ExperienceTextField = Exclude<keyof Experience, "points">;

export function useExperienceForm(initialData: Experience = emptyExperience) {
  const [formData, setFormData] = useState<Experience>(initialData);

  const handleFieldChange = (field: ExperienceTextField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePointChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      points: updateItemAt(prev.points, index, value),
    }));
  };

  const handleAddPoint = () => {
    setFormData((prev) => ({ ...prev, points: [...prev.points, ""] }));
  };

  const handleRemovePoint = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      points: removeItemAt(prev.points, index),
    }));
  };

  return {
    formData,
    handleFieldChange,
    handlePointChange,
    handleAddPoint,
    handleRemovePoint,
  };
}
