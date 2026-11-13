import { colors } from '@/styles/tokens';

/**
 * White page with the reference's soft blue band under the navigation and
 * light wave shapes in the reading-end bottom corner. Decorative SVG only.
 */
export function PageBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-surface">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-surface-tint to-transparent" />
      <svg className="absolute bottom-0 end-0 h-[260px] w-[520px] ltr:-scale-x-100" viewBox="0 0 520 260" preserveAspectRatio="none">
        <path d="M0 150 C 120 90, 220 210, 360 150 S 520 120, 520 120 L 520 260 L 0 260 Z" fill={colors.surface.wave} opacity="0.55" />
        <path d="M0 200 C 140 150, 260 250, 400 200 S 520 180, 520 180 L 520 260 L 0 260 Z" fill={colors.surface.info} opacity="0.8" />
      </svg>
    </div>
  );
}
