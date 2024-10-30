import { SavingThrow } from "./saving-throw";
import { Skill } from "./skill";
import { SkillToChoose } from "./skill-to-choose";
import { Spell } from "./spell";

export class CharacterClass {
  id: number;
  name: string;
  skillToChoose: Array<SkillToChoose>;
  skills: Array<Skill>;
  savingThrow: Array<SavingThrow>;
  spellcastingAbility: string;
  spellLevelOne: Array<Spell>;
  constructor(
    id: number,
    name: string,
    skillToChoose: Array<SkillToChoose>,
    skills: Array<Skill>,
    savingThrow: Array<SavingThrow>,
    spellcastingAbility: string,
    spellLevelOne: Array<Spell>,
  ) {
    this.id = id;
    this.name = name;
    this.skillToChoose = skillToChoose;
    this.skills = skills;
    this.savingThrow = savingThrow;
    this.spellcastingAbility = spellcastingAbility;
    this.spellLevelOne = spellLevelOne;
  }
}
