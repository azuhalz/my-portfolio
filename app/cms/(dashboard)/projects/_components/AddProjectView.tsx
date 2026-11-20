import { ProjectForm } from "./ProjectForm";
import { useProjectForm } from "@/hooks/useProjectForm";
import { emptyProject, type Project } from "@/lib/data/projects-data";

type AddProjectViewProps = {
  initialData?: Project;
  initialImageIds?: (number | null)[];
  isEditing?: boolean;
  onSubmit: (
    formData: Project,
    imageFiles: Record<number, File>,
    removedImageIds: number[],
  ) => void;
  onCancel: () => void;
};

export function AddProjectView({
  initialData = emptyProject,
  initialImageIds = [],
  isEditing = false,
  onSubmit,
  onCancel,
}: AddProjectViewProps) {
  const form = useProjectForm(initialData, initialImageIds);

  return (
    <ProjectForm
      form={form}
      isEditing={isEditing}
      onSubmit={() =>
        onSubmit(form.formData, form.imageFiles, form.removedImageIds)
      }
      onCancel={onCancel}
    />
  );
}
