import { Languages } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

/** Persistent Arabic / English switch. */
export function LanguageSwitch() {
  const { t, toggleLang, lang } = useI18n();
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.nav.languageLabel}
      className="inline-flex min-h-[40px] items-center gap-2 rounded-pill border border-white/30 px-3 text-[15px] font-semibold text-white transition hover:bg-white/10 md:px-4"
    >
      <Languages aria-hidden className="h-5 w-5" />
      <span lang={lang === 'ar' ? 'en' : 'ar'}>
        <span className="hidden sm:inline">{t.nav.language}</span>
        <span className="sm:hidden">{lang === 'ar' ? 'EN' : 'ع'}</span>
      </span>
    </button>
  );
}
