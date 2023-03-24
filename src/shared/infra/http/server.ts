import "reflect-metadata";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import express, { NextFunction, Response, Request } from "express";

import "@shared/infra/typeorm/data-source";
import "@shared/container";

import swaggerFile from "../../../../swagger.json";
import { AppError } from "@shared/errors/appError";
import { router } from "./routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

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

app.listen(PORT, () => console.log("Server is Running"));
