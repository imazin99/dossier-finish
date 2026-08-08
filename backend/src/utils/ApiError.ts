/**
 * A thrown error that carries an HTTP status code. Controllers throw this
 * for expected failure cases (not found, validation, conflict); the
 * central error handler (middleware/errorHandler.ts) reads `.status` off
 * of it to respond correctly instead of always falling back to 500.
 */
export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }

  static badRequest(message: string, details?: unknown) {
    return new ApiError(400, message, details);
  }

  static notFound(message: string) {
    return new ApiError(404, message);
  }

  static unauthorized(message: string) {
    return new ApiError(401, message);
  }

  static conflict(message: string) {
    return new ApiError(409, message);
  }
}
