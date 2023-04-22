import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { CarImage } from "../entities/CarImage";
import { Repository } from "typeorm";
import dataSource from "@shared/infra/typeorm/data-source";

class CarsImageRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = dataSource.getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const CarImage = this.repository.create({ car_id, image_name });

    await this.repository.save(CarImage);

    return CarImage;
  }
}

export { CarsImageRepository };
