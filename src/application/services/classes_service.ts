import { IClassesService } from "application/interfaces/classes_service_interface";

interface ClassesUrlResponse {
  count: number;
  results: Array<{
    index: string;
    name: string;
    url: string;
  }>;
}

class CharacterClass {
  constructor(
    public id: number,
    public name: string,
    public skillToChoose: Array<string>,
    public skill: Array<string>,
    public savingThrow: Array<string>,
    public spellcastingAbility: string,
    public spellLevelOne: Array<string>,
  ) {}
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
        const result = await response.json();
        classesList.push(this.toCharacterClass(result));
      } catch (error) {
        console.error(`Error fetching class from ${url}:`, error);
      }
    }

    return classesList;
  }

  private toCharacterClass(result: any): CharacterClass {
    const newCharac = new CharacterClass(
      result.index,
      result.name,
      result.proficiency_choices,
      result.proficiencies,
      result.saving_throws || [],
      result.spellcasting?.spellcasting_ability?.name || "",
      result.spells,
    );
    return newCharac;
  }
}
