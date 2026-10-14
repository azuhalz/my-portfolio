import { Calendar, CirclePlus, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { BulletListField } from "@/components/form/BulletListField";
import { FormActions } from "@/components/form/FormActions";
import { IconInputField } from "@/components/form/IconInputField";
import { SelectField } from "@/components/form/SelectField";
import { TagInputField } from "@/components/form/TagInputField";
import { TextAreaField } from "@/components/form/TextAreaField";
import { TextInputField } from "@/components/form/TextInputField";
import { Card } from "@/components/ui/Card";
import { ProjectImagesField } from "./ProjectImagesField";
import type { ProjectFormState } from "@/hooks/useProjectForm";
import {
  projectRoleOptions,
  projectTypeOptions,
} from "@/lib/data/projects-data";

type ProjectFormProps = {
  form: ProjectFormState;
  onSubmit: () => void;
  onCancel: () => void;
};

export function ProjectForm({ form, onSubmit, onCancel }: ProjectFormProps) {
  const { formData, handleFieldChange } = form;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Card className="flex flex-col gap-5 p-6 md:p-8 bg-card/60">
        <h3 className="text-lg font-semibold text-text-primary">
          Project Information
        </h3>

        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
          <TextInputField
            label="Project Title"
            value={formData.title}
            onChange={(val) => handleFieldChange("title", val)}
            placeholder="e.g. Dashboard Analytics"
            required
          />
          <TextAreaField
            label="Short Description"
            value={formData.shortDescription}
            onChange={(val) => handleFieldChange("shortDescription", val)}
            placeholder="Brief description of your project..."
            rows={2}
          />
        </div>

        <TagInputField
          label="Tech Stack"
          tags={formData.techStack}
          onAdd={form.handleAddTech}
          onRemove={form.handleRemoveTech}
          placeholder="Add technology..."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <IconInputField
            label="Live Demo URL"
            type="url"
            icon={<ExternalLink size={16} />}
            iconPosition="right"
            value={formData.liveDemoLink}
            onChange={(val) => handleFieldChange("liveDemoLink", val)}
            placeholder="https://your-demo-link.com"
          />
          <IconInputField
            label="GitHub URL"
            type="url"
            icon={<FaGithub size={16} />}
            iconPosition="right"
            value={formData.githubLink}
            onChange={(val) => handleFieldChange("githubLink", val)}
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SelectField
            label="Project Type"
            options={projectTypeOptions}
            value={formData.type}
            onChange={(val) => handleFieldChange("type", val)}
          />
          <SelectField
            label="Role"
            options={projectRoleOptions}
            value={formData.role}
            onChange={(val) => handleFieldChange("role", val)}
          />
          <IconInputField
            label="Timeline"
            icon={<Calendar size={16} />}
            value={formData.timeline}
            onChange={(val) => handleFieldChange("timeline", val)}
            placeholder="2025"
          />
        </div>

        <TextAreaField
          label="Project Overview"
          value={formData.overview}
          onChange={(val) => handleFieldChange("overview", val)}
          placeholder="Describe your project, its purpose, features, and impact..."
          rows={3}
        />

        <BulletListField
          label="What I Learned"
          items={formData.learnings}
          onChange={form.handleLearningChange}
          onAdd={form.handleAddLearning}
          onRemove={form.handleRemoveLearning}
          itemLabel="Learning"
          placeholder="Add what you learned..."
          rows={1}
        />

        <ProjectImagesField
          coverImage={formData.coverImage}
          galleryImages={formData.galleryImages}
          onCoverChange={(url) => handleFieldChange("coverImage", url)}
          onGalleryChange={form.handleGalleryImageChange}
        />

        <FormActions
          submitLabel="Create Project"
          submitIcon={<CirclePlus size={18} />}
          onCancel={onCancel}
        />
      </Card>
    </form>
  );
}
