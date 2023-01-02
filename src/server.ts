import express, { response } from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "its working" }).send();
});

app.post("/courses", (req, res) => {
  const { name } = req.body;

  res.send(name);
});

app.listen(PORT, () => console.log("Server is Running"));
