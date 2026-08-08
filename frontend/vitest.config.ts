import { defineConfig } from "vitest/config";
import path from "path";

// Test-only config, deliberately separate from vite.config.ts (which
// stays exactly as the production build/dev-server config, untouched).
// Mirrors the same path aliases so test files can import with the same
// "@/..." paths as application code.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@components": path.resolve(import.meta.dirname, "./src/components"),
      "@i18n": path.resolve(import.meta.dirname, "./src/i18n"),
      "@lib": path.resolve(import.meta.dirname, "./src/lib"),
      "@hooks": path.resolve(import.meta.dirname, "./src/hooks"),
      "@types": path.resolve(import.meta.dirname, "./src/types"),
      "@context": path.resolve(import.meta.dirname, "./src/context"),
    },
  },
  test: {
    environment: "node",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.ts"],
  },
});
