import TitleComponent from "@/composants/ui/Title";
import { SliceZone } from "@prismicio/react";
import SavedOffersList from "@/composants/ui/offers/SavedOffersList";
import AppliedOffersList from "@/composants/ui/offers/AppliedOffersList";
import { getPageSingleData } from "@/libs/PageData";
import { asImageSrc } from "@prismicio/client";
import type { Metadata } from "next";
import Title from "@/slices/Title";
import Paragraph from "@/slices/Paragraph";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageSingleData("profil");
  return {
    title: pageData?.data.meta_title,
    description: pageData?.data.meta_description,
    openGraph: (() => {
      const img = pageData?.data.meta_image && asImageSrc(pageData.data.meta_image);
      return img ? { images: [{ url: img }] } : undefined;
    })(),
  };
}

export default async function Profil() {
  const pageData = await getPageSingleData("profil");
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-medium font-sans dark:bg-black">
      <main className="w-full bg-medium dark:bg-black">
        <div className="mx-10 md:mx-40 my-10 flex flex-col items-center justify-center gap-4 p-4 sm:items-start">
          <TitleComponent tag="h1">
            {pageData?.data.title}
          </TitleComponent>

          <div className="w-full my-5">
            <h2 className="text-blue-light text-2xl font-semibold">Offres enregistrées</h2>
            <SavedOffersList />
          </div>

          <div className="w-full my-5">
            <h2 className="text-blue-light text-2xl font-semibold">Historique des candidatures</h2>
            <AppliedOffersList />
          </div>

          <div className="my-8">
            <SliceZone
              slices={pageData?.data.slices}
              components={{
                title: Title,
                paragraph: Paragraph,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
