import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Draft = {
  emocao: string | null;
  descricao: string;
  data: string;
};

type DraftStore = {
  draft: Draft;
  setEmotion: (emocao: string) => void;
  setDescription: (descricao: string) => void;
  setDate: (data: string) => void;
  clearDraft: () => void;
};

export const useDraftStore = create<DraftStore>()(
  persist(
    (set) => ({
      draft: {
        emocao: null,
        descricao: "",
        data: new Date().toISOString().split("T")[0],
      },
      setEmotion: (emocao) =>
        set((state) => ({ draft: { ...state.draft, emocao } })),
      setDescription: (descricao) =>
        set((state) => ({ draft: { ...state.draft, descricao } })),
      setDate: (data) =>
        set((state) => ({ draft: { ...state.draft, data } })),
      clearDraft: () =>
        set({
          draft: {
            emocao: null,
            descricao: "",
            data: new Date().toISOString().split("T")[0],
          },
        }),
    }),
    {
      name: "draft-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
