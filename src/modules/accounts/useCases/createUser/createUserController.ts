import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./createUserUseCase";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, password, email, driver_licence } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      password,
      email,
      driver_licence,
    });

    return res.status(201).send();
  }
}

export { CreateUserController };
