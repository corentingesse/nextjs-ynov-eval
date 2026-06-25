"use client";

import { OfferDocument } from "@/prismicio-types";
import { isFilled } from "@prismicio/client";
import type * as prismic from "@prismicio/client";
import Link from "next/link";
import { useSavedOffersStore } from "@/store/savedOffersStore";

type FilledTagRelationship = prismic.FilledContentRelationshipField<"tag", string, { title: prismic.KeyTextField }>;

export default function OfferCard({ offer }: { offer: OfferDocument }) {
    const toggleSave = useSavedOffersStore((s) => s.toggleSave);
    const savedOffers = useSavedOffersStore((s) => s.savedOffers);
    const saved = savedOffers.some((o) => o.uid === offer.uid);

    const date = offer.first_publication_date
        ? new Date(offer.first_publication_date).toLocaleDateString("fr-FR")
        : null;

    const tags = (offer.data.tags || [])
        .map((item) => {
            const tag = item.tag;
            if (!isFilled.contentRelationship(tag)) return null;
            const filled = tag as FilledTagRelationship;
            return { uid: filled.uid, title: filled.data?.title || filled.uid };
        })
        .filter(Boolean) as { uid: string; title: string }[];

    return (
        <div className="relative bg-white border border-gray-200 p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <Link
                    href={`/offers/${offer.uid}`}
                    aria-label={`Voir l'offre ${offer.data.title}`}
                    >
                    <h3 className="text-base font-bold text-gray-900 hover:underline">{offer.data.title}</h3>
                </Link>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleSave(offer);
                    }}
                    className="relative z-20 text-blue-500 hover:text-blue-700 transition-colors"
                    aria-label={saved ? "Retirer des enregistrements" : "Enregistrer l'offre"}
                >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: saved ? "'FILL' 1" : "'FILL' 0" }}>
                        bookmark
                    </span>
                </button>
            </div>

            {date && (
                <div className="flex items-center gap-1.5 text-blue-500 text-sm mb-2">
                    <span className="material-symbols-outlined">calendar_today</span>
                    <span>{date}</span>
                </div>
            )}

            {tags.length > 0 && (
                <div className="relative z-20 flex items-center gap-1.5 text-blue-500 text-sm mb-2">
                    <span className="material-symbols-outlined">code</span>
                    {tags.map((tag) => (
                        <Link key={tag.uid} href={`/tag/${tag.uid}`} className="hover:underline">
                            {tag.title}
                        </Link>
                    ))}
                </div>
            )}

            <p className="text-sm leading-relaxed mt-3">{offer.data.short_description}</p>
        </div>
    );
}
