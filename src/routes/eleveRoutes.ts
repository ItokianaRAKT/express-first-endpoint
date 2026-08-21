import { Router } from "express";
import { getEleves, getEleveById, createEleve, updateEleve, updateElevePartially, deleteEleve } from "../controllers/eleveController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const eleveRouter = Router();

eleveRouter.use(authMiddleware);

eleveRouter.get("/",    getEleves);
eleveRouter.get("/:id", getEleveById);
eleveRouter.post("/",   createEleve);
eleveRouter.put("/:id", updateEleve);
eleveRouter.patch("/:id", updateElevePartially);
eleveRouter.delete("/:id", deleteEleve);
