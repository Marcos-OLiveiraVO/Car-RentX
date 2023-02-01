import { CreateUserController } from "@modules/accounts/useCases/createUser/createUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";
import { ensureAuthenticated } from "middlewares/ensureAuthenticated";
import { Router } from "express";

import multer from "multer";
import uploadConfig from "@config/upload";

const usersRouters = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouters.post("/", createUserController.handle);
usersRouters.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRouters };
