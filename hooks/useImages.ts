import { create } from "zustand";
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import { ImagesStore, defaultImages } from "./type-useImages";

export const useImages = create<ImagesStore>()(
    devtools(
        persist(
            (set, get) => ({
                images: defaultImages,
                getSrcs: () => get(),

                setInstagramImage: (val) => set((state) => ({ ...state, images: { ...state.images, instagram: val } })),
                setAmazonImage: (val) => set((state) => ({ ...state, images: { ...state.images, amazon: val } })),
                setBookStoreImage: (val) => set((state) => ({ ...state, images: { ...state.images, bookStore: val } })),
                setMercadoLibreImage: (val) => set((state) => ({ ...state, images: { ...state.images, mercadoLibre: val } })),
                setBotDetectImage: (val) => set((state) => ({ ...state, images: { ...state.images, botDetect: val } })),

                resetInstragramImage: () => set((state) => ({ ...state, images: { ...state.images, instagram: '' } })),
                resetAmazonImage: () => set((state) => ({ ...state, images: { ...state.images, amazon: '' } })),
                resetBookStoreImage: () => set((state) => ({ ...state, images: { ...state.images, bookStore: '' } })),
                resetMercadoLibreImage: () => set((state) => ({ ...state, images: { ...state.images, mercadoLibre: '' } })),
                resetBotDetectImage: () => set((state) => ({ ...state, images: { ...state.images, botDetect: '' } })),

                reset: () => set((states) => ({ ...states, images: defaultImages })),
            }),
            {
                name: 'store-scrapping',
                storage: createJSONStorage(() => localStorage),
            },
        )
    )
);
