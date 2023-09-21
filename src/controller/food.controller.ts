import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Food } from "../entity/Food";
import { getDatabaseConnection } from "../db/db";
import { DataSource, DeleteResult, UpdateResult } from "typeorm";

export const findAll = async (req: Request, res: Response) => {
  const db: DataSource = await getDatabaseConnection();
  const foods: Food[] = await db.manager.find(Food);
  res.status(200).send(foods);
};

export const finById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const db: DataSource = await getDatabaseConnection();
  const food: Food = await db.manager.findOneBy(Food, { id: id });

  res.status(200).send(food);
};

export const create = async (req: Request, res: Response) => {
  const db: DataSource = await getDatabaseConnection();
  const newFood: Food = await db.manager.create(Food, req.body);
  const food = await db.manager.save(newFood);

  res.status(201).send(food);
};

export const update = async (req: Request, res: Response) => {
  const db: DataSource = await getDatabaseConnection();

  const id: number = parseInt(req.params.id);

  const existFood: Food = await db.manager.findOneBy(Food, { id: id });

  if (!existFood) {
    res.status(404).send("no existe la comida");
  }

  const updateFood = await db.manager.save(Food, req.body);

  res.status(201).send(updateFood);
};

export const remove = async (req: Request, res: Response) => {
  const db: DataSource = await getDatabaseConnection();

  const id: number = parseInt(req.params.id);

  const existFood: Food = await db.manager.findOneBy(Food, { id: id });

  if (!existFood) {
    res.status(404).send("no existe la comida");
    return "";
  }

  const deleteFood: DeleteResult = await db.manager.delete(Food, { id: id });

  res.status(201).send(deleteFood);
};
