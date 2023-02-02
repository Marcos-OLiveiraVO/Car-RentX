import "reflect-metadata";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import express, { NextFunction, Response, Request } from "express";

import "./shared/container";
import "./database/data-source";

import { router } from "./routes";
import { AppError } from "./errors/appError";
import swaggerFile from "../swagger.json";

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
