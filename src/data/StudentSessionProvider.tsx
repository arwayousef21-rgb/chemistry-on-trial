import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api, getHealth, type StudentProfile } from './apiClient';

/**
 * Who is using this browser (D15).
 * - "api" mode: the real server is reachable → students register or resume.
 * - "demo" mode: no server (design preview with `npm run dev`) → synthetic dashboard, no registration.
 */
type Mode = 'loading' | 'demo' | 'api';

interface StudentSession {
  mode: Mode;
  student: StudentProfile | null;
  setStudent: (s: StudentProfile | null) => void;
  /** "Not you?": clears this browser's session and returns to the welcome screen. */
  signOut: () => Promise<void>;
}

const Ctx = createContext<StudentSession | null>(null);

export function StudentSessionProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('loading');
  const [student, setStudent] = useState<StudentProfile | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      const health = await getHealth(ctrl.signal);
      if (ctrl.signal.aborted) return;
      if (!health?.ok) {
        setMode('demo');
        return;
      }
      const me = await api.me();
      if (ctrl.signal.aborted) return;
      setStudent(me.ok ? me.data.student : null);
      setMode('api');
    })();
    return () => ctrl.abort();
  }, []);

  const signOut = useCallback(async () => {
    await api.logout();
    setStudent(null);
  }, []);

  const value = useMemo(() => ({ mode, student, setStudent, signOut }), [mode, student, signOut]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStudentSession(): StudentSession {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useStudentSession must be used inside <StudentSessionProvider>');
  return ctx;
}
