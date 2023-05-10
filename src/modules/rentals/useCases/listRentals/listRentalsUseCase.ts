import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/usersRepository";
import { RentalRepository } from "@modules/rentals/infra/repositories/RentalRepository";
import { Rental } from "@modules/rentals/infra/typeorm/Rental";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalsRepository: RentalRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase };
