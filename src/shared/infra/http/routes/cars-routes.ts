import { Router } from "express";
import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/listAvailableCarsController";

const carsRouter = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRouter.get("/available", listAvailableCarsController.handle);

export { carsRouter };
