import { HashRouter, Route, Routes } from 'react-router-dom';
import { I18nProvider } from '@/i18n/I18nProvider';
import { DataProvider } from '@/data/DataProvider';
import { AppShell } from '@/components/layout/AppShell';
import { StudentDashboard } from '@/pages/StudentDashboard';
import { DesignSystemPage } from '@/pages/DesignSystemPage';
import { LaterStagePage } from '@/pages/LaterStagePage';

/** Hash routing works on any static host without server configuration. */
export function App() {
  return (
    <I18nProvider>
      <DataProvider>
        <HashRouter>
          <AppShell>
            <Routes>
              <Route path="/" element={<StudentDashboard />} />
              <Route path="/design-system" element={<DesignSystemPage />} />
              <Route path="*" element={<LaterStagePage />} />
            </Routes>
          </AppShell>
        </HashRouter>
      </DataProvider>
    </I18nProvider>
  );
}
