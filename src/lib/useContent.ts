import { useLang } from './lang';
import type { SiteContentMap } from './types';

/**
 * Hook that returns a function to get site content with fallback to
 * the current UI translation. Content stored in the DB takes priority;
 * if a key is missing, it falls back to the translation string.
 */
export function useContent() {
  const { t } = useLang();

  return function getContent(content: SiteContentMap, key: string): string {
    if (content[key] !== undefined && content[key] !== '') {
      return content[key];
    }
    // Fall back to translation if the key exists in UITranslations
    return (t as Record<string, string>)[key] ?? '';
  };
}
