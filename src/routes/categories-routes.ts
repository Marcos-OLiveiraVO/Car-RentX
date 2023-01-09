import { Router } from "express";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategory";

const categoriesRouters = Router();

categoriesRouters.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRouters.get("/", (req, res) => {
  return listCategoriesController.handle(req, res);
});

export { categoriesRouters };
