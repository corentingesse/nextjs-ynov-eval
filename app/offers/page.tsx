import TitleComponent from "@/composants/ui/Title";
import ListTags from "@/composants/ui/offers/ListTags";
import { SliceZone } from "@prismicio/react";
import ListOffers from "@/composants/ui/offers/ListOffers";
import { getPagedByType, getPagesByType, getPageSingleData } from "@/libs/PageData";
import { asImageSrc } from "@prismicio/client";
import type { Metadata } from "next";
import Title from "@/slices/Title";
import Paragraph from "@/slices/Paragraph";

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

export default async function Offers({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10));

  const [pageData, { results: offers, total_pages, total_results_size }, allTags] = await Promise.all([
    getPageSingleData("offers"),
    getPagedByType("offer", { fetchLinks: ["tag.title"], pageSize: 6, page }),
    getPagesByType("tag"),
  ]);

  const tags = allTags.map((t) => ({ uid: t.uid!, title: t.data.title || t.uid! }));

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-medium font-sans dark:bg-black">
      <main className="w-full bg-medium dark:bg-black">
        <div className="mx-10 md:mx-40 my-10 flex flex-col items-center justify-center gap-4 p-4 sm:items-start">
          <TitleComponent tag="h1" rightPart={
            <div className="text-blue-light flex items-center gap-2">
              <span className="material-symbols-outlined">work</span>
              <span className="text-sm font-bold">{total_results_size} offres</span>
            </div>
          }>
            {pageData?.data.title}
          </TitleComponent>

          <div className="my-5">
            <ListTags tags={tags} />
          </div>

          <ListOffers offers={offers} />

          {total_pages > 1 && (
            <div className="flex items-center gap-4 mt-4">
              {page > 1 && (
                <a href={`/offers?page=${page - 1}`} className="text-blue-light hover:underline text-sm">
                  ← Précédent
                </a>
              )}
              <span className="text-sm text-gray-500">{page} / {total_pages}</span>
              {page < total_pages && (
                <a href={`/offers?page=${page + 1}`} className="text-blue-light hover:underline text-sm">
                  Suivant →
                </a>
              )}
            </div>
          )}

          <div className="my-8">
            <SliceZone
              slices={pageData?.data.slices}
              components={{ title: Title, paragraph: Paragraph }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
