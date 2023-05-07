import { CreateRentalRepositoryInMemory } from "@modules/rentals/repositories/In-Memory/CreateRentalRepositoryInMemory";
import { CreateRentalUseCase } from "./createRentalUseCase";
import { AppError } from "@shared/errors/appError";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import dayjs from "dayjs";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";

let createRentalUseCase: CreateRentalUseCase;
let createRentalInMemoryRepository: CreateRentalRepositoryInMemory;
let dayJsProvider: DayJsDateProvider;
let carsRepository: CarsRepository;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "days").toDate();

  beforeEach(async () => {
    createRentalInMemoryRepository = new CreateRentalRepositoryInMemory();
    dayJsProvider = new DayJsDateProvider();
    carsRepository = new CarsRepository();
    createRentalUseCase = new CreateRentalUseCase(
      createRentalInMemoryRepository,
      dayJsProvider,
      carsRepository
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "1234",
      expect_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there's another open for the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "7777",
        car_id: "5555",
        expect_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "7777",
        car_id: "6666",
        expect_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there's another open for the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "2222",
        car_id: "6666",
        expect_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "8888",
        car_id: "6666",
        expect_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "2222",
        car_id: "6666",
        expect_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
