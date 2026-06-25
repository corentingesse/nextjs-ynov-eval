"use client";

import { OfferDocument } from "@/prismicio-types";
import { useSavedOffersStore } from "@/store/savedOffersStore";
import OffersGrid from "./_OffersGrid";

export default function SavedOffersList({ allOffers }: { allOffers: OfferDocument[] }) {
    const hasHydrated = useSavedOffersStore((s) => s._hasHydrated);
    const savedOfferIds = useSavedOffersStore((s) => s.savedOfferIds);

    if (!hasHydrated) return null;

    const savedOffers = allOffers.filter((o) => savedOfferIds.includes(o.uid));

    if (savedOffers.length === 0) {
        return (
            <p className="text-sm text-gray-500 italic">
                Aucune offre enregistrée pour le moment.
            </p>
        );
    }

    return <OffersGrid offers={savedOffers} />;
}
