import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "../../../modules/cars/infra/typeorm/entities/Category-model";
import { Specification } from "../../../modules/cars/infra/typeorm/entities/Specification";
import { Car } from "../../../modules/cars/infra/typeorm/entities/Car";
import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { CarImage } from "../../../modules/cars/infra/typeorm/entities/CarImage";
import { Rental } from "../../../modules/rentals/infra/typeorm/entities/Rental";
import { UserToken } from "../../../modules/accounts/infra/typeorm/entities/UserToken";

require("dotenv/config");

const isTestEnv = process.env.NODE_ENV === "test";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "20041650",
  database: isTestEnv ? "postgres" : "rentx_test",
  entities: [Category, Specification, User, Car, CarImage, Rental, UserToken],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  migrationsTableName: "migrations",
  synchronize: false,
  logging: false,
});

dataSource
  .initialize()
  .then(() => {})
  .catch((error) => console.log(error));

export { dataSource };
