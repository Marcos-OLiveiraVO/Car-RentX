import { Router } from "express";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordmail/sendForgotPasswordController";

const passwordRouters = Router();

const sendForgotPasswordController = new SendForgotPasswordMailController();

passwordRouters.post("/forgot", sendForgotPasswordController.handle);

export { passwordRouters };
