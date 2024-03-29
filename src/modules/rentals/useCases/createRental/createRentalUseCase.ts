import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "../../../rentals/infra/typeorm/entities/Rental";
import { ICreateRentalRepository } from "@modules/rentals/repositories/ICreateRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  user_id: string;
  expect_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalRepository")
    private createRentalRepository: ICreateRentalRepository,
    @inject("DateProvider")
    private dayJsDateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    car_id,
    expect_return_date,
    user_id,
  }: IRequest): Promise<Rental> {
    const minimumHour = 24;

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

    const dateNow = this.dayJsDateProvider.dateNow();

    const compare = this.dayJsDateProvider.compareHours(
      dateNow,
      expect_return_date
    );

    if (compare < minimumHour) {
      throw new AppError("invalid return time");
    }

    const rental = await this.createRentalRepository.create({
      car_id,
      user_id,
      expect_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
