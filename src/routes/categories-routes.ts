import { Router } from "express";
import { CategoriesRepository } from "../modules/cars/repositories/categoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";

const categoriesRouters = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRouters.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRouters.get("/", (req, res) => {
  const all = categoriesRepository.list();

  return res.json(all);
});

export { categoriesRouters };
