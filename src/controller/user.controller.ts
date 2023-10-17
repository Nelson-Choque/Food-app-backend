import { NextFunction, Request, Response, response } from 'express';
import { UserService } from "../services/user.service";
import { User } from "../entity/User";

export class usercontroller{

    public async getUser(req: Request, res: Response, next:NextFunction){
        try {
            const service = new UserService();
            const user : User[] = await service.finAll();
            res.status(200).send(user);
        } catch (error) {
            next(error);
        }
    }
    
    public async findById(req:Request, res:Response, next:NextFunction){
        try {
            const service = new UserService();
            const iduser = parseInt(req.params.iduser);
            const user : User = await service.finById(iduser);
            res.status(201).send(user);
        } catch (error) {
            next(error);
        }
    }
    public async createUser(req: Request, res: Response, next:NextFunction){
        try {
            const service = new UserService();
            const user: User = req.body;
            res.status(200).send(await service.create(user));
        } catch (error) {
            next(error);
        }
    }    

    public async updateUser(req: Request,res:Response, next:NextFunction){
        try {
            const service = new UserService();
            const iduser = parseInt(req.params.iduser);
            const user: User = req.body;
            const userUpdate : User = await service.update(user, iduser);
            res.status(201).send(userUpdate);
        } catch (error) {
            
        }
    }
    
    public async delete(req:Request, res:Response, next:NextFunction){
        try {
            const service = new UserService();
            const iduser = parseInt(req.params.iduser);
            const user : User = await service.delete(iduser);
            res.status(201).send(user);
        } catch (error) {
            next(error);
        }
    }

}