import { Router }  from "express";
import { getEleves, getEleveById, createEleve, updateEleve, updateElevePartially, deleteEleve } from "../controllers/eleve.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export const eleveRouter = Router();
eleveRouter.get('/', getEleves);
eleveRouter.get('/:id', getEleveById);
eleveRouter.post('/', authMiddleware, createEleve);
eleveRouter.put('/:id', authMiddleware, updateEleve);
eleveRouter.patch('/:id', authMiddleware, updateElevePartially);
eleveRouter.delete('/:id', authMiddleware, deleteEleve);
