"use client";

import applyFormAction from "@/actions/apply";
import { OfferDocument } from "@/prismicio-types";
import { useSavedOffersStore } from "@/store/savedOffersStore";

export default function ApplyForm({ offer }: { offer: OfferDocument }) {
  const addApplied = useSavedOffersStore((s) => s.addApplied);
  const appliedOffers = useSavedOffersStore((s) => s.appliedOffers);
  const alreadyApplied = appliedOffers.some((o) => o.uid === offer.uid);

  const adminEmails = (offer.data.emails ?? [])
    .map((item) => item.email)
    .filter(Boolean) as string[];

  if (alreadyApplied) {
    return (
      <div className="flex items-center gap-2 text-green-600 text-sm">
        <span className="material-symbols-outlined">check_circle</span>
        Vous avez déjà postulé à cette offre.
      </div>
    );
  }

  if (adminEmails.length === 0) {
    return (
      <p className="text-sm text-gray-400 italic">
        Cette offre ne dispose pas encore d&apos;adresse de contact.
      </p>
    );
  }

  return (
    <form
      action={async (formData) => {
        await applyFormAction(formData);
        addApplied(offer);
      }}
      className="w-full items-end flex flex-col gap-4"
    >
      <input type="hidden" name="offerTitle" value={offer.data.title ?? ""} />
      {adminEmails.map((email) => (
        <input key={email} type="hidden" name="adminEmail" value={email} />
      ))}
      <textarea
        className="w-full bg-white h-32 p-2 placeholder:text-blue-light border border-blue-light rounded"
        name="message"
        placeholder="Postuler à cette offre"
        required
      />
      <button
        type="submit"
        className="w-fit bg-blue-light text-white px-4 py-2 rounded hover:bg-blue-dark transition-colors mt-4"
      >
        Envoyer
      </button>
    </form>
  );
}
