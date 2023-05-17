import { Rental } from "../../infra/typeorm/entities/Rental";
import { ICreateRentalRepository } from "../ICreateRentalRepository";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";

class CreateRentalRepositoryInMemory implements ICreateRentalRepository {
  rental: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rental.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rental.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

  async create({
    car_id,
    user_id,
    expect_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expect_return_date,
      start_date: new Date(),
    });

    this.rental.push(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rental.find((rental) => rental.id === id);
    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.rental.filter((rental) => rental.user_id === user_id);
  }
}

export { CreateRentalRepositoryInMemory };
