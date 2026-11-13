import { describe, expect, it } from 'vitest';
import { colors } from './tokens';

/** Guards the owner-approved decisions recorded in content/ARCHITECTURE_DECISIONS.md (D3, D12). */
describe('design tokens', () => {
  it('keeps the approved pathway colour mapping', () => {
    expect(colors.remedial.solid).toBe('#1866B4');
    expect(colors.corrective.solid).toBe('#00845A');
    expect(colors.enrichment.solid).toBe('#784EAE');
  });

  it('keeps the approved accessibility adjustments', () => {
    expect(colors.corrective.button).toBe('#00845A');
    expect(colors.status.ring).toBe('#049870');
    expect(colors.status.ringHighlight).toBe('#04AC7C');
  });
});
