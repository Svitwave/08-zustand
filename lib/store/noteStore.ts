import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NoteFormValues } from "@/types/note";

const initialDraft: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteStore = {
  draft: typeof initialDraft;
  setDraft: (newDraft: typeof initialDraft) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (newDraft) => set({ draft: newDraft }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
