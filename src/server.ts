import express from "express";
import { router } from "./routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log("Server is Running"));
