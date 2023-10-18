import { Router } from "express";
import { usercontroller } from "../controller/user.controller";
import LoginController from "../controller/login.controller";
import validateToken from '../controller/validate-token.controller';


const routerUser =  Router();
const usersController = new usercontroller();
const validateTokenr= new validateToken();
const logincontroller = new LoginController();
routerUser.get("/users", validateTokenr.token,usersController.getUser);
routerUser.get("/users/:iduser",validateTokenr.token, usersController.findById);
routerUser.put("/users/:iduser",validateTokenr.token, usersController.updateUser);  
routerUser.delete("/users/:iduser",validateTokenr.token, usersController.delete);  


routerUser.post("/users", usersController.createUser);  
routerUser.post("/login", logincontroller.login);   

export default routerUser;