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
import { Food } from "./Food";

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Food, (food) => food.store, { eager: true })
  foods: Food[];

  @OneToMany((type) => Category, (category) => category.store, { eager: true })
  categories: Category[];
}
