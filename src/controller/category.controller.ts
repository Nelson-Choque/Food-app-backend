import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Food } from "../entity/Food";
import { getDatabaseConnection } from "../db/db";
import { DataSource, DeleteResult, UpdateResult } from "typeorm";
import { Category } from "../entity/Category";

export const findAll = async (req: Request, res: Response) => {
  const db: DataSource = await getDatabaseConnection();
  const categories: Category[] = await db.manager.find(Category);
  res.status(200).send(categories);
};

export const finById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const db: DataSource = await getDatabaseConnection();
  const category: Category = await db.manager.findOneBy(Category, { id: id });

  res.status(200).send(category);
};

export const create = async (req: Request, res: Response) => {
  const db: DataSource = await getDatabaseConnection();
  const newCategory: Category = await db.manager.create(Category, req.body);
  const category: Category = await db.manager.save(newCategory);

  res.status(201).send(category);
};

export const update = async (req: Request, res: Response) => {
  const db: DataSource = await getDatabaseConnection();

  const id: number = parseInt(req.params.id);

  const existCategory: Category = await db.manager.findOneBy(Category, {
    id: id,
  });

  if (!existCategory) {
    res.status(404).send("no existe la category");
  }

  req.body.id = existCategory.id;

  const updateCategory = await db.manager.save(Category, req.body);

  res.status(201).send(updateCategory);
};

export const remove = async (req: Request, res: Response) => {
  const db: DataSource = await getDatabaseConnection();

  const id: number = parseInt(req.params.id);

  const existCategory: Category = await db.manager.findOneBy(Category, {
    id: id,
  });

  if (!existCategory) {
    res.status(404).send("no existe la comida");
    return "";
  }

  const deleteCategory: DeleteResult = await db.manager.delete(Category, {
    id: id,
  });

  res.status(201).send(deleteCategory);
};
