import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { contactInfo, SocialLink } from "@/lib/data/contact-data";

// Fungsi untuk memilih ikon sesuai tipe social media
function renderSocialIcon(type: SocialLink["iconType"]) {
  switch (type) {
    case "email":
      return <FaEnvelope size={20} />;
    case "linkedin":
      return <FaLinkedin size={20} />;
    case "github":
      return <FaGithub size={20} />;
  }
}

// Komponen yang menampilkan deskripsi kontak dan daftar link social media
export function ContactInfo() {
  return (
    <div>
      {/* Deskripsi singkat */}
      <p className="text-text-secondary leading-relaxed mb-6">
        {contactInfo.description}
      </p>

      {/* Daftar link social media */}
      <div className="flex flex-col gap-3">
        {contactInfo.socials.map((social) => (
          <Link
            key={social.name}
            href={social.href}
            target={social.iconType !== "email" ? "_blank" : undefined}
            className="text-text-secondary hover:text-primary transition-colors"
          >
            <div className="flex gap-2 items-center">
              {renderSocialIcon(social.iconType)}
              {social.displayValue}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
