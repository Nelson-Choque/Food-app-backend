import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Product } from "./entity/Product";
import { Store } from "./entity/Store";
import { Category } from "./entity/Category";
import { Rol } from "./entity/rol";
import dotenv from "dotenv";

dotenv.config({ path: "./env/.env.local" });

export const AppDataSource = new DataSource({
  type: "postgres",
  // host: process.env.HOST,
  // username: process.env.USERNAMEDB,
  // password: process.env.PASSWORD,
  // database: process.env.DB,
  // port: parseInt(process.env.PORTDB),
  url: process.env.URL_POSTGRES,
  synchronize: true,
  logging: false,
  entities: [Product, Store, Category, User, Rol],
  migrations: [process.env.TYPEORM_MIGRATION],
  subscribers: [],
  // ssl: true,
  // url: "postgres://root:XLzKglrkvx7acj8VSCNFtxoY43bQ8tmL@dpg-ckrv1l85vl2c73bsn730-a.oregon-postgres.render.com/db_mulltienda",
});

AppDataSource.initialize()
  .then((e) => {
    console.log("inicializado");
  })
  .catch((e) => {
    console.log(e);
  });
