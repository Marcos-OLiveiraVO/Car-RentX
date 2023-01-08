import { Router } from "express";
import { CategoriesRepository } from "../repositories/categoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRouters = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRouters.post("/", (req, res) => {
  const { description, name } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  return res.status(201).send();
});

categoriesRouters.get("/", (req, res) => {
  const all = categoriesRepository.list();

  return res.json(all);
});

export { categoriesRouters };
