import type { Project } from "@/lib/data/projects-data";
import { trimNonEmpty } from "@/lib/utils/array";
import { createUniqueSlug } from "@/lib/utils/slug";

// Merapikan isian form menjadi Project yang siap disimpan dan ditampilkan.
export function createProjectFromForm(
  formData: Project,
  existingSlugs: string[],
): Project {
  return {
    slug: createUniqueSlug(formData.title, existingSlugs),
    title: formData.title.trim(),
    type: formData.type,
    role: formData.role,
    timeline: formData.timeline.trim(),
    overview: formData.overview.trim(),
    techStack: formData.techStack,
    learnings: trimNonEmpty(formData.learnings),
    // Slot gambar kosong dibuang; gambar pertama = cover
    image: trimNonEmpty(formData.image),
    liveDemoLink: formData.liveDemoLink.trim(),
    githubLink: formData.githubLink.trim(),
  };
}
