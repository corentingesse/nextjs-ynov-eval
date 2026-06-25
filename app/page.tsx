import BannerImage from "@/composants/ui/BannerImage";
import LatestOffers from "@/composants/ui/offers/LatestOffers";
import Title from "@/composants/ui/Title";
import { getPageSingleData, getPagesByType } from "@/libs/PageData";
import { asImageSrc } from "@prismicio/client";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageSingleData("home");
  return {
    title: pageData?.data.meta_title,
    description: pageData?.data.meta_description,
    openGraph: (() => {
      const img = pageData?.data.meta_image && asImageSrc(pageData.data.meta_image);
      return img ? { images: [{ url: img }] } : undefined;
    })(),
  };
}

export default async function Home() {
  const pageData = await getPageSingleData("home");
  const offers = await getPagesByType("offer");

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-medium font-sans dark:bg-black">
      <main className="w-full bg-medium dark:bg-black">
        <BannerImage link={asImageSrc(pageData?.data.image_heading)} />

        <div className="mx-10 md:mx-40 my-10 flex flex-col items-center justify-center gap-4 p-4 sm:items-start">
          <Title tag="h1">
            {pageData?.data.title}
          </Title>
          <LatestOffers offers={offers} />
        </div>
      </main>
    </div>
  );
}
