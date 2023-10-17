import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, JoinColumn } from "typeorm"
import { Rol } from "./rol"
import { TextDecoder } from "util"
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    username : string

    @Column()
    password: string

    @Column({nullable: true})
    state: boolean

    @ManyToOne((type)=>Rol, (rol)=>rol.User)
    @JoinColumn({name: "idrol"})
    rols: Rol;
}
