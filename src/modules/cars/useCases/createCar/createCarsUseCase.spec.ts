import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-Memory/carsRepositoryInMemory";
import { CreateCarUseCase } from "./createCarsUseCase";
import { AppError } from "@shared/errors/appError";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "fiat",
      description: "uno zero",
      brand: "uno",
      category_id: "3",
      daily_rate: 100,
      license_plate: "0203103",
      fine_amount: 23123213,
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists licence plate", async () => {
    await createCarUseCase.execute({
      name: "car1",
      description: "uno zero",
      brand: "uno",
      category_id: "3",
      daily_rate: 100,
      license_plate: "0203103",
      fine_amount: 23123213,
    });

    await expect(
      createCarUseCase.execute({
        name: "car2",
        description: "uno zero",
        brand: "uno",
        category_id: "3",
        daily_rate: 100,
        license_plate: "0203103",
        fine_amount: 23123213,
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "car2",
      description: "uno zero",
      brand: "uno",
      category_id: "3",
      daily_rate: 100,
      license_plate: "0203103",
      fine_amount: 23123213,
    });

    expect(car.available).toBe(true);
  });
});
