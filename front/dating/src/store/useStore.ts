import create from "zustand";

interface UserState {
  isAuthenticated: boolean;
  userProfile: any;
  signIn: (profile: any) => void;
  signOut: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  userProfile: null,
  signIn: (profile) => set({ isAuthenticated: true, userProfile: profile }),
  signOut: () => set({ isAuthenticated: false, userProfile: null }),
}));
