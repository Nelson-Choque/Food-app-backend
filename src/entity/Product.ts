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
export class Product {
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

  @Column({ nullable: true })
  imgUrl: string;

  @ManyToOne((type) => Store, (store) => store.products)
  store: Store;

  @ManyToMany((type) => Category, { eager: true })
  @JoinTable({ name: "product_categorys" })
  categories: Category[];
}
