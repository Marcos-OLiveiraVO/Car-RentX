import { ICreateUserToken } from "@modules/accounts/dtos/ICreateUserToken";
import { UserToken } from "../entities/UserToken";
import { Repository } from "typeorm";
import { dataSource } from "../../../../../shared/infra/typeorm/data-source";
import { IUsersTokensRepository } from "../../../repositories/IUsersTokensRepository";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = dataSource.getRepository(UserToken);
  }

  async create({
    expires_dates,
    refresh_token,
    user_id,
  }: ICreateUserToken): Promise<UserToken> {
    const userToken = this.repository.create({
      expires_dates,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findUserByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userTokens = await this.repository.findOne({
      where: { user_id, refresh_token },
    });

    return userTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      where: { refresh_token },
    });

    return userToken;
  }
}

export { UsersTokensRepository };
