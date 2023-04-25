import { Router } from "express";
import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadImage/uploadImageController";

import multer from "multer";
import uploadConfig from "@config/upload";

const carsRouter = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarController();
const uploadImageCarController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRouter.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRouter.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadImageCarController.handle
);

carsRouter.get("/available", listAvailableCarsController.handle);

export { carsRouter };
