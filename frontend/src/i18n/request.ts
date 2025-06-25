import {getRequestConfig} from 'next-intl/server';
import type {GetRequestConfigParams} from 'next-intl/server';
import {locales, defaultLocale} from './settings';

export default getRequestConfig(async ({locale}: GetRequestConfigParams) => {
  // Validate that the incoming locale is supported
  if (!locales.includes(locale as any)) {
    locale = defaultLocale;
  }
  
  return {
    locale: locale as string,
    messages: (await import(`../../public/locales/${locale}/common.json`)).default,
    timeZone: 'Asia/Baghdad',
    now: new Date()
  };
}); 