import { clsx, type ClassValue } from "clsx";

/** Merge conditional class names. Add tailwind-merge later if class conflicts appear. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
