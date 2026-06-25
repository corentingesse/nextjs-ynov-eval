"use client";

import { OfferDocument } from "@/prismicio-types";
import { useSavedOffersStore } from "@/store/savedOffersStore";
import OffersGrid from "./_OffersGrid";
import { useEffect, useState } from "react";

export default function AppliedOffersList({ allOffers }: { allOffers: OfferDocument[] }) {
    const appliedOfferIds = useSavedOffersStore((s) => s.appliedOfferIds);
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => setHydrated(true), []);

    if (!hydrated) return null;

    const appliedOffers = allOffers.filter((o) => appliedOfferIds.includes(o.uid));

    if (appliedOffers.length === 0) {
        return (
            <p className="text-sm text-gray-500 italic">
                Aucune candidature envoyée pour le moment.
            </p>
        );
    }

    return (
        <div className="w-full my-5">
            <OffersGrid offers={appliedOffers} />
        </div>
    );
}
