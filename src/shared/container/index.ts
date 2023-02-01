import { container } from "tsyringe";
import { UsersRepository } from "@modules/accounts/repositories/implementations/usersRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { CategoriesRepository } from "@modules/cars/repositories/implementations/categoriesRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { SpecificationRepository } from "@modules/cars/repositories/implementations/SpecificationRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UsersRepository
);
