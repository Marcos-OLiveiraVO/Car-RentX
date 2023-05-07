import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/appError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExist = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExist) {
      throw new AppError("Category Already Exists!");
    }

    await this.categoriesRepository.create({ description, name });
  }
}

export { CreateCategoryUseCase };
