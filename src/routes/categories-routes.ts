import { Router } from "express";

const categoriesRouters = Router();
const categories = [];

categoriesRouters.post("/categories", (req, res) => {
  const { description, name } = req.body;

  categories.push(description, name);

  res.status(201).send();
});

export { categoriesRouters };
