import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { es } from './locales/es';
import { fr } from './locales/fr';

export const SUPPORTED_LANGUAGES = ['fr', 'es'] as const;
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/** Español si el teléfono está en español; francés (idioma de la marca) en cualquier otro caso. */
export function getDeviceLanguage(): AppLanguage {
  return getLocales()[0]?.languageCode === 'es' ? 'es' : 'fr';
}

export function isAppLanguage(value: string): value is AppLanguage {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    es: { translation: es },
  },
  lng: getDeviceLanguage(),
  fallbackLng: 'fr',
  initAsync: false,
  interpolation: { escapeValue: false },
});

export default i18n;
