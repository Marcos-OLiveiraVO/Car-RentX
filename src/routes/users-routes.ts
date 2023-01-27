import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/createUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";
import multer from "multer";

const usersRouters = Router();

const upload = multer({
  dest: "./avatar",
});

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouters.post("/", createUserController.handle);
usersRouters.patch(
  "/avatar",
  upload.single("file"),
  updateUserAvatarController.handle
);

export { usersRouters };
