import { create } from "zustand";

interface UsernameState {
  username: string;
  setUsername: (username: string) => void;
}

export const useUsernameStore = create<UsernameState>()((set) => ({
  username: "",
  setUsername: (username) => set(() => ({ username })),
}));
