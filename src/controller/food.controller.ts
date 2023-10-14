import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Food } from "../entity/Food";
import { getDatabaseConnection } from "../db/db";
import { DataSource, DeleteResult, UpdateResult } from "typeorm";
import { FoodService } from "../services/food.service";
import { CustomError } from "../errors/CustomError";

const foodService: FoodService = new FoodService();

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foods: Food[] = await foodService.findAll();

    res.status(200).send(foods);
  } catch (err) {
    next(err);
  }
};

export const finById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const food: Food = await foodService.findById(id);

    res.status(200).send(food);
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const food = await foodService.create(req.body);

    res.status(201).send(food);
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: number = parseInt(req.params.id);

    const updateFood = await foodService.update(req.body, id);

    res.status(201).send(updateFood);
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: number = parseInt(req.params.id);

    const deleteFood: Food = await foodService.delete(id);

    res.status(201).send(deleteFood);
  } catch (err) {
    next(err);
  }
};
