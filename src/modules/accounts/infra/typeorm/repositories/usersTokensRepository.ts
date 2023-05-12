import { ICreateUserToken } from "@modules/accounts/dtos/ICreateUserToken";
import { UserToken } from "../entities/UserToken";
import { Repository } from "typeorm";
import { dataSource } from "../../../../../shared/infra/typeorm/data-source";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

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
}

export { UsersTokensRepository };
