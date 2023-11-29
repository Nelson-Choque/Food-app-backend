import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

import routerFood from "./routes/food.routes";
import routerStore from "./routes/store.routes";
import routerCategory from "./routes/category.routes";
import { errorHandler } from "./middelware/errorHandler";
import routerRol from "./routes/roles.routes";
import routerUser from "./routes/users.routes";
import multer from "multer";

//* set config dotenv
dotenv.config({ path: `./env/.env` });

//* create server and port
const app: Express = express();

const PORT: number = parseInt(process.env.PORT) || 8090;

//* config multer

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//* config port
app.listen(PORT, () =>
  console.log("listen in the port: http://localhost:" + PORT)
);

//* config middlewares

app.use(upload.any());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//* config middlewares - routes
app.use("/product", routerFood);
app.use("/category", routerCategory);
app.use("/store", routerStore);
app.use("/rol", routerRol);
app.use("/user", routerUser);
app.use("/login", routerUser);
app.use("*", errorHandler);
