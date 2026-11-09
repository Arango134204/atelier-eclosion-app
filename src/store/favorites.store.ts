import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FavoritesState {
  /** Handles de las piezas favoritas, en el orden en que se agregaron. */
  handles: string[];
  toggle: (handle: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      handles: [],
      toggle: (handle) =>
        set((state) => ({
          handles: state.handles.includes(handle)
            ? state.handles.filter((item) => item !== handle)
            : [...state.handles, handle],
        })),
    }),
    {
      name: 'eclosion-favorites',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useIsFavorite = (handle: string) => useFavoritesStore((state) => state.handles.includes(handle));
