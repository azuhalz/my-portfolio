import type { Project, ProjectFormData } from "@/lib/data/projects-data";
import { createUniqueSlug } from "@/lib/utils/slug";

const cleanList = (items: string[]) =>
  items.map((item) => item.trim()).filter(Boolean);

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
    learnings: cleanList(formData.learnings),
    // Gambar pertama = cover, sisanya gallery
    image: cleanList([formData.coverImage, ...formData.galleryImages]),
    liveDemoLink: formData.liveDemoLink.trim() || undefined,
    githubLink: formData.githubLink.trim() || undefined,
  };
}
