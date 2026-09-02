"use client"; // Butuh "use client" karena menggunakan useState (state form)

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Mail } from "lucide-react";
import { Card } from "../ui/Card";

export default function Contact() {
  // State untuk menyimpan isi form: name, email, dan message
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Fungsi yang dijalankan saat tombol "Send Message" diklik
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Mencegah halaman refresh saat form di-submit
    alert("Pesan terkirim! (dummy)"); // Untuk sekarang hanya tampilkan pesan alert
  }

  // Class CSS untuk semua input agar tampilannya konsisten
  const inputClass =
    "w-full bg-card border border-border rounded-lg px-4 py-3 text-white placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors";

  return (
    // id="contact" agar link /#contact dari Navbar bisa scroll ke sini
    <section id="contact">
      <Card className="p-6 mt-2">
        <SectionHeading title="Contact" icon={<Mail size={24} />} />

        {/* Grid 2 kolom: kiri deskripsi, kanan form */}
        <div className="grid grid-cols-2 gap-12 pt-2">
          {/* ================================ */}
          {/* KOLOM KIRI: Deskripsi & Sosial   */}
          {/* ================================ */}
          <div>
            <p className="text-text-secondary leading-relaxed mb-6">
              Have a project in mind or just want to say hi? Feel free to reach
              out! I&apos;m always open to new opportunities and collaborations.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="mailto:mfachmifusuzahalrahs@gmail.com"
                className="text-text-secondary hover:text-white transition-colors"
              >
                ✉️ mfachmifusuzahalrahs@gmail.com
              </a>
              <a
                href="https://github.com/azuhalzz"
                target="_blank"
                className="text-text-secondary hover:text-white transition-colors"
              >
                🐙 github.com/azuhalzz
              </a>
              <a
                href="https://linkedin.com/in/zuhalzz"
                target="_blank"
                className="text-text-secondary hover:text-white transition-colors"
              >
                💼 linkedin.com/in/zuhalzz
              </a>
            </div>
          </div>

          {/* ================================ */}
          {/* KOLOM KANAN: Form Kontak         */}
          {/* ================================ */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Input Nama */}
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />

            {/* Input Email */}
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />

            {/* Input Pesan (textarea karena multiline) */}
            <textarea
              placeholder="Your Message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={inputClass}
            />

            {/* Tombol Submit */}
            <Button type="submit" variant="primary" className="w-full">
              Send Message →
            </Button>
          </form>
        </div>
      </Card>
    </section>
  );
}
