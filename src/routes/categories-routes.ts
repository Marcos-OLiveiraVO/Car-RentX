import { Router } from "express";
import { v4 as uuid } from "uuid";

const categoriesRouters = Router();
const categories = [];

categoriesRouters.post("/", (req, res) => {
  const { description, name } = req.body;

  const category = {
    id: uuid(),
    name,
    description,
  };

  categories.push(category);

  res.status(201).send();
});

export { categoriesRouters };
