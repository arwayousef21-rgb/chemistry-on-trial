import { CircleCheck } from 'lucide-react';

/** List with green check marks, as under "what you will find here". */
export function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-small text-ink-body">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <CircleCheck aria-hidden className="mt-0.5 h-[22px] w-[22px] shrink-0 fill-status-check text-white" strokeWidth={2.5} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
