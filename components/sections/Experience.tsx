import { SectionHeading } from "@/components/ui/SectionHeading";

// Data pengalaman kerja ditulis langsung di sini
const experiences = [
  {
    title: "Tech Learner",
    company: "Apple Developer Academy @ UC",
    period: "Mar 2025 – Dec 2025",
    points: [
      "Developed iOS applications using SwiftUI and Swift.",
      "Implemented MVVM architecture with clear separation of concerns.",
      "Managed the app submission process to the App Store.",
      "Collaborated in a challenge-based learning environment with Apple mentors and peers.",
    ],
  },
  {
    title: "Software Quality Assurance Intern",
    company: "PT. Telkom Indonesia",
    period: "Apr 2024 – Sep 2024",
    points: [
      "Manual testing.",
      "Automation testing, API testing and performance testing.",
      "Reported bugs and defects accurately.",
      "Worked with Agile methods: Kanban, Scrum, etc.",
    ],
  },
  {
    title: "Mobile Development Student",
    company: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
    period: "Feb 2023 – Jul 2023",
    points: [
      "Developed Android applications using Kotlin.",
      "Improved soft skills and English proficiency with professional mentors.",
    ],
  },
];

export default function Experience() {
  return (
    // id="experience" agar link /#experience dari Navbar bisa scroll ke sini
    <section id="experience" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Work Experience" />

        {/* Container timeline: posisi relative agar garis vertikal bisa diletakkan di dalamnya */}
        <div className="relative">
          {/* Garis vertikal ungu di kiri */}
          <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />

          {/* Daftar pengalaman, diberi jarak ke kiri agar tidak tertimpa garis */}
          <div className="space-y-10 pl-10">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Titik bulat ungu di garis vertikal */}
                <div className="absolute -left-10 top-1.5 w-4 h-4 rounded-full bg-primary border-2 border-background" />

                <p className="text-text-secondary text-xs mb-1">{exp.period}</p>
                <h3 className="text-white font-semibold">{exp.title}</h3>
                <p className="text-primary text-sm mb-3">{exp.company}</p>

                <ul className="space-y-1">
                  {exp.points.map((point, i) => (
                    <li
                      key={i}
                      className="text-text-secondary text-sm flex gap-2"
                    >
                      <span className="text-primary mt-1">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
