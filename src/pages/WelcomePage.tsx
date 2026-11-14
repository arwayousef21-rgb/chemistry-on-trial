import { useState, type FormEvent } from 'react';
import { LogIn, Play, UserPlus } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { useStudentSession } from '@/data/StudentSessionProvider';
import { api } from '@/data/apiClient';
import { Button, Card, Checkbox, IllustrationSlot, InfoNote, TextField } from '@/components/ui';
import { validateRegistration, validateResume, type FieldError } from '@shared/validation';

type View = 'register' | 'resume';
type FieldKey = 'fullName' | 'email' | 'phone' | 'consent';

/**
 * Welcome screen (D15): first registration with full name, email and Egyptian mobile number,
 * or "I already have an account" (email + phone only) on a new device.
 * No passwords, no verification, no return codes.
 */
export function WelcomePage() {
  const { t } = useI18n();
  const { setStudent } = useStudentSession();
  const [view, setView] = useState<View>('register');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // hidden field: only bots fill it in
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, FieldError>>>({});
  const [formError, setFormError] = useState<'emailExists' | 'noMatch' | 'tooMany' | 'generic' | null>(null);
  const [busy, setBusy] = useState(false);

  const e = t.access.errors;
  const fieldMessage = (key: FieldKey): string | undefined => {
    const err = fieldErrors[key];
    if (!err) return undefined;
    if (err === 'required') return key === 'consent' ? e.consentRequired : e.required;
    return { fullName: e.fullNameInvalid, email: e.emailInvalid, phone: e.phoneInvalid, consent: e.consentRequired }[key];
  };

  const switchView = (next: View) => {
    setView(next);
    setFieldErrors({});
    setFormError(null);
  };

  const mapServerError = (error: string) =>
    error === 'email_exists' ? 'emailExists' : error === 'no_match' ? 'noMatch' : error === 'too_many_attempts' ? 'tooMany' : 'generic';

  async function onRegister(ev: FormEvent) {
    ev.preventDefault();
    setFormError(null);
    const v = validateRegistration({ fullName, email, phone, consent });
    if (!v.ok) {
      setFieldErrors(v.errors);
      return;
    }
    setFieldErrors({});
    setBusy(true);
    const r = await api.register({ ...v.value, consent, website });
    setBusy(false);
    if (r.ok) return setStudent(r.data.student);
    if (r.fields) setFieldErrors(r.fields);
    else setFormError(mapServerError(r.error));
  }

  async function onResume(ev: FormEvent) {
    ev.preventDefault();
    setFormError(null);
    const v = validateResume({ email, phone });
    if (!v.ok) {
      setFieldErrors(v.errors);
      return;
    }
    setFieldErrors({});
    setBusy(true);
    const r = await api.resume({ email: v.email, phone: v.phone });
    setBusy(false);
    if (r.ok) return setStudent(r.data.student);
    if (r.fields) setFieldErrors(r.fields);
    else setFormError(mapServerError(r.error));
  }

  return (
    <div className="mx-auto grid max-w-[1100px] gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <Card className="overflow-hidden">
        <div className="bg-banner-gradient px-6 py-6 text-center md:px-10">
          <h1 className="text-[28px] font-extrabold leading-[1.35] text-ink-strong md:text-display">
            {view === 'register' ? t.access.welcomeTitle : t.access.resumeTitle}
          </h1>
          <p className="mt-1.5 text-[17px] text-ink-body md:text-[19px]">{view === 'register' ? t.app.tagline : t.access.resumeIntro}</p>
        </div>

        <div className="px-6 py-6 md:px-10">
          {formError && (
            <div role="alert" className="mb-5 rounded-panel border border-[#F4B4B9] bg-[#FDE7E9] px-4 py-3 text-[15px] font-semibold text-[#8C1D25]">
              {e[formError]}
              {formError === 'emailExists' && (
                <button type="button" onClick={() => switchView('resume')} className="ms-2 underline underline-offset-4">
                  {t.access.haveAccount}
                </button>
              )}
            </div>
          )}

          {view === 'register' ? (
            <form noValidate onSubmit={onRegister} className="space-y-5" aria-label={t.access.welcomeTitle}>
              <p className="text-[16px] text-ink-muted">{t.access.welcomeIntro}</p>
              <TextField label={t.access.fullName} autoComplete="name" value={fullName} onChange={(x) => setFullName(x.target.value)} error={fieldMessage('fullName')} maxLength={80} />
              <TextField label={t.access.email} type="email" inputMode="email" autoComplete="email" ltr value={email} onChange={(x) => setEmail(x.target.value)} error={fieldMessage('email')} maxLength={254} />
              <TextField label={t.access.phone} type="tel" inputMode="tel" autoComplete="tel" ltr hint={t.access.phoneHint} value={phone} onChange={(x) => setPhone(x.target.value)} error={fieldMessage('phone')} maxLength={20} placeholder="01XXXXXXXXX" />
              {/* Hidden from people; bots that fill it in are rejected by the server. */}
              <input type="text" name="website" value={website} onChange={(x) => setWebsite(x.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0 [clip:rect(0,0,0,0)]" />
              <Checkbox checked={consent} onChange={setConsent} error={fieldMessage('consent')}>
                {t.access.consent}
              </Checkbox>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row-reverse sm:justify-start">
                <Button type="submit" variant="remedial" icon={<Play className="h-5 w-5 fill-white" />} disabled={busy} className="sm:min-w-[240px]">
                  {busy ? t.access.working : t.access.start}
                </Button>
                <Button type="button" variant="outline" icon={<LogIn className="h-5 w-5" />} onClick={() => switchView('resume')} disabled={busy}>
                  {t.access.haveAccount}
                </Button>
              </div>
            </form>
          ) : (
            <form noValidate onSubmit={onResume} className="space-y-5" aria-label={t.access.resumeTitle}>
              <TextField label={t.access.email} type="email" inputMode="email" autoComplete="email" ltr value={email} onChange={(x) => setEmail(x.target.value)} error={fieldMessage('email')} maxLength={254} />
              <TextField label={t.access.phone} type="tel" inputMode="tel" autoComplete="tel" ltr hint={t.access.phoneHint} value={phone} onChange={(x) => setPhone(x.target.value)} error={fieldMessage('phone')} maxLength={20} placeholder="01XXXXXXXXX" />
              <div className="flex flex-col gap-3 pt-1 sm:flex-row-reverse sm:justify-start">
                <Button type="submit" variant="corrective" icon={<LogIn className="h-5 w-5" />} disabled={busy} className="sm:min-w-[200px]">
                  {busy ? t.access.working : t.access.resume}
                </Button>
                <Button type="button" variant="outline" icon={<UserPlus className="h-5 w-5" />} onClick={() => switchView('register')} disabled={busy}>
                  {t.access.backToRegister}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Card>

      <aside className="space-y-5">
        <Card tone="banner" className="flex flex-col items-center gap-3 px-6 py-6 text-center">
          <IllustrationSlot asset="equi-robot" className="w-[170px]" mirrorInLtr />
          <p className="text-[17px] font-semibold text-ink-body">{t.access.equiHello}</p>
        </Card>
        <InfoNote title={t.access.privacyTitle}>{t.access.privacyBody}</InfoNote>
      </aside>
    </div>
  );
}
