import { Atom, BarChart3, House, LogOut, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';
import { cn } from '@/components/ui';
import { LanguageSwitch } from './LanguageSwitch';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex min-h-[44px] min-w-[40px] items-center justify-center gap-2 rounded-pill px-2 text-[17px] md:px-3 font-semibold text-white transition hover:bg-white/10',
    isActive && 'bg-white/10',
  );

/** Dark navy top navigation, as in the reference. */
export function TopNav() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-30 bg-navy-900 text-white shadow-[0_2px_12px_rgba(24,54,96,0.25)]">
      <div className="mx-auto flex h-nav max-w-page items-center gap-4 px-4 md:px-8">
        <NavLink to="/" className="flex min-w-0 flex-1 items-center gap-2 md:gap-3" aria-label={t.app.title}>
          <Atom aria-hidden className="h-8 w-8 shrink-0 md:h-12 md:w-12" strokeWidth={1.6} />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-[16px] font-extrabold sm:text-[19px] md:text-[24px]">{t.app.title}</span>
            <span className="truncate text-[12px] font-medium text-white/75 md:text-[14px]">{t.app.module}</span>
          </span>
        </NavLink>

        <nav aria-label={t.nav.menu} className="flex shrink-0 items-center gap-0.5 md:gap-3">
          <NavLink to="/" end className={linkClass}>
            <House aria-hidden className="h-6 w-6" />
            <span className="hidden lg:inline">{t.nav.home}</span>
            <span className="sr-only lg:hidden">{t.nav.home}</span>
          </NavLink>
          <NavLink to="/results" className={linkClass}>
            <BarChart3 aria-hidden className="h-6 w-6" />
            <span className="hidden lg:inline">{t.nav.results}</span>
            <span className="sr-only lg:hidden">{t.nav.results}</span>
          </NavLink>
          <NavLink to="/help" className={linkClass}>
            <Settings aria-hidden className="h-6 w-6" />
            <span className="hidden lg:inline">{t.nav.help}</span>
            <span className="sr-only lg:hidden">{t.nav.help}</span>
          </NavLink>
          <button
            type="button"
            disabled
            title={t.nav.exitDisabled}
            aria-label={`${t.nav.exit} — ${t.nav.exitDisabled}`}
            className="hidden min-h-[44px] flex-col items-center justify-center px-2 text-[14px] font-semibold text-white/50 sm:flex"
          >
            <LogOut aria-hidden className="h-6 w-6 rtl:-scale-x-100" />
            <span>{t.nav.exit}</span>
          </button>
          <LanguageSwitch />
        </nav>
      </div>
    </header>
  );
}
