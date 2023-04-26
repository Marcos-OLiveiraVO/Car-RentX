import { ICreateRentalRepository } from "@modules/rentals/repositories/ICreateRentalRepository";
import { AppError } from "@shared/errors/appError";

interface IRequest {
  car_id: string;
  user_id: string;
  expect_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private createRentalRepository: ICreateRentalRepository) {}

  async execute({
    car_id,
    expect_return_date,
    user_id,
  }: IRequest): Promise<void> {
    const carUnavailable =
      await this.createRentalRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenToUser =
      await this.createRentalRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError("There is a rent in progress for this user!");
    }
  }
}

export { CreateRentalUseCase };
