import Title from "@/composants/ui/Title";
import ListTags from "@/composants/ui/offers/ListTags";
import ListOffers from "@/composants/ui/offers/ListOffers";
import { getPagesByType, getPageSingleData } from "@/libs/PageData";
import { asImageSrc } from "@prismicio/client";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageSingleData("offers");
  return {
    title: pageData?.data.meta_title,
    description: pageData?.data.meta_description,
    openGraph: (() => {
      const img = pageData?.data.meta_image && asImageSrc(pageData.data.meta_image);
      return img ? { images: [{ url: img }] } : undefined;
    })(),
  };
}

export default async function Offers() {
  const pageData = await getPageSingleData("offers");
  const offers = await getPagesByType("offer", { fetchLinks: ["tag.title"] });
  const allTags = await getPagesByType("tag");
  const tags = allTags.map((t) => ({ uid: t.uid!, title: t.data.title || t.uid! }));

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-medium font-sans dark:bg-black">
      <main className="w-full bg-medium dark:bg-black">
        <div className="mx-10 md:mx-40 my-10 flex flex-col items-center justify-center gap-4 p-4 sm:items-start">
          <Title tag="h1" rightPart={
            <div className="text-blue-light flex items-center gap-2">
              <span className="material-symbols-outlined">
                work
              </span>
              <span className="text-sm font-bold">{offers.length} offres</span>
            </div>
            }>
            {pageData?.data.title}
          </Title>
          <div className="my-5">
            <ListTags tags={tags} />
          </div>

          <ListOffers offers={offers} />
        </div>
      </main>
    </div>
  );
}
