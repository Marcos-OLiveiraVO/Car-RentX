import { Repository } from "typeorm";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";
import dataSource from "database/data-source";
import { IUserRepository } from "../IUserRepository";

class UsersRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  findByEmail(email: string): Promise<User> {
    const user = this.repository.findOneBy({ email });
    return user;
  }

  async create({
    name,
    email,
    password,
    driver_licence,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_licence,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });
    return user;
  }
}

export { UsersRepository };
