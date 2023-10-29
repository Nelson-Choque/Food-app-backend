import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { getDatabaseConnection } from "../db/db";
import { DataSource, DeleteResult, UpdateResult } from "typeorm";
import { ProductService } from "../services/product.service";
import { CustomError } from "../errors/CustomError";

const productService: ProductService = new ProductService();

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products: Product[] = await productService.findAll();

    res.status(200).send(products);
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
    const product: Product = await productService.findById(id);

    res.status(200).send(product);
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
    const product = await productService.create(req.body);

    res.status(201).send(product);
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

    const updateProduct = await productService.update(req.body, id);

    res.status(201).send(updateProduct);
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

    const deleteProduct: Product = await productService.delete(id);

    res.status(201).send(deleteProduct);
  } catch (err) {
    next(err);
  }
};
