import { create } from "zustand";
import { cylinders as initialCylinders } from "./dummy_lists/cylinders_list";

export const useCylindersStore = create((set) => ({
  cylinders: initialCylinders,
  setCylinders: (cylinders) => set({ cylinders }),
  updateCylinderStock: (brandId, type, size, delta) =>
    set((state) => ({
      cylinders: state.cylinders.map((brand) =>
        brand.id !== brandId
          ? brand
          : {
              ...brand,
              cylinders: brand.cylinders.map((cyl) =>
                cyl.type === type && cyl.size === size
                  ? { ...cyl, stock: cyl.stock + delta }
                  : cyl
              ),
              totalCylinderCount: brand.cylinders
                .map((cyl) =>
                  cyl.type === type && cyl.size === size
                    ? cyl.stock + delta
                    : cyl.stock
                )
                .reduce((a, b) => a + b, 0),
            }
      ),
    })),
}));