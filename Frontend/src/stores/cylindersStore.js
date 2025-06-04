import { create } from "zustand";
import { cylinders as initialCylinders } from "./dummy_lists/cylinders_list";

// Utility to sync with localStorage
function getStoredCylinders() {
  try {
    const stored = localStorage.getItem("cylinders");
    return stored ? JSON.parse(stored) : initialCylinders;
  } catch {
    return initialCylinders;
  }
}

function saveCylinders(cylinders) {
  try {
    localStorage.setItem("cylinders", JSON.stringify(cylinders));
  } catch (error) {
    console.error("Failed to save cylinders:", error);
  }
}

export const useCylindersStore = create((set) => ({
  cylinders: getStoredCylinders(),
  setCylinders: (cylinders) => {
    saveCylinders(cylinders);
    set({ cylinders });
  },
  updateCylinderStock: (brandId, type, size, delta) =>
    set((state) => {
      const updated = state.cylinders.map((brand) =>
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
      );
      saveCylinders(updated);
      return { cylinders: updated };
    }),
}));