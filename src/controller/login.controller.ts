import { NextFunction, Request, Response } from "express";
import { loginService } from "../services/login.service";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { StoreService } from "../services/store.service";
import { Store } from "../entity/Store";
import { UserService } from "../services/user.service";
import { User } from "../entity/User";
export default class LoginController {
  constructor() {}
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const reqBody = req.body;
      const service = new loginService();
      const username = reqBody.username;
      const resultado = await service.login(username);

      if (!resultado) {
        return res.status(400).send("usuario no encontrado");
      }

      const isPasswordValid = await bcrypt.compare(
        reqBody.password,
        resultado.password
      );

      if (!isPasswordValid) {
        res.send(false);
        return;
      }
      res.send(resultado);

      // res.send("todo guchi");
      // const pass: String | any = resultado?.password;
      // console.log(pass);
    } catch (error) {
      next(error);
      return res.status(400).json({ message: "Error: " + error.message });
    }
  }

  public async register(req: Request, res: Response) {
    //*get fields
    const { storeName = "timy's store", username, password } = req.body;

    //*instance store

    const newStore = new Store();

    //*instance store - set values

    newStore.name = storeName;
    newStore.color = "#F2D492";

    //*call store service

    const storeService: StoreService = new StoreService();

    //*call store service - create store

    const storeCreated: Store = await storeService.createStore(newStore);

    //*call call user service

    const userService: UserService = new UserService();

    //* instance user

    const newUser: User = new User();

    //* instance user - set values

    console.log(storeCreated);

    newUser.username = username;
    newUser.password = password;
    newUser.store = storeCreated;

    //* call user service - create user

    const userCreated = await userService.create(newUser);

    res.send("no sense");
  }
}
