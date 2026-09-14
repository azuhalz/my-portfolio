export type AboutInfo = {
  description: string;
  details: {
    title: string;
    value: string;
    iconName: string;
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
