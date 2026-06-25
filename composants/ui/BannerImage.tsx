"use client";

import Image from "next/image";

export default function BannerImage({
  link
}: {
    link: string | null | undefined;
}) {
  if (!link) return null;
  return (
    <div className="relative w-full">
        <Image
          src={link}
          alt="Banner"
          width={1920}
          height={1080}
          className="object-cover w-full h-44 md:h-84"
          loading="eager"
        />
      </div>
    );
}