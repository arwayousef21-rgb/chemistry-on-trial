import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ar } from '@/translations/ar';
import { en } from '@/translations/en';
import { dirOf, type Lang, type Translations } from '@/translations';

interface I18nValue {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  t: Translations;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** Replace `{name}` placeholders in a translated string. */
  format: (template: string, values: Record<string, string | number>) => string;
}

const STORAGE_KEY = 'cot.lang';
const dictionaries: Record<Lang, Translations> = { ar, en };

const I18nContext = createContext<I18nValue | null>(null);

/** Order: explicit `?lang=` in the URL, then the remembered choice, then Arabic. */
function readInitialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (fromUrl === 'ar' || fromUrl === 'en') return fromUrl;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'ar' || stored === 'en') return stored;
  } catch {
    /* storage unavailable (private mode etc.) — fall back to Arabic */
  }
  return 'ar';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);
  const dir = dirOf(lang);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    document.title = `${dictionaries[lang].app.title} | ${dictionaries[lang].app.module}`;
  }, [lang, dir]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* preference simply isn't remembered */
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      dir,
      t: dictionaries[lang],
      setLang,
      toggleLang: () => setLang(lang === 'ar' ? 'en' : 'ar'),
      format: (template, values) =>
        template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`)),
    }),
    [lang, dir, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
