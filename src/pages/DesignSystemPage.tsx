import { BookOpen, Play, RefreshCw, Rocket, Star, Target } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { colors, radii, shadows } from '@/styles/tokens';
import {
  Badge,
  Button,
  Card,
  Equation,
  FeatureList,
  IllustrationSlot,
  InfoNote,
  Panel,
  ProgressRing,
  ReviewStatusBadge,
  SectionStrip,
  StatusRow,
  TitlePill,
} from '@/components/ui';

const swatchGroups: Array<[string, Record<string, string>]> = [
  ['navy', colors.navy],
  ['ink', colors.ink],
  ['surface', colors.surface],
  ['banner', colors.banner],
  ['remedial', colors.remedial],
  ['corrective', colors.corrective],
  ['enrichment', colors.enrichment],
  ['status', colors.status],
  ['assistant', colors.assistant],
  ['illustration', colors.illustration],
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="space-y-4 p-6">
      <h2 className="text-h2 text-ink">{title}</h2>
      {children}
    </Card>
  );
}

/**
 * Living design-system reference (Stage 2). Shows every token and shared
 * component so the owner can review them in both languages.
 */
export function DesignSystemPage() {
  const { t, lang } = useI18n();
  const en = lang === 'en';
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-display text-ink-strong">{t.nav.designSystem}</h1>
        <p className="text-body text-ink-muted">
          {en ? 'Tokens sampled from the reference image, and the shared components built from them.' : 'الألوان والقيم مأخوذة من الصورة المرجعية، والمكوّنات المشتركة المبنية عليها.'}
        </p>
      </header>

      <Section title={en ? 'Colour tokens' : 'رموز الألوان'}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {swatchGroups.map(([group, values]) => (
            <div key={group}>
              <h3 className="mb-2 text-h3 text-ink">{group}</h3>
              <ul className="space-y-1.5">
                {Object.entries(values).map(([name, hex]) => (
                  <li key={name} className="flex items-center gap-3 text-[14px]">
                    <span className="h-8 w-8 shrink-0 rounded-strip border border-black/10" style={{ background: hex }} />
                    <span className="font-semibold">{name}</span>
                    <code className="equation ms-auto text-ink-muted">{hex}</code>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title={en ? 'Typography' : 'الخطوط'}>
        <p className="text-display text-ink-strong">{en ? 'Display 36 / 800' : 'عنوان رئيسي ٣٦ / ٨٠٠'}</p>
        <p className="text-h2 text-ink">{en ? 'Heading 2 · 26 / 700' : 'عنوان ثانٍ · ٢٦ / ٧٠٠'}</p>
        <p className="text-h3 text-ink">{en ? 'Heading 3 · 20 / 700' : 'عنوان ثالث · ٢٠ / ٧٠٠'}</p>
        <p className="text-body">{en ? 'Body text · 17 / 500 — Inter for English.' : 'نص أساسي · ١٧ / ٥٠٠ — خط Cairo للعربية.'}</p>
        <p className="text-small text-ink-muted">{en ? 'Small text · 15 / 500' : 'نص صغير · ١٥ / ٥٠٠'}</p>
        <div className="rounded-panel bg-surface-tint p-4 text-body">
          {en ? 'Equations stay left-to-right inside any language: ' : 'تبقى المعادلات من اليسار إلى اليمين داخل النص العربي: '}
          {/* General representation — scientific specification §2.1 (core content) */}
          <Equation tex="aA+bB \rightleftharpoons cC+dD" />
        </div>
      </Section>

      <Section title={en ? 'Radii and shadows' : 'الزوايا والظلال'}>
        <div className="flex flex-wrap gap-5">
          {Object.entries(radii).map(([name, value]) => (
            <div key={name} className="flex h-24 w-32 items-center justify-center border-2 border-remedial-solid bg-remedial-tint text-[13px] font-semibold" style={{ borderRadius: value }}>
              {name} · <span className="equation">{value}</span>
            </div>
          ))}
          {Object.entries(shadows).map(([name, value]) => (
            <div key={name} className="flex h-24 w-32 items-center justify-center rounded-panel bg-surface text-[13px] font-semibold" style={{ boxShadow: value }}>
              {name}
            </div>
          ))}
        </div>
      </Section>

      <Section title={en ? 'Pathway components' : 'مكوّنات المسارات'}>
        <div className="grid gap-5 md:grid-cols-3">
          <div className="space-y-3">
            <TitlePill pathway="remedial" as="h3" icon={<BookOpen className="h-7 w-7" />}>{t.pathways.remedial.name}</TitlePill>
            <SectionStrip pathway="remedial">{t.pathways.whatYouFind}</SectionStrip>
            <Button variant="remedial" fullWidth icon={<Play className="h-6 w-6 fill-white" />}>{t.pathways.remedial.cta}</Button>
          </div>
          <div className="space-y-3">
            <TitlePill pathway="corrective" as="h3" icon={<RefreshCw className="h-7 w-7" />}>{t.pathways.corrective.name}</TitlePill>
            <SectionStrip pathway="corrective">{t.pathways.whatYouFind}</SectionStrip>
            <Button variant="corrective" fullWidth icon={<Target className="h-6 w-6" />}>{t.pathways.corrective.cta}</Button>
          </div>
          <div className="space-y-3">
            <TitlePill pathway="enrichment" as="h3" icon={<Star className="h-7 w-7 fill-status-gold text-status-gold" />}>{t.pathways.enrichment.name}</TitlePill>
            <SectionStrip pathway="enrichment">{t.pathways.whatYouFind}</SectionStrip>
            <Button variant="enrichment" fullWidth icon={<Rocket className="h-6 w-6" />}>{t.pathways.enrichment.cta}</Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="navy" size="md">{en ? 'Navy button' : 'زر كحلي'}</Button>
          <Button variant="assistant" size="md">{t.equi.cta}</Button>
          <Button variant="outline" size="md">{en ? 'Outline button' : 'زر بإطار'}</Button>
          <Button variant="remedial" size="md" disabled>{en ? 'Disabled' : 'غير متاح'}</Button>
        </div>
      </Section>

      <Section title={en ? 'Status and feedback' : 'الحالة والتغذية الراجعة'}>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex justify-center">
            <ProgressRing value={65} label="65%" />
          </div>
          <ul className="space-y-3">
            <StatusRow label={t.status.weak} status="weak" />
            <StatusRow label={t.status.developing} status="developing" />
            <StatusRow label={t.status.mastered} status="mastered" />
          </ul>
          <div className="space-y-3">
            <FeatureList items={t.pathways.corrective.features} />
            <div className="flex flex-wrap gap-2">
              <ReviewStatusBadge status="approved" />
              <ReviewStatusBadge status="pending" />
              <ReviewStatusBadge status="hold" />
              <Badge tone="info">{t.stage.preview}</Badge>
            </div>
          </div>
        </div>
      </Section>

      <Section title={en ? 'Panels and notes' : 'البطاقات والملاحظات'}>
        <div className="grid gap-5 md:grid-cols-2">
          <Panel className="p-5">
            <h3 className="text-h3 text-ink">{en ? 'Panel' : 'بطاقة جانبية'}</h3>
            <p className="text-small">{en ? 'White panel with soft border and shadow.' : 'بطاقة بيضاء بإطار وظل ناعمين.'}</p>
          </Panel>
          <InfoNote title={t.note.title}>{t.note.body}</InfoNote>
        </div>
      </Section>

      <Section title={en ? '3D illustration slots (assets pending)' : 'مواضع الرسوم ثلاثية الأبعاد (قيد الإعداد)'}>
        <p className="text-small text-ink-muted">
          {en
            ? 'Clearly labelled placeholders reserve the space until the approved 3D assets are produced (see design/3d-illustration-style-guide.md).'
            : 'عناصر نائبة واضحة تحجز المساحة حتى تُنتج الرسوم ثلاثية الأبعاد المعتمدة (انظر دليل أسلوب الرسوم).'}
        </p>
        <div className="flex flex-wrap gap-4">
          <IllustrationSlot id="pathway-books" alt={en ? 'Books' : 'كتب'} className="h-32 w-40" />
          <IllustrationSlot id="pathway-target" alt={en ? 'Target' : 'هدف'} className="h-32 w-40" />
          <IllustrationSlot id="pathway-rocket" alt={en ? 'Rocket' : 'صاروخ'} className="h-32 w-40" />
          <IllustrationSlot id="equi-pointing" alt="EQUI" className="h-32 w-40" />
          <IllustrationSlot id="chemistry-flasks" alt={en ? 'Flasks' : 'دوارق'} className="h-32 w-40" />
        </div>
      </Section>
    </div>
  );
}
