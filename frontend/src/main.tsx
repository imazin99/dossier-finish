import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@i18n/index";
import "./styles/globals.css";
import App from "./App";
import { registerServiceWorker } from "@lib/registerServiceWorker";

registerServiceWorker();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
