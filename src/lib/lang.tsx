import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { translations, type Lang, type UITranslations } from './translations';

interface LangContextValue {
  lang: Lang;
  isArabic: boolean;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: UITranslations;
  dir: 'rtl' | 'ltr';
}

const LangContext = createContext<LangContextValue | null>(null);

const LANG_KEY = 'verdor_lang';

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      return saved === 'en' ? 'en' : 'ar';
    } catch {
      return 'ar';
    }
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(LANG_KEY, l); } catch { /* ignore */ }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  }, [lang, setLang]);

  const isArabic = lang === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [dir, lang]);

  const value: LangContextValue = {
    lang,
    isArabic,
    setLang,
    toggleLang,
    t: translations[lang],
    dir,
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
