import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const correlationId = (req as any).correlationId || "N/A";

  logger.error("Error en la aplicación", {
    correlationId,
    error: err.message || err,
  });

  res.status(500).json({
    message: "Error interno del servidor",
    correlationId,
  });
};
