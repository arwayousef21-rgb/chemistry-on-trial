import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { KeyRound, LogOut, Users } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { api, type TeacherStudentRow } from '@/data/apiClient';
import { Badge, Button, Card, TextField } from '@/components/ui';

type State = 'checking' | 'signedOut' | 'signedIn';

/**
 * Teacher area (D15): one strong password, kept as a server-side secret.
 * M1 shows the student register; the full dashboard and Excel export arrive in M4.
 */
export function TeacherPage() {
  const { t, lang, format } = useI18n();
  const [state, setState] = useState<State>('checking');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [rows, setRows] = useState<TeacherStudentRow[]>([]);

  const load = useCallback(async () => {
    const r = await api.teacherStudents();
    if (r.ok) {
      setRows(r.data.students);
      setState('signedIn');
    } else if (r.status === 401) setState('signedOut');
    else setError(t.teacher.errors.generic);
  }, [t]);

  useEffect(() => {
    load();
  }, [load]);

  async function onSignIn(ev: FormEvent) {
    ev.preventDefault();
    setError(null);
    setBusy(true);
    const r = await api.teacherLogin(password);
    setBusy(false);
    setPassword('');
    if (r.ok) return load();
    const e = t.teacher.errors;
    setError(r.error === 'wrong_password' ? e.wrongPassword : r.error === 'too_many_attempts' ? e.tooMany : r.error === 'teacher_login_not_configured' ? e.notConfigured : e.generic);
  }

  async function onSignOut() {
    await api.teacherLogout();
    setRows([]);
    setState('signedOut');
  }

  const fmt = (iso: string) => new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));
  const c = t.teacher.columns;

  if (state === 'checking') return <p className="py-16 text-center text-ink-muted">{t.access.loading}</p>;

  if (state === 'signedOut')
    return (
      <Card className="mx-auto mt-4 max-w-[480px] overflow-hidden">
        <div className="bg-banner-gradient px-6 py-5 text-center">
          <h1 className="text-h2 text-ink-strong">{t.teacher.title}</h1>
        </div>
        <form onSubmit={onSignIn} className="space-y-5 px-6 py-6" aria-label={t.teacher.title}>
          {error && (
            <p role="alert" className="rounded-panel border border-[#F4B4B9] bg-[#FDE7E9] px-4 py-3 text-[15px] font-semibold text-[#8C1D25]">
              {error}
            </p>
          )}
          <TextField label={t.teacher.passwordLabel} type="password" autoComplete="current-password" ltr value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" variant="navy" icon={<KeyRound className="h-5 w-5" />} fullWidth disabled={busy || password.length === 0}>
            {busy ? t.access.working : t.teacher.signIn}
          </Button>
        </form>
      </Card>
    );

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 bg-banner-gradient px-6 py-5">
        <Users aria-hidden className="h-8 w-8 text-remedial-solid" />
        <div className="me-auto">
          <h1 className="text-h2 text-ink-strong">{t.teacher.rosterTitle}</h1>
          <p className="text-[15px] text-ink-muted">
            {format(t.teacher.count, { n: rows.length })} · {t.teacher.syntheticNote} {t.teacher.exportLater}
          </p>
        </div>
        <Button variant="outline" size="md" icon={<LogOut className="h-5 w-5 rtl:-scale-x-100" />} onClick={onSignOut}>
          {t.teacher.signOut}
        </Button>
      </div>
      {error && <p className="px-6 py-3 text-[#8C1D25]">{error}</p>}
      {rows.length === 0 ? (
        <p className="px-6 py-10 text-center text-ink-muted">{t.teacher.empty}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-start text-[15px]">
            <thead className="bg-surface-info text-ink">
              <tr>
                {[c.code, c.name, c.email, c.phone, c.registered, c.lastActive, c.flag].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 text-start font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.researchCode} className="border-t border-border-soft odd:bg-white even:bg-surface-tint/40">
                  <td className="px-4 py-3 font-semibold"><span className="equation">{r.researchCode}</span></td>
                  <td className="px-4 py-3">{r.fullName}</td>
                  <td className="px-4 py-3"><span dir="ltr">{r.email}</span></td>
                  <td className="px-4 py-3"><span dir="ltr">{r.phone}</span></td>
                  <td className="px-4 py-3">{fmt(r.registeredAt)}</td>
                  <td className="px-4 py-3">{fmt(r.lastActiveAt)}</td>
                  <td className="px-4 py-3">{r.phoneShared && <Badge tone="warning">{t.teacher.sharedPhone}</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
