import Image from "next/image";
import { initialHeroData } from "@/lib/data/hero-data";

type HeroProfileImageProps = {
  imageUrl?: string;
  imageName?: string;
};

export function HeroProfileImage({
  imageUrl = initialHeroData.profileImageUrl,
  imageName = initialHeroData.profileImageName,
}: HeroProfileImageProps) {
  return (
    <div className="flex justify-center md:justify-end">
      <div className="relative w-56 h-56 md:w-96 md:h-96">
        <Image
          src={imageUrl || initialHeroData.profileImageUrl}
          alt={imageName || "Profile Image"}
          fill
          className="object-cover relative z-10"
        />
      </div>
    </div>
  );
}

