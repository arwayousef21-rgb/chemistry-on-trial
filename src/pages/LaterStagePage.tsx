import { Link } from 'react-router-dom';
import { Hourglass } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { Card } from '@/components/ui';

/** Honest placeholder for screens that belong to later, not-yet-approved stages. */
export function LaterStagePage() {
  const { t } = useI18n();
  return (
    <Card className="mx-auto mt-6 max-w-[640px] p-8 text-center">
      <Hourglass aria-hidden className="mx-auto mb-4 h-12 w-12 text-remedial-solid" />
      <h1 className="text-h2 text-ink">{t.stage.laterStageTitle}</h1>
      <p className="mt-3 text-body text-ink-body">{t.stage.laterStageBody}</p>
      <Link to="/" className="mt-6 inline-flex min-h-[48px] items-center rounded-pill bg-navy-900 px-6 font-bold text-white hover:bg-navy-700">
        {t.stage.backHome}
      </Link>
    </Card>
  );
}
