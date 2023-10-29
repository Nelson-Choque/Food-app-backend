import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Product } from "./entity/Product";
import { Store } from "./entity/Store";
import { Category } from "./entity/Category";
import { Rol } from "./entity/rol";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  // host: process.env.HOST,
  // username: process.env.USERNAMEDB,
  // password: process.env.PASSWORD,
  // database: process.env.DB,
  // port: parseInt(process.env.PORTDB),
  url: "postgres://fl0user:8HxUMv3EYpcT@ep-gentle-bread-26470701.us-east-2.aws.neon.fl0.io:5432/dbmultienda?sslmode=require",
  synchronize: true,
  logging: false,
  entities: [Product, Store, Category, User, Rol],
  migrations: ["src/migration/**/*.{ts,js}"],
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
