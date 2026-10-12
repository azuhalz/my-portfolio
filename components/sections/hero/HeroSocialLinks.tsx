import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { initialHeroData } from "@/lib/data/hero-data";
import type { HeroFormData } from "@/lib/data/hero-data";

const iconMap: Record<
  HeroFormData["socials"][number]["iconType"],
  React.ReactNode
> = {
  github: <FaGithub size={28} />,
  linkedin: <FaLinkedin size={28} />,
  email: <FaEnvelope size={28} />,
};

type HeroSocialLinksProps = {
  socials?: HeroFormData["socials"];
};

export function HeroSocialLinks({
  socials = initialHeroData.socials,
}: HeroSocialLinksProps) {
  return (
    <div className="flex gap-8 mt-6 justify-center md:justify-start">
      {socials.map((social) => (
        <Link
          key={social.name}
          href={social.url}
          target={social.iconType !== "email" ? "_blank" : undefined}
          rel={social.iconType !== "email" ? "noopener noreferrer" : undefined}
          aria-label={social.name}
          className="text-text-secondary hover:text-white transition-colors"
        >
          {iconMap[social.iconType]}
        </Link>
      ))}
    </div>
  );
}
