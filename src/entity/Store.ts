import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  color: string;

  @OneToMany((type) => User, (user) => user.store, { eager: true })
  users: User[];

  @OneToMany((type) => Product, (product) => product.store, { eager: true })
  products: Product[];

  @OneToMany((type) => Category, (category) => category.store, { eager: true })
  categories: Category[];
}
