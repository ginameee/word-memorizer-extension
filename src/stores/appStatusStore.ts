import { create } from "zustand";
import { ITab } from "../types/route";

interface AppStatusState {
  activeTab: ITab | "";
  isContentShowed: boolean;
  errors: Record<ITab, string>;
  setActiveTab: (tab: ITab | "") => void;
  setIsContentShowed: (isShowed: boolean) => void;
  setError: (tab: ITab, error: string) => void;
  clearError: (tab: ITab) => void;
}

export const useAppStatusStore = create<AppStatusState>((set) => ({
  activeTab: "",
  isContentShowed: false,
  errors: {} as Record<ITab, string>,

  setActiveTab: (tab) => set((state) => ({ ...state, activeTab: tab })),

  setIsContentShowed: (isShowed) =>
    set((state) => ({ ...state, isContentShowed: isShowed })),

  setError: (tab, error) =>
    set((state) => ({ ...state, errors: { ...state.errors, [tab]: error } })),

  clearError: (tab) =>
    set((state) => ({ ...state, errors: { ...state.errors, [tab]: "" } })),
}));
