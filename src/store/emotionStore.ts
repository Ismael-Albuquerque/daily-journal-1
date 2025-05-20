import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Emotions } from "../types/Emotions";

type EmotionStore = {
  emotions: Emotions[]; 
  addEmotion: (entry: Emotions) => void;
  clearEmotions: () => void;
};

export const useEmotionStore = create(
  persist<EmotionStore>(
    (set) => ({
      emotions: [],
      addEmotion: (entry) =>
        set((state) => ({
          emotions: [...state.emotions, entry],
        })),
      clearEmotions: () => set({ emotions: [] }),
    }),
    {
      name: "emotion-storage", 
    }
  )
);
