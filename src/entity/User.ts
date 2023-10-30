import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Rol } from "./rol";
import { TextDecoder } from "util";
import { Store } from "./Store";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  state: boolean;

  @ManyToOne((type) => Store, (store) => store.users)
  store: Store;

  @ManyToOne((type) => Rol, (rol) => rol.User)
  @JoinColumn({ name: "idrol" })
  rols: Rol;
}
