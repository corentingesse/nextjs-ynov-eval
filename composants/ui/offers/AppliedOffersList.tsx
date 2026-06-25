"use client";

import { useSavedOffersStore } from "@/store/savedOffersStore";
import OffersCardList from "./_OffersCardList";

export default function AppliedOffersList() {
    const appliedOffers = useSavedOffersStore((s) => s.appliedOffers);

    if (appliedOffers.length === 0) {
        return (
            <p className="mt-5 text-sm text-gray-500 italic">
                Aucune candidature envoyée pour le moment.
            </p>
        );
    }

    return <OffersCardList offers={appliedOffers} />;
}
