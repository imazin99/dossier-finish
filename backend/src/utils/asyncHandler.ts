import type { NextFunction, Request, Response } from "express";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/** Every controller in this project is async; Express doesn't catch
 * rejected promises on its own, so every route gets wrapped in this
 * rather than repeating try/catch in each handler. */
export function asyncHandler(handler: AsyncHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };
}
