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
  const handleCoverChange = (url: string) => {
    setFormData((prev) => {
      const nextImages = [...prev.image];
      nextImages[0] = url;
      return { ...prev, image: nextImages };
    });
  };

  const handleAddGalleryImage = (url: string = "") => {
    setFormData((prev) => {
      const nextImages = prev.image.length === 0 ? ["", url] : [...prev.image, url];
      return { ...prev, image: nextImages };
    });
  };

  const handleGalleryChange = (galleryIndex: number, url: string) => {
    // galleryIndex 0 berarti index 1 pada prev.image
    const imageIndex = galleryIndex + 1;
    setFormData((prev) => {
      const nextImages = [...prev.image];
      while (nextImages.length <= imageIndex) {
        nextImages.push("");
      }
      nextImages[imageIndex] = url;
      return { ...prev, image: nextImages };
    });
  };

  const handleRemoveGalleryImage = (galleryIndex: number) => {
    // galleryIndex 0 berarti index 1 pada prev.image
    const imageIndex = galleryIndex + 1;
    setFormData((prev) => ({
      ...prev,
      image: removeItemAt(prev.image, imageIndex),
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
    handleCoverChange,
    handleAddGalleryImage,
    handleGalleryChange,
    handleRemoveGalleryImage,
  };
}
