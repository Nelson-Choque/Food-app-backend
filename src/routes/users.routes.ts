import { Router } from "express";
import { usercontroller } from "../controller/user.controller";
import LoginController from "../controller/login.controller";


const routerUser =  Router();
const usersController = new usercontroller();
const logincontroller = new LoginController();
routerUser.get("/users", usersController.getUser);
routerUser.get("/users/:iduser", usersController.findById);
routerUser.post("/users", usersController.createUser);  
routerUser.put("/users/:iduser", usersController.updateUser);  
routerUser.delete("/users/:iduser", usersController.delete);  
 

routerUser.post("/login", logincontroller.login);   

export default routerUser;