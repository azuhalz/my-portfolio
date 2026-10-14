import type { Project, ProjectFormData } from "@/lib/data/projects-data";
import { trimNonEmpty } from "@/lib/utils/array";
import { createUniqueSlug } from "@/lib/utils/slug";

// Mengubah data form menjadi Project yang siap ditampilkan di daftar CMS.
export function createProjectFromForm(
  formData: ProjectFormData,
  existingSlugs: string[],
): Project {
  return {
    slug: createUniqueSlug(formData.title, existingSlugs),
    title: formData.title.trim(),
    shortDescription: formData.shortDescription.trim() || undefined,
    type: formData.type,
    role: formData.role,
    timeline: formData.timeline.trim(),
    overview: formData.overview.trim(),
    techStack: formData.techStack,
    learnings: trimNonEmpty(formData.learnings),
    // Gambar pertama = cover, sisanya gallery
    image: trimNonEmpty([formData.coverImage, ...formData.galleryImages]),
    liveDemoLink: formData.liveDemoLink.trim() || undefined,
    githubLink: formData.githubLink.trim() || undefined,
  };
}
