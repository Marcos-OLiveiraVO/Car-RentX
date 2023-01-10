import { Router } from "express";
import { categoriesRouters } from "./categories-routes";
import { specificationRouters } from "./specification-routes";

const router = Router();

router.use("/categories", categoriesRouters);
router.use("/specifications", specificationRouters);

export { router };
