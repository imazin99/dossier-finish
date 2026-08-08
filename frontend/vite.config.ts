import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// DOSSIER — mobile-first luxury detective game
// Path aliases keep imports clean once pages/features are added later.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@i18n": path.resolve(__dirname, "./src/i18n"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@context": path.resolve(__dirname, "./src/context"),
    },
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      // Lets the frontend always call a relative "/api/..." path (see
      // src/data/apiClient.ts) instead of a hardcoded host. Vite forwards
      // it server-side to the Express backend — this is what makes LAN
      // testing (phone -> laptop) work without editing IP addresses:
      // the phone talks to this dev server (already reachable via
      // host: true above), and this dev server talks to the backend on
      // localhost, on the laptop itself.
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
