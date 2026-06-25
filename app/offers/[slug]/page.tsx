import { getPageDataByUid, getPagesByType } from "@/libs/PageData";
import TitleComponent from "@/composants/ui/Title";
import Link from "next/link";
import { SliceZone } from "@prismicio/react";
import ApplyForm from "@/composants/form/applyForm";
import { asImageSrc, isFilled } from "@prismicio/client";
import type * as prismic from "@prismicio/client";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import ListTags from "@/composants/ui/offers/ListTags";
import Title from "@/slices/Title";
import Paragraph from "@/slices/Paragraph";

type FilledTagRelationship = prismic.FilledContentRelationshipField<"tag", string, { title: prismic.KeyTextField }>;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offer = await getPageDataByUid('offer', slug);
  if (!offer) return { title: slug };

  return {
    title: offer.data.meta_title || offer.data.title || slug,
    description: offer.data.meta_description || `Découvrez l'offre ${slug}`,
    openGraph: (() => {
      const img = offer.data.meta_image && asImageSrc(offer.data.meta_image);
      return img ? { images: [{ url: img }] } : undefined;
    })(),
  };
}

export async function generateStaticParams() {
  const websites = await getPagesByType('offer');

  return websites.map((w) => ({
    slug: w.uid,
  }));
}

export default async function OfferPage({ params }: Props) {
  const { slug } = await params;
  const offer = await getPageDataByUid('offer', slug, { fetchLinks: ['tag.title'] });

  if (!offer) redirect("/offers");

  const dateOffer = offer.first_publication_date
    ? new Date(offer.first_publication_date).toLocaleDateString("fr-FR")
    : null;

  const tags = (offer.data.tags || [])
    .map((item) => {
      const tag = item.tag;
      if (!isFilled.contentRelationship(tag)) return null;
      const filled = tag as FilledTagRelationship;
      return { uid: filled.uid, title: filled.data?.title || filled.uid };
    })
    .filter(Boolean) as { uid: string; title: string }[];

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
              <TitleComponent tag="h1">
                {offer.data.title}
              </TitleComponent>
              {dateOffer && (
                  <div className="flex items-center gap-1.5 text-blue-500 text-sm mb-2">
                      <span className="material-symbols-outlined">calendar_today</span>
                      <span>{dateOffer}</span>
                  </div>
              )}
              {tags.length > 0 && (
                <ListTags tags={tags} />
              )}
              <div className="my-5">
                <SliceZone
                  slices={offer.data.slices}
                  components={{
                    title: Title,
                    paragraph: Paragraph
                  }}
                />
              </div>
              <div className="w-full mt-8">
                <ApplyForm />
              </div>
            </div>
          </main>
        </div>
  );
}
