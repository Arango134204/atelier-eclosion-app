import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { AppLanguage } from '@/i18n';

interface SettingsState {
  /** `null` = seguir el idioma del teléfono hasta que la usuaria elija uno. */
  language: AppLanguage | null;
  setLanguage: (language: AppLanguage) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: null,
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'eclosion-settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
