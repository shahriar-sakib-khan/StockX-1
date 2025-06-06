import { create } from "zustand";
import { persist } from "zustand/middleware";
import { allBrands } from "../assets/Lists/new_brands_list.jsx";

export const useBrandStore = create(
  persist(
    (set, get) => ({
      allBrands: allBrands,                     // static brands list
      selectedBrands: [],           // confirmed selection
      draftSelectedBrands: [],      // for display/editing

      // Initialize or sync draft with committed on mount
      initializeDraft: () => {
        const { selectedBrands } = get();
        set({ draftSelectedBrands: [...selectedBrands] });
      },

      // Used for toggling one brand in the draft selection
      toggleSingleBrand: (id) => {
        const { draftSelectedBrands, allBrands } = get();
        const isSelected = draftSelectedBrands.some((b) => b.id === id);
        const updated = isSelected
          ? draftSelectedBrands.filter((b) => b.id !== id)
          : [...draftSelectedBrands, allBrands.find((b) => b.id === id)];
        set({ draftSelectedBrands: updated });
      },

      // Used for select all / deselect all in the draft
      toggleAllBrandsSelection: () => {
        const { draftSelectedBrands, allBrands } = get();
        const allSelected = draftSelectedBrands.length === allBrands.length;
        set({ draftSelectedBrands: allSelected ? [] : [...allBrands] });
      },

      // Commit draft to confirmed selection
      submitSelectedBrands: () => {
        const { draftSelectedBrands } = get();
        set({ selectedBrands: [...draftSelectedBrands] });
      },

      // Undo draft (revert it back to last confirmed selection)
      resetSelectedBrands: () => {
        const { selectedBrands } = get();
        set({ draftSelectedBrands: [...selectedBrands] });
      },
    }),
    {
      name: "selected-brands-storage",
      partialize: (state) => ({
        selectedBrands: state.selectedBrands,
      }),
    }
  )
);
