import { motion } from "framer-motion";
import { cn } from "@lib/utils";
import { sectionTitleVariants } from "@lib/motion";

interface SectionTitleProps {
  title: string;
  eyebrow?: string;
  /** Optional trailing slot, e.g. a "see all" link or icon button. */
  action?: React.ReactNode;
  className?: string;
}

/**
 * Section heading used to introduce a group of content (a row of cases,
 * a settings group, etc). The small red accent bar echoes the case-file
 * motif without relying on a gradient.
 */
export function SectionTitle({ title, eyebrow, action, className }: SectionTitleProps) {
  return (
    <motion.div
      variants={sectionTitleVariants}
      initial="initial"
      animate="animate"
      className={cn("flex items-end justify-between gap-3", className)}
    >
      <div className="flex flex-col gap-1">
        {eyebrow && <span className="file-label">{eyebrow}</span>}
        <div className="flex items-center gap-2.5">
          <span className="h-4 w-[3px] rounded-full bg-primary shadow-accent-glow" />
          <h2 className="font-display text-xl font-bold text-text">{title}</h2>
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  );
}
