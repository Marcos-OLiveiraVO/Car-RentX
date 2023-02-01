import { AppError } from "../../../../errors/appError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "userTestName",
      email: "user@mail.com",
      password: "1234",
      driver_licence: "1234",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute(user);

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a non existent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "user@mail.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate a user with password incorrect", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "userTestName",
        email: "user@mail.com",
        password: "1234",
        driver_licence: "1234",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "Wrong password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
