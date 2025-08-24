import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../services/auth';
import { STORAGE_KEYS } from '../constants';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
}

interface AuthActions {
  setAuth: (user: User, token: string, refreshToken: string) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,

      // Actions
      setAuth: (user, token, refreshToken) => {
        set({
          isAuthenticated: true,
          user,
          token,
          refreshToken,
        });
      },

      clearAuth: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          refreshToken: null,
        });
      },

      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },
    }),
    {
      name: STORAGE_KEYS.USER_DATA,
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
