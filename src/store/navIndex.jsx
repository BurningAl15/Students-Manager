import create from "zustand";

export const useNavIndex = create((set) => ({
  navIndex: parseInt(JSON.parse(localStorage.getItem("navIndex"))) || 0,
  changeNavIndex: (index) =>
    set(() => ({
      navIndex: index,
    })),
}));
