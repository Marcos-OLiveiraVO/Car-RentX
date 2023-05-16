import { Router } from "express";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordmail/sendForgotPasswordController";
import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/resetPasswordUserController";

const passwordRouters = Router();

const sendForgotPasswordController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRouters.post("/forgot", sendForgotPasswordController.handle);
passwordRouters.post("/reset", resetPasswordUserController.handle);

export { passwordRouters };
