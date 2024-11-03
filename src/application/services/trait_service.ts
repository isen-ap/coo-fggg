import { ITraitService } from "application/interfaces/trait_service_interface";

interface TraitUrlResponse {
  count: number;
  results: Array<{
    index: string;
    name: string;
    url: string;
  }>;
}

interface TraitResponse {
  index: string;
  races: Array<{
    index: string;
    name: string;
    url: string;
  }>;
  subraces: Array<{
    index: string;
    name: string;
    url: string;
  }>;
  name: string;
  desc: string[];
  proficiencies: Array<{
    index: string;
    name: string;
    url: string;
  }>;
  url: string;
}

export class TraitService implements ITraitService {
  private cachedTraits: Trait[] | null = null;

  constructor() {}

  getTraits(): Trait[] {
    if (this.cachedTraits) {
      return this.cachedTraits;
    }

    // Déclencher le chargement en arrière-plan
    this.loadTraits();

    return []; // Valeur par défaut en attendant le chargement
  }

  private async loadTraits(): Promise<void> {
    try {
      const urls = await this.getUrls();
      await this.fetchTraits(urls);
    } catch (error) {
      console.error("Error loading traits:", error);
      this.cachedTraits = null;
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
      const response = await fetch("https://www.dnd5eapi.co/api/traits", requestOptions);
      const result = (await response.json()) as TraitUrlResponse;
      return result.results.map((trait) => trait.index);
    } catch (error) {
      console.error("Error fetching traits url:", error);
      return [];
    }
  }

  private async fetchTraits(traitsUrls: string[]): Promise<void> {
    const traitsList: Trait[] = [];

    for (const url of traitsUrls) {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(`https://www.dnd5eapi.co/api/traits/${url}`, requestOptions);
        const result = (await response.json()) as TraitResponse;
        traitsList.push(new Trait(url, result.name, result.desc[0]));
      } catch (error) {
        console.error("Error fetching trait:", error);
      }
    }

    this.cachedTraits = traitsList;
  }
}