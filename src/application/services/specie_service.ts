import { ISpecieService } from "application/interfaces/specie_service_interface";
import { TraitServiceInstance } from "./trait_service";
import { Trait } from "../../domain/entities/trait";
import { Species } from "../../domain/entities/species";
import { SubSpecies } from "../../domain/entities/subSpecies";
// import { Skill } from "../../domain/entities/skill";
import { Proficiencies } from "../../domain/entities/proficiencies";
import { Language } from "../../domain/entities/language";
import { LanguageServiceInstance } from "./language_service";
import { SubSpeciesServiceInstance } from "./subSpecies_service";
import { SkillServiceInstance } from "./skill_service";


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

  async getSpecies(): Promise<Species[]> {
    if (this.cachedSpecies) {
      return this.cachedSpecies;
    }

    const urls = await this.getUrls();
    return await this.fetchSpecies(urls);
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

  private async fetchSpecies(speciesUrls: string[]): Promise<Species[]> {
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
            const allSubSpecies = await SubSpeciesServiceInstance.getSubSpecies();

            const subSpecie = allSubSpecies.find((subSpecie: SubSpecies) => subSpecie.id === subrace.index);
            if (subSpecie) {
              subSpecies.push(subSpecie);
            }
          }
        }

        // Getting proficiencies
        // TODO : Trouver l'endroit ou se situe les skills dans l'api
        const skills: Proficiencies[] = [];
        if (result.starting_proficiencies.length > 0) {
          const allSkills = await SkillServiceInstance.getSkills();

          for (const element of result.starting_proficiencies) {
            for (const skill of allSkills) {
              if (skill.id === element.index) {
                skills.push(skill)
              }
            }
          }
        }

        // Getting skillsToChoose
        // TODO: Implement
        const skillsToChoose: Proficiencies[] = [];
        if (result.starting_proficiencies_options) {
          const allSkills = await SkillServiceInstance.getSkills();

          for (const element of result.starting_proficiencies.from.options) {
            for (const skill of allSkills) {
              if (skill.id === element.item.index) {
                skillsToChoose.push(skill)
              }
            }
          }
        }

        // Getting languages
        const languages: Language[] = [];
        if (result.languages.length > 0) {
          const allLangauges = await LanguageServiceInstance.getLanguages()

          for (const resultLanguage of result.languages) {
            for (const language of allLangauges) {
              if (language.id === resultLanguage.index) {
                languages.push(language)
              }
            }
          }
        } else {
          console.log('No languages found for species', result.name);
        }

        // Getting languagesToChoose
        const languagesToChoose: Language[] = [];
        if (result.language_options) {
          for (const language of result.language_options.from.options) {
            const allLanguages = await LanguageServiceInstance.getLanguages();
            const languageToAdd = allLanguages.find((lang: Language) => lang.id === language.item.index);
            if (languageToAdd) {
              languagesToChoose.push(languageToAdd);
            }
          }
        }

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
        
        const specie = new Species(
          result.index,
          result.name,
          result.size,
          subSpecies,
          skills, // TODO
          skillsToChoose, // TODO
          languages,
          languagesToChoose,
          availableTraits,
          result.characteristicBonus
        );
        // console.log(specie);
        
        speciesList.push(specie);
      } catch (error) {
        console.error(`Error fetching species from ${url}:`, error);
      }
    }

    this.cachedSpecies = speciesList;
    return speciesList;
  }
}
