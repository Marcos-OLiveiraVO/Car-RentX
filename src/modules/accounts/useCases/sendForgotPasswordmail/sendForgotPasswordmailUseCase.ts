import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/appError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private UsersRepository: IUserRepository,
    @inject("UsersTokensRepository")
    private UsersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private DateProvider: IDateProvider
  ) {}

  async execute(email: string) {
    const user = await this.UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists!");
    }

    const token = uuidV4();

    const expires_dates = this.DateProvider.addHours(3);

    await this.UsersTokensRepository.create({
      refresh_token: token,
      expires_dates,
      user_id: user.id,
    });
  }
}

export { SendForgotPasswordMailUseCase };
