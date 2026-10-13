"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import type { HeroFormData } from "@/lib/data/hero-data";

type HeroSocialLinksFormProps = {
  socials: HeroFormData["socials"];
  onChange: (index: number, newUrl: string) => void;
};

const SOCIAL_ICONS: Record<
  HeroFormData["socials"][number]["iconType"],
  React.ReactNode
> = {
  github: <FaGithub size={20} className="text-text-primary" />,
  linkedin: <FaLinkedin size={20} className="text-text-primary" />,
  email: <FaEnvelope size={20} className="text-text-primary" />,
};

export function HeroSocialLinksForm({
  socials,
  onChange,
}: HeroSocialLinksFormProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-text-secondary">
        Social Links
      </label>

      <div className="flex flex-col gap-2.5">
        {socials.map((social, index) => (
          <div key={social.name} className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center text-text-primary"
              aria-label={social.name}
            >
              {SOCIAL_ICONS[social.iconType]}
            </div>

            <div className="relative flex-1">
              <input
                type="text"
                value={social.url}
                onChange={(e) => onChange(index, e.target.value)}
                placeholder={`URL untuk ${social.name}`}
                aria-label={`URL untuk ${social.name}`}
                className="w-full rounded-lg border border-border bg-card py-2 pl-3.5 pr-10 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors"
              />

              {social.url ? (
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Buka ${social.name}`}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              ) : (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary/40">
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
