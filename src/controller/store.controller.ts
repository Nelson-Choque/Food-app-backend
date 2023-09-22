import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Food } from "../entity/Food";
import { getDatabaseConnection } from "../db/db";
import { DataSource, DeleteResult, UpdateResult } from "typeorm";
import { Store } from "../entity/Store";
import { StoreService } from "../services/store.service";

const storeService = new StoreService();

export const findAll = async (req: Request, res: Response) => {
  const stores: Store[] = await storeService.getStores();
  res.status(200).send(stores);
};

export const finById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const store = await storeService.finByIdStore(id);
  res.status(200).send(store);
};

export const create = async (req: Request, res: Response) => {
  const storeCreated = await storeService.createStore(req.body);
  res.status(201).send(storeCreated);
};

export const update = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  const storeUpdated = await storeService.updateStore(req.body, id);

  res.status(201).send(storeUpdated);
};

export const remove = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  await storeService.deleteStore(id);

  res.status(201).send();
};
