import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicencePlate(licence_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === licence_plate);
  }
}

export { CarsRepositoryInMemory };
