import { ISpecieService } from "application/interfaces/specie_service_interface";
import { TraitService } from "./trait_service";


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

    // const allTraits = TraitService.getTraits();

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
        console.log(result);

        // Getting subSpecies
        const subSpecies: SubSpecies[] = [];
        if (result.subraces.length > 0) {
          for (const subrace of result.subraces) {
            const subSpecie = new SubSpecies(subrace.index, subrace.name);
            subSpecies.push(subSpecie);
          }
        }

        // Getting skills
        const skills: Skill[] = [];
        if (result.skills.length > 0) {
          for (const element of result.skills) {
            const skill = new Skill(element.index, element.name, element.desc[0]);
            skills.push(skill)
          }
        }

        // Getting skillsToChoose
        // TODO: Implement

        // Getting languages
        const languages: Language[] = [];
        if (result.languages.length > 0) {
          for (const element of result.languages) {
            const language = new Language(element.index, element.name);
            languages.push(language)
          }
        }

        // Getting languagesToChoose

        // Getting traits 
        const traits: Trait[] = [];
        // if (result.traits.length > 0) {
        //   for (const element of result.traits) {
        //     const trait = new Trait(element.index, element.name);
        //     traits.push(trait)
        //   }
        // }
        
        console.log(result);
        const specie = new Species(
          result.index,
          result.name,
          result.size, // Assuming size is for height attribute
          subSpecies,
          result.skills, // TODO
          result.skillsToChoose, // TODO
          languages,
          result.languagesToChoose,
          result.traits, // TODO
          result.characteristicBonus
        );
        //speciesList.push(result.name); // Assuming the species name is in the 'name' field
      } catch (error) {
        console.error(`Error fetching species from ${url}:`, error);
      }
    }

    this.cachedSpecies = speciesList;
  }
}
