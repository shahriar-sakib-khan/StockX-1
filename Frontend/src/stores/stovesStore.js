import { create } from "zustand";
import { stoves as initialStoves } from "./dummy_lists/stoves_list";

export const useStovesStore = create((set) => ({
  stoves: initialStoves,
  setStoves: (stoves) => set({ stoves }),
  updateStoveStock: (id, delta) =>
    set((state) => ({
      stoves: state.stoves.map((stove) =>
        stove.id === id ? { ...stove, stock: stove.stock + delta } : stove
      ),
    })),
}));