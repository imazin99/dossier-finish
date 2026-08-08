import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { login, logout, me } from "../controllers/authController.js";

export const authRouter = Router();

authRouter.post("/login", asyncHandler(login));
authRouter.post("/logout", asyncHandler(logout));
authRouter.get("/me", asyncHandler(me));
