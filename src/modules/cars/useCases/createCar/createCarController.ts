import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./createCarsUseCase";

class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      brand,
      category_id,
      daily_rate,
      description,
      license_plate,
      fine_amount,
      name,
    } = req.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      brand,
      category_id,
      daily_rate,
      description,
      license_plate,
      fine_amount,
      name,
    });

    return res.status(201).json(car);
  }
}

export { CreateCarController };
