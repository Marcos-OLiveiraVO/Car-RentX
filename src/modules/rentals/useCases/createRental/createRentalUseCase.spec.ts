import { CreateRentalRepositoryInMemory } from "@modules/rentals/repositories/In-Memory/CreateRentalRepositoryInMemory";
import { CreateRentalUseCase } from "./createRentalUseCase";

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
    await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "1234",
      expect_return_date: new Date(),
    });
  });
});
