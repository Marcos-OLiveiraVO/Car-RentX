import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { RentalRepository } from "@modules/rentals/infra/repositories/RentalRepository";
import { Rental } from "@modules/rentals/infra/typeorm/Rental";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";
import { inject } from "tsyringe";

interface IRequest {
  id: string;
  user_id: string;
}

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
    const car = await this.carsRepository.findById(id);
    const minimum_daily = 0;

    if (!rental) {
      throw new AppError("Rental does not exists");
    }

    const dateNow = await this.dayJsDateProvider.dateNow();

    let daily = await this.dayJsDateProvider.compareInDays(
      rental.start_date,
      this.dayJsDateProvider.dateNow()
    );

    if (daily < minimum_daily) {
      daily = 1;
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
