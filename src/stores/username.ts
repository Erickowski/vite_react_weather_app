import { create } from "zustand";

import { LOCAL_STORAGE_KEYS } from "@src/types";

interface UsernameState {
  username: string;
  setUsername: (username: string) => void;
}

export const useUsernameStore = create<UsernameState>()((set) => ({
  username: localStorage.getItem(LOCAL_STORAGE_KEYS.username) || "",
  setUsername: (username) => set(() => ({ username })),
}));
