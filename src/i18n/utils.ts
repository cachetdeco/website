import { ui } from './ui';
import { defaultLocale, type Locale } from './config';

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Locale;
  return defaultLocale;
}

export function t(lang: Locale, key: keyof typeof ui[typeof defaultLocale]): string {
  return (ui[lang] as Record<string, string>)?.[key] ?? ui[defaultLocale][key];
}

export function getLocalizedUrl(lang: Locale, path: string): string {
  if (lang === defaultLocale) return path;
  return `/${lang}${path}`;
}
