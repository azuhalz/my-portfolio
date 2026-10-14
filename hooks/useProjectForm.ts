import { useState } from "react";
import {
  initialProjectFormData,
  type ProjectFormData,
} from "@/lib/data/project-form-data";
import { removeItemAt, updateItemAt } from "@/lib/utils/array";

export type ProjectStringField = Exclude<
  keyof ProjectFormData,
  "techStack" | "learnings" | "galleryImages"
>;

export type ProjectFormState = ReturnType<typeof useProjectForm>;

export function useProjectForm(
  initialData: ProjectFormData = initialProjectFormData,
) {
  const [formData, setFormData] = useState<ProjectFormData>(initialData);

  const handleFieldChange = (field: ProjectStringField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Tech stack
  const handleAddTech = (tech: string) => {
    setFormData((prev) => ({ ...prev, techStack: [...prev.techStack, tech] }));
  };

  const handleRemoveTech = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      techStack: removeItemAt(prev.techStack, index),
    }));
  };

  // What I Learned
  const handleLearningChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      learnings: updateItemAt(prev.learnings, index, value),
    }));
  };

  const handleAddLearning = () => {
    setFormData((prev) => ({ ...prev, learnings: [...prev.learnings, ""] }));
  };

  const handleRemoveLearning = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      learnings: removeItemAt(prev.learnings, index),
    }));
  };

  // Gallery
  const handleGalleryImageChange = (index: number, url: string) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: updateItemAt(prev.galleryImages, index, url),
    }));
  };

  return {
    formData,
    handleFieldChange,
    handleAddTech,
    handleRemoveTech,
    handleLearningChange,
    handleAddLearning,
    handleRemoveLearning,
    handleGalleryImageChange,
  };
}
