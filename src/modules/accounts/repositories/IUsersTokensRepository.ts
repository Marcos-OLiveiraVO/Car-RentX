import { ICreateUserToken } from "../dtos/ICreateUserToken";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUserToken {
  create({
    expires_dates,
    refresh_token,
    user_id,
  }: ICreateUserToken): Promise<UserToken>;
}

export { IUserToken };
