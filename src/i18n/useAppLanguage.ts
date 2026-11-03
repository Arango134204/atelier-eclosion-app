import { useTranslation } from 'react-i18next';

import { isAppLanguage, type AppLanguage } from './index';

export function useAppLanguage(): AppLanguage {
  const { i18n } = useTranslation();
  return isAppLanguage(i18n.language) ? i18n.language : 'fr';
}
