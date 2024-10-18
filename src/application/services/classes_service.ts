import { IClassesService } from "application/interfaces/classes_service_interface";

interface ClassesUrlResponse {
  count: number;
  results: Array<{
    index: string;
    name: string;
    url: string;
  }>;
}

export class ClassesService implements IClassesService {
  private cachedClasses: string[] | null = null;

  constructor() {}

  getClasses(): string[] {
    if (this.cachedClasses) {
      return this.cachedClasses;
    }

    // Déclencher le chargement en arrière-plan
    this.loadClasses();

    return ["Loading..."]; // Valeur par défaut en attendant le chargement
  }

  private async loadClasses(): Promise<void> {
    try {
      const urls = await this.getUrls();
      await this.fetchClasses(urls);
    } catch (error) {
      console.error("Error loading species:", error);
      this.cachedClasses = ["Error loading species"];
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
      const response = await fetch("https://www.dnd5eapi.co/api/classes", requestOptions);
      const result = (await response.json()) as ClassesUrlResponse;
      return result.results.map((classes) => classes.url);
    } catch (error) {
      console.error("Error fetching species url:", error);
      return [];
    }
  }

  private async fetchClasses(classesUrls: string[]): Promise<void> {
    const speciesList: string[] = [];

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
        console.log(result);
        //speciesList.push(result.name); // Assuming the species name is in the 'name' field
      } catch (error) {
        console.error(`Error fetching species from ${url}:`, error);
      }
    }

    this.cachedClasses = speciesList;
  }
}
