import { getPageDataByUid, getPagesByType } from "@/libs/PageData";
import Link from "next/link";
import { SliceZone } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import { redirect } from "next/navigation";
import TitleComponent from "@/composants/ui/Title";
import ListOffers from "@/composants/ui/offers/ListOffers";
import type { Metadata } from "next";
import Title from "@/slices/Title";
import Paragraph from "@/slices/Paragraph";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const tags = await getPagesByType('tag');
  return tags.map((t) => ({ slug: t.uid }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getPageDataByUid('tag', slug);
  if (!tag) return { title: slug };
  return {
    title: tag.data.title || slug,
    description: tag.data.meta_description || undefined,
  };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const tag = await getPageDataByUid('tag', slug);
  if (!tag) redirect('/offers');

  const allOffers = await getPagesByType('offer', { fetchLinks: ['tag.title'] });
  const offers = allOffers.filter((offer) =>
    offer.data.tags?.some((item) => {
      const t = item.tag;
      return isFilled.contentRelationship(t) && t.uid === slug;
    })
  );

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-medium font-sans dark:bg-black">
      <main className="w-full bg-medium dark:bg-black">
        <div className="mx-10 md:mx-40 my-10 flex flex-col items-center justify-center gap-4 p-4 sm:items-start">
          <div className="mb-8">
            <Link href="/offers" className="bg-blue-light flex items-center text-white px-4 py-2 hover:bg-blue-dark transition-colors">
              <span className="material-symbols-outlined mr-2">
                arrow_back
              </span>
              Voir toutes les offres
            </Link>
          </div>
          <TitleComponent tag="h1" rightPart={
            <div className="text-blue-light flex items-center gap-2">
              <span className="material-symbols-outlined">work</span>
              <span className="text-sm font-bold">{offers.length} offre{offers.length !== 1 ? 's' : ''}</span>
            </div>
          }>
            {tag.data.title}
          </TitleComponent>
          <ListOffers offers={offers} />
          <div className="my-8">
            <SliceZone
                slices={tag?.data.slices}
                components={{
                title: Title,
                paragraph: Paragraph
            }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
