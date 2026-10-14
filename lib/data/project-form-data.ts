export const MAX_GALLERY_IMAGES = 5;

export const projectTypeOptions = [
  "Web App",
  "Mobile App",
  "Desktop App",
  "Game",
  "Other",
];

export const projectRoleOptions = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "iOS Developer",
  "Android Developer",
  "UI/UX Designer",
];

// Tipe form data untuk CMS Projects (Add/Edit)
export type ProjectFormData = {
  title: string;
  shortDescription: string;
  techStack: string[];
  liveDemoLink: string;
  githubLink: string;
  type: string;
  role: string;
  timeline: string;
  overview: string;
  learnings: string[];
  coverImage: string;
  galleryImages: string[]; // selalu MAX_GALLERY_IMAGES slot, "" = kosong
};

export const initialProjectFormData: ProjectFormData = {
  title: "",
  shortDescription: "",
  techStack: [],
  liveDemoLink: "",
  githubLink: "",
  type: projectTypeOptions[0],
  role: projectRoleOptions[0],
  timeline: String(new Date().getFullYear()),
  overview: "",
  learnings: ["", "", ""],
  coverImage: "",
  galleryImages: Array.from({ length: MAX_GALLERY_IMAGES }, () => ""),
};
