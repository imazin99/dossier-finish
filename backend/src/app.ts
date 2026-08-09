import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { router as apiRouter } from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

/**
 * Express application factory.
 * Core middleware is wired here; feature routes/controllers are added
 * under src/routes and src/controllers in a later step.
 */
export function createApp(): Express {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      // A literal "*" origin doesn't work for credentialed requests (the
      // admin session cookie) — browsers reject it outright per the CORS
      // spec. Falling back to the Vite dev default keeps local dev
      // working out of the box; anything beyond that requires
      // CLIENT_ORIGIN to be set (see .env.example), including LAN/prod.
      origin: [
      "https://dossier-finish.vercel.app",
      "http://localhost",
      "https://localhost",
    ],
    credentials: true,
  })
);
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

  // Health check — confirms the server is up; not game logic.
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "dossier-backend" });
  });

  app.use("/api", apiRouter);

  // Must be registered after all routes — Express identifies error
  // middleware by its 4-argument signature.
  app.use(errorHandler);

  return app;
}
