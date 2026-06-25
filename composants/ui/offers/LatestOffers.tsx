import { OfferDocument } from "@/prismicio-types";
import OffersGrid from "./_OffersGrid";
import Link from "next/link";

export default async function LatestOffers({ offers }: { offers: OfferDocument[] }) {
    return (
        <div className="w-full my-5">
            <OffersGrid offers={offers} limit={6} />
            <div className="flex justify-center mt-5">
                <Link href="/offers" className="bg-blue-light text-white px-4 py-2 hover:bg-blue-dark transition-colors">
                    Voir toutes les offres
                </Link>
            </div>
        </div>
    );
}