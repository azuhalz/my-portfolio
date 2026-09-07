import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section id="home" className="flex items-center pt-10 pb-8">
      {/* Di mobile: 1 kolom tumpuk (flex-col), di desktop: 2 kolom sejajar (md:grid md:grid-cols-2) */}
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
            <Link
              href="https://github.com/azuhalz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-text-secondary hover:text-white transition-colors"
            >
              <FaGithub size={28} />
            </Link>
            <Link
              href="https://linkedin.com/in/azuhalz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-secondary hover:text-white transition-colors"
            >
              <FaLinkedin size={28} />
            </Link>
            <Link
              href="mailto:ahmadzuhalzhafran@gmail.com"
              aria-label="Kirim email"
              className="text-text-secondary hover:text-white transition-colors"
            >
              <FaEnvelope size={28} />
            </Link>
          </div>
        </div>

        {/* KOLOM KANAN: Foto Profil */}
        <div className="flex justify-center">
          {/* Di mobile foto lebih kecil, di desktop lebih besar */}
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
