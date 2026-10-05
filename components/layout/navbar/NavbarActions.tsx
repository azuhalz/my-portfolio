import { Button } from "@/components/ui/Button";
import { Download, Menu, X } from "lucide-react";

interface NavbarActionsProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

export function NavbarActions({
  isMenuOpen,
  onMenuToggle,
}: NavbarActionsProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Tombol Download CV — tersembunyi di layar kecil */}
      <div className="hidden lg:block">
        <Button
          href="/CV_AhmadZuhalZhafran.pdf"
          variant="outline"
          target="_blank"
          rel="noreferrer"
        >
          <span>Download CV</span>
          <Download className="h-5 w-5" />
        </Button>
      </div>

      {/* Ikon hamburger menu — hanya muncul di layar kecil (mobile & tablet) */}
      <button
        className="lg:hidden text-white p-2"
        onClick={onMenuToggle}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  );
}
