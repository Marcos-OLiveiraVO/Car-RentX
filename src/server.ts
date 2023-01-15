import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger.json";
import { router } from "./routes";

import "./database/data-source";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.listen(PORT, () => console.log("Server is Running"));
