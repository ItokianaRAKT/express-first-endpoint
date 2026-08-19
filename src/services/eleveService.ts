import * as eleveRepository from "../repositories/eleveRepository.js";
import type { Eleve } from "../models/eleveModel.js";

export async function getAll(): Promise<Eleve[]> {
  return eleveRepository.findAll();
}

export async function getById(id: number): Promise<Eleve | null> {
  return eleveRepository.findById(id);
}

export async function create(
  data: Omit<Eleve, 'id'>
): Promise<Eleve> {
  return eleveRepository.create(data);
}

export async function update(
  id: number,
  data: Omit<Eleve, 'id'>
): Promise<Eleve | null> {
  return eleveRepository.update(id, data);
}

export async function updatePartial(
  id: number,
  data: Partial<Omit<Eleve, 'id'>>
): Promise<Eleve | null> {
  return eleveRepository.updatePartial(id, data);
}

export async function remove(id: number): Promise<boolean> {
  return eleveRepository.remove(id);
}
