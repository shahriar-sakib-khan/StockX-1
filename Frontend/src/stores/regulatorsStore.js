import { create } from "zustand";
import { regulators as initialRegulators } from "./dummy_lists/regulators_list";

export const useRegulatorsStore = create((set) => ({
  regulators: initialRegulators,
  setRegulators: (regulators) => set({ regulators }),
  updateRegulatorStock: (id, delta) =>
    set((state) => ({
      regulators: state.regulators.map((reg) =>
        reg.id === id ? { ...reg, stock: reg.stock + delta } : reg
      ),
    })),
}));