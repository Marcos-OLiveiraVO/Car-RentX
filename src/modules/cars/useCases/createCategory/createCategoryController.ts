import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(req: Request, res: Response) {
    const { description, name } = req.body;

    this.createCategoryUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export { CreateCategoryController };
