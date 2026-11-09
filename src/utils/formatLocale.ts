import type { AppLanguage } from '@/i18n';

const LOCALE: Record<AppLanguage, string> = { fr: 'fr-FR', es: 'es-ES' };

/** "3 nov. 2026" en francés, "3 nov 2026" en español. */
export function formatDate(iso: string, language: AppLanguage): string {
  return new Intl.DateTimeFormat(LOCALE[language], { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));
}

/** "7,5" en ambos idiomas (coma decimal). */
export function formatNumber(value: number, language: AppLanguage): string {
  return new Intl.NumberFormat(LOCALE[language], { maximumFractionDigits: 1 }).format(value);
}
