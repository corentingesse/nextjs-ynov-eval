import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedOffersStore {
  _hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  savedOfferIds: string[];
  appliedOfferIds: string[];
  toggleSave: (uid: string) => void;
  addApplied: (uid: string) => void;
}

export const useSavedOffersStore = create<SavedOffersStore>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      setHasHydrated: (value) => set({ _hasHydrated: value }),
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
    {
      name: "saved-offers",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
