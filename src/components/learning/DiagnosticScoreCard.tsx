import { CircleCheck, Target } from 'lucide-react';
import { Panel, ProgressRing, StatusRow, cn, pathwayStyles, type ConceptStatus } from '@/components/ui';

interface Props {
  heading: string;
  score: number;
  caption: string;
  ringLabel: string;
  conceptsHeading: string;
  concepts: Array<{ label: string; status: ConceptStatus }>;
  /** Targeted corrective recommendation — never changes the main pathway (D5). */
  recommendation?: { title: string; body: string };
}

/** Side-column card from the reference: diagnostic ring, concepts needing support, targeted recommendation. */
export function DiagnosticScoreCard({ heading, score, caption, ringLabel, conceptsHeading, concepts, recommendation }: Props) {
  return (
    <Panel className="overflow-hidden">
      <h2 className="bg-surface-info px-5 py-3 text-center text-h3 text-ink">{heading}</h2>
      <div className="flex flex-col items-center gap-2 px-5 pb-3 pt-4">
        <ProgressRing value={score} size={156} label={ringLabel} />
        <p className="flex items-center gap-2 text-[17px] font-semibold text-ink-body">
          <CircleCheck aria-hidden className="h-6 w-6 fill-status-check text-white" strokeWidth={2.5} />
          {caption}
        </p>
      </div>
      <div className="mx-5 border-t-2 border-surface-wave" />
      <div className="px-5 pb-5 pt-3">
        <h3 className="mb-2.5 text-h3 text-ink">{conceptsHeading}</h3>
        <ul className="space-y-2.5">
          {concepts.map((c) => (
            <StatusRow key={c.label} label={c.label} status={c.status} />
          ))}
        </ul>
        {recommendation && (
          <div className={cn('mt-4 flex items-start gap-2.5 rounded-strip border p-3', pathwayStyles.corrective.tint, pathwayStyles.corrective.border)}>
            <span className={cn('mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-pill text-white', pathwayStyles.corrective.solid)}>
              <Target aria-hidden className="h-4 w-4" strokeWidth={2.6} />
            </span>
            <p className="text-[14px] leading-[1.6] text-ink-body">
              <strong className="block text-[15px] text-ink">{recommendation.title}</strong>
              {recommendation.body}
            </p>
          </div>
        )}
      </div>
    </Panel>
  );
}
