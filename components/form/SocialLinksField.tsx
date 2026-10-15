import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import type { SocialIconType, SocialLinkInput } from "@/lib/data/contact-data";

type SocialLinksFieldProps = {
  socials: SocialLinkInput[];
  onChange: (index: number, newUrl: string) => void;
  variant?: "plain" | "boxed";
};

const SOCIAL_ICONS: Record<SocialIconType, ReactNode> = {
  github: <FaGithub size={20} />,
  linkedin: <FaLinkedin size={20} />,
  email: <FaEnvelope size={20} />,
};

const VARIANT_STYLES = {
  // Ikon polos di kiri, ikon buka link di dalam input (dipakai Hero)
  plain: {
    icon: "flex h-9 w-9 shrink-0 items-center justify-center text-text-primary",
    input: "py-2 pl-3.5 pr-10",
    link: "absolute right-3 top-1/2 -translate-y-1/2",
  },
  // Ikon dalam kotak di kiri, tombol buka link menempel di kanan input (dipakai Contact)
  boxed: {
    icon: "flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-text-primary",
    input: "py-2.5 pl-3.5 pr-14",
    link: "absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg border-l border-border",
  },
};

export function SocialLinksField({
  socials,
  onChange,
  variant = "plain",
}: SocialLinksFieldProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-text-secondary">
        Social Links
      </span>

      <div className="flex flex-col gap-2.5">
        {socials.map((social, index) => (
          <div key={social.name} className="flex items-center gap-3">
            <div className={styles.icon} aria-label={social.name}>
              {SOCIAL_ICONS[social.iconType]}
            </div>

            <div className="relative flex-1">
              <input
                type="text"
                value={social.url}
                onChange={(e) => onChange(index, e.target.value)}
                placeholder={`URL untuk ${social.name}`}
                aria-label={`URL untuk ${social.name}`}
                className={`w-full rounded-lg border border-border bg-card text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors ${styles.input}`}
              />

              {social.url ? (
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Buka ${social.name}`}
                  className={`${styles.link} text-text-secondary transition-colors hover:text-text-primary`}
                >
                  <ExternalLink size={16} />
                </a>
              ) : (
                <span className={`${styles.link} text-text-secondary/40`}>
                  <ExternalLink size={16} />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
