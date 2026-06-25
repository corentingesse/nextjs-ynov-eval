"use client";

import applyFormAction from "@/actions/apply";
import { useSavedOffersStore } from "@/store/savedOffersStore";
import { useRef, useTransition } from "react";

export default function ContactForm({ offerUid }: { offerUid: string }) {
  const [isPending, startTransition] = useTransition();
  const addApplied = useSavedOffersStore((s) => s.addApplied);
  const appliedOfferIds = useSavedOffersStore((s) => s.appliedOfferIds);
  const formRef = useRef<HTMLFormElement>(null);
  const alreadyApplied = appliedOfferIds.includes(offerUid);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await applyFormAction(formData);
      addApplied(offerUid);
      formRef.current?.reset();
    });
  };

  if (alreadyApplied) {
    return (
      <div className="flex items-center gap-2 text-green-600 text-sm">
        <span className="material-symbols-outlined">check_circle</span>
        Vous avez déjà postulé à cette offre.
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="w-full items-end flex flex-col gap-4">
      <textarea
        className="w-full bg-white h-32 p-2 placeholder:text-blue-light border border-blue-light rounded"
        name="message"
        placeholder="Postuler à cette offre"
        required
      />
      <button
        type="submit"
        disabled={isPending}
        className="w-fit bg-blue-light text-white px-4 py-2 rounded hover:bg-blue-dark transition-colors mt-4 disabled:opacity-50"
      >
        {isPending ? "Envoi..." : "Envoyer"}
      </button>
    </form>
  );
}
