"use client";

import Image from "next/image";

export default function BannerImage({
  link
}: {
    link: string | null | undefined;
}) {
  if (!link) return null;
  return (
    <div className="relative h-64 md:h-96">
        <Image
          src={link}
          alt="Banner"
          fill
          className="object-cover"
        />
      </div>
    );
}