import { Species } from "../../domain/entities/species";

export interface ISpecieService {
  getSpecies(): Promise<Species[]>;
}
