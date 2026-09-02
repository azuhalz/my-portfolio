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

        <div className="relative pt-2">
          <div className="absolute left-5 top-4 bottom-27 w-px bg-border" />

          <div className="space-y-3 pl-10">
            {organizations.map((organization) => (
              <div key={organization.role} className="relative">
                <div className="absolute -left-7 top-1.5 w-4 h-4 rounded-full bg-primary border-2 border-background" />

                <div className="flex justify-between">
                  <h2 className="text-white font-semibold">
                    {organization.role}
                  </h2>
                  <p className="text-text-secondary text-sm">
                    {organization.period}
                  </p>
                </div>
                <p className="text-primary mb-1">{organization.organization}</p>

                <ul className="list-disc space-y-1 pl-4">
                  {organization.points.map((point) => (
                    <li key={point} className="text-text-secondary text-md">
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
