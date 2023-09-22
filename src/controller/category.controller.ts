import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Food } from "../entity/Food";
import { getDatabaseConnection } from "../db/db";
import { DataSource, DeleteResult, UpdateResult } from "typeorm";
import { Category } from "../entity/Category";
import { CategoryService } from "../services/category.service";
import { StoreService } from "../services/store.service";

const categoryService: CategoryService = new CategoryService();

export const findAll = async (req: Request, res: Response) => {
  const categories: Category[] = await categoryService.findAll();
  res.status(200).send(categories);
};

export const finById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const category: Category = await categoryService.findById(id);

  res.status(200).send(category);
};

export const create = async (req: Request, res: Response) => {
  const category: Category = await categoryService.create(req.body);

  res.status(201).send(category);
};

export const update = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  const categoryUpdated = await categoryService.update(req.body, id);

  res.status(201).send(categoryUpdated);
};

export const remove = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  const deleteCategory: DeleteResult = await categoryService.delete(id);

  res.status(201).send(deleteCategory);
};
