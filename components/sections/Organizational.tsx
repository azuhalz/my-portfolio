import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "../ui/Card";
import { UsersRound } from "lucide-react";

// Data pengalaman organisasi
const organizations = [
  {
    role: "Head of Basketball Division",
    organization: "Badan Internal Olahraga & Seni",
    period: "Jan 2022 – Dec 2022",
    points: [
      "Led basketball division, building a structured training system.",
      "Organized and supervised training sessions and events.",
      "Improved team communication and division organization.",
    ],
  },
  {
    role: "Basketball Division Staff",
    organization: "Badan Internal Olahraga & Seni",
    period: "Jan 2021 – Dec 2021",
    points: [
      "Assisted in organizing and managing basketball division activities.",
      "Supported event preparation and coordination on-site.",
    ],
  },
];

export default function Organizational() {
  return (
    <section id="organizational">
      <Card className="p-6 mt-2">
        <SectionHeading
          title="Organizational Experience"
          icon={<UsersRound size={24} />}
        />

        <div className="relative">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10 pl-10">
            {organizations.map((organization) => (
              <div key={organization.role} className="relative">
                <div className="absolute -left-10 top-1.5 w-4 h-4 rounded-full bg-primary border-2 border-background" />

                <p className="text-text-secondary text-xs mb-1">
                  {organization.period}
                </p>
                <h3 className="text-white font-semibold">
                  {organization.role}
                </h3>
                <p className="text-primary text-sm mb-3">
                  {organization.organization}
                </p>

                <ul className="space-y-1">
                  {organization.points.map((point) => (
                    <li
                      key={point}
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
      </Card>
    </section>
  );
}
