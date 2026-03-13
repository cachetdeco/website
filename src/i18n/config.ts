export const defaultLocale = 'fr' as const;
export const locales = ['fr'] as const;
export type Locale = (typeof locales)[number];

export const routes: Record<string, Record<Locale, string>> = {
  services:   { fr: 'services' },
  contact:    { fr: 'contact' },
  soumission: { fr: 'soumission' },
};
