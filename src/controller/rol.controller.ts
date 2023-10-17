import { NextFunction, Request, Response } from "express";
import { Rol } from "../entity/rol";
import { rolservice } from '../services/rol.service';
import { create } from './category.controller';


export class rolController{

    public async getRols(req: Request, res:Response, next: NextFunction){
        try {
            const service = new rolservice();
             const rols : Rol[] = await service.findAllRol();
             res.status(200).send(rols);
        } catch (error) {
            next(error);
        }
    }

    public async createRol(req: Request, res:Response, next: NextFunction){
        try {
            const service = new rolservice();
            const rolCreate: Rol = req.body;
            const rol: Rol = await service.create(rolCreate);
            res.status(200).send(rol);
        } catch (error) {
            next(error);
        }
    }

    public async findById(req:Request, res:Response, next: NextFunction){
        try {
            const service = new rolservice();
            const idrol = parseInt(req.params.idrol);
            const rol : Rol = await service.finByI(idrol);
            res.status(201).send(rol);
        } catch (error) {
            next(error);
        }
    }

    public async updateRol(req:Request, res:Response, next: NextFunction){
        try {
            const service = new rolservice();
            const idrol = parseInt(req.params.idrol);
            const rol: Rol = req.body;
            const rolUpdate : Rol = await service.update(rol, idrol);
            res.status(201).send(rolUpdate);
        } catch (error) {
            next(error);
        }
    }
    public async deleteRol(req:Request, res:Response, next: NextFunction){
        try {
            const service = new rolservice();
            const idrol = parseInt(req.params.idrol);
            const rol : Rol = await service.delete(idrol);
            res.status(201).send(rol);
        } catch (error) {
         next(error);   
        }
    }
}