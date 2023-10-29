import { Router } from "express";
import { usercontroller } from "../controller/user.controller";
import LoginController from "../controller/login.controller";
import validateToken from "../controller/validate-token.controller";

const routerUser = Router();
const usersController = new usercontroller();
const validateTokenr = new validateToken();
const logincontroller = new LoginController();
routerUser.get("/", validateTokenr.token, usersController.getUser);
routerUser.get("/:iduser", validateTokenr.token, usersController.findById);
routerUser.put("/:iduser", validateTokenr.token, usersController.updateUser);
routerUser.delete("/:iduser", validateTokenr.token, usersController.delete);

routerUser.post("/", usersController.createUser);
routerUser.post("/login", logincontroller.login);

export default routerUser;
