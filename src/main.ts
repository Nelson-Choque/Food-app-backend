import express, { Router } from "express";
import storeRouter from "./routes/store.routes";

const mainRouter = Router();

mainRouter.use(storeRouter);

export default mainRouter;
