import { Skill } from "../../domain/entities/skill";

export interface ISkillService {
  getSkills(): Promise<Skill[]>;
}