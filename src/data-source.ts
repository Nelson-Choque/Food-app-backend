import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Food } from "./entity/Food";
import { Store } from "./entity/Store";
import { Category } from "./entity/Category";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "db_food3",
  synchronize: true,
  logging: false,
  entities: [Food, Store, Category, User],
  migrations: ["src/migration/**/*.{ts,js}"],
  subscribers: [],
});

AppDataSource.initialize()
  .then((e) => {
    console.log("inicializado");
  })
  .catch((e) => {
    console.log(e);
  });
