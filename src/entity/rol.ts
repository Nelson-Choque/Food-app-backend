import { Column, Entity, IsNull, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Rol{
@PrimaryGeneratedColumn()
idrol : number;

@Column()
name:   string;

@Column({ nullable: true })
state: boolean;

@OneToMany((type) =>User, (user) => user.rols, {eager: true})
User: User[];

}