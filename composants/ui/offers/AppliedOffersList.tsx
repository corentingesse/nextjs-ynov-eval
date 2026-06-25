"use client";

import { OfferDocument } from "@/prismicio-types";
import { useSavedOffersStore } from "@/store/savedOffersStore";
import OffersCardList from "./_OffersCardList";

export default function AppliedOffersList({ allOffers }: { allOffers: OfferDocument[] }) {
    const hasHydrated = useSavedOffersStore((s) => s._hasHydrated);
    const appliedOfferIds = useSavedOffersStore((s) => s.appliedOfferIds);

    if (!hasHydrated) return null;

    const appliedOffers = allOffers.filter((o) => appliedOfferIds.includes(o.uid));

    if (appliedOffers.length === 0) {
        return (
            <p className="mt-5 text-sm text-gray-500 italic">
                Aucune candidature envoyée pour le moment.
            </p>
        );
    }

    return <OffersCardList offers={appliedOffers} />;
}
