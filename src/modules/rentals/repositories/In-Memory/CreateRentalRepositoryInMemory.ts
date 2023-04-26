import { Rental } from "@modules/rentals/infra/typeorm/Rental";
import { ICreateRentalRepository } from "../ICreateRentalRepository";

class CreateRentalRepositoryInMemory implements ICreateRentalRepository {
  rental: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rental.find((rental) => rental.car_id === car_id);
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rental.find((rental) => rental.user_id === user_id);
  }
}

export { CreateRentalRepositoryInMemory };
