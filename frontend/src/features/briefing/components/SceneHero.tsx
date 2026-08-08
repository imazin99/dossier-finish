interface SceneHeroProps {
  image?: string;
}

/**
 * Cinematic scene/location art at the top of the Briefing screen (960×540,
 * matches this 16/9 frame exactly). Purely decorative — renders nothing if
 * a case has no locationImage, so any future case without art degrades
 * gracefully instead of leaving a gap.
 */
export function SceneHero({ image }: SceneHeroProps) {
  if (!image) return null;

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border/60">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />
    </div>
  );
}
