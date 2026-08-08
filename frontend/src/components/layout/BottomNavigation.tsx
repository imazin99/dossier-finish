import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FolderSearch, BookOpen, Settings, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { NavTab } from "@/types/nav";
import { springSnap } from "@lib/motion";

// Signature element: a floating "Liquid Glass" dock, inspired by modern
// iOS — a frosted, saturated glass surface with a soft top sheen, floating
// above the bottom edge. The active tab gets a sliding glow pill plus a
// small icon lift, never anything flashy.
const TABS: NavTab[] = [
  { id: "cases", labelKey: "nav.cases", path: "/cases", icon: FolderSearch },
  { id: "howToPlay", labelKey: "nav.howToPlay", path: "/how-to-play", icon: BookOpen },
  { id: "settings", labelKey: "nav.settings", path: "/settings", icon: Settings },
  { id: "about", labelKey: "nav.about", path: "/about", icon: Info },
];

export function BottomNavigation() {
  const { t } = useTranslation();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
      aria-label={t("app.name")}
    >
      <div className="liquid-glass-dock flex w-full max-w-md items-center justify-between gap-1 rounded-[2rem] px-2 py-2">
        {TABS.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.path}
            className={({ isActive }) =>
              [
                "relative flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2.5 transition-colors duration-300",
                isActive ? "text-text" : "text-text-secondary hover:text-text/80",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-active"
                    className="absolute inset-0 rounded-2xl bg-primary/15 shadow-accent-glow"
                    transition={springSnap}
                  />
                )}
                <motion.span
                  className="relative z-10 flex items-center justify-center"
                  animate={isActive ? { y: -1, scale: 1.08 } : { y: 0, scale: 1 }}
                  whileTap={{ scale: 0.88 }}
                  transition={springSnap}
                >
                  <tab.icon className="h-5 w-5" strokeWidth={isActive ? 2.25 : 1.75} />
                </motion.span>
                <span className="relative z-10 text-[11px] font-body">{t(tab.labelKey)}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
