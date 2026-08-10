import { Router } from "express";
import { getEleves, getEleveById, createEleve, updateEleve, updateElevePartially, deleteEleve } from "../controllers/eleve.controller.js";

export const eleveRouter = Router();
eleveRouter.get('/', getEleves);
eleveRouter.get('/:id', getEleveById);
eleveRouter.post('/', createEleve);
eleveRouter.put('/:id', updateEleve);
eleveRouter.patch('/:id', updateElevePartially);
eleveRouter.delete('/:id', deleteEleve);
