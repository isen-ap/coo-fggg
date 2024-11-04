import { Proficiencies } from "../../domain/entities/proficiencies";

export interface ISkillService {
  getSkills(): Promise<Proficiencies[]>;
}