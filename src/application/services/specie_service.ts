import { ISpecieService } from "application/interfaces/specie_service_interface";
import { TraitServiceInstance } from "./trait_service";
import { Trait } from "../../domain/entities/trait";
import { Species } from "../../domain/entities/species";
import { SubSpecies } from "../../domain/entities/subSpecies";
// import { Skill } from "../../domain/entities/skill";
import { Language } from "../../domain/entities/language";
import { LanguageServiceInstance } from "./language_service";


interface SpecieResponse {
  count: number;
  results: Array<{
    index: string;
    name: string;
    url: string;
  }>;
}

export class SpecieService implements ISpecieService {
  private cachedSpecies: Species[] | null = null;

  constructor() {}

  getSpecies(): Species[] {
    if (this.cachedSpecies) {
      return this.cachedSpecies;
    }

    // Déclencher le chargement en arrière-plan
    this.loadSpecies();

    return []; // Valeur par défaut en attendant le chargement
  }

  private async loadSpecies(): Promise<void> {
    try {
      const urls = await this.getUrls();
      await this.fetchSpecies(urls);
    } catch (error) {
      console.error("Error loading species:", error);
      this.cachedSpecies = null;
    }
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
      const response = await fetch("https://www.dnd5eapi.co/api/races", requestOptions);
      const result = (await response.json()) as SpecieResponse;
      return result.results.map((specie) => specie.url);
    } catch (error) {
      console.error("Error fetching species url:", error);
      return [];
    }
  }

  private async fetchSpecies(speciesUrls: string[]): Promise<void> {
    const speciesList: Species[] = [];


    for (const url of speciesUrls) {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(`https://www.dnd5eapi.co${url}`, requestOptions);
        const result: any = await response.json();

        // Getting subSpecies
        const subSpecies: SubSpecies[] = [];
        if (result.subraces.length > 0) {
          for (const subrace of result.subraces) {
            const subSpecie = new SubSpecies(subrace.index, subrace.name);
            subSpecies.push(subSpecie);
          }
        }

        // Getting skills
        // TODO : Trouver l'endroit ou se situe les skills dans l'api
        // const skills: Skill[] = [];
        // if (result.skills.length > 0) {
        //   for (const element of result.skills) {
        //     const skill = new Skill(element.index, element.name, element.desc[0]);
        //     skills.push(skill)
        //   }
        // }

        // Getting skillsToChoose
        // TODO: Implement

        // Getting languages
        const languages: Language[] = [];
        if (result.languages.length > 0) {
          const allLangauges = await LanguageServiceInstance.getLanguages()

          for (const resultLanguage of result.languages) {
            const language = allLangauges.find((language: Language) => language.id === resultLanguage.index);
            if (language) [
              languages.push(language)
            ]
          }
        }

        // Getting languagesToChoose
        // TODO trouver les subspecies

        // Getting traits 
        const availableTraits: Trait[] = [];
        if (result.traits.length > 0) {
          const allTraits = await TraitServiceInstance.getTraits();
          
          for (const resultTrait of result.traits) {
            const trait = allTraits.find((trait: Trait) => trait.id === resultTrait.index);
            if (trait) {
              availableTraits.push(trait);
            }
          }
        }
        
        // console.log(result);
        const specie = new Species(
          result.index,
          result.name,
          result.size,
          subSpecies,
          result.skills, // TODO
          result.skillsToChoose, // TODO
          languages,
          result.languagesToChoose, // TODO
          availableTraits,
          result.characteristicBonus
        );
        console.log(specie);
        
        speciesList.push(specie); // Assuming the species name is in the 'name' field
      } catch (error) {
        console.error(`Error fetching species from ${url}:`, error);
      }
    }

    this.cachedSpecies = speciesList;
  }
}
