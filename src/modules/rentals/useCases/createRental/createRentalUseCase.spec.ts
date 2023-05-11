import { CreateRentalRepositoryInMemory } from "@modules/rentals/repositories/In-Memory/CreateRentalRepositoryInMemory";
import { CreateRentalUseCase } from "./createRentalUseCase";
import { AppError } from "@shared/errors/appError";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import dayjs from "dayjs";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-Memory/carsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let createRentalInMemoryRepository: CreateRentalRepositoryInMemory;
let dayJsProvider: DayJsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "days").toDate();

  beforeEach(async () => {
    createRentalInMemoryRepository = new CreateRentalRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayJsProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      createRentalInMemoryRepository,
      dayJsProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "XXXTEST",
      description: "XXXXX",
      brand: "XXXXX",
      category_id: "XXXXXX",
      daily_rate: 100,
      fine_amount: 100,
      license_plate: "XXXX",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: car.id,
      expect_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there's another open for the same user", async () => {
    await createRentalInMemoryRepository.create({
      car_id: "XXX",
      user_id: "XXXX",
      expect_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "XXXX",
        car_id: "6666",
        expect_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(
      new AppError("There is a rent in progress for this user!")
    );
  });

  it("should not be able to create a new rental if there's another open for the same car", async () => {
    await createRentalInMemoryRepository.create({
      car_id: "test",
      user_id: "XXXX",
      expect_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "8888",
        car_id: "test",
        expect_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "2222",
        car_id: "6666",
        expect_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("invalid return time"));
  });
});
