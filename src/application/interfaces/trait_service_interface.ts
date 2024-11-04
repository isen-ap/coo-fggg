import { Trait } from "../../domain/entities/trait"

export interface ITraitService {
  getTraits(): Promise<Trait[]>;
}