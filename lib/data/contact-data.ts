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

// ===== Pesan masuk dari form contact (dipakai halaman CMS Message & Dashboard) =====

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  receivedAt: string; // format ISO lokal, contoh: "2025-05-24T22:21:00"
  isRead: boolean;
  isArchived: boolean;
};

export const messagesData: ContactMessage[] = [
  {
    id: "msg-1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Collaboration Opportunity",
    message:
      "Hi Admin,\n\nI came across your portfolio and was really impressed by your work, especially the analytics dashboard and overall design.\n\nI'm working on a new project and believe we could create something great together. I'd love to discuss the opportunity in detail.\n\nLooking forward to your response!\n\nBest regards,\nJohn Doe",
    receivedAt: "2025-05-24T22:21:00",
    isRead: false,
    isArchived: false,
  },
  {
    id: "msg-2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    subject: "Potential Opportunity",
    message:
      "Great portfolio! Can we discuss a potential opportunity?\n\nI'm a recruiter at a product company and your projects caught my attention. Would you be open to a short call this week?\n\nBest,\nSarah",
    receivedAt: "2025-05-23T20:47:00",
    isRead: false,
    isArchived: false,
  },
  {
    id: "msg-3",
    name: "Michael Smith",
    email: "michael@example.com",
    subject: "Job Opportunity",
    message:
      "I have a job opportunity that might interest you.\n\nWe're hiring a frontend engineer and I think your experience with Next.js and TypeScript is a great fit. Let me know if you'd like more details.\n\nRegards,\nMichael",
    receivedAt: "2025-05-22T18:15:00",
    isRead: false,
    isArchived: false,
  },
  {
    id: "msg-4",
    name: "Emily Davis",
    email: "emily@example.com",
    subject: "Question about Analytics Dashboard",
    message:
      "Love your work! How did you build the analytics dashboard?\n\nI'm especially curious about the charting approach and how you structured the components. Any tips would be appreciated!\n\nThanks,\nEmily",
    receivedAt: "2025-05-21T15:30:00",
    isRead: true,
    isArchived: false,
  },
  {
    id: "msg-5",
    name: "David Wilson",
    email: "david@example.com",
    subject: "Tech Stack Inquiry",
    message:
      "Would like to know more about your tech stack.\n\nI'm planning a similar project and would love to hear which tools you'd recommend for the frontend and backend.\n\nCheers,\nDavid",
    receivedAt: "2025-05-20T11:05:00",
    isRead: true,
    isArchived: false,
  },
  {
    id: "msg-6",
    name: "Olivia Brown",
    email: "olivia@example.com",
    subject: "Experience with Similar Projects",
    message:
      "Can you share your experience with similar projects?\n\nWe have a client who needs a portfolio-style CMS and I'd like to understand your background before proposing you.\n\nBest regards,\nOlivia",
    receivedAt: "2025-05-19T09:12:00",
    isRead: true,
    isArchived: false,
  },
  {
    id: "msg-7",
    name: "Daniel Lee",
    email: "daniel@example.com",
    subject: "Freelance Availability",
    message:
      "Hi, are you available for freelance work next month?\n\nWe need help building an internal dashboard and your portfolio looks like exactly the style we are after.\n\nThanks,\nDaniel",
    receivedAt: "2025-05-18T14:40:00",
    isRead: false,
    isArchived: false,
  },
];
