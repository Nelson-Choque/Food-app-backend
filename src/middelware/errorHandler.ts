import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ error: err.serializeError() });
  } else {
    console.log(err);

    res.status(500).send({ error: { message: "error en el servidor" } });
  }
};
