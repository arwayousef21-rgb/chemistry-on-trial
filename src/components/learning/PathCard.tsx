import { BookOpen, Play, RefreshCw, Rocket, Star, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { PathwayId } from '@/styles/tokens';
import { Button, FeatureList, IllustrationSlot, RecommendedTab, SectionStrip, Sparkle, TitlePill, cn, pathwayStyles } from '@/components/ui';
import type { AssetId } from '@/assets/illustrations';

const pathwayIcon: Record<PathwayId, JSX.Element> = {
  remedial: <BookOpen className="h-7 w-7" strokeWidth={2.2} />,
  corrective: <RefreshCw className="h-7 w-7" strokeWidth={2.6} />,
  enrichment: <Star className="h-7 w-7 fill-status-gold text-status-gold" />,
};

const ctaIcon: Record<PathwayId, JSX.Element> = {
  remedial: <Play className="h-6 w-6 fill-white" />,
  corrective: <Target className="h-6 w-6" strokeWidth={2.6} />,
  enrichment: <Rocket className="h-6 w-6" strokeWidth={2.4} />,
};

const pathwayAsset: Record<PathwayId, AssetId> = {
  remedial: 'remedial-books',
  corrective: 'corrective-target',
  enrichment: 'enrichment-rocket',
};

interface PathCardProps {
  pathway: PathwayId;
  name: string;
  description: string;
  featuresHeading: string;
  features: string[];
  cta: string;
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
        'relative flex flex-col gap-4 rounded-card border px-5 pb-5 pt-5 transition md:row-span-6 md:grid md:grid-rows-subgrid md:gap-y-3.5',
        s.tint,
        recommended ? cn('border-2 shadow-raised', s.emphasisBorder) : cn('shadow-card', s.border),
      )}
    >
      {recommended && <RecommendedTab pathway={pathway}>{props.recommendedLabel}</RecommendedTab>}
      <TitlePill pathway={pathway} icon={pathwayIcon[pathway]}>
        {props.name}
      </TitlePill>

      {/* 16:9 slot for the 3D artwork; gold sparkles sit either side, as in the reference */}
      <div className="relative mx-auto flex w-full max-w-[290px] items-center justify-center px-5">
        <Sparkle className="absolute start-0 top-5" />
        <Sparkle className="absolute end-0 top-9" size={18} />
        <IllustrationSlot asset={pathwayAsset[pathway]} className="w-full max-w-[230px]" />
      </div>

      <p className="text-center text-[16px] leading-[1.7] text-ink-body">{props.description}</p>

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

