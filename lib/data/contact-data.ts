export type SocialIconType = "email" | "linkedin" | "github";

export type SocialLink = {
  name: string;
  url: string;
  iconType: SocialIconType;
};

export type ContactContent = {
  description: string;
  socials: SocialLink[];
};

export const contactInfo: ContactContent = {
  description:
    "Have a project in mind or just want to say hi? Feel free to reach out! I'm always open to new opportunities and collaborations.",
  socials: [
    {
      name: "Email",
      url: "mailto:ahmadzuhalzhafran@gmail.com",
      iconType: "email",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/azuhalz",
      iconType: "linkedin",
    },
    {
      name: "GitHub",
      url: "https://github.com/azuhalz",
      iconType: "github",
    },
  ],
};
