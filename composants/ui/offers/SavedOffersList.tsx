"use client";

import { useSavedOffersStore } from "@/store/savedOffersStore";
import OffersGrid from "./_OffersGrid";

export default function SavedOffersList() {
    const savedOffers = useSavedOffersStore((s) => s.savedOffers);
    const visibleOffers = savedOffers.filter((o) => o.data.available);

    if (visibleOffers.length === 0) {
        return (
            <p className="text-sm text-gray-500 italic">
                Aucune offre enregistrée pour le moment.
            </p>
        );
    }

    return <OffersGrid offers={visibleOffers} />;
}
