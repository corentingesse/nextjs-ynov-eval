"use client";

import Link from "next/link";

export default function OfferCard() {
    return (
        <Link href="/offers/1" className="block">
            <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-bold mb-2">Offer Title</h3>
                <span className="text-gray-500 text-sm mb-2">Date</span>
                <Link href="/offers/1" className="text-blue-500 hover:underline">
                    View Details
                </Link>
                <p className="text-gray-600">Offer description goes here.</p>
            </div>
        </Link>
    );
}