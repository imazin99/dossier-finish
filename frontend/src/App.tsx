import { RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { LanguageProvider } from "@context/LanguageContext";
import { SettingsProvider } from "@context/SettingsContext";
import { CasesProvider } from "@context/CasesContext";
import { AuthProvider } from "@context/AuthContext";
import { router } from "@/router";

export default function App() {
  return (
    <LanguageProvider>
      <SettingsProvider>
        <CasesProvider>
          <AuthProvider>
            <RouterProvider router={router} />
            <Analytics />
            <SpeedInsights />
          </AuthProvider>
        </CasesProvider>
      </SettingsProvider>
    </LanguageProvider>
  );
}
