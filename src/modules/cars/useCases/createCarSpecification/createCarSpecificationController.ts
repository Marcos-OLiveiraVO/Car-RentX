import { Request, Response } from "express";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";
import { container } from "tsyringe";

class createCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { specifications_id } = req.body;

    const createCarSpecification = container.resolve(
      CreateCarSpecificationUseCase
    );

    const cars = await createCarSpecification.execute({
      car_id: id,
      specifications_id,
    });

    return res.json(cars);
  }
}

export { createCarSpecificationController };
