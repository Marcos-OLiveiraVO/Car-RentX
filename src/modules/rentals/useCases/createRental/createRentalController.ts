import { Request, Response } from "express";
import { CreateRentalUseCase } from "./createRentalUseCase";
import { container } from "tsyringe";

class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { expect_return_date, car_id } = req.body;
    const { id } = req.user;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      expect_return_date,
      car_id,
      user_id: id,
    });

    return res.status(201).json(rental);
  }
}

export { CreateRentalController };
