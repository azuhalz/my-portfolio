export type Education = {
  institution: string;
  degree: string;
  period: string;
  gpa?: string;
};

export const educationsData: Education[] = [
  {
    institution: "University of Brawijaya",
    degree: "Bachelor of Computer Science",
    period: "August 2020 – July 2024",
    gpa: "GPA: 3.60 / 4.00 (Cum Laude)",
  },
  {
    institution: "SMA Negeri 4 Malang",
    degree: "Natural Science",
    period: "July 2017 – June 2020",
  },
];
