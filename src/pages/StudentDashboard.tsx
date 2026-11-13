import { useI18n } from '@/i18n/I18nProvider';
import { demoStudent } from '@/data/synthetic/demoStudent';
import { InfoNote, IllustrationSlot } from '@/components/ui';
import { HeroBanner } from '@/components/learning/HeroBanner';
import { PathCard } from '@/components/learning/PathCard';
import { DiagnosticScoreCard } from '@/components/learning/DiagnosticScoreCard';
import { EquiStrip } from '@/components/assistant/EquiStrip';
import type { PathwayId } from '@/styles/tokens';

/** Ordered as in the reference (reading order: Remedial → Corrective → Enrichment). */
const PATHWAYS: PathwayId[] = ['remedial', 'corrective', 'enrichment'];

/** Student dashboard (Stage 2 visual foundation, synthetic data only). */
export function StudentDashboard() {
  const { t, lang, format } = useI18n();
  const s = demoStudent;

  const sideColumn = (
    <div className="space-y-5">
      <DiagnosticScoreCard
        heading={t.score.heading}
        score={s.overallScore}
        caption={t.score.caption}
        ringLabel={format(t.score.ringLabel, { value: s.overallScore })}
        conceptsHeading={t.score.conceptsHeading}
        concepts={s.conceptsNeedingSupport.map((c) => ({ label: c.label[lang], status: c.status }))}
        recommendation={{ title: t.recommendation.title, body: format(t.recommendation.body, { concept: s.targetedRecommendation.concept[lang] }) }}
      />
      <InfoNote title={t.note.title}>{t.note.body}</InfoNote>
      {/* Laboratory glassware with decorative science elements behind it, as in the reference */}
      <div className="relative mx-auto hidden h-[128px] w-[260px] lg:block">
        <IllustrationSlot asset="science-decor" decorative compact className="absolute bottom-1 end-0 w-[72px]" />
        <IllustrationSlot asset="lab-glassware" className="absolute bottom-0 start-0 w-[190px]" />
      </div>
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      {/* Main column — reading-start side (right in Arabic) */}
      <div className="min-w-0 space-y-5">
        <HeroBanner title={t.banner.title} subtitle={t.banner.subtitle} />

        <div className="lg:hidden">{sideColumn}</div>

        <div className="grid gap-x-5 gap-y-10 pt-4 md:grid-cols-3 md:gap-y-0">
          {PATHWAYS.map((p) => (
            <PathCard
              key={p}
              pathway={p}
              name={t.pathways[p].name}
              description={t.pathways[p].description}
              featuresHeading={t.pathways.whatYouFind}
              features={t.pathways[p].features}
              cta={t.pathways[p].cta}
              recommended={s.assignedPathway === p}
              recommendedLabel={t.pathways.recommended}
            />
          ))}
        </div>

        <EquiStrip />
      </div>

      {/* Side column — reading-end side (left in Arabic), as in the reference */}
      <aside className="hidden lg:block">{sideColumn}</aside>
    </div>
  );
}
