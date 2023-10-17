import { Router } from "express";
import { rolController } from "../controller/rol.controller";
import ValidateTokenService from "../services/validate-token.service";
import validateToken from "../controller/validate-token.controller";

const rolControllers = new rolController;
const routerRol = Router();
const validarToken = new validateToken();
routerRol.get("/rols",  validarToken.token,rolControllers.getRols);
routerRol.get("/rols/:idrol", rolControllers.findById);
routerRol.post("/rols", rolControllers.createRol);
routerRol.put("/rols/:idrol", rolControllers.updateRol);
routerRol.delete("/rols/:idrol", rolControllers.deleteRol);
export default routerRol;