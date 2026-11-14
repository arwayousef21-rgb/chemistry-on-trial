import { Atom, BarChart3, House, LogOut, Settings } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';
import { cn } from '@/components/ui';
import { LanguageSwitch } from './LanguageSwitch';
import { useStudentSession } from '@/data/StudentSessionProvider';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex min-h-[44px] min-w-[40px] items-center justify-center gap-2 rounded-pill px-2 text-[17px] md:px-3 font-semibold text-white transition hover:bg-white/10',
    isActive && 'bg-white/10',
  );

/**
 * Dark navy top navigation, as in the reference.
 * Phones and tablets: two rows (full platform name + language switch, then the navigation icons),
 * so the localized name is never cut off. Desktops: one row.
 */
export function TopNav() {
  const { t } = useI18n();
  const { mode, student, signOut } = useStudentSession();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // "Not you?" (D15) takes the place of the reference's Exit button when a student is signed in here.
  const showNotYou = mode === 'api' && !!student && pathname !== '/teacher';
  const hideExit = mode === 'api' && !student;
  const onNotYou = async () => {
    await signOut();
    navigate('/');
  };
  return (
    <header className="sticky top-0 z-30 bg-navy-900 text-white shadow-[0_2px_12px_rgba(24,54,96,0.25)]">
      <div className="mx-auto flex max-w-page flex-wrap items-center gap-x-4 gap-y-1 px-4 pb-1 pt-2 md:px-8 lg:h-nav lg:flex-nowrap lg:py-0">
        <NavLink to="/" className="flex min-w-0 flex-1 items-center gap-2 md:gap-3" aria-label={t.app.title}>
          <Atom aria-hidden className="h-8 w-8 shrink-0 md:h-14 md:w-14" strokeWidth={1.6} />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[17px] font-extrabold leading-tight sm:text-[20px] md:text-[22px] lg:truncate xl:text-[26px]">{t.app.title}</span>
            <span className="truncate text-[12px] font-medium text-white/75 md:text-[14px]">{t.app.module}</span>
          </span>
        </NavLink>

        <nav aria-label={t.nav.menu} className="order-3 flex w-full shrink-0 items-center justify-around border-t border-white/10 lg:order-none lg:w-auto lg:justify-start lg:gap-3 lg:border-0">
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
          {showNotYou ? (
            <button
              type="button"
              onClick={onNotYou}
              aria-label={t.access.notYouLabel}
              className="flex min-h-[44px] flex-col items-center justify-center rounded-pill px-2 text-[14px] font-semibold text-white transition hover:bg-white/10"
            >
              <LogOut aria-hidden className="h-6 w-6 rtl:-scale-x-100" />
              <span>{t.access.notYou}</span>
            </button>
          ) : (
            !hideExit && (
              <button
                type="button"
                disabled
                title={t.nav.exitDisabled}
                aria-label={`${t.nav.exit} — ${t.nav.exitDisabled}`}
                className="flex min-h-[44px] flex-col items-center justify-center px-2 text-[14px] font-semibold text-white/50"
              >
                <LogOut aria-hidden className="h-6 w-6 rtl:-scale-x-100" />
                <span>{t.nav.exit}</span>
              </button>
            )
          )}
        </nav>
        <div className="order-2 shrink-0 lg:order-none">
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}
