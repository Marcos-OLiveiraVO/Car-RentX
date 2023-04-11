import { ListCarUseCase } from "./listCarUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-Memory/carsRepositoryInMemory";

let listCarUseCase: ListCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("list car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarUseCase = new ListCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "audi 05",
      daily_rate: 600.0,
      description: "audio12",
      license_plate: "sdasda-245",
      fine_amount: 250,
      name: "audi x3r",
      category_id: "95d61c8c-0bd7-4dae-8f24-b394f7fb3c3a",
    });

    const cars = await listCarUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "audi 06_test",
      description: "audio13",
      daily_rate: 600.0,
      license_plate: "sdasda-245",
      fine_amount: 250,
      name: "audi x3r",
      category_id: "95d61c8c-0bd7-4dae-8f24-b394f7fb3c3a",
    });

    const cars = await listCarUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car]);
  });
});
