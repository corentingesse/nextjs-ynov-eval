import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedOffersStore {
  savedOfferIds: string[];
  appliedOfferIds: string[];
  toggleSave: (uid: string) => void;
  addApplied: (uid: string) => void;
}

export const useSavedOffersStore = create<SavedOffersStore>()(
  persist(
    (set, get) => ({
      savedOfferIds: [],
      appliedOfferIds: [],
      toggleSave: (uid) => {
        const ids = get().savedOfferIds;
        set({
          savedOfferIds: ids.includes(uid)
            ? ids.filter((id) => id !== uid)
            : [...ids, uid],
        });
      },
      addApplied: (uid) => {
        const ids = get().appliedOfferIds;
        if (!ids.includes(uid)) {
          set({ appliedOfferIds: [...ids, uid] });
        }
      },
    }),
    { name: "saved-offers" }
  )
);
