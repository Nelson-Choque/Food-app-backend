import { Router } from "express";
import { usercontroller } from "../controller/user.controller";
import LoginController from "../controller/login.controller";
import validateToken from "../controller/validate-token.controller";
import routerLogin from "./login.routes";

const router = Router();
const usersController = new usercontroller();
const validateTokenr = new validateToken();
const logincontroller = new LoginController();
router.get("/", usersController.getUser);
router.get("/:iduser", usersController.findById);
router.put("/:iduser", usersController.updateUser);
router.delete("/:iduser", usersController.delete);
// validateTokenr.token,

router.use("/", routerLogin);

export default router;
