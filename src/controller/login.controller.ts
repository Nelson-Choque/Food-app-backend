import { NextFunction, Request, Response } from "express";
import { loginService } from "../services/login.service";
import bcrypt from 'bcrypt';

export default class LoginController{
    constructor() {}
    public async login(req: Request, res: Response, next:NextFunction){
        try {
            const reqBody = req.body;
            const service = new loginService();
            const username = reqBody.username;
            const resultado = await service.login(username);
            console.log(resultado)
            const pass : String | any = resultado?.password;
            console.log(pass)   
            if(resultado?.username == reqBody.username && reqBody.password != null){
                if(resultado?.rols.idrol != null){
                    console.log('entro', resultado?.rols)
                    bcrypt.compare(reqBody.password, pass).then((emp) =>{
                        console.log("Comparador: "+emp)
                        if(emp){
                            res.status(200).send('Bienvenido')
                        }else{
                            return res.status(400).send('Contraseña incorrecta')
                        }
                    })
                }else{
                    return res.status(400).json({message: 'Usuario no permitido'})
                }
            }else{
                return res.status(400).json({message: 'Usuario no encontrado'})
            }
        } catch (error) {
            next(error);
            return res.status(400).json({message: 'Error: '+error.message}) 
        }
    }
}
