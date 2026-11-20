import { ProjectForm } from "./ProjectForm";
import { useProjectForm } from "@/hooks/useProjectForm";
import type { Project } from "@/lib/data/projects-data";

type AddProjectViewProps = {
  onSubmit: (formData: Project, imageFiles: Record<number, File>) => void;
  onCancel: () => void;
};

export function AddProjectView({ onSubmit, onCancel }: AddProjectViewProps) {
  const form = useProjectForm();

  return (
    <ProjectForm
      form={form}
      onSubmit={() => onSubmit(form.formData, form.imageFiles)}
      onCancel={onCancel}
    />
  );
}
