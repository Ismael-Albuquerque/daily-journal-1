import { create } from "zustand";
import { persist } from "zustand/middleware";

type Emotion = {
  id?: number;
  userId: number;
  date: string;
  emotion: string;
  description: string;
};

type EmotionStore = {
  emotions: Emotion[];
  addEmotion: (entry: Emotion) => void;
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
      name: "emotion-storage", // chave no AsyncStorage
    }
  )
);
