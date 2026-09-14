"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "../ui/Card";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { contactInfo, SocialLink } from "@/lib/contact-data";
import { ContactForm } from "@/components/contact/ContactForm";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Pesan terkirim! (dummy)");
  }

  const inputClass =
    "w-full bg-card border border-border rounded-lg px-4 py-3 text-white placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors";

  const renderSocialIcon = (type: SocialLink["iconType"]) => {
    switch (type) {
      case "email":
        return <FaEnvelope size={20} />;
      case "linkedin":
        return <FaLinkedin size={20} />;
      case "github":
        return <FaGithub size={20} />;
    }
  };

  return (
    <section id="contact">
      <Card className="p-6 mt-2">
        <SectionHeading title="Contact Me" icon={<FaEnvelope size={24} />} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-2">
          <div>
            <p className="text-text-secondary leading-relaxed mb-6">
              {contactInfo.description}
            </p>

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

          <ContactForm />
        </div>
      </Card>
    </section>
  );
}
