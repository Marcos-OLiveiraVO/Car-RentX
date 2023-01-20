import { Request, Response } from "express";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<void> {
    const { name, username, password, email, driver_licence } = req.body;
  }
}
