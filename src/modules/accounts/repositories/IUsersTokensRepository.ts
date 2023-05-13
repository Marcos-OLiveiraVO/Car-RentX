import { ICreateUserToken } from "../dtos/ICreateUserToken";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUsersTokensRepository {
  create({
    expires_dates,
    refresh_token,
    user_id,
  }: ICreateUserToken): Promise<UserToken>;

  findUserByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken>;

  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
