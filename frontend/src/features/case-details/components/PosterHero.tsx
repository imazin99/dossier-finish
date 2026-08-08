import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@context/LanguageContext";
import { BackButton } from "@components/ui";

interface PosterHeroProps {
  icon: LucideIcon;
  image?: string;
  onBack: () => void;
}

/**
 * Large cinematic poster at the top of the Case Details screen. Renders
 * the case's real cover art (960×1200, matches this 4/5 frame exactly)
 * when available, falling back to the icon+glow placeholder otherwise.
 * The back button floats over the poster (a common cinematic
 * detail-screen pattern).
 */
export function PosterHero({ icon: Icon, image, onBack }: PosterHeroProps) {
  const { direction } = useLanguage();
  const cornerClass = direction === "rtl" ? "right-4" : "left-4";

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border/60 bg-card/40">
      {image ? (
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
          <Icon className="relative h-24 w-24 text-text-secondary/50" strokeWidth={1.25} />
        </div>
      )}

      {/* Bottom scrim for legibility if content is ever overlaid here later */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/50 to-transparent" />

      <div className={`absolute top-4 ${cornerClass}`}>
        <BackButton onClick={onBack} />
      </div>
    </div>
  );
}
