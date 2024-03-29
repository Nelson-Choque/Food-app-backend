import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { getDatabaseConnection } from "../db/db";
import { DataSource, DeleteResult, UpdateResult } from "typeorm";
import { Store } from "../entity/Store";
import { StoreService } from "../services/store.service";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  api_key: "273477297878473",
  cloud_name: "dsczc26rm",
  api_secret: "0mWYD-tlmlkUMmspOFbjzI5tbnM",
});

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

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idStore: number = parseInt(req.params.id);

  try {
    //* get buffer of FormData and properties of body
    let imageBuffer: Buffer | undefined;
    if (req.files[0]) {
      imageBuffer = req.files[0].buffer;
    }
    const { name, color, telefono } = req.body;

    //* save db
    const newStore: Store = new Store();

    newStore.id = idStore;
    newStore.name = name;
    newStore.color = color;
    console.log({ telefono });
    if (telefono && telefono !== "null") {
      newStore.telefono = parseInt(telefono);
    }

    //* function upload cloudinary

    if (imageBuffer) {
      const responseCloudinary = await cloudinary.uploader.upload_stream(
        { folder: "productos" },
        async (err, result) => {
          if (err) {
            console.log(err);
          }
          //* set imgUrl

          newStore.logo = result.secure_url;
          await storeService.updateStore(newStore, idStore);
        }
      );
      responseCloudinary.end(imageBuffer);
    } else {
      const storeUpdated = await storeService.updateStore(newStore, idStore);
    }
    res.status(201).send("hola");
  } catch (err) {
    next(err);
  }

  // const storeUpdated = await storeService.updateStore(req.body, id);

  // res.status(201).send("ga");
};

export const remove = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  await storeService.deleteStore(id);

  res.status(201).send();
};
