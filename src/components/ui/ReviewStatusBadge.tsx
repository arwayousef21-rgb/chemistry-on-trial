import { CircleCheck, Clock, OctagonX } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { Badge } from './Badge';

export type ReviewStatus = 'approved' | 'pending' | 'hold';

/** Content-approval status, shown only in teacher preview (ARCHITECTURE_DECISIONS D10). */
export function ReviewStatusBadge({ status }: { status: ReviewStatus }) {
  const { t } = useI18n();
  const map = {
    approved: { tone: 'success', icon: <CircleCheck className="h-3.5 w-3.5" /> },
    pending: { tone: 'warning', icon: <Clock className="h-3.5 w-3.5" /> },
    hold: { tone: 'danger', icon: <OctagonX className="h-3.5 w-3.5" /> },
  } as const;
  return (
    <Badge tone={map[status].tone} icon={map[status].icon}>
      {t.status[status]}
    </Badge>
  );
}
