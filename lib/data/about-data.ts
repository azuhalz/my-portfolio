export type AboutIconName =
  | "MapPin"
  | "Phone"
  | "Envelope"
  | "Linkedin"
  | "Github"
  | "Briefcase";

export type AboutInfo = {
  description: string;
  details: {
    title: string;
    value: string;
    iconName: AboutIconName;
  }[];
};

export const aboutData: AboutInfo = {
  description:
    "I am a Computer Science graduate with hands-on experience in front-end and mobile development, including building web applications using modern technologies and developing iOS applications with SwiftUI. I am passionate about creating user-friendly and high-performance experiences.",
  details: [
    { title: "Location", value: "Malang, Indonesia", iconName: "MapPin" },
    { title: "Phone", value: "+62 853-3083-5455", iconName: "Phone" },
    {
      title: "Email",
      value: "ahmadzuhalzhafran@gmail.com",
      iconName: "Envelope",
    },
    {
      title: "LinkedIn",
      value: "linkedin.com/in/azuhalz",
      iconName: "Linkedin",
    },
    { title: "GitHub", value: "github.com/azuhalz", iconName: "Github" },
    {
      title: "Available",
      value: "Open to opportunities",
      iconName: "Briefcase",
    },
  ],
};

// Tipe form data untuk CMS About Section
export type AboutFormData = {
  sectionTitle: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  availability: string;
};

// Data default form About (diambil dari aboutData yang sudah ada)
export const initialAboutData: AboutFormData = {
  sectionTitle: "About Me",
  description: aboutData.description,
  location: aboutData.details.find((d) => d.title === "Location")?.value ?? "",
  phone: aboutData.details.find((d) => d.title === "Phone")?.value ?? "",
  email: aboutData.details.find((d) => d.title === "Email")?.value ?? "",
  linkedinUrl:
    aboutData.details.find((d) => d.title === "LinkedIn")?.value ?? "",
  githubUrl: aboutData.details.find((d) => d.title === "GitHub")?.value ?? "",
  availability:
    aboutData.details.find((d) => d.title === "Available")?.value ?? "",
};

