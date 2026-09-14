import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/cms/LoginForm";

export function LoginCard() {
  return (
    <div className="rounded-2xl border border-violet-400/65 bg-[#080b1b]/80 px-6 py-9 shadow-[0_0_35px_rgba(139,92,246,0.2),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur md:px-11 md:py-10">
      <div className="mx-auto flex size-21.5 items-center justify-center rounded-full border border-violet-500 bg-violet-950/30 text-5xl font-bold shadow-[0_0_30px_rgba(139,92,246,0.35)]">
        AZZ<span className="text-primary">.</span>
      </div>
      <header className="mt-5 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
        <p className="mt-2 text-white/50">
          Sign in to manage your portfolio website
        </p>
      </header>
      <LoginForm />
      <div className="my-5 flex items-center gap-3 text-sm text-white/35">
        <span className="h-px flex-1 bg-white/10" />
        or
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <Link
        href="/"
        className="flex h-12 items-center justify-center gap-2 rounded-lg border border-white/10 text-violet-300 transition hover:border-violet-400/50 hover:bg-violet-500/10"
      >
        <ArrowLeft size={19} />
        Back to Portfolio
      </Link>
    </div>
  );
}
