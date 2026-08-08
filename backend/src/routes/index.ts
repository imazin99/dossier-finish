import { Router } from "express";
import { casesRouter } from "./cases.js";
import { authRouter } from "./auth.js";

// Central router. Feature routers (cases, investigations, achievements,
// auth, etc.) get mounted here as they're built.
export const router = Router();

router.use("/cases", casesRouter);
router.use("/auth", authRouter);
