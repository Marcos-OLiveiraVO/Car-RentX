import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { ICreateRentalRepository } from "@modules/rentals/repositories/ICreateRentalRepository";
import { Rental } from "../typeorm/Rental";
import { Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm/data-source";

class RentalRepository implements ICreateRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = dataSource.getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOneBy({ car_id });
    return openByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOneBy({ user_id });
    return openByUser;
  }
  async create({
    car_id,
    user_id,
    expect_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expect_return_date,
    });

    this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOneBy({ id });
    return rental;
  }
}

export { RentalRepository };
