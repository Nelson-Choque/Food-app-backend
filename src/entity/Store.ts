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

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  color: string;

  @OneToMany((type) => User, (user) => user.store)
  users: User[];

  @OneToMany((type) => Product, (product) => product.store)
  products: Product[];

  @OneToMany((type) => Category, (category) => category.store)
  categories: Category[];
}
