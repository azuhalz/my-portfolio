// Tipe data untuk form dan konten Hero Section
export type HeroFormData = {
  greetingText: string;
  displayName: string;
  headline: string;
  workButton: string;
  contactButton: string;
  socials: {
    name: string;
    iconType: "github" | "linkedin" | "email";
    url: string;
  }[];
  profileImageUrl: string;
  profileImageName: string;
};

// Data default (awal) untuk Hero Section
export const initialHeroData: HeroFormData = {
  greetingText: "Hi, I'm",
  displayName: "Zhafran",
  headline: "Frontend & iOS Developer",
  workButton: "View My Work ↗",
  contactButton: "Contact Me ↗",
  socials: [
    {
      name: "GitHub",
      iconType: "github",
      url: "https://github.com/azuhalz",
    },
    {
      name: "LinkedIn",
      iconType: "linkedin",
      url: "https://linkedin.com/in/azuhalz",
    },
    {
      name: "Email",
      iconType: "email",
      url: "mailto:ahmadzuhalzhafran@gmail.com",
    },
  ],
  profileImageUrl: "/profile4.png",
  profileImageName: "hero-profile.png",
};
