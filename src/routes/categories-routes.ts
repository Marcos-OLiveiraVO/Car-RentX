import { Router } from "express";
import multer from "multer";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategory";

const categoriesRouters = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRouters.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRouters.get("/", (req, res) => {
  return listCategoriesController.handle(req, res);
});

categoriesRouters.post("/import", upload.single("file"), (req, res) => {
  const { file } = req;

  console.log(file);

  return res.send();
});

export { categoriesRouters };
