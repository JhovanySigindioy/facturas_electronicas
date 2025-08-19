import express from "express";
import { json } from "body-parser";
import router from "./infrastructure/api/routes";
import { correlationIdMiddleware } from "./shared/correlation-id";
import { errorHandler } from "./shared/error-handler";
import { logger } from "./shared/logger";

const app = express();

// Middlewares
app.use(json());
app.use(correlationIdMiddleware);

// Logging básico de cada request
app.use((req, _res, next) => {
  logger.info(`➡️ Request ${req.method} ${req.url}`, {
    correlationId: (req as any).correlationId,
  });
  next();
});

// Rutas
app.use("/api", router);

// Ping
app.get("/ping", (_req, res) => {
  res.json({ message: "pong" });
});

// Error handler global (último)
app.use(errorHandler);

export default app;
