import { useState } from "react";
import {
  initialExperienceFormData,
  type ExperienceFormData,
} from "@/lib/data/experience-data";
import { removeItemAt, updateItemAt } from "@/lib/utils/array";

export type ExperienceTextField = Exclude<keyof ExperienceFormData, "points">;

export function useExperienceForm(
  initialData: ExperienceFormData = initialExperienceFormData,
) {
  const [formData, setFormData] = useState<ExperienceFormData>(initialData);

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
