import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    brand,
    category_id,
    daily_rate,
    description,
    license_plate,
    fine_amount,
    name,
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicencePlate(
      license_plate
    );

    if (carAlreadyExists) {
      throw new AppError("Car already exists!");
    }

    const car = this.carsRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      license_plate,
      fine_amount,
      name,
    });

    return car;
  }
}

export { CreateCarUseCase };
