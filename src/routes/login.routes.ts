import { Router } from "express";
import { usercontroller } from "../controller/user.controller";
import LoginController from "../controller/login.controller";

const router = Router();

const usersController = new usercontroller();

const logincontroller = new LoginController();

router.post("/register", logincontroller.register);

router.post("/login", logincontroller.login);

export default router;
