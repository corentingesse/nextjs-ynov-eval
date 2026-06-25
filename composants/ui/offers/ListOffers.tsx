import { OfferDocument } from "@/prismicio-types";
import OfferCard from "./OfferCard";

export default async function ListOffers({ offers }: { offers: OfferDocument[] }) {
    return (
        <div className="w-full my-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
                <OfferCard key={offer.uid} offer={offer} />
            ))}
        </div>
    );
}
