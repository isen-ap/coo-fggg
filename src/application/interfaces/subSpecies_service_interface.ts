import { SubSpecies } from "../../domain/entities/subSpecies";

export interface ISubSpeciesService {
  getSubSpecies(): Promise<SubSpecies[]>;
}