"use client";

import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { contactInfo, SocialLink } from "@/lib/data/contact-data";
import { useInView } from "@/hooks/useInView";

const iconMap: Record<SocialLink["iconType"], React.ReactNode> = {
  github: <FaGithub size={28} />,
  linkedin: <FaLinkedin size={28} />,
  email: <FaEnvelope size={28} />,
};

export default function Hero() {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="home"
      ref={ref}
      className={`flex items-center pt-10 pb-8 transition-all duration-5000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16"
      }`}
    >
      <div className="mx-auto w-full flex flex-col-reverse gap-10 md:grid md:grid-cols-2 md:gap-12">
        {/* KOLOM KIRI: Teks */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <p className="text-primary text-xl font-medium mb-2">Hi, I&apos;m</p>

          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Zhafran<span className="text-primary">.</span>
          </h1>

          <p className="text-primary text-xl md:text-2xl mt-2">
            Fullstack Developer
          </p>

          <div className="flex gap-4 mt-4 justify-center md:justify-start">
            <Button href="/projects" variant="primary">
              View My Work ↗
            </Button>
            <Button href="/#contact" variant="outline">
              Contact Me ↗
            </Button>
          </div>

          <div className="flex gap-8 mt-6 justify-center md:justify-start">
            {contactInfo.socials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target={social.iconType !== "email" ? "_blank" : undefined}
                rel={
                  social.iconType !== "email"
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={social.name}
                className="text-text-secondary hover:text-white transition-colors"
              >
                {iconMap[social.iconType]}
              </Link>
            ))}
          </div>
        </div>

        {/* KOLOM KANAN: Foto Profil */}
        <div className="flex justify-center">
          <div className="relative w-56 h-56 md:w-96 md:h-96">
            <Image
              src="/profile4.png"
              alt="Zhafran Profile"
              fill
              className="object-cover relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
