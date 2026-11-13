import { Lightbulb } from 'lucide-react';
import { Panel } from './Card';

/** Light-blue note card with a lightbulb, as in the reference's side column. */
export function InfoNote({ title, children }: { title: string; children: string }) {
  return (
    <Panel tone="info" className="p-5">
      <h2 className="mb-2 flex items-center gap-2 text-h3 text-ink">
        <Lightbulb aria-hidden className="h-7 w-7 fill-status-gold text-[#B07A10]" />
        {title}
      </h2>
      <p className="text-small text-ink-body">{children}</p>
    </Panel>
  );
}
