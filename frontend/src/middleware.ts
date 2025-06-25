import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/settings';

// Regex pattern for locale validation
const LOCALE_PATTERN = /^[a-z]{2}(-[A-Z]{2})?$/;

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale,

  // Add locale detection from different sources
  localeDetection: true,

  // Add locale prefix to all routes
  localePrefix: 'always',
});

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}; 