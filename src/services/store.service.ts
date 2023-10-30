import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { getDatabaseConnection } from "../db/db";
import { DataSource, DeleteResult, Repository, UpdateResult } from "typeorm";
import { Store } from "../entity/Store";
import routerFood from "../routes/store.routes";

export class StoreService {
  repository: Repository<Store>;

  constructor() {
    this.repository = AppDataSource.getRepository(Store);
    console.log(routerFood);
  }

  async getStores(): Promise<Store[]> {
    const stores: Store[] = await this.repository
      .createQueryBuilder("s")
      .select([
        "s.id",
        "s.name",
        "s.url",
        "s.color",
        "category.id",
        "category.name",
        "product.id",
        "product.name",
        "product.description",
        "product.brand",
        "product.imgUrl",
      ])
      .leftJoin("s.categories", "category")
      .leftJoin("s.products", "product")
      .getMany();
    return stores;
  }

  async finByIdStore(id: number): Promise<Store> {
    const store: Store = await this.repository
      .createQueryBuilder("s")
      .select([
        "s.id",
        "s.name",
        "s.url",
        "s.color",
        "category.id",
        "category.name",
        "product.id",
        "product.name",
        "product.price",
        "product.description",
        "product.brand",
        "product.imgUrl",
      ])
      .leftJoin("s.categories", "category")
      .leftJoin("s.products", "product")
      .where("s.id = :id", { id: id })
      .getOne();

    return store;
  }

  async createStore(newStore: Store): Promise<Store> {
    const storeCreated: Store = await this.repository.create(newStore);
    const store: Store = await this.repository.save(storeCreated);

    return store;
  }

  async updateStore(updateStore: Store, id: number): Promise<Store> {
    const store: Store = await this.finByIdStore(id);

    if (!store) {
      return;
    }
    updateStore.id = id;

    const storeUpdated: Store = await this.repository.save(updateStore);

    return storeUpdated;
  }

  async deleteStore(id: number): Promise<string> {
    const store: Store = await this.repository.findOne({ where: { id: id } });

    if (!store) {
      return "la tienda no existe";
    }

    await this.repository.delete({ id: id });

    return "se elimino con exitos";
  }
}

// export const findAll = async (req: Request, res: Response) => {
//   const db: DataSource = await getDatabaseConnection();
//   const stores: Store[] = await db.manager.find(Store);
//   res.status(200).send(stores);
// };

// export const finById = async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   const db: DataSource = await getDatabaseConnection();
//   const store: Store = await db.manager.findOneBy(Store, { id: id });

//   res.status(200).send(store);
// };

// export const create = async (req: Request, res: Response) => {
//   const db: DataSource = await getDatabaseConnection();
//   const newStore: Store = await db.manager.create(Store, req.body);
//   const store = await db.manager.save(newStore);

//   res.status(201).send(store);
// };

// export const update = async (req: Request, res: Response) => {
//   const db: DataSource = await getDatabaseConnection();

//   const id: number = parseInt(req.params.id);

//   const existStore: Store | undefined = await db.manager.findOne(Store, {
//     where: { id: id },
//   });

//   if (!existStore) {
//     res.status(404).send("no existe la tienda");
//     return "";
//   }

//   Object.assign(existStore, req.body);

//   const updateStore = await db.manager.save(Store, existStore);

//   res.status(201).send(updateStore);
// };

// export const remove = async (req: Request, res: Response) => {
//   const db: DataSource = await getDatabaseConnection();

//   const id: number = parseInt(req.params.id);

//   const existStore: Store = await db.manager.findOneBy(Store, { id: id });

//   if (!existStore) {
//     res.status(404).send("no existe la tienda");
//     return "";
//   }

//   const deleteStore: DeleteResult = await db.manager.delete(Store, { id: id });

//   res.status(201).send(deleteStore);
// };
