import { Router } from "express";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRouter = Router();
const rentalController = new CreateRentalController();

rentalsRouter.post("/", ensureAuthenticated, rentalController.handle);

export { rentalsRouter };
