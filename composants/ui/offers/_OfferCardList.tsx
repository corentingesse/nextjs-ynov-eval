"use client";

import { OfferDocument } from "@/prismicio-types";
import { isFilled } from "@prismicio/client";
import type * as prismic from "@prismicio/client";
import Link from "next/link";

type FilledTagRelationship = prismic.FilledContentRelationshipField<"tag", string, { title: prismic.KeyTextField }>;

export default function OfferCardList({ offer }: { offer: OfferDocument }) {
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
        <div className="relative py-4 border-b border-black last:border-b-0">
            <Link
                href={`/offers/${offer.uid}`}
                className="absolute inset-0 z-10"
                aria-label={`Voir l'offre ${offer.data.title}`}
            />

            {date && (
                <div className="flex items-center gap-1.5 text-blue-500 text-sm mb-2">
                    <span className="material-symbols-outlined text-base">calendar_today</span>
                    <span>{date}</span>
                </div>
            )}

            <h3 className="text-base font-bold text-gray-900 mb-1">{offer.data.title}</h3>

            {tags.length > 0 && (
                <div className="relative z-20 flex items-center gap-1.5 text-gray-900 text-sm mb-2">
                    <span className="material-symbols-outlined text-base">code</span>
                    {tags.map((tag, i) => (
                        <span key={tag.uid}>
                            <Link href={`/tag/${tag.uid}`} className="hover:underline">
                                {tag.title}
                            </Link>
                            {i < tags.length - 1 && <span className="ml-1">,</span>}
                        </span>
                    ))}
                </div>
            )}

            {offer.data.short_description && (
                <p className="text-sm text-blue-500 leading-relaxed">{offer.data.short_description}</p>
            )}
        </div>
    );
}
