import { ISpecieService } from "application/interfaces/specie_service_interface";

interface SpecieResponse {
  count: number;
  results: Array<{
    index: string;
    name: string;
    url: string;
  }>;
}

export class SpecieService implements ISpecieService {
  private cachedSpecies: string[] | null = null;

  constructor() {}

  getSpecies(): string[] {
    if (this.cachedSpecies) {
      return this.cachedSpecies;
    }

    // Déclencher le chargement en arrière-plan
    this.loadSpecies();

    return ["Loading..."]; // Valeur par défaut en attendant le chargement
  }

  private async loadSpecies(): Promise<void> {
    try {
      const urls = await this.getUrls();
      await this.fetchSpecies(urls);
    } catch (error) {
      console.error("Error loading species:", error);
      this.cachedSpecies = ["Error loading species"];
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
    const speciesList: string[] = [];

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
        const result = await response.json();
        console.log(result);
        //speciesList.push(result.name); // Assuming the species name is in the 'name' field
      } catch (error) {
        console.error(`Error fetching species from ${url}:`, error);
      }
    }

    this.cachedSpecies = speciesList;
  }
}
