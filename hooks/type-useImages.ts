export interface Images {
    instagram: string,
    amazon: string,
    bookStore: string,
    botDetect: string,
    mercadoLibre: string,
}
export type ImagesStore = {
    images: Images;
    getSrcs: () => { images: Images }

    setInstagramImage: (val: string) => void
    setAmazonImage: (val: string) => void
    setBookStoreImage: (val: string) => void
    setMercadoLibreImage: (val: string) => void
    setBotDetectImage: (val: string) => void

    resetInstragramImage: () => void
    resetAmazonImage: () => void
    resetBookStoreImage: () => void
    resetMercadoLibreImage: () => void
    resetBotDetectImage: () => void

    reset: () => void
};
export const defaultImages = {
    instagram: '',
    amazon: '',
    bookStore: '',
    botDetect: '',
    mercadoLibre: ''
}