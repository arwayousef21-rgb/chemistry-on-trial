import { BookOpen, Play, RefreshCw, Rocket, Star, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { PathwayId } from '@/styles/tokens';
import { Button, FeatureList, IllustrationSlot, RecommendedTab, SectionStrip, Sparkle, TitlePill, cn, pathwayStyles } from '@/components/ui';
import type { IllustrationId } from '@/components/ui';

const pathwayIcon: Record<PathwayId, JSX.Element> = {
  remedial: <BookOpen className="h-8 w-8" strokeWidth={2.2} />,
  corrective: <RefreshCw className="h-8 w-8" strokeWidth={2.6} />,
  enrichment: <Star className="h-8 w-8 fill-status-gold text-status-gold" />,
};

const ctaIcon: Record<PathwayId, JSX.Element> = {
  remedial: <Play className="h-6 w-6 fill-white" />,
  corrective: <Target className="h-6 w-6" strokeWidth={2.6} />,
  enrichment: <Rocket className="h-6 w-6" strokeWidth={2.4} />,
};

const illustrationId: Record<PathwayId, IllustrationId> = {
  remedial: 'pathway-books',
  corrective: 'pathway-target',
  enrichment: 'pathway-rocket',
};

interface PathCardProps {
  pathway: PathwayId;
  name: string;
  description: string;
  featuresHeading: string;
  features: string[];
  cta: string;
  illustrationAlt: string;
  recommended?: boolean;
  recommendedLabel: string;
}

/** One of the three pathway cards, following the reference card composition. */
export function PathCard(props: PathCardProps) {
  const { pathway, recommended } = props;
  const s = pathwayStyles[pathway];
  const navigate = useNavigate();
  return (
    <article
      aria-label={props.name}
      className={cn(
        // On wide screens each card spans 6 shared rows (CSS subgrid), so titles, illustrations,
        // strips and buttons line up across the three cards even when a title wraps.
        'relative flex flex-col gap-5 rounded-card border p-5 transition md:row-span-6 md:grid md:grid-rows-subgrid md:gap-y-5',
        s.tint,
        recommended ? cn('border-2 shadow-raised', s.emphasisBorder) : cn('shadow-card', s.border),
      )}
    >
      {recommended && <RecommendedTab pathway={pathway}>{props.recommendedLabel}</RecommendedTab>}
      <TitlePill pathway={pathway} icon={pathwayIcon[pathway]}>
        {props.name}
      </TitlePill>

      <div className="relative mx-auto flex h-[150px] w-full max-w-[260px] items-center justify-center">
        <Sparkle className="absolute start-2 top-6" />
        <Sparkle className="absolute end-2 top-10" size={18} />
        <IllustrationSlot id={illustrationId[pathway]} alt={props.illustrationAlt} className="h-[140px] w-[180px]" />
      </div>

      <p className="text-center text-[17px] leading-[1.75] text-ink-body">{props.description}</p>

      <SectionStrip pathway={pathway}>{props.featuresHeading}</SectionStrip>
      <div className="flex justify-center">
        <FeatureList items={props.features} />
      </div>

      <div className="mt-auto self-end">
        {/* Pathway screens are built in a later stage; the button opens an explanatory placeholder screen. */}
        <Button variant={pathway} icon={ctaIcon[pathway]} fullWidth onClick={() => navigate(`/pathways/${pathway}`)}>
          {props.cta}
        </Button>
      </div>
    </article>
  );
}

