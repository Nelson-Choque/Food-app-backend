import { NextFunction, Request, Response } from "express";
import ValidateTokenService from "../services/validate-token.service";

class validateToken{
    public async token(req:Request, res:Response, next:NextFunction){
        const service =  new ValidateTokenService();
        const result = await service.validate(req, res, next);  
        return result;
    }
}
export default validateToken;