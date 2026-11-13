import { CircleAlert, CircleCheck, CircleDot } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

export type ConceptStatus = 'weak' | 'developing' | 'mastered';

const icon = {
  weak: <CircleAlert aria-hidden className="h-6 w-6 shrink-0 fill-status-danger text-white" strokeWidth={2.5} />,
  developing: <CircleDot aria-hidden className="h-6 w-6 shrink-0 fill-status-warning text-white" strokeWidth={2.5} />,
  mastered: <CircleCheck aria-hidden className="h-6 w-6 shrink-0 fill-status-check text-white" strokeWidth={2.5} />,
};

/** One concept with its status marker (red "!" in the reference). */
export function StatusRow({ label, status }: { label: string; status: ConceptStatus }) {
  const { t } = useI18n();
  return (
    <li className="flex items-center gap-3 text-[18px] font-semibold text-ink-body">
      {icon[status]}
      <span>{label}</span>
      <span className="sr-only">— {t.status[status]}</span>
    </li>
  );
}
