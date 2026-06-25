import { OfferDocument } from "@/prismicio-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SavedOffersState = {
  savedOffers: OfferDocument[];
  appliedOffers: OfferDocument[];
  toggleSave: (offer: OfferDocument) => void;
  addApplied: (offer: OfferDocument) => void;
};

export const useSavedOffersStore = create<SavedOffersState>()(
  persist(
    (set) => ({
      savedOffers: [],
      appliedOffers: [],
      toggleSave: (offer) =>
        set((state) => ({
          savedOffers: state.savedOffers.some((o) => o.uid === offer.uid)
            ? state.savedOffers.filter((o) => o.uid !== offer.uid)
            : [...state.savedOffers, offer],
        })),
      addApplied: (offer) =>
        set((state) => ({
          appliedOffers: state.appliedOffers.some((o) => o.uid === offer.uid)
            ? state.appliedOffers
            : [...state.appliedOffers, offer],
        })),
    }),
    {
      name: "saved-offers",
    },
  ),
);
