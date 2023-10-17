import { Repository } from "typeorm";
import { User } from '../entity/User';
import { AppDataSource } from "../data-source";
import bcrypt from 'bcrypt';


export class UserService{
    private repository: Repository<User>;
    constructor(){
        this.repository = AppDataSource.getRepository(User);
    }
    async finAll(): Promise<User[]> {
        const users = await this.repository.createQueryBuilder('user')
            .leftJoinAndSelect('user.rols', 'rols')
            .getMany();
        return users;
    }

    async finById(id: number): Promise<User> {
        const user: User = await this.repository.findOne({ where: { id: id } });
        if (!user) {
            throw new Error('No se encontro el usuario');
        }
        return user;
    }

    async create(Usercreate : User): Promise<User>{
       try {
            if(Usercreate ==null){
                throw new Error('Ingrese los datos')
            }
            const user: User = await this.repository.create(Usercreate);
            const hashedPassword = await bcrypt.hash(user.password, 8);
            user.password = hashedPassword;
            console.log(user)
            user.state = true;
            await this.repository.save(user);

            return user;        
       } catch (error) {
             throw new Error('Error: '+error.message)
       }
    }

    async update(update : User, id: number) {
        const user: User = await this.finById(id);

        if (!user) {
            return;
        }
        const hashedPassword = await bcrypt.hash(user.password, 8);
        update.password = hashedPassword;
        update.id = id;
        await this.repository.save(update);
        return update;
    }

    async delete(id:number){
        const user : User = await this.finById(id);
        if(!user){
            return;
        }
        user.state = false;
        await this.repository.save(user);
        return user;
        
    }



}