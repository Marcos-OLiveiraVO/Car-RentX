import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "middlewares/ensureAuthenticated";
import { Router } from "express";

const specificationRouters = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRouters.use(ensureAuthenticated);
specificationRouters.post("/", createSpecificationController.handle);

export { specificationRouters };
