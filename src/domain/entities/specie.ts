import { SubSpecie } from "./subSpecie";
import { Language } from "./language";
export class Specie {
  id: number;
  name: String;
  height: number;
  subSpecies: SubSpecie;
  skills: Skill[];
  skillsToChoose: Skill[];
  languages: Language[];
  languagesToChoose: Language[];
  traits: Trait[];
  characteristicBonus: String[];

  constructor(
    name: String,
    height: number,
    subSpecies: SubSpecie,
    skills: Skill[],
    skillsToChoose: Skill[],
    languages: Language[],
    languagesToChoose: Language[],
    traits: Trait[],
    characteristicBonus: String[],
  ) {
    // TODO: Put a real id generator here
    this.id = 1;

    this.name = name;
    this.height = height;
    this.subSpecies = subSpecies;
    this.skills = skills;
    this.skillsToChoose = skillsToChoose;
    this.languages = languages;
    this.languagesToChoose = languagesToChoose;
    this.traits = traits;
    this.characteristicBonus = characteristicBonus;
  }
}
