import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { TopNav } from './TopNav';
import { PageBackground } from './PageBackground';
import { EquiLauncherProvider } from '@/components/assistant/EquiLauncherProvider';

/** Page frame: skip link, navigation, background, content, stage footer. */
export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return (
    <EquiLauncherProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-2 focus:z-50 focus:rounded-pill focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
        {t.app.skipToContent}
      </a>
      <PageBackground />
      <TopNav />
      <main id="main" className="mx-auto max-w-page px-4 pb-10 pt-5 md:px-8">
        {children}
      </main>
      <footer className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-2 px-4 pb-6 text-[13px] text-ink-muted md:px-8">
        <span className="inline-flex items-center gap-2">
          <FlaskConical aria-hidden className="h-4 w-4" />
          {t.stage.preview} · {t.stage.synthetic}
        </span>
        <Link to="/design-system" className="font-semibold text-remedial-solid underline-offset-4 hover:underline">
          {t.nav.designSystem}
        </Link>
      </footer>
    </EquiLauncherProvider>
  );
}
