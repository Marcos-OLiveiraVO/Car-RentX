import { Router } from "express";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const specificationRouters = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRouters.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

export { specificationRouters };
