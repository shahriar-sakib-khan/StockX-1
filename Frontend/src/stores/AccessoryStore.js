import { create } from "zustand";
import { persist } from "zustand/middleware";
import { baseRegulator, baseStove } from "./baseLists/baseAccessory";

const clampValue = (value) => Math.max(0, Number(value));

// 🟢 general methods
// 🟡 regulator related methods
// 🔵 stove related methods

export const useAccessoryStore = create(
  persist(
    (get, set) => ({
      regulator: { ...baseRegulator },
      stove: { ...baseStove },

      // 🟢 reset all accessories to their base structure
      clearAllAccessories: () => set({ regulator: { ...baseRegulator }, stove: { ...baseStove } }),

      // 🟢 reset regulator to its base structure
      clearRegulators: () => set({ regulator: {...baseRegulator }}),

      // 🟢 reset stove to its base structure
      clearStove: () => set({ stove: { ...baseStove }}),


      // 🟡 set any or all properties of the regulators
      setRegulator: (item) => {
        const { regulator } = get();
        set({ regulator: { ...regulator, ...item, productType: "regulator" }})
      },
      
      // 🟡 set the price of the regulators
      setRegulatorPrice: (newPrice) => {
        const { regulator } = get();
        set({ regulator: { ...regulator, price: clampValue(newPrice) }})
      },
      
      // 🟡 update stock of regulators
      updateRegulatorStock: (stockChange) => {
        const { regulator } = get();
        set({ regulator: { ...regulator, stock: clampValue(regulator.stock + stockChange)}})
      },


      // 🔵 set any or all properties of the stoves
      setStove: (item) => {
        const { stove } = get();
        set({ stove: { ...stove, ...item, productType: "stove" }})
      },
      
      // 🔵 set the price of the stoves
      setStovePrice: (newPrice) => {
        const { stove } = get();
        set({ stove: { ...stove, price: clampValue(newPrice) }})
      },
      
      // 🔵 update stock of stoves
      updateStoveStock: (stockChange) => {
        const { stove } = get();
        set({ stove: { ...stove, stock: clampValue(stove.stock + stockChange)}})
      },
    }),
    {
      name: "accessory-store",
      partialize: (state) => ({
        regulator: state.regulator,
        stove: state.stove,
      }),
    }
  )
);
