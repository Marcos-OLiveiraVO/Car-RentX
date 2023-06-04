import "reflect-metadata";
import "express-async-errors";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import express, { NextFunction, Response, Request } from "express";

import "@shared/infra/typeorm/data-source";
import "@shared/container";

import swaggerFile from "../../../../swagger.json";
import { AppError } from "@shared/errors/appError";
import { router } from "./routes";
import upload from "@config/upload";
import rateLimiter from "./middlewares/rateLimiter";

import * as Sentry from "@sentry/node";

const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());
app.use(router);

app.use(Sentry.Handlers.errorHandler());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

export { app };
