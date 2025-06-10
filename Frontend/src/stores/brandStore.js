import { create } from "zustand";
import { persist } from "zustand/middleware";
import { allBrands } from "../assets/Lists/new_brands_list.jsx";

// 🟢 general methods
// 🟡 brand selection methods
// 🔵 stock manipulation methods
// 🔴 price manipulation methods

export const useBrandStore = create(
  persist(
    (set, get) => ({
      allBrands: allBrands,         // static brands list
      selectedBrands: [],           // confirmed selection
      draftSelectedBrands: [],      // for display/editing [temporary]

      // 🟢 Initialize or sync draft with committed on mount
      initializeDraft: () => {
        const { selectedBrands } = get();
        set({ draftSelectedBrands: [...selectedBrands] });
      },

      // 🟢 Commit draft to confirmed selection 
      submitSelectedBrands: () => {
        const { draftSelectedBrands } = get();
        set({ selectedBrands: [...draftSelectedBrands] });
      },

      // 🟢 Undo draft (revert it back to last confirmed selection)
      resetSelectedBrands: () => {
        const { selectedBrands } = get();
        set({ draftSelectedBrands: [...selectedBrands] });
      },

      // 🟢 Check if the draft has uncommitted changes
      hasUncommittedChanges: () => {
        const { selectedBrands, draftSelectedBrands } = get();
        return JSON.stringify(selectedBrands) !== JSON.stringify(draftSelectedBrands);
      },

      // 🟢 Get a brand by ID from allBrands
      getBrandById: (id) => {
        const { selectedBrands } = get();
        return selectedBrands.find((b) => b.id === id);
      },


      // 🟡 Used for toggling one brand in the draft selection
      toggleSingleBrand: (id) => {
        const { draftSelectedBrands, allBrands } = get();
        const isSelected = draftSelectedBrands.some((b) => b.id === id);
        let updated = isSelected
          ? draftSelectedBrands.filter((b) => b.id !== id)
          : [...draftSelectedBrands, allBrands.find((b) => b.id === id)];

        updated = updated.sort((a, b) => (a.id > b.id ? 1 : -1));

        set({ draftSelectedBrands: updated });
      },

      // 🟡 Used for select all / deselect all in the draft
      toggleAllBrandsSelection: () => {
        const { draftSelectedBrands, allBrands } = get();
        const allSelected = draftSelectedBrands.length === allBrands.length;
        set({ draftSelectedBrands: allSelected ? [] : [...allBrands] });
      },

      // 🔵 change stocks of cylinders by id
      updateDraftCylinderStock: ({ brandId, cylinderId, change }) => {
        set((state) => {
          const delta = typeof change === "number" ? change : 0;

          const updatedDraft = state.draftSelectedBrands.map((brand) => {
            if (brand.id !== brandId) return brand;

            const updatedCylinders = brand.cylinders.map((cyl) => {
              if (cyl.id !== cylinderId) return cyl;
              const currentStock = typeof cyl.stock === "number" ? cyl.stock : 0;
              return {
                ...cyl,
                stock: Math.max(0, currentStock + delta),
              };
            });

            // Calculate total stock of all cylinders for this brand
            const totalCylinderCount = updatedCylinders.reduce(
              (sum, cyl) => sum + (typeof cyl.stock === "number" ? cyl.stock : 0),
              0
            );

            return {
              ...brand,
              cylinders: updatedCylinders,
              totalCylinderCount,
            };
          });

          return { draftSelectedBrands: updatedDraft };
        });
      },

      // 🔵 increment stock by one
      incrementDraftCylinder: ({ brandId, cylinderId }) =>
        get().updateDraftCylinderStock({ brandId, cylinderId, change: 1 }),

      // 🔵 decrement stock by one
      decrementDraftCylinder: ({ brandId, cylinderId }) =>
        get().updateDraftCylinderStock({ brandId, cylinderId, change: -1 }),
      
      // 🔵 set specific stock to a cylinder by id
      setDraftCylinderStock: ({ brandId, cylinderId, newStock }) => {
        set((state) => {
          const updatedDraft = state.draftSelectedBrands.map((brand) => {
            if (brand.id !== brandId) return brand;

            const updatedCylinders = brand.cylinders.map((cyl) => {
              if (cyl.id !== cylinderId) return cyl;
              return {
                ...cyl,
                stock: Math.max(0, newStock),
              };
            });

            return {
              ...brand,
              cylinders: updatedCylinders,
            };
          });

          return { draftSelectedBrands: updatedDraft };
        });
      },

      // 🔴 set new price for a specific cylinder
      setDraftCylinderPrice: ({ brandId, cylinderId, newPrice }) => {
        set((state) => {
          const updatedDraft = state.draftSelectedBrands.map((brand) => {
            if (brand.id !== brandId) return brand;

            const updatedCylinders = brand.cylinders.map((cyl) => {
              if (cyl.id !== cylinderId) return cyl;
              return {
                ...cyl,
                price: newPrice,
              };
            });

            return {
              ...brand,
              cylinders: updatedCylinders,
            };
          });

          return { draftSelectedBrands: updatedDraft };
        });
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
