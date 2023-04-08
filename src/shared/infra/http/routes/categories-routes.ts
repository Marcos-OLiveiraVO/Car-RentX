import { CreateCategoryController } from "@modules/cars/useCases/createCategory/createCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/importCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategory/ListCategoriesController";

import { Router } from "express";
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const categoriesRouters = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRouters.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRouters.get("/", listCategoriesController.handle);

categoriesRouters.post(
  "/import",
  upload.single("file"),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
);

export { categoriesRouters };
