import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerFood from "./routes/food.routes";
import routerStore from "./routes/store.routes";
import routerCategory from "./routes/category.routes";
import mainRouter from "./main";

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

console.log("hola");
console.log("hola2");
// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))
