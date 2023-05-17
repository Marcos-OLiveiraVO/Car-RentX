import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { RentalRepository } from "@modules/rentals/infra/repositories/RentalRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: CarsRepository,
    @inject("DateProvider")
    private dayJsDateProvider: IDateProvider,
    @inject("RentalRepository")
    private rentalRepository: RentalRepository
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    const minimum_daily = 1;

    if (!rental) {
      throw new AppError("Rental does not exists!");
    }

    const dateNow = this.dayJsDateProvider.dateNow();

    let daily = this.dayJsDateProvider.compareInDays(
      rental.start_date,
      this.dayJsDateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dayJsDateProvider.compareInDays(
      dateNow,
      rental.expect_return_date
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dayJsDateProvider.dateNow();
    rental.total = total;

    await this.rentalRepository.create(rental);

    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
