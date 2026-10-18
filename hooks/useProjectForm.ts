import { useState } from "react";
import { emptyProject, type Project } from "@/lib/data/projects-data";
import { removeItemAt, updateItemAt } from "@/lib/utils/array";

export type ProjectStringField = Exclude<
  keyof Project,
  "techStack" | "learnings" | "image"
>;

export type ProjectFormState = ReturnType<typeof useProjectForm>;

export function useProjectForm(initialData: Project = emptyProject) {
  const [formData, setFormData] = useState<Project>(initialData);

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

  // Gambar: index 0 = cover, index 1 dst = gallery
  const handleImageChange = (index: number, url: string) => {
    setFormData((prev) => ({
      ...prev,
      image: updateItemAt(prev.image, index, url),
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
    handleImageChange,
  };
}
