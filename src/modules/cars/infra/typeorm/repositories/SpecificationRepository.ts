import { Repository } from "typeorm";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationRepository";
import { dataSource } from "@shared/infra/typeorm/data-source";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = dataSource.getRepository("Specification");
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOneBy({ name });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.findByIds(ids);

    return specifications;
  }
}

export { SpecificationRepository };
