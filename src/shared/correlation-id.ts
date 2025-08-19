import { Request, Response, NextFunction } from "express";
import { generateCorrelationId } from "./logger";

export const correlationIdMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  // Generar ID único si no existe
  const correlationId =
    req.headers["x-correlation-id"]?.toString() || generateCorrelationId();

  // Guardar en el request
  (req as any).correlationId = correlationId;

  // Añadirlo a los headers de respuesta
  _res.setHeader("x-correlation-id", correlationId);

  next();
};
