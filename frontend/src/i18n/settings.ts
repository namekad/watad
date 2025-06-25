export const locales = ['en', 'ar'] as const;
export const defaultLocale = 'en' as const;

// For type safety
export type Locale = (typeof locales)[number];

// Validate locale
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Get direction based on locale
export function getDirection(locale: Locale) {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

// Get display name for locale
export function getDisplayName(locale: Locale) {
  const displayNames: Record<Locale, string> = {
    en: 'English',
    ar: 'العربية'
  };
  return displayNames[locale];
}

// Metadata for each locale
export const localeMetadata = {
  en: {
    name: 'English',
    dir: 'ltr',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: 'hh:mm A'
  },
  ar: {
    name: 'العربية',
    dir: 'rtl',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'hh:mm A'
  }
} as const; 