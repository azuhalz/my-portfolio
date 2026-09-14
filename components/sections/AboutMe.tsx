import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CardAbout } from "../ui/CardAbout";
import { MapPin, Phone, UserRound } from "lucide-react";
import { FaEnvelope, FaGithub, FaLinkedin, FaBriefcase } from "react-icons/fa";
import { aboutData } from "@/lib/about-data";

const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin size={24} />,
  Phone: <Phone size={24} />,
  Envelope: <FaEnvelope size={24} />,
  Linkedin: <FaLinkedin size={24} />,
  Github: <FaGithub size={24} />,
  Briefcase: <FaBriefcase size={24} />,
};

export default function AboutMe() {
  return (
    <section id="about">
      <Card className="p-6">
        <SectionHeading title="About Me" icon={<UserRound size={24} />} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-2">
          <p className="text-justify text-text-secondary col-span-1 md:col-span-5">
            {aboutData.description}
          </p>

          <div className="hidden md:grid md:col-span-7 md:grid-cols-2 gap-2">
            {aboutData.details.map((item) => (
              <CardAbout
                key={item.title}
                icon={iconMap[item.iconName]}
                title={item.title}
                value={item.value}
              />
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
