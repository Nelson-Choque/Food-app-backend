import { NextFunction, Request, Response } from "express";
import { Product } from "../entity/Product";
import { DeleteResult } from "typeorm";
import { ProductService } from "../services/product.service";
import { v2 as cloudinary } from "cloudinary";
import { File } from "multer";
import { error } from "console";
import { Store } from "../entity/Store";

cloudinary.config({
  api_key: "273477297878473",
  cloud_name: "dsczc26rm",
  api_secret: "0mWYD-tlmlkUMmspOFbjzI5tbnM",
});

declare global {
  namespace Express {
    interface Request {
      files: File;
    }
  }
}

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
    //* get buffer of FormData and properties of body
    const imageBuffer: Buffer = req.files[0].buffer;
    const { price, name, description, storeId, brand } = req.body;

    //*create variable to storage url cloudinary
    let imageUrl: string = "";

    //* save db
    const newProduct = new Product();
    const newStore = new Store();

    newStore.id = storeId;
    newProduct.name = name;
    newProduct.description = description;
    newProduct.brand = brand;
    newProduct.price = price;
    newProduct.store = newStore;

    //* function upload cloudinary

    const responseCloudinary = await cloudinary.uploader.upload_stream(
      { folder: "productos" },
      async (err, result) => {
        if (err) {
          console.log(err);
        }
        //* set imgUrl

        newProduct.imgUrl = result.secure_url;

        const productCreated = await productService.create(newProduct);
      }
    );

    //* send buffer image

    responseCloudinary.end(imageBuffer);
    // console.log(imageUrl + "abc");

    res.status(201).send("hola");
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

    const deleteProduct: DeleteResult = await productService.delete(id);

    res.status(201).send(deleteProduct);
  } catch (err) {
    next(err);
  }
};
