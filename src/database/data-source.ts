import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "../modules/cars/entities/Category-model";
import { Specification } from "../modules/cars/entities/Specification";
import { User } from "../modules/accounts/entities/User";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "20041650",
  database: "",
  entities: [Category, Specification, User],
  migrations: ["./src/database/migrations/*.ts"],
  migrationsTableName: "migrations",
  synchronize: false,
  logging: false,
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));

export default AppDataSource;
