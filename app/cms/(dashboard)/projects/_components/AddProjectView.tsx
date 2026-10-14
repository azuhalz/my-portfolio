import { ProjectForm } from "./ProjectForm";
import { useProjectForm } from "@/hooks/useProjectForm";
import type { ProjectFormData } from "@/lib/data/project-form-data";

type AddProjectViewProps = {
  onSubmit: (formData: ProjectFormData) => void;
  onCancel: () => void;
};

export function AddProjectView({ onSubmit, onCancel }: AddProjectViewProps) {
  const form = useProjectForm();

  return (
    <div className="max-w-3xl">
      <ProjectForm
        form={form}
        onSubmit={() => onSubmit(form.formData)}
        onCancel={onCancel}
      />
    </div>
  );
}
