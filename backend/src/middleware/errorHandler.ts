import type { NextFunction, Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { ApiError } from "../utils/ApiError.js";

interface MongoServerErrorLike {
  code?: number;
  keyValue?: Record<string, unknown>;
}

/**
 * Must be registered LAST, after every route. Express recognizes an
 * error-handling middleware by its 4-argument signature.
 */
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    res.status(err.status).json({ error: err.message, details: err.details });
    return;
  }

  if (err instanceof MongooseError.ValidationError) {
    res.status(400).json({
      error: "Case data failed validation.",
      details: Object.fromEntries(Object.entries(err.errors).map(([field, e]) => [field, e.message])),
    });
    return;
  }

  if (err instanceof MongooseError.CastError) {
    res.status(400).json({ error: `Invalid value for "${err.path}".` });
    return;
  }

  // Duplicate key error (e.g. two cases with the same `id`) — Mongoose
  // doesn't wrap this in its own error class, it's a raw MongoServerError.
  const mongoErr = err as MongoServerErrorLike;
  if (mongoErr?.code === 11000) {
    const field = mongoErr.keyValue ? Object.keys(mongoErr.keyValue)[0] : "field";
    res.status(409).json({ error: `A case with this ${field} already exists.` });
    return;
  }

  console.error("[api] Unhandled error:", err);
  res.status(500).json({ error: "Something went wrong on the server." });
}
