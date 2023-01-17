import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/createCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/importCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategory/ListCategoriesController";

const categoriesRouters = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRouters.post("/", createCategoryController.handle);

categoriesRouters.get("/", listCategoriesController.handle);

categoriesRouters.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRouters };
