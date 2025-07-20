import { create } from "zustand";

type HeroState = {
  bookmarks: Record<string, boolean>;
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;

  index: number;
  direction: "next" | "prev";
  prevIndex: number | null;
  next: (mediaLength: number) => void;
  prev: (mediaLength: number) => void;
  setDirection: (dir: "next" | "prev") => void;
  clearPrevIndex: () => void;
};

export const useHeroStore = create<HeroState>((set, get) => ({
  bookmarks: {},

  toggleBookmark: (id: string) => {
    console.log("Toggling", id);
    set((state) => ({
      bookmarks: {
        ...state.bookmarks,
        [id]: !state.bookmarks[id],
      },
    }));
    console.log("bookmarks", get().bookmarks);
  },

  isBookmarked: (id: string) => !!get().bookmarks[id],

  setDirection: (dir) => set({ direction: dir }),

  index: 0,
  prevIndex: null,
  direction: "next",

  next: (mediaLength) => {
    const { index } = get();
    set({
      prevIndex: index,
      direction: "next",
      index: (index + 1) % mediaLength,
    });
    // console.log("prev", get().prevIndex);
    // console.log("current", get().index);
  },

  prev: (mediaLength) => {
    const { index } = get();
    console.log("pre pev: ", index, "mediaLength", mediaLength);
    set({
      prevIndex: index,
      direction: "prev",
      index: (index - 1 + mediaLength) % mediaLength,
    });
    console.log("post prev:", get().index);
  },

  clearPrevIndex: () => set({ prevIndex: null }),
}));
