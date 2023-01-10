import { Router } from "express";
import { createCategoryController } from "../modules/cars/useCases/createCategory";

const specificationRouters = Router();

specificationRouters.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

export { specificationRouters };
