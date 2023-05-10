import { Router } from "express";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/devolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentals/listRentalsByUserController";

const rentalsRouter = Router();
const rentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserUserCase = new ListRentalsByUserController();

rentalsRouter.post("/", ensureAuthenticated, rentalController.handle);
rentalsRouter.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);
rentalsRouter.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserUserCase.handle
);

export { rentalsRouter };
