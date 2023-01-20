import { Router } from "express";
import { categoriesRouters } from "./categories-routes";
import { specificationRouters } from "./specification-routes";
import { usersRouters } from "./users-routes";

const router = Router();

router.use("/categories", categoriesRouters);
router.use("/specifications", specificationRouters);
router.use("/users", usersRouters);

export { router };
