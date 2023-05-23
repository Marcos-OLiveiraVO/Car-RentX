import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayJsDateProvider);

container.registerInstance<IMailProvider>(
  "MailProvider",
  new EtherealMailProvider()
);

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  LocalStorageProvider
);
