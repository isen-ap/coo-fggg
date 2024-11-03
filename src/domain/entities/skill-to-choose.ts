import { Skill } from "./skill";
export class SkillToChoose {
  description: String;
  skills: Skill[];

  constructor(description: String, skills: Skill[]) {
    this.description = description;
    this.skills = skills;
  }
}
