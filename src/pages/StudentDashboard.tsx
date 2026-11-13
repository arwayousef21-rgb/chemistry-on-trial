import { useI18n } from '@/i18n/I18nProvider';
import { demoStudent } from '@/data/synthetic/demoStudent';
import { InfoNote, IllustrationSlot } from '@/components/ui';
import { HeroBanner } from '@/components/learning/HeroBanner';
import { PathCard } from '@/components/learning/PathCard';
import { DiagnosticScoreCard } from '@/components/learning/DiagnosticScoreCard';
import { RecommendationCard } from '@/components/learning/RecommendationCard';
import { EquiStrip } from '@/components/assistant/EquiStrip';
import type { PathwayId } from '@/styles/tokens';

/** Ordered as in the reference (reading order: Remedial → Corrective → Enrichment). */
const PATHWAYS: PathwayId[] = ['remedial', 'corrective', 'enrichment'];

const ILLUSTRATION_ALT = {
  ar: { remedial: 'كتب ثلاثية الأبعاد', corrective: 'هدف وسهم ثلاثي الأبعاد', enrichment: 'صاروخ ثلاثي الأبعاد', banner: 'هدف وسهم', flasks: 'دوارق كيميائية' },
  en: { remedial: '3D stack of books', corrective: '3D target with arrow', enrichment: '3D rocket', banner: 'Target with arrow', flasks: 'Chemistry flasks' },
} as const;

/** Student dashboard (Stage 2 visual foundation, synthetic data only). */
export function StudentDashboard() {
  const { t, lang, format } = useI18n();
  const alt = ILLUSTRATION_ALT[lang];
  const s = demoStudent;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      {/* Main column — appears on the reading-start side (right in Arabic) */}
      <div className="min-w-0 space-y-7">
        <HeroBanner title={t.banner.title} subtitle={t.banner.subtitle} illustrationAlt={alt.banner} />

        <div className="lg:hidden">
          {renderSideColumn()}
        </div>

        <div className="grid gap-x-5 gap-y-10 pt-3 md:grid-cols-3 md:gap-y-0">
          {PATHWAYS.map((p) => (
            <PathCard
              key={p}
              pathway={p}
              name={t.pathways[p].name}
              description={t.pathways[p].description}
              featuresHeading={t.pathways.whatYouFind}
              features={t.pathways[p].features}
              cta={t.pathways[p].cta}
              illustrationAlt={alt[p]}
              recommended={s.assignedPathway === p}
              recommendedLabel={t.pathways.recommended}
            />
          ))}
        </div>

        <EquiStrip />
      </div>

      {/* Side column — reading-end side (left in Arabic), as in the reference */}
      <aside className="hidden lg:block">
        {renderSideColumn()}
      </aside>
    </div>
  );

  function renderSideColumn() {
    return (
      <div className="space-y-6">
        <DiagnosticScoreCard
          heading={t.score.heading}
          score={s.overallScore}
          caption={t.score.caption}
          ringLabel={format(t.score.ringLabel, { value: s.overallScore })}
          conceptsHeading={t.score.conceptsHeading}
          concepts={s.conceptsNeedingSupport.map((c) => ({ label: c.label[lang], status: c.status }))}
        />
        <RecommendationCard title={t.recommendation.title} body={format(t.recommendation.body, { concept: s.targetedRecommendation.concept[lang] })} />
        <InfoNote title={t.note.title}>{t.note.body}</InfoNote>
        <IllustrationSlot id="chemistry-flasks" alt={alt.flasks} className="mx-auto hidden h-[150px] w-[220px] lg:flex" />
      </div>
    );
  }
}
