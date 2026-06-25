import { OfferDocument } from "@/prismicio-types";
import OfferCardList from "./_OfferCardList";

export default function OffersCardList({ offers }: { offers: OfferDocument[] }) {
    return (
        <div className="w-full mt-4">
            {offers.map((offer) => (
                <OfferCardList key={offer.uid} offer={offer} />
            ))}
        </div>
    );
}
