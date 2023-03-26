import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { Category } from "../../../modules/cars/infra/typeorm/entities/Category-model";
import { Specification } from "../../../modules/cars/infra/typeorm/entities/Specification";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "20041650",
  database: "",
  entities: [Category, Specification, User],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  migrationsTableName: "migrations",
  synchronize: false,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {})
  .catch((error) => console.log(error));

export default AppDataSource;
