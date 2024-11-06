import { ISubSpeciesService } from "application/interfaces/subSpecies_service_interface";
import { SubSpecies } from "../../domain/entities/subSpecies";
// import { LanguageServiceInstance } from "./language_service";
import { Language } from "../../domain/entities/language";
import { LanguageServiceInstance } from "./language_service";

interface SubSpeciesUrlResponse {
  count: number;
  results: Array<{
    index: string;
    name: string;
    url: string;
  }>;
}

interface SubSpeciesResponse {
  index: string;
  name: string;
  desc: string[];
  traits: Array<{
    index: string;
    name: string;
    url: string;
  }>;
  languages: Array<{
    index: string;
    name: string;
    url: string;
  }>
  language_options: {
    choose: number;
    from: {
      options: Array<{
        option_type: string;
        item: {
          index: string;
          name: string;
          url: string;
        }
      }>
    }
  }
  url: string;
}

class SubSpeciesService implements ISubSpeciesService {
  private cachedSubSpecies: SubSpecies[] | null = null;

  constructor() {}

  async getSubSpecies(): Promise<SubSpecies[]> {
    if (this.cachedSubSpecies) {
      return this.cachedSubSpecies;
    }

    const urls = await this.getUrls();
    return await this.fetchSubSpecies(urls);
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
      const response = await fetch("https://www.dnd5eapi.co/api/subraces", requestOptions);
      const result = (await response.json()) as SubSpeciesUrlResponse;
      return result.results.map((subSpecies) => subSpecies.index);
    } catch (error) {
      console.error("Error fetching subSpecies url:", error);
      return [];
    }
  }

  private async fetchSubSpecies(subSpeciesUrls: string[]): Promise<SubSpecies[]> {
    const subSpeciesList: SubSpecies[] = [];

    for (const url of subSpeciesUrls) {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(`https://www.dnd5eapi.co/api/subraces/${url}`, requestOptions);
        const result = (await response.json()) as SubSpeciesResponse;


        const subSpecieLanguages: Language[] = [];
        const subSpecieLanguagesOptions: { choose: number, from: Language[] } = { 
          choose: result.language_options ? result.language_options.choose : 0, 
          from: [] 
        };
        if (result.languages.length > 0) {
          const allLangauges = await LanguageServiceInstance.getLanguages()

          for (const resultLanguage of result.languages) {
            const language = allLangauges.find((language: Language) => language.id === resultLanguage.index);
            if (language) [
              subSpecieLanguages.push(language)
            ]
          }
        }
        if (result.language_options) {
          for (const language of result.language_options.from.options) {
            const languageOption = new Language(language.item.index, language.item.name);
            subSpecieLanguagesOptions.from.push(languageOption);
          }
        }

        subSpeciesList.push(new SubSpecies(url, result.name, result.desc.toString(),subSpecieLanguages, subSpecieLanguagesOptions));
      } catch (error) {
        console.error("Error fetching subSpecies:", error);
      }
    }

    this.cachedSubSpecies = subSpeciesList;
    return subSpeciesList;
  }
}

export const SubSpeciesServiceInstance = new SubSpeciesService();