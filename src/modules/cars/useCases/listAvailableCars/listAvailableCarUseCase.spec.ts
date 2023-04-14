import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-Memory/carsRepositoryInMemory";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("list car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
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

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "audi 06_test",
      description: "audio13",
      daily_rate: 600.0,
      license_plate: "sdasda-245",
      fine_amount: 250,
      name: "audi x3r",
      category_id: "95d61c8c-0bd7-4dae-8f24-b394f7fb3c3a",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "audi 07_test",
      description: "audio13",
      daily_rate: 600.0,
      license_plate: "sdasda-245",
      fine_amount: 250,
      name: "audi 15",
      category_id: "95d61c8c-0bd7-4dae-8f24-b394f7fb3c3a",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "audi 15",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "audi 07_test",
      description: "audio13",
      daily_rate: 600.0,
      license_plate: "sdasda-245",
      fine_amount: 250,
      name: "audi 15",
      category_id: "95d61c8c-0bd7-4dae-8f24-b394f7fb3c3a",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "95d61c8c-0bd7-4dae-8f24-b394f7fb3c3a",
    });

    expect(cars).toEqual([car]);
  });
});
