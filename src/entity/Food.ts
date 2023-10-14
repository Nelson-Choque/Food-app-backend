import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Store } from "./Store";

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  brand: string;
  @Column()
  description: string;
  @Column()
  price: number;

  @ManyToOne((type) => Store, (store) => store.foods)
  store: Store;

  @ManyToMany((type) => Category, { eager: true })
  @JoinTable({ name: "food_categorys" })
  categories: Category[];
}
