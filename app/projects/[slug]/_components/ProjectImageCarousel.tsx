"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useImageCarousel } from "@/hooks/useImageCarousel";

type ProjectImageCarouselProps = {
  images: string[];
  title: string;
};

export function ProjectImageCarousel({
  images,
  title,
}: ProjectImageCarouselProps) {
  const { currentIndex, isFirst, isLast, next, previous, goTo, getPositionClassName } =
    useImageCarousel(images.length);

  return (
    <Card className="p-2 mb-10 bg-card/30">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-gray-900">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${getPositionClassName(
              index,
            )}`}
          >
            <Image
              src={image}
              alt={`${title} - Image ${index + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        ))}

        {/* Tombol Navigasi Kiri */}
        {images.length > 1 && (
          <button
            onClick={previous}
            disabled={isFirst}
            className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors z-20 ${
              isFirst
                ? "bg-black/20 text-white/30 cursor-not-allowed"
                : "bg-black/50 hover:bg-black/70 text-white cursor-pointer"
            }`}
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Tombol Navigasi Kanan */}
        {images.length > 1 && (
          <button
            onClick={next}
            disabled={isLast}
            className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors z-20 ${
              isLast
                ? "bg-black/20 text-white/30 cursor-not-allowed"
                : "bg-black/50 hover:bg-black/70 text-white cursor-pointer"
            }`}
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
