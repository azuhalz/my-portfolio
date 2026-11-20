import { useState } from "react";
import { emptyProject, type Project } from "@/lib/data/projects-data";
import { removeItemAt, updateItemAt } from "@/lib/utils/array";

export type ProjectStringField = Exclude<
  keyof Project,
  "techStack" | "learnings" | "image"
>;

export type ProjectFormState = ReturnType<typeof useProjectForm>;

export function useProjectForm(
  initialData: Project = emptyProject,
  initialImageIds: (number | null)[] = [],
) {
  const [formData, setFormData] = useState<Project>(initialData);
  const [imageFiles, setImageFiles] = useState<Record<number, File>>({});
  const [imageIds, setImageIds] = useState<(number | null)[]>(initialImageIds);
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);

  const markImageAsRemoved = (imageId: number | null | undefined) => {
    if (imageId == null) return;

    setRemovedImageIds((prev) =>
      prev.includes(imageId) ? prev : [...prev, imageId],
    );
  };

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

  // Images: index 0 = cover, index 1 dst = gallery
  const handleCoverChange = (file: File | null) => {
    markImageAsRemoved(imageIds[0]);

    setImageIds((prev) => {
      const next = [...prev];
      next[0] = null;
      return next;
    });

    setImageFiles((prev) => {
      const next = { ...prev };

      if (file) next[0] = file;
      else delete next[0];

      return next;
    });

    if (!file) {
      setFormData((prev) => ({
        ...prev,
        image: prev.image.map((url, index) => (index === 0 ? "" : url)),
      }));
    }
  };

  const handleAddGalleryImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: [...prev.image, ""],
    }));

    setImageIds((prev) => [...prev, null]);
  };

  const handleGalleryChange = (galleryIndex: number, file: File) => {
    const imageIndex = galleryIndex + 1;

    markImageAsRemoved(imageIds[imageIndex]);

    setImageIds((prev) => {
      const next = [...prev];
      next[imageIndex] = null;
      return next;
    });

    setImageFiles((prev) => ({
      ...prev,
      [imageIndex]: file,
    }));
  };

  const handleRemoveGalleryImage = (galleryIndex: number) => {
    const imageIndex = galleryIndex + 1;

    markImageAsRemoved(imageIds[imageIndex]);

    setFormData((prev) => ({
      ...prev,
      image: removeItemAt(prev.image, imageIndex),
    }));

    setImageIds((prev) => removeItemAt(prev, imageIndex));

    setImageFiles((prev) => {
      const next: Record<number, File> = {};

      Object.entries(prev).forEach(([index, file]) => {
        const oldIndex = Number(index);

        if (oldIndex < imageIndex) next[oldIndex] = file;
        else if (oldIndex > imageIndex) next[oldIndex - 1] = file;
      });

      return next;
    });
  };

  return {
    formData,
    imageFiles,
    imageIds,
    removedImageIds,
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
