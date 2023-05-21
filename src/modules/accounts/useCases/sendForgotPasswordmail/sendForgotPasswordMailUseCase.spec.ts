import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/MailProviderInMemory/MailProviderInMemory";
import { SendForgotPasswordMailUseCase } from "./sendForgotPasswordmailUseCase";
import { AppError } from "@shared/errors/appError";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let mailProviderInMemory: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe("Send Forgot password", () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    dateProvider = new DayJsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    await usersRepositoryInMemory.create({
      name: "XXXX",
      email: "XXX@mail.com",
      password: "55555",
      driver_licence: "XXXX-XXXX",
    });

    await sendForgotPasswordMailUseCase.execute("XXX@mail.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      name: "XXXX",
      email: "XXX@mail.com",
      password: "55555",
      driver_licence: "XXXX-XXXX",
    });

    await sendForgotPasswordMailUseCase.execute("XXX@mail.com");

    expect(generateTokenMail).toHaveBeenCalled();
  });

  it("should not be able to send a forgot password mail to a non exists user", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("XXX@mail.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });
});
