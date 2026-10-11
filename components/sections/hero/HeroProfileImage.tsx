import Image from "next/image";

export function HeroProfileImage() {
  return (
    <div className="flex justify-center md:justify-end">
      <div className="relative w-56 h-56 md:w-96 md:h-96">
        <Image
          src="/profile4.png"
          alt="Zhafran Profile"
          fill
          className="object-cover relative z-10"
        />
      </div>
    </div>
  );
}
