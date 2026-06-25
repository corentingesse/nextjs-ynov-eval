"use client";

import { OfferDocument } from "@/prismicio-types";
import { useSavedOffersStore } from "@/store/savedOffersStore";
import OffersGrid from "./_OffersGrid";
import { useEffect, useState } from "react";

export default function SavedOffersList({ allOffers }: { allOffers: OfferDocument[] }) {
    const savedOfferIds = useSavedOffersStore((s) => s.savedOfferIds);
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => setHydrated(true), []);

    if (!hydrated) return null;

    const savedOffers = allOffers.filter((o) => savedOfferIds.includes(o.uid));

    if (savedOffers.length === 0) {
        return (
            <p className="text-sm text-gray-500 italic">
                Aucune offre enregistrée pour le moment.
            </p>
        );
    }

    return (
        <div className="w-full my-5">
            <OffersGrid offers={savedOffers} />
        </div>
    );
}
