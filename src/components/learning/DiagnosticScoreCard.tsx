import { CircleCheck } from 'lucide-react';
import { Panel, ProgressRing, StatusRow, type ConceptStatus } from '@/components/ui';

interface Props {
  heading: string;
  score: number;
  caption: string;
  ringLabel: string;
  conceptsHeading: string;
  concepts: Array<{ label: string; status: ConceptStatus }>;
}

/** Side-column card: diagnostic ring and the concepts that need support. */
export function DiagnosticScoreCard({ heading, score, caption, ringLabel, conceptsHeading, concepts }: Props) {
  return (
    <Panel className="overflow-hidden">
      <h2 className="bg-surface-info px-5 py-3 text-center text-h3 text-ink">{heading}</h2>
      <div className="flex flex-col items-center gap-3 px-5 pb-4 pt-5">
        <ProgressRing value={score} label={ringLabel} />
        <p className="flex items-center gap-2 text-[18px] font-semibold text-ink-body">
          <CircleCheck aria-hidden className="h-6 w-6 fill-status-check text-white" strokeWidth={2.5} />
          {caption}
        </p>
      </div>
      <div className="mx-5 border-t-2 border-surface-wave" />
      <div className="px-5 pb-5 pt-4">
        <h3 className="mb-3 text-h3 text-ink">{conceptsHeading}</h3>
        <ul className="space-y-3">
          {concepts.map((c) => (
            <StatusRow key={c.label} label={c.label} status={c.status} />
          ))}
        </ul>
      </div>
    </Panel>
  );
}
