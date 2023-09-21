import { Request, Response, Router, request, response } from "express";
import {
  create,
  finById,
  findAll,
  remove,
  update,
} from "../controller/store.controller";

console.log("router food");

const router = Router();

router.get("/", findAll);

router.get("/:id", finById);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;
