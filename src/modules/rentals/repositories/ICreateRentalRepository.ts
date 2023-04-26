import { Rental } from "../infra/typeorm/Rental";

interface ICreateRentalRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
}

export { ICreateRentalRepository };
