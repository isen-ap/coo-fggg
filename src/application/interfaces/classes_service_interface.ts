import { CharacterClass } from "../../domain/entities/character_class";

export interface IClassesService {
  getClasses(): Promise<CharacterClass[]>;
}
