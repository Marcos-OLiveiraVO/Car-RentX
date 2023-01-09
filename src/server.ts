import express from "express";
import { categoriesRouters } from "./routes/categories-routes";
import { specificationRouters } from "./routes/specification-routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/categories", categoriesRouters);
app.use("/specifications", specificationRouters);

app.listen(PORT, () => console.log("Server is Running"));
