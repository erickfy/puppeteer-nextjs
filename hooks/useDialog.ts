import { create } from 'zustand';

interface DialogStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onChange: (v: boolean) => void;
}

const useDialog = create<DialogStore>((set) => ({
    isOpen: true,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onChange: (v) => set({ isOpen: v })
}));


export default useDialog;
