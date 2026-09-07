import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CardAbout } from "../ui/CardAbout";
import { MapPin, Phone, UserRound } from "lucide-react";
import { FaEnvelope, FaGithub, FaLinkedin, FaBriefcase } from "react-icons/fa";

export default function AboutMe() {
  return (
    // id="about" agar link /#about dari Navbar bisa scroll ke sini
    <section id="about">
      <Card className="p-6">
        <SectionHeading title="About Me" icon={<UserRound size={24} />} />

        {/* Grid 2 kolom: kiri deskripsi, kanan info card */}
        <div className="grid grid-cols-12 gap-12 pt-2">
          <p className="text-justify text-text-secondary  col-span-5">
            I am a Computer Science graduate with hands-on experience in
            front-end and mobile development, including building web
            applications using modern technologies and developing iOS
            applications with SwiftUI. I am passionate about creating
            user-friendly and high-performance experiences.
          </p>

          {/* KOLOM KANAN: Grid Info Card      */}
          <div className="col-span-7 grid grid-cols-2 gap-2">
            <CardAbout
              icon={<MapPin size={24} />}
              title="Location"
              value="Malang, Indonesia"
            />

            <CardAbout
              icon={<Phone size={24} />}
              title="Phone"
              value="+62 853-3083-5455"
            />

            <CardAbout
              icon={<FaEnvelope size={24} />}
              title="Email"
              value="ahmadzuhalzhafran@gmail.com"
            />

            <CardAbout
              icon={<FaLinkedin size={24} />}
              title="LinkedIn"
              value="linkedin.com/in/azuhalz"
            />

            <CardAbout
              icon={<FaGithub size={24} />}
              title="GitHub"
              value="github.com/azuhalz"
            />

            <CardAbout
              icon={<FaBriefcase size={24} />}
              title="Available"
              value="Open to opportunities"
            />
          </div>
        </div>
      </Card>
    </section>
  );
}
