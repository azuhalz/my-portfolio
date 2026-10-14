import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

type PaginationButtonProps = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
  ariaLabel?: string;
};

function PaginationButton({
  children,
  onClick,
  disabled = false,
  isActive = false,
  ariaLabel,
}: PaginationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={isActive ? "page" : undefined}
      className={`flex size-9 items-center justify-center rounded-lg border text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        isActive
          ? "border-primary/60 bg-primary/20 text-text-primary"
          : "cursor-pointer border-border text-text-secondary hover:border-primary/40 hover:text-text-primary"
      }`}
    >
      {children}
    </button>
  );
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2"
    >
      <PaginationButton
        ariaLabel="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={16} />
      </PaginationButton>

      {pages.map((page) => (
        <PaginationButton
          key={page}
          isActive={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PaginationButton>
      ))}

      <PaginationButton
        ariaLabel="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight size={16} />
      </PaginationButton>
    </nav>
  );
}
