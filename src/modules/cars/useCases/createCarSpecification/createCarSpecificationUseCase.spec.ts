import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-Memory/carsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";
import { AppError } from "@shared/errors/appError";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-Memory/specificationRepositoryInMemory";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it("should be able to add a new specification to the car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["1234"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "audi 06_test",
      description: "audio13",
      daily_rate: 600.0,
      license_plate: "sdasda-245",
      fine_amount: 250,
      name: "audi x3r",
      category_id: "95d61c8c-0bd7-4dae-8f24-b394f7fb3c3a",
    });

    const specification = await specificationRepositoryInMemory.create({
      name: "test",
      description: "test",
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
