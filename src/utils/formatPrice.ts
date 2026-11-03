import type { AppLanguage } from '@/i18n';

const localeByLanguage: Record<AppLanguage, string> = {
  fr: 'fr-FR',
  es: 'es-ES',
};

export function formatPrice(amount: number, language: AppLanguage, currency: string = 'EUR'): string {
  return new Intl.NumberFormat(localeByLanguage[language], { style: 'currency', currency }).format(amount);
}
