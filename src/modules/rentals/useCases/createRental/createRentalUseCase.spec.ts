import { CreateRentalRepositoryInMemory } from "@modules/rentals/repositories/In-Memory/CreateRentalRepositoryInMemory";
import { CreateRentalUseCase } from "./createRentalUseCase";
import { AppError } from "@shared/errors/appError";

let createRentalUseCase: CreateRentalUseCase;
let createRentalInMemoryRepository: CreateRentalRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(async () => {
    createRentalInMemoryRepository = new CreateRentalRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      createRentalInMemoryRepository
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "1234",
      expect_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there's another open for the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "7777",
        car_id: "5555",
        expect_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: "7777",
        car_id: "6666",
        expect_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there's another open for the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "2222",
        car_id: "6666",
        expect_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: "8888",
        car_id: "6666",
        expect_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
