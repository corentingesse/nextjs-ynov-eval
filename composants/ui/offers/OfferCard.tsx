"use client";

import { OfferDocument } from "@/prismicio-types";
import Link from "next/link";

export default function OfferCard({ offer }: { offer: OfferDocument }) {
    const date = offer.first_publication_date
        ? new Date(offer.first_publication_date).toLocaleDateString("fr-FR")
        : null;

    return (
        <Link href={`/offers/${offer.uid}`} className="block">
            <div className="bg-white border border-gray-200 p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base font-bold text-gray-900">{offer.data.title}</h3>
                    <span className="material-symbols-outlined">
                        bookmark
                    </span>
                </div>

                {date && (
                    <div className="flex items-center gap-1.5 text-blue-500 text-sm mb-2">
                        <span className="material-symbols-outlined">
                            calendar_today
                        </span>
                        <span>{date}</span>
                    </div>
                )}

                {offer.tags && (
                    <div className="flex items-center gap-1.5 text-blue-500 text-sm mb-2">
                        <span className="material-symbols-outlined">
                            code
                        </span>
                        <span>{offer.tags.join(", ")}</span>
                    </div>
                )}

                <p className="text-sm leading-relaxed mt-3">{offer.data.short_description}</p>
            </div>
        </Link>
    );
}
