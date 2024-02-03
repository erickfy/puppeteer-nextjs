import { create } from "zustand";
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import { BACKGROUND, BGStore } from "./type-hooks";

export const useBackground = create<BGStore>()(
    devtools(
        persist(
            (set, get) => ({
                background: BACKGROUND.LOGIN,
                setBG: (bg) => set((state) => ({ ...state, background: bg })),
                getBG: () => get().background,
                reset: () => set((states) => ({ ...states, background: BACKGROUND.LOGIN })),
            }),
            {
                name: 'bg-store-scrapping',
                storage: createJSONStorage(() => localStorage),
            },
        )
    )
);
