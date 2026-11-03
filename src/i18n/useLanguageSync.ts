import { useEffect, useState } from 'react';

import { useSettingsStore } from '@/store/settings.store';

import i18n, { getDeviceLanguage } from './index';

/**
 * Aplica a i18next el idioma guardado en el store (o el del teléfono si no hay uno elegido).
 *
 * - Entrada: `language` del store de ajustes (persistido en AsyncStorage).
 * - Estado: `hydrated`, si ya se leyó la preferencia guardada.
 * - Efectos: escucha el fin de la hidratación y cambia el idioma de i18next cuando cambia la preferencia.
 * - Resultado: `true` cuando el idioma definitivo ya está aplicado, para no mostrar la app en el idioma equivocado.
 */
export function useLanguageSync(): boolean {
  const language = useSettingsStore((state) => state.language);
  const [hydrated, setHydrated] = useState(() => useSettingsStore.persist.hasHydrated());

  useEffect(() => {
    const unsubscribe = useSettingsStore.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useSettingsStore.persist.hasHydrated());
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const target = language ?? getDeviceLanguage();
    if (i18n.language !== target) {
      void i18n.changeLanguage(target);
    }
  }, [hydrated, language]);

  return hydrated;
}
