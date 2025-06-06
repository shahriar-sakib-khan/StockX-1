import { create } from "zustand";
import { persist } from "zustand/middleware";
import { allBrands } from "../assets/Lists/new_brands_list.jsx";

export const useBrandStore = create(
  persist(
    (set, get) => ({
      allBrands, // Static brand list
      selectedBrands: [],

      setSelectedBrands: (updater) =>
        set((state) => ({
          selectedBrands:
            typeof updater === "function"
              ? updater(state.selectedBrands)
              : updater,
        })),

      toggleSingleBrand: (id) => {
        const { selectedBrands, allBrands } = get();
        const isSelected = selectedBrands.some((brand) => brand.id === id);
        const updated = isSelected
          ? selectedBrands.filter((brand) => brand.id !== id)
          : [...selectedBrands, allBrands.find((brand) => brand.id === id)];
        set({ selectedBrands: updated });
      },

      toggleAllBrandsSelection: () => {
        const { selectedBrands, allBrands } = get();
        const allSelected = selectedBrands.length === allBrands.length;
        set({ selectedBrands: allSelected ? [] : [...allBrands] });
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
