import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useBrandStore = create(
  persist(
    (set) => ({
      selectedBrands: [],
      setSelectedBrands: (updater) =>
        set((state) => ({
          selectedBrands:
            typeof updater === 'function'
              ? updater(state.selectedBrands)
              : updater,
        })),
    }),
    {
      name: 'selected-brands-storage', // localStorage key
      partialize: (state) => ({ selectedBrands: state.selectedBrands }), // only persist selectedBrands
    }
  )
);
