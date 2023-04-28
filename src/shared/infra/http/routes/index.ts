import { Router } from "express";
import { categoriesRouters } from "./categories-routes";
import { specificationRouters } from "./specification-routes";
import { usersRouters } from "./users-routes";
import { authenticateRouter } from "./authenticate-routes";
import { carsRouter } from "./cars-routes";
import { rentalsRouter } from "./rentals-routes";

const router = Router();

router.use("/categories", categoriesRouters);
router.use("/specifications", specificationRouters);
router.use("/users", usersRouters);
router.use("/cars", carsRouter);
router.use("/rentals", rentalsRouter);
router.use(authenticateRouter);

export { router };
