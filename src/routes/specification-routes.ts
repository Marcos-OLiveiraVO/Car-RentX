import { Router } from "express";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";
import { SpecificationRepository } from "../modules/cars/repositories/implementations/SpecificationRepository";

const specificationRouters = Router();

const specificationRepository = new SpecificationRepository();

specificationRouters.post("/", (req, res) => {
  const { name, description } = req.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationRepository
  );

  createSpecificationService.execute({ name, description });

  return res.status(201).send();
});

export { specificationRouters };
