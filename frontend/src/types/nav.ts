import type { LucideIcon } from "lucide-react";

// Bottom navigation tab definition.
export interface NavTab {
  id: "cases" | "howToPlay" | "settings" | "about";
  labelKey: string; // i18n key, e.g. "nav.cases"
  path: string;
  icon: LucideIcon;
}
