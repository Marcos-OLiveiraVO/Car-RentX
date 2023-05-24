import { instanceToInstance } from "class-transformer";

import { IResponseUserDTO } from "../dtos/IResponseUserDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    avatar,
    driver_licence,
    email,
    name,
    id,
    avatar_url,
  }: User): IResponseUserDTO {
    const user = instanceToInstance({
      avatar,
      driver_licence,
      email,
      name,
      id,
      avatar_url,
    });

    return user;
  }
}

export { UserMap };
