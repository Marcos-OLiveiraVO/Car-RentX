import { container } from "tsyringe";

import "@shared/container/providers/DateProvider";

import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/categoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/usersRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { ICreateRentalRepository } from "@modules/rentals/repositories/ICreateRentalRepository";
import { RentalRepository } from "@modules/rentals/infra/repositories/RentalRepository";

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

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
);

container.registerSingleton<ICreateRentalRepository>(
  "RentalRepository",
  RentalRepository
);
