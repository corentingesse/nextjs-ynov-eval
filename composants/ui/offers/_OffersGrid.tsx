import { OfferDocument } from "@/prismicio-types";
import OfferCard from "./_OfferCard";

export default async function OffersGrid({ offers, limit }: { offers: OfferDocument[]; limit?: number }) {
    const displayedOffers = limit !== undefined ? offers.slice(0, limit) : offers;
    return (
        <div className="w-full my-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayedOffers.map((offer) => (
                <OfferCard key={offer.uid} offer={offer} />
            ))}
        </div>
    );
}
