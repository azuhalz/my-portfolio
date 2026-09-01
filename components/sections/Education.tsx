import { SectionHeading } from "@/components/ui/SectionHeading";

// Data pendidikan formal
const educations = [
  {
    institution: "University of Brawijaya",
    degree: "Bachelor of Computer Science",
    period: "Aug 2020 – Jul 2024",
    gpa: "GPA: 3.80 / 4.00",
  },
  {
    institution: "SMA Negeri 4 Malang",
    degree: "Ilmu Pengetahuan Alam (Natural Science)",
    period: "Jul 2017 – Jun 2020",
    gpa: "GPA: 3.80 / 4.00",
  },
];

// Data pengalaman organisasi
const organizations = [
  {
    role: "Head of Basketball Division",
    org: "Badan Internal Olahraga & Seni",
    period: "Jan 2022 – Dec 2022",
    points: [
      "Led basketball division, building a structured training system.",
      "Organized and supervised training sessions and events.",
      "Improved team communication and division organization.",
    ],
  },
  {
    role: "Basketball Division Staff",
    org: "Badan Internal Olahraga & Seni",
    period: "Jan 2021 – Dec 2021",
    points: [
      "Assisted in organizing and managing basketball division activities.",
      "Supported event preparation and coordination on-site.",
    ],
  },
];

export default function Education() {
  return (
    // id="education" agar link /#education dari Navbar bisa scroll ke sini
    <section id="education" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* ======================== */}
        {/* SUB-SECTION: EDUCATION  */}
        {/* ======================== */}
        <SectionHeading title="Education" />

        <div className="space-y-6 mb-16">
          {educations.map((edu, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6"
            >
              <p className="text-text-secondary text-xs mb-1">{edu.period}</p>
              <h3 className="text-white font-semibold">{edu.institution}</h3>
              <p className="text-primary text-sm">{edu.degree}</p>
              <p className="text-text-secondary text-xs mt-1">{edu.gpa}</p>
            </div>
          ))}
        </div>

        {/* ================================= */}
        {/* SUB-SECTION: ORGANIZATIONAL EXP  */}
        {/* ================================= */}
        <SectionHeading title="Organizational Experience" />

        <div className="relative">
          {/* Garis vertikal ungu */}
          <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10 pl-10">
            {organizations.map((org, index) => (
              <div key={index} className="relative">
                {/* Titik bulat ungu di garis */}
                <div className="absolute -left-10 top-1.5 w-4 h-4 rounded-full bg-primary border-2 border-background" />

                <p className="text-text-secondary text-xs mb-1">{org.period}</p>
                <h3 className="text-white font-semibold">{org.role}</h3>
                <p className="text-primary text-sm mb-3">{org.org}</p>

                <ul className="space-y-1">
                  {org.points.map((point, i) => (
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
