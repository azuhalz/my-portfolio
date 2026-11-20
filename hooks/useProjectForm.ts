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

  // File baru yang dipilih, berdasarkan index gambar.
  const [imageFiles, setImageFiles] = useState<Record<number, File>>({});

  // URL gambar lama yang perlu dihapus dari database.
  const [removedImages, setRemovedImages] = useState<string[]>([]);

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
  const handleCoverChange = (file: File | null) => {
    const currentImage = formData.image[0];

    if (file && currentImage) {
      setRemovedImages((prev) =>
        prev.includes(currentImage) ? prev : [...prev, currentImage],
      );
    }

    if (!file && currentImage) {
      setRemovedImages((prev) =>
        prev.includes(currentImage) ? prev : [...prev, currentImage],
      );
    }

    setImageFiles((prev) => {
      const next = { ...prev };

      if (file) {
        next[0] = file;
      } else {
        delete next[0];
      }

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
  };

  const handleGalleryChange = (galleryIndex: number, file: File) => {
    const imageIndex = galleryIndex + 1;
    const currentImage = formData.image[imageIndex];

    if (currentImage) {
      setRemovedImages((prev) =>
        prev.includes(currentImage) ? prev : [...prev, currentImage],
      );
    }

    setImageFiles((prev) => ({
      ...prev,
      [imageIndex]: file,
    }));
  };

  const handleRemoveGalleryImage = (galleryIndex: number) => {
    const imageIndex = galleryIndex + 1;
    const currentImage = formData.image[imageIndex];

    if (currentImage) {
      setRemovedImages((prev) =>
        prev.includes(currentImage) ? prev : [...prev, currentImage],
      );
    }

    setFormData((prev) => ({
      ...prev,
      image: removeItemAt(prev.image, imageIndex),
    }));

    setImageFiles((prev) => {
      const next: Record<number, File> = {};

      Object.entries(prev).forEach(([index, file]) => {
        const oldIndex = Number(index);

        if (oldIndex < imageIndex) {
          next[oldIndex] = file;
        } else if (oldIndex > imageIndex) {
          next[oldIndex - 1] = file;
        }
      });

      return next;
    });
  };

  return {
    formData,
    imageFiles,
    removedImages,
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
