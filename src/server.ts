import express, { response } from "express";
import { categoriesRouters } from "./routes/categories-routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/", categoriesRouters);

app.listen(PORT, () => console.log("Server is Running"));
