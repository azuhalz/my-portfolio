"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Pesan terkirim! (dummy)");
  }

  const inputClass =
    "w-full bg-card border border-border rounded-lg px-4 py-3 text-white placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
      />

      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />

      <textarea
        placeholder="Your Message"
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={inputClass}
      />

      <Button type="submit" variant="primary" className="w-full">
        Send Message →
      </Button>
    </form>
  );
}
