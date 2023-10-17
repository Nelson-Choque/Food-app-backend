import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerFood from "./routes/food.routes";
import routerStore from "./routes/store.routes";
import routerCategory from "./routes/category.routes";
import mainRouter from "./main";
import { CustomError } from "./errors/CustomError";
import { errorHandler } from "./middelware/errorHandler";
import routerRol from "./routes/roles.routes";
import routerUser from "./routes/users.routes";

dotenv.config();

const app: Express = express();

const PORT: number = parseInt(process.env.PORT) || 8090;

app.listen(PORT, () =>
  console.log("listen in the port: http://localhost:" + PORT)
);

app.use(express.json());
app.use(cors());

app.use("/food", routerFood);
app.use("/category", routerCategory);
app.use("/store", routerStore);
app.use("/store2", routerStore);
app.use("/main", mainRouter);
app.use("/rol",routerRol) ;
app.use("/user", routerUser);
app.use("*", errorHandler);
