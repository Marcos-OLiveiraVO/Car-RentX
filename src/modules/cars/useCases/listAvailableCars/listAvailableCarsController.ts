import { Request, Response } from "express";
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";
import { container } from "tsyringe";

class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, name, category_id } = req.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });

    return res.json(cars);
  }
}

export { ListAvailableCarsController };
