import { create } from "zustand";

interface MenuStore {
  menuOpened: boolean;
  setMenuOpened: (isOpen: boolean) => void;
}

const useMenuStore = create<MenuStore>((set) => ({
  menuOpened: false,
  setMenuOpened: (isOpen) => set(() => ({ menuOpened: isOpen })),
}));

export default useMenuStore;
