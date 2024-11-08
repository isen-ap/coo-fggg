import { IClassesService } from "../interfaces/classes_service_interface";
import { CharacterClass } from "../../domain/entities/character-class";
import { Skill } from "../../domain/entities/skill";
import { SkillToChoose } from "../../domain/entities/skill-to-choose";
import { Spell } from "../../domain/entities/spell";
import { SavingThrow } from "../../domain/entities/saving-throw";

interface ClassesUrlResponse {
  count: number;
  results: Array<{
    index: string;
    name: string;
    url: string;
  }>;
}

interface SpellResponse {
  count: number;
  results: Array<{
    index: string;
    name: string;
    level: number;
    url: string;
  }>;
}

interface DDClassResponse {
  index: string;
  name: string;
  hit_die: number;
  proficiency_choices: Array<any>;
  proficiencies: Array<any>;
  saving_throws: Array<{ index: string; name: string; url: string }>;
  starting_equipment: Array<any>;
  starting_equipment_options: Array<any>;
  class_levels: string;
  multi_classing: any;
  subclasses: Array<{ index: string; name: string; url: string }>;
  spellcasting: {
    level: number;
    spellcasting_ability: { index: string; name: string; url: string };
    info: Array<any>;
  };
  spells: any;
  url: string;
}

export class ClassesService implements IClassesService {
  constructor() {}

  async getClasses(): Promise<CharacterClass[]> {
    const urls = await this.getUrls();
    return await this.fetchClasses(urls);
  }

  private async getUrls(): Promise<string[]> {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch("https://www.dnd5eapi.co/api/classes", requestOptions);
      const result = (await response.json()) as ClassesUrlResponse;
      return result.results.map((classes) => classes.url);
    } catch (error) {
      console.error("Error fetching classes url:", error);
      return [];
    }
  }

  private async fetchClasses(classesUrls: string[]): Promise<CharacterClass[]> {
    const classesList: CharacterClass[] = [];

    for (const url of classesUrls) {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(`https://www.dnd5eapi.co${url}`, requestOptions);
        const result = (await response.json()) as DDClassResponse;

        let spells = [];
        if (result.spells) {
          spells = await this.getSpellLevelOne(result.spells);
        }
        result.spells = spells;
        classesList.push(this.toCharacterClass(result));
      } catch (error) {
        console.error(`Error fetching class from ${url}:`, error);
      }
    }

    return classesList;
  }

  private toSpellClass(result: any): Spell[] {
    return result.map((spell: any) => {
      return new Spell(spell.index, spell.name);
    });
  }

  private toSavingThrow(result: any): SavingThrow[] {
    return result.map((savingThrow: any) => {
      return new SavingThrow(savingThrow.index, savingThrow.name);
    });
  }

  private toCharacterClass(result: any): CharacterClass {
    const skills =
      result.proficiencies?.map((skill: any) => {
        return new Skill(skill.index, skill.name);
      }) || [];

    const skillToChoose =
      result.proficiency_choices?.map((choice: any) => {
        const subElements =
          choice.from?.options
            ?.map((element: any) => {
              return element.item ? new Skill(element.item.index, element.item.name) : null;
            })
            .filter((skill: Skill | null) => skill !== null) || []; // Remove null values

        return new SkillToChoose(choice.desc, subElements);
      }) || [];
    const newCharacter = new CharacterClass(
      result.index,
      result.name,
      skillToChoose,
      skills,
      this.toSavingThrow(result.saving_throws) || [],
      result.spellcasting?.spellcasting_ability?.name || "",
      this.toSpellClass(result.spells),
    );
    return newCharacter;
  }

  private async getSpellLevelOne(url: string): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(`https://www.dnd5eapi.co${url}`, requestOptions);
      const result = (await response.json()) as SpellResponse;
      //retourne uniquement les éléments dont level vaut 0
      return result.results.filter((spell: any) => spell.level === 0);
    } catch (error) {
      console.error(`Error fetching spell from ${url}:`, error);
      return "";
    }
  }
}
