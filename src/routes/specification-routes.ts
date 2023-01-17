import { Router } from "express";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationRouters = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRouters.post("/", createSpecificationController.handle);

export { specificationRouters };
