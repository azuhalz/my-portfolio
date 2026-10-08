import Link from "next/link";

export function NavbarLogo() {
  return (
    <Link
      href="/"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex items-center text-3xl font-bold border border-primary rounded-4xl py-1.5 px-5"
    >
      AZZ<span className="text-primary">.</span>
    </Link>
  );
}
