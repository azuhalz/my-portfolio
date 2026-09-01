import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section id="home" className="flex items-center py-20 px-6">
      <div className="mx-auto w-full grid grid-cols-2 gap-12">
        <div>
          <p className="text-primary text-2xl font-medium mb-2">Hi, I&apos;m</p>

          <h1 className="text-7xl font-bold text-white">
            Zhafran<span className="text-primary">.</span>
          </h1>

          <p className="text-primary mt-4 text-xl">Fullstack Developer</p>

          <div className="flex gap-4 mt-8">
            <Button href="/#projects" variant="primary">
              View My Work ↗
            </Button>
            <Button href="/#contact" variant="outline">
              Contact Me ↗
            </Button>
          </div>

          <div className="flex gap-10 mt-8">
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

        <div className="flex justify-center">
          <div className="relative w-96 h-96">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-120" />
            <Image
              src="/heroo.png"
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
