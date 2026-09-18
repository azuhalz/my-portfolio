import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/cms/LoginForm";

export function LoginCard() {
  return (
    <div className="rounded-2xl border border-primary/65 bg-background/80 px-6 py-9 shadow-[0_0_35px_rgba(139,92,246,0.2),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur md:px-11 md:py-10">
      <div className="mx-auto flex size-25 items-center justify-center rounded-full border border-primary text-4xl font-bold shadow-[0_0_30px_rgba(139,92,246,0.35)]">
        AZZ<span className="text-primary">.</span>
      </div>
      <header className="mt-5 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
        <p className="mt-2 text-text-secondary/50">
          Sign in to manage your portfolio website
        </p>
      </header>
      <LoginForm />
      <div className="my-5 flex items-center gap-3 text-sm text-text-secondary/35">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>
      <Link
        href="/"
        className="flex h-12 items-center justify-center gap-2 rounded-lg border border-border text-primary transition hover:border-primary/50 hover:bg-primary/10"
      >
        <ArrowLeft size={19} />
        Back to Portfolio
      </Link>
    </div>
  );
}
