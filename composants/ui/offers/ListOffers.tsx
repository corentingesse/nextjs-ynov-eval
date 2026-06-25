import { OfferDocument } from "@/prismicio-types";
import OffersGrid from "./_OffersGrid";

export default async function ListOffers({ offers }: { offers: OfferDocument[] }) {
    return (
        <div className="w-full my-5">
            <OffersGrid offers={offers} />
        </div>
    );
}