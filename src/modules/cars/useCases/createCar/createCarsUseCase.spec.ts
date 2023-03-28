import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-Memory/carsRepositoryInMemory";
import { CreateCarUseCase } from "./createCarsUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "fiat",
      description: "uno zero",
      brand: "uno",
      category_id: "3",
      daily_rate: 100,
      license_plate: "0203103",
      fine_amount: 23123213,
    });
  });
});
