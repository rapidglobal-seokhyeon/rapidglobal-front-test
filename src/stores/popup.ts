import { create } from "zustand";

type State = {
  open: boolean;
  handleToggle: () => void;
};

export const usePopUpStore = create<State>()((set) => ({
  open: false,
  handleToggle: () => set((state) => ({ open: !state.open })),
}));
