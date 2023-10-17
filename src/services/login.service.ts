import { Repository } from "typeorm";
import { userdto } from "../dto/users.dto";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export class loginService{
    private repository: Repository<User>;
    constructor(){
        this.repository = AppDataSource.getRepository(User);
    }
    async login(username: string){
        try {
            if(username == null){
                throw new Error('Ingrese el nombre de usuario')
            }
            console.log('username: '+username)
            //await this.repository.createQueryBuilder('user')
            //.leftJoinAndSelect('user.rols', 'rols')
            //.getMany();
            const user = await this.repository.createQueryBuilder('user').leftJoinAndSelect('user.rols', 'rols').where('user.username = :username', {username: username}).getOne();
            return user;
            
        } catch (error) {
            throw new Error('Error: '+error.message)
        }
    }

}