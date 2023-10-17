import { Repository } from "typeorm";
import { Rol } from "../entity/rol";
import { AppDataSource } from "../data-source";



export class rolservice{
    private repository: Repository<Rol>;
    constructor(){
        this.repository = AppDataSource.getRepository(Rol);
    }

    async findAllRol(): Promise<Rol[]>{
        try {
            const rols: Rol[] = await this.repository.find();
            return rols;            
        } catch (error) {
           
        }
    }   

    async finByI(idrol:number): Promise<Rol>{
        const rol : Rol = await this.repository.findOne({where: {idrol: idrol}});   
        if(!rol){
            throw new Error('No se encontro el rol');
        }
        return rol;
    }

    async create(rolCreate: Rol): Promise<Rol>{
        try {
            const rol : Rol = await this.repository.create(rolCreate);
            rol.state = true;
            await this.repository.save(rol);
            return rol;
        } catch (error) {
            throw new Error('Error: '+error.message)
        }
    }

    async update(updateRol: Rol, idrol:number){
        const rol : Rol = await this.finByI(idrol);
        if(!rol){
            return;
        }
        updateRol.idrol = idrol;
        await this.repository.save(updateRol);
        return updateRol;
    }
    async delete(idrol:number){
        const rol : Rol = await this.finByI(idrol);
        if(!rol){
            return;
        }
        rol.state = false;
        await this.repository.save(rol);
        return rol;
    }
}