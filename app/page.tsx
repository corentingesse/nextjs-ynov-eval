import BannerImage from "@/composants/ui/BannerImage";
import { getPageSingleData } from "@/libs/PageData";
import { asImageSrc } from "@prismicio/client";
import type { Metadata } from "next";

const pageData = await getPageSingleData("home");
console.log(pageData);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageData?.data.meta_title,
    description: pageData?.data.meta_description,
    openGraph: (() => {
      const img = pageData?.data.meta_image && asImageSrc(pageData.data.meta_image);
      return img ? { images: [{ url: img }] } : undefined;
    })(),
  };
}

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <BannerImage link={asImageSrc(pageData?.data.image_heading)} />
      </main>
    </div>
  );
}
