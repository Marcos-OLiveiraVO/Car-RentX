import { Router } from "express";
import { CategoriesRepository } from "../repositories/categoriesRepository";

const categoriesRouters = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRouters.post("/", (req, res) => {
  const { description, name } = req.body;

  categoriesRepository.create({ description, name });

  res.status(201).send();
});

export { categoriesRouters };
