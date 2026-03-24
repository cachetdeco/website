/** Matches Astro `i18n.defaultLocale` — single source for fallback when `Astro.currentLocale` is unset. */
export const defaultLocale = 'fr' as const;

export type SiteLocale = typeof defaultLocale | string;

/**
 * Active locale for this request (from Astro i18n routing when enabled).
 * Falls back to `defaultLocale` for static builds without prefixed locale in URL.
 */
export function getLocale(astro: { currentLocale?: string | undefined }): SiteLocale {
  return astro.currentLocale ?? defaultLocale;
}
