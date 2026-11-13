/**
 * SYNTHETIC DEMONSTRATION DATA — not a real student, not real results.
 * Used only to render the Stage 2 visual foundation (ARCHITECTURE_DECISIONS D9).
 *
 * The overall score mirrors the reference image (65 %). Under the approved
 * initial thresholds (D4: <50 Remedial, 50–<80 Corrective, ≥80 Enrichment)
 * 65 % corresponds to the Corrective & Reinforcement pathway; this value is
 * written by hand here — the real recommendation engine is a later stage.
 * Concept names are taken from the draft glossary in the scientific
 * specification §14 (pending teacher approval) and are used as labels only.
 */
import type { PathwayId } from '@/styles/tokens';
import type { ConceptStatus } from '@/components/ui';

export interface DemoStudent {
  isSynthetic: true;
  overallScore: number;
  assignedPathway: PathwayId;
  conceptsNeedingSupport: Array<{ label: { ar: string; en: string }; status: ConceptStatus }>;
  targetedRecommendation: { concept: { ar: string; en: string } };
}

export const demoStudent: DemoStudent = {
  isSynthetic: true,
  overallScore: 65,
  assignedPathway: 'corrective',
  conceptsNeedingSupport: [
    { label: { ar: 'الاتزان الديناميكي', en: 'Dynamic equilibrium' }, status: 'weak' },
    { label: { ar: 'مبدأ لوشاتيليه', en: 'Le Chatelier’s principle' }, status: 'weak' },
  ],
  targetedRecommendation: { concept: { ar: 'الاتزان الديناميكي', en: 'Dynamic equilibrium' } },
};
