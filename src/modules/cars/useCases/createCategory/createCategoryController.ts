import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { description, name } = req.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    await createCategoryUseCase.execute({ description, name });

    return res.status(201).send();
  }
}

export { CreateCategoryController };
