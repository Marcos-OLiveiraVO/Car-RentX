import { ICreateUserToken } from "@modules/accounts/dtos/ICreateUserToken";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  userTokens: UserToken[] = [];

  async create({
    expires_dates,
    refresh_token,
    user_id,
  }: ICreateUserToken): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      expires_dates,
      refresh_token,
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findUserByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userToken = this.userTokens.find(
      (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token
    );

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.userTokens.find((ut) => ut.id === id);

    this.userTokens.splice(this.userTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = this.userTokens.find(
      (ut) => ut.refresh_token === refresh_token
    );

    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
