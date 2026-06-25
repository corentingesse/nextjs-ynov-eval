import BannerImage from "@/composants/ui/BannerImage";
import Title from "@/composants/ui/Title";
import { getPageSingleData } from "@/libs/PageData";
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
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-medium font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-between bg-medium dark:bg-black sm:items-start">
        <BannerImage link={asImageSrc(pageData?.data.image_heading)} />
        <Title tag="h1">
          {pageData?.data.title}
        </Title>
      </main>
    </div>
  );
}
