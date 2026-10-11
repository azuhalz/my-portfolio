export type SocialLink = {
  name: string;
  href: string;
  iconType: "email" | "linkedin" | "github";
  displayValue: string;
};

export const contactInfo = {
  description:
    "Have a project in mind or just want to say hi? Feel free to reach out! I'm always open to new opportunities and collaborations.",
  socials: [
    {
      name: "Email",
      href: "mailto:ahmadzuhalzhafran@gmail.com",
      iconType: "email",
      displayValue: "ahmadzuhalzhafran@gmail.com",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/azuhalz",
      iconType: "linkedin",
      displayValue: "linkedin.com/in/azuhalz",
    },
    {
      name: "GitHub",
      href: "https://github.com/azuhalz",
      iconType: "github",
      displayValue: "github.com/azuhalz",
    },
  ] satisfies SocialLink[],
};
