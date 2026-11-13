import { Target } from 'lucide-react';
import { cn, pathwayStyles } from '@/components/ui';

/** Targeted corrective recommendation (does not change the main pathway — D5). */
export function RecommendationCard({ title, body }: { title: string; body: string }) {
  return (
    <section className={cn('flex items-start gap-3 rounded-panel border p-4 shadow-card', pathwayStyles.corrective.tint, pathwayStyles.corrective.border)}>
      <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-pill text-white', pathwayStyles.corrective.solid)}>
        <Target aria-hidden className="h-5 w-5" strokeWidth={2.6} />
      </span>
      <div>
        <h2 className="text-[17px] font-bold text-ink">{title}</h2>
        <p className="text-small text-ink-body">{body}</p>
      </div>
    </section>
  );
}
