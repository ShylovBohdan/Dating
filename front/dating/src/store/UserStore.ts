import create from "zustand";

interface UserProfile {
  age: string;
  gender: string;
  horoscope: string;
  hobbies: string;
}

interface UserState {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  role: string;
  signIn: (profile: any, role: string) => void;
  signOut: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  userProfile: null,
  role: "",
  signIn: (profile, role) =>
    set({ isAuthenticated: true, userProfile: profile, role: role }),
  signOut: () => set({ isAuthenticated: false, userProfile: null, role: "" }),
  setIsAuthenticated: (isAuthenticated) =>
    set({ isAuthenticated: isAuthenticated }),
}));
