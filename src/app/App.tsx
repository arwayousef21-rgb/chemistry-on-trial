import { HashRouter, Route, Routes } from 'react-router-dom';
import { I18nProvider, useI18n } from '@/i18n/I18nProvider';
import { DataProvider } from '@/data/DataProvider';
import { StudentSessionProvider, useStudentSession } from '@/data/StudentSessionProvider';
import { AppShell } from '@/components/layout/AppShell';
import { StudentDashboard } from '@/pages/StudentDashboard';
import { WelcomePage } from '@/pages/WelcomePage';
import { TeacherPage } from '@/pages/TeacherPage';
import { DesignSystemPage } from '@/pages/DesignSystemPage';
import { LaterStagePage } from '@/pages/LaterStagePage';

/**
 * Students who are not yet recognised on this device see the welcome screen;
 * recognised students (same device, or after resuming) see their dashboard.
 * Without a server (`npm run dev` design preview) the synthetic dashboard is shown.
 */
function StudentHome() {
  const { mode, student } = useStudentSession();
  const { t } = useI18n();
  if (mode === 'loading') return <p className="py-24 text-center text-ink-muted">{t.access.loading}</p>;
  if (mode === 'api' && !student) return <WelcomePage />;
  return <StudentDashboard />;
}

/** Hash routing works on any static host without server configuration. */
export function App() {
  return (
    <I18nProvider>
      <DataProvider>
        <StudentSessionProvider>
          <HashRouter>
            <AppShell>
              <Routes>
                <Route path="/" element={<StudentHome />} />
                <Route path="/teacher" element={<TeacherPage />} />
                <Route path="/design-system" element={<DesignSystemPage />} />
                <Route path="*" element={<LaterStagePage />} />
              </Routes>
            </AppShell>
          </HashRouter>
        </StudentSessionProvider>
      </DataProvider>
    </I18nProvider>
  );
}
