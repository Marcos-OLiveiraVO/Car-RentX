import { Repository } from "typeorm";
import dataSource from "database/data-source";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationRepository";
import { Specification } from "@modules/cars/entities/Specification";

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Repository<Specification>;

  constructor() {
    this.specifications = dataSource.getRepository("Specification");
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.specifications.create({
      name,
      description,
    });

    await this.specifications.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.specifications.findOneBy({ name });

    return specification;
  }
}

export { SpecificationRepository };
