import { motion } from "framer-motion";
import { cn } from "@lib/utils";
import { pageFadeVariants } from "@lib/motion";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps a page's content: centers it at a comfortable phone-reading width
 * (so it doesn't stretch full-bleed on larger phones/tablets) and applies
 * the app's standard fade/slide-in transition on mount.
 */
export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <motion.div
      variants={pageFadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn("mx-auto flex w-full max-w-md flex-col gap-6", className)}
    >
      {children}
    </motion.div>
  );
}
